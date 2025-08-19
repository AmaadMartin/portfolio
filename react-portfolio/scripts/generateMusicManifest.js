/*
 Generates a manifest.json file listing all playable audio files in public/music.
 This runs before start/build so the client can fetch the manifest at runtime.
*/

const fs = require('fs');
const path = require('path');

const projectRoot = path.resolve(__dirname, '..');
const musicDir = path.join(projectRoot, 'public', 'music');
const manifestPath = path.join(musicDir, 'manifest.json');

const allowedExtensions = new Set(['.mp3', '.ogg', '.m4a', '.aac', '.wav', '.webm']);

function isPlayableAudio(fileName) {
  const ext = path.extname(fileName).toLowerCase();
  if (!allowedExtensions.has(ext)) return false;
  // Exclude hidden files and the manifest itself
  if (fileName.startsWith('.')) return false;
  if (fileName.toLowerCase() === 'manifest.json') return false;
  return true;
}

function generate() {
  if (!fs.existsSync(musicDir)) {
    fs.mkdirSync(musicDir, { recursive: true });
  }

  const files = fs
    .readdirSync(musicDir, { withFileTypes: true })
    .filter((d) => d.isFile())
    .map((d) => d.name)
    .filter(isPlayableAudio)
    .sort();

  const tracks = files.map((name) => ({
    fileName: name,
    url: `/music/${name}`,
  }));

  const manifest = {
    generatedAt: new Date().toISOString(),
    count: tracks.length,
    tracks,
  };

  fs.writeFileSync(manifestPath, JSON.stringify(manifest, null, 2));
  console.log(`Generated music manifest with ${tracks.length} track(s): ${manifestPath}`);
}

try {
  generate();
} catch (err) {
  console.error('Failed to generate music manifest:', err);
  process.exitCode = 1;
}


