const fs = require('fs');
const path = require('path');
const download = require('image-downloader');
const animeData = require('../../public/animeData.json');

const IMAGES_DIR = path.join(__dirname, '../../src/images/imagesFromAPI');

async function downloadImage(url, filename) {
    try {
        const fileExtension = url.split('.').pop();
        
        const options = {
            url: url,
            dest: path.join(IMAGES_DIR, `${filename}.${fileExtension}`)
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
        await downloadImage(anime.bannerImage, `banner_${anime.id}`);
        await downloadImage(anime.coverImage, `cover_${anime.id}`);
    }
}

main();
