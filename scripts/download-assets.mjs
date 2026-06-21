/**
 * Downloads 6 UNIQUE verified marble slabs + 6 UNIQUE matching interiors.
 * Every URL was visually verified — center = marble texture ONLY, never rooms.
 *
 * Run: npm run assets
 */
import fs from "fs";
import path from "path";
import { fileURLToPath } from "url";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const root = path.join(__dirname, "..", "public");

const SLAB = "&w=900&h=1350&fit=crop";
const BG = "&w=1920&h=1280&fit=crop";

/** 6 unique marble PRODUCT textures (center only) */
const marbles = {
  "white-onyx.jpg":
    "https://images.pexels.com/photos/1323712/pexels-photo-1323712.jpeg?auto=compress&cs=tinysrgb" + SLAB,
  "calacatta-gold.jpg":
    "https://images.pexels.com/photos/1101122/pexels-photo-1101122.jpeg?auto=compress&cs=tinysrgb" + SLAB,
  "black-marble.jpg":
    "https://images.pexels.com/photos/450055/pexels-photo-450055.jpeg?auto=compress&cs=tinysrgb" + SLAB,
  "pietra-beige.jpg":
    "https://images.pexels.com/photos/6788339/pexels-photo-6788339.jpeg?auto=compress&cs=tinysrgb" + SLAB,
  "green-marble.jpg":
    "https://images.unsplash.com/photo-1532644440111-bc94f97955c1?q=90" + SLAB,
  "statuario.jpg":
    "https://images.pexels.com/photos/2341290/pexels-photo-2341290.jpeg?auto=compress&cs=tinysrgb" + SLAB,
};

/** 6 unique luxury interiors — each uses marble, none reused as a slab */
const backgrounds = {
  "hotel-white.jpg":
    "https://images.pexels.com/photos/6444256/pexels-photo-6444256.jpeg?auto=compress&cs=tinysrgb" + BG,
  "hotel-gold.jpg":
    "https://images.pexels.com/photos/6492398/pexels-photo-6492398.jpeg?auto=compress&cs=tinysrgb" + BG,
  "hotel-black.jpg":
    "https://images.pexels.com/photos/3315291/pexels-photo-3315291.jpeg?auto=compress&cs=tinysrgb" + BG,
  "hotel-beige.jpg":
    "https://images.pexels.com/photos/6585757/pexels-photo-6585757.jpeg?auto=compress&cs=tinysrgb" + BG,
  "hotel-green.jpg":
    "https://images.pexels.com/photos/7045913/pexels-photo-7045913.jpeg?auto=compress&cs=tinysrgb" + BG,
  "hotel-statuario.jpg":
    "https://images.pexels.com/photos/6585764/pexels-photo-6585764.jpeg?auto=compress&cs=tinysrgb" + BG,
};

async function download(url, dest) {
  const res = await fetch(url, { headers: { "User-Agent": "Mozilla/5.0 LuxMarble" } });
  if (!res.ok) throw new Error(`${url} -> ${res.status}`);
  const buf = Buffer.from(await res.arrayBuffer());
  const type = res.headers.get("content-type") || "";
  if (!type.startsWith("image/")) throw new Error(`${path.basename(dest)}: not an image (${type})`);
  if (buf.length < 8000) throw new Error(`${path.basename(dest)}: file too small (${buf.length} bytes)`);
  fs.writeFileSync(dest, buf);
  console.log(`OK ${path.basename(dest)} (${(buf.length / 1024) | 0} KB)`);
}

async function main() {
  for (const dir of ["marbles", "backgrounds", "textures"]) {
    fs.mkdirSync(path.join(root, dir), { recursive: true });
  }

  console.log("\n--- Marble slabs (center) ---");
  for (const [name, url] of Object.entries(marbles)) {
    await download(url, path.join(root, "marbles", name));
  }

  console.log("\n--- Matching interiors (background) ---");
  for (const [name, url] of Object.entries(backgrounds)) {
    await download(url, path.join(root, "backgrounds", name));
  }

  for (const name of Object.keys(marbles)) {
    fs.copyFileSync(path.join(root, "marbles", name), path.join(root, "textures", name));
  }

  const all = [...Object.keys(marbles), ...Object.keys(backgrounds)];
  if (new Set(all).size !== all.length) throw new Error("Duplicate filenames detected!");

  console.log("\n12 unique assets ready (6 slabs + 6 interiors).");
}

main().catch((e) => {
  console.error(e);
  process.exit(1);
});
