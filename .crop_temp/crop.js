const sharp = require('sharp');
const fs = require('fs');
const path = require('path');

const dir = path.resolve(__dirname, '../public/images');
const files = fs.readdirSync(dir).filter(f => /\.(jpg|jpeg|png|webp)$/i.test(f));

(async () => {
    for (const file of files) {
        const filePath = path.join(dir, file);
        const tempPath = path.join(dir, 'temp_' + file);
        
        try {
            const metadata = await sharp(filePath).metadata();
            const minSize = Math.min(metadata.width, metadata.height);
            
            await sharp(filePath)
                .resize({
                    width: minSize,
                    height: minSize,
                    fit: sharp.fit.cover,
                    position: sharp.strategy.entropy
                })
                .toFile(tempPath);
                
            fs.unlinkSync(filePath);
            fs.renameSync(tempPath, filePath);
            console.log(`Đã cắt ảnh: ${file} (Kích thước: ${minSize}x${minSize})`);
        } catch (err) {
            console.error(`Lỗi khi xử lý ${file}:`, err);
        }
    }
    console.log('Hoàn thành cắt ảnh!');
})();
