const http = require("http");
const fs = require("fs");
const path = require("path");

/** RAM-backed /api/state for the desktop app (no Postgres, no cloud). */
function createStateServer({ stateFile, getDefault }) {
  let ram = null;

  function readDisk() {
    try {
      if (!fs.existsSync(stateFile())) return null;
      const raw = JSON.parse(fs.readFileSync(stateFile(), "utf8"));
      return raw?.state ?? raw;
    } catch {
      return null;
    }
  }

  function writeDisk(data) {
    const dir = path.dirname(stateFile());
    fs.mkdirSync(dir, { recursive: true });
    const body = {
      app: "stability-cod",
      version: 1,
      exportedAt: new Date().toISOString(),
      state: data,
    };
    fs.writeFileSync(stateFile(), JSON.stringify(body, null, 2), "utf8");
  }

  function getState() {
    if (ram) return ram;
    ram = readDisk() ?? getDefault();
    return ram;
  }

  function setState(next) {
    ram = next?.state ?? next;
    writeDisk(ram);
  }

  function startHttpServer() {
    return new Promise((resolve, reject) => {
      const server = http.createServer((req, res) => {
        const u = new URL(req.url || "/", "http://127.0.0.1");
        if (u.pathname !== "/api/state") {
          res.writeHead(404);
          res.end();
          return;
        }
        if (req.method === "GET") {
          res.writeHead(200, { "Content-Type": "application/json" });
          res.end(JSON.stringify(getState()));
          return;
        }
        if (req.method === "PUT") {
          let body = "";
          req.on("data", (c) => {
            body += c;
          });
          req.on("end", () => {
            try {
              const parsed = JSON.parse(body);
              setState(parsed?.state ?? parsed);
              res.writeHead(200, { "Content-Type": "application/json" });
              res.end(JSON.stringify({ ok: true }));
            } catch {
              res.writeHead(400);
              res.end();
            }
          });
          return;
        }
        res.writeHead(405);
        res.end();
      });
      server.listen(0, "127.0.0.1", () => {
        const addr = server.address();
        if (!addr || typeof addr === "string") {
          reject(new Error("bind"));
          return;
        }
        resolve({ server, port: addr.port, baseUrl: `http://127.0.0.1:${addr.port}` });
      });
    });
  }

  return { getState, setState, startHttpServer };
}

module.exports = { createStateServer };
