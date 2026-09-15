const fs = require("fs");
const path = require("path");
const { spawnSync } = require("child_process");

const root = path.join(__dirname, "..");
const tmp = path.join(root, ".desktop-build");

const skipTop = new Set([
  "node_modules",
  ".next",
  "out",
  "dist-desktop",
  ".desktop-build",
  ".git",
  "electron",
  "bot",
  "data",
  "scripts",
]);

function shouldCopy(rel) {
  const n = rel.replace(/\\/g, "/");
  if (!n) return true;
  const top = n.split("/")[0];
  if (skipTop.has(top)) return false;
  if (n === ".env" || n.startsWith(".env.")) return false;
  if (n === "src/app/api" || n.startsWith("src/app/api/")) return false;
  return true;
}

function copyFiltered(from, to, rel = "") {
  const st = fs.statSync(from);
  if (st.isDirectory()) {
    fs.mkdirSync(to, { recursive: true });
    for (const name of fs.readdirSync(from)) {
      const r = rel ? path.join(rel, name) : name;
      if (!shouldCopy(r)) continue;
      copyFiltered(path.join(from, name), path.join(to, name), r);
    }
    return;
  }
  fs.copyFileSync(from, to);
}

function rmrf(p) {
  fs.rmSync(p, { recursive: true, force: true });
}

rmrf(tmp);
fs.mkdirSync(tmp, { recursive: true });
copyFiltered(root, tmp);

const nm = path.join(tmp, "node_modules");
fs.symlinkSync(path.join(root, "node_modules"), nm, "junction");

const env = {
  ...process.env,
  ELECTRON: "1",
  NEXT_PUBLIC_LOCAL_ONLY: "1",
  NEXT_PUBLIC_ELECTRON: "1",
  NEXT_TELEMETRY_DISABLED: "1",
};

const r = spawnSync("npx", ["next", "build"], {
  cwd: tmp,
  stdio: "inherit",
  env,
  shell: true,
});

if (r.status) process.exit(r.status || 1);

const outSrc = path.join(tmp, "out");
const outDst = path.join(root, "out");
if (!fs.existsSync(outSrc)) {
  console.error("desktop-build: Next did not produce out/");
  process.exit(1);
}

rmrf(outDst);
fs.cpSync(outSrc, outDst, { recursive: true });
console.log("desktop-build: wrote", outDst);
