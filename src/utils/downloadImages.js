const fs = require('fs');
const path = require('path');
const download = require('image-downloader');

const animeData = require('../../public/animeData.json');

const IMAGES_DIR = path.join(__dirname, '../../src/images/imagesFromAPI');

async function downloadImage(url, filename) {
  try {
    const options = {
      url: url,
      dest: path.join(IMAGES_DIR, filename),
    };
    const { filename: savedFile } = await download.image(options);
    console.log('Saved:', savedFile);
  } catch (error) {
    console.error('Error downloading image:', url, error.message);
  }
}

async function main() {
  if (!fs.existsSync(IMAGES_DIR)) {
    fs.mkdirSync(IMAGES_DIR);
  }

  for (const anime of animeData) {
    const bannerFilename = `banner_${anime.id}.jpg`;
    await downloadImage(anime.bannerImage, bannerFilename);

    const coverFilename = `cover_${anime.id}.jpg`;
    await downloadImage(anime.coverImage, coverFilename);
  }
}

main();
