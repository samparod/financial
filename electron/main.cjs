const { app, BrowserWindow, ipcMain, shell, Menu } = require("electron");
const http = require("http");
const fs = require("fs");
const path = require("path");
const { createStateServer } = require("./state-server.cjs");

const MIME = {
  ".html": "text/html; charset=utf-8",
  ".js": "application/javascript; charset=utf-8",
  ".css": "text/css; charset=utf-8",
  ".json": "application/json",
  ".png": "image/png",
  ".svg": "image/svg+xml",
  ".ico": "image/x-icon",
  ".woff": "font/woff",
  ".woff2": "font/woff2",
  ".txt": "text/plain",
};

function stateFile() {
  return path.join(app.getPath("userData"), "istiqrar-state.json");
}

function createMenu() {
  Menu.setApplicationMenu(
    Menu.buildFromTemplate([
      {
        label: "ملف",
        submenu: [
          {
            label: "فتح مجلد البيانات",
            click: () => shell.openPath(app.getPath("userData")),
          },
          { type: "separator" },
          { role: "quit", label: "خروج" },
        ],
      },
      {
        label: "عرض",
        submenu: [
          { role: "reload", label: "تحديث" },
          { role: "toggleDevTools", label: "أدوات المطور" },
          { type: "separator" },
          { role: "resetZoom", label: "حجم عادي" },
          { role: "zoomIn", label: "تكبير" },
          { role: "zoomOut", label: "تصغير" },
        ],
      },
    ])
  );
}

function startStaticServer(root) {
  return new Promise((resolve, reject) => {
    const server = http.createServer((req, res) => {
      try {
        const u = new URL(req.url || "/", "http://127.0.0.1");
        let rel = decodeURIComponent(u.pathname);
        if (rel.endsWith("/")) rel += "index.html";
        const ext = path.extname(rel);
        if (!ext) rel = path.join(rel, "index.html");
        const file = path.normalize(path.join(root, rel.replace(/^[/\\]+/, "")));
        if (!file.startsWith(path.normalize(root))) {
          res.writeHead(403);
          res.end();
          return;
        }
        fs.readFile(file, (err, data) => {
          if (err) {
            fs.readFile(path.join(root, "index.html"), (e2, index) => {
              if (e2) {
                res.writeHead(404);
                res.end("Not found");
                return;
              }
              res.writeHead(200, { "Content-Type": MIME[".html"] });
              res.end(index);
            });
            return;
          }
          res.writeHead(200, { "Content-Type": MIME[path.extname(file)] || "application/octet-stream" });
          res.end(data);
        });
      } catch {
        res.writeHead(500);
        res.end();
      }
    });
    server.listen(0, "127.0.0.1", () => {
      const addr = server.address();
      if (!addr || typeof addr === "string") {
        reject(new Error("bind"));
        return;
      }
      resolve({ server, url: `http://127.0.0.1:${addr.port}/` });
    });
  });
}

async function createWindow() {
  createMenu();
  const win = new BrowserWindow({
    width: 1280,
    height: 840,
    minWidth: 900,
    minHeight: 600,
    title: "استقرار COD",
    backgroundColor: "#070b14",
    webPreferences: {
      preload: path.join(__dirname, "preload.cjs"),
      contextIsolation: true,
      nodeIntegration: false,
      sandbox: true,
    },
  });

  if (process.env.ELECTRON_DEV === "1") {
    await win.loadURL("http://127.0.0.1:3070");
    return;
  }

  const root = app.isPackaged
    ? path.join(process.resourcesPath, "out")
    : path.join(__dirname, "..", "out");
  const { url } = await startStaticServer(root);
  await win.loadURL(url);
}

app.whenReady().then(async () => {
  const stateApi = createStateServer({
    stateFile,
    getDefault: () => null,
  });

  ipcMain.handle("state:load", () => {
    const s = stateApi.getState();
    if (!s) return null;
    return {
      app: "stability-cod",
      version: 1,
      exportedAt: new Date().toISOString(),
      state: s,
    };
  });
  ipcMain.handle("state:save", (_e, data) => {
    stateApi.setState(data);
  });
  ipcMain.handle("state:dir", () => app.getPath("userData"));

  let apiPort = 0;
  try {
    const r = await stateApi.startHttpServer();
    apiPort = r.port;
  } catch {
    apiPort = 0;
  }
  ipcMain.handle("state:apiPort", () => apiPort);

  return createWindow();
});

app.on("window-all-closed", () => {
  app.quit();
});
