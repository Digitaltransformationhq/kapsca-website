// Prepares out/ for upload to Hostinger, then packs it into kapsca-site.zip.
//
// Two things this exists to prevent, both of which have already broken a deploy:
//   1. `.htaccess` lives outside out/ (the build wipes out/), so it must be
//      copied back in every time — without it there's no HTTPS redirect or 404.
//   2. Windows' Compress-Archive writes zip entries with BACKSLASH separators,
//      which Linux extractors (Hostinger's File Manager) don't read as folders —
//      every nested file, i.e. all of _next/, silently vanishes on extract.
//      We build the zip here with forward slashes instead.

import { spawn } from "node:child_process";
import { copyFile, rm, stat } from "node:fs/promises";
import { join, resolve } from "node:path";

const root = resolve(import.meta.dirname, "..");
const out = join(root, "out");
const zipPath = join(root, "..", "kapsca-site.zip");

// Old hero image + Next.js starter icons — shipped by public/, referenced by nothing.
const PRUNE = [
  "hero.png",
  "globe.svg",
  "next.svg",
  "vercel.svg",
  "window.svg",
  "file.svg",
  "earth-connections.lottie",
  "earth-connections.lottie.bak",
];

async function main() {
  await stat(out).catch(() => {
    throw new Error("out/ not found — run `next build` first.");
  });

  for (const f of PRUNE) {
    await rm(join(out, f), { force: true });
  }

  await copyFile(join(root, "deploy", ".htaccess"), join(out, ".htaccess"));
  console.log("postbuild: pruned unused assets, copied .htaccess");

  await rm(zipPath, { force: true });

  // .NET's ZipArchive, driven from PowerShell. We write each entry name
  // ourselves with forward slashes — see the header comment for why.
  const ps = `
Add-Type -AssemblyName System.IO.Compression
Add-Type -AssemblyName System.IO.Compression.FileSystem
$src = '${out}'
$zip = [System.IO.Compression.ZipFile]::Open('${zipPath}', 'Create')
try {
  foreach ($f in Get-ChildItem -Path $src -Recurse -File -Force) {
    $rel = $f.FullName.Substring($src.Length + 1).Replace('\\', '/')
    [System.IO.Compression.ZipFileExtensions]::CreateEntryFromFile(
      $zip, $f.FullName, $rel, [System.IO.Compression.CompressionLevel]::Optimal
    ) | Out-Null
  }
} finally { $zip.Dispose() }
`;

  await new Promise((res, rej) => {
    const child = spawn(
      "powershell",
      ["-NoProfile", "-NonInteractive", "-Command", ps],
      { stdio: ["ignore", "inherit", "inherit"] },
    );
    child.on("error", rej);
    child.on("exit", (code) =>
      code === 0 ? res() : rej(new Error(`zip failed (exit ${code})`)),
    );
  });

  const { size } = await stat(zipPath);
  console.log(
    `postbuild: wrote ${zipPath} (${(size / 1024 / 1024).toFixed(1)} MB)`,
  );
}

main().catch((err) => {
  console.error(err.message);
  process.exit(1);
});
