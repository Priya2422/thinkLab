const fs = require('fs');

async function base64ToFile(base64String, filePath) {
// console.log(base64String);
    const buffer = Buffer.from(base64String, 'base64');

    await fs.writeFile(filePath, buffer, (err) => {
        if (err) {
            console.error('Error writing file:', err);
        } else {
            console.log('File saved successfully:', filePath);
        }
    });
}
module.exports=base64ToFile;