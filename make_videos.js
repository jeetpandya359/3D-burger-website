import ffmpegPath from 'ffmpeg-static';
import { execSync } from 'child_process';
import fs from 'fs';
import path from 'path';

const publicDir = path.resolve('public');
const assetsDir = path.resolve('public/assets/videos');

if (!fs.existsSync(publicDir)) fs.mkdirSync(publicDir, { recursive: true });
if (!fs.existsSync(assetsDir)) fs.mkdirSync(assetsDir, { recursive: true });

console.log('Ffmpeg binary path:', ffmpegPath);

// Scenes configuration
const scenes = [
  {
    name: 'hero.mp4',
    inputPattern: 'first scene/ezgif-frame-%03d.jpg',
    fps: 30
  },
  {
    name: 'lift.mp4',
    inputPattern: 'second scene/ezgif-frame-%03d.jpg',
    fps: 30
  },
  {
    name: 'box.mp4',
    inputPattern: 'third scene/ezgif-frame-%03d.jpg',
    fps: 30
  }
];

for (const scene of scenes) {
  const rootOutput = path.join(publicDir, scene.name);
  const assetsOutput = path.join(assetsDir, scene.name);

  // Command to convert frame sequence to H.264 MP4 suitable for browser autoplay & smooth seeking
  const cmd = `"${ffmpegPath}" -y -framerate ${scene.fps} -i "${scene.inputPattern}" -c:v libx264 -pix_fmt yuv420p -vf "scale=trunc(iw/2)*2:trunc(ih/2)*2" "${rootOutput}"`;
  
  console.log(`Generating ${scene.name}...`);
  execSync(cmd, { stdio: 'inherit' });

  // Copy to assets output as well
  fs.copyFileSync(rootOutput, assetsOutput);
  console.log(`Saved ${scene.name} to public/ and public/assets/videos/`);
}

console.log('ALL VIDEOS GENERATED SUCCESSFULLY!');
