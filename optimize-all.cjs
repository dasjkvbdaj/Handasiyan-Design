const sharp = require('sharp');
const fs = require('fs');
const path = require('path');
const { globSync } = require('glob');

const targetDir = 'public/portfolio_images';

// 1. Search for EVERYTHING including .webp
const files = globSync(`${targetDir}/**/*.{jpg,jpeg,png,webp,tiff}`);

if (files.length === 0) {
    console.log("✨ No images found in the target directory.");
    process.exit(0);
}

console.log(`🚀 Found ${files.length} images. Starting Extreme Re-Optimization...`);

files.forEach(async (file) => {
    const ext = path.extname(file);
    // We force the final extension to be .webp
    const finalPath = file.replace(ext, '.webp');
    const tempPath = file.replace(ext, `.temp_${Date.now()}.webp`);

    try {
        // 2. Process the image and save to a TEMP file first
        await sharp(file)
            .resize({ width: 1920, withoutEnlargement: true })
            .webp({
                quality: 70,
                effort: 6,
                smartSubsample: true,
                minSize: true
            })
            .toFile(tempPath);

        // 3. Delete the original file (whether it was .jpg or an old .webp)
        if (fs.existsSync(file)) {
            fs.unlinkSync(file);
        }

        // 4. Rename the temp file to the final name (image-1.webp)
        fs.renameSync(tempPath, finalPath);

        console.log(`✅ Re-Optimized: ${path.basename(file)} -> .webp`);
    } catch (err) {
        console.error(`❌ Failed to process ${file}:`, err);
        // Clean up temp file if it was created but failed
        if (fs.existsSync(tempPath)) fs.unlinkSync(tempPath);
    }
});