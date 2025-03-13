/*
 * @LastEditTime: 2025-03-13 18:53:55
 * @Description: 
 */
const fs = require('fs');
const path = require('path');
const Spritesmith = require('spritesmith');

// 图片路径
const imageFolder = path.resolve(__dirname, '../src/image');
const images = fs.readdirSync(imageFolder)
    .filter(file => path.extname(file).toLowerCase() === '.png')
    .map(fileName => path.join(imageFolder, fileName))

// 生成雪碧图
Spritesmith.run({
    src: images,
    padding: 0,
    algorithm: 'left-right'
}, (err, result) => {
  if (err) {
    console.error(err);
    return;
  }

  // 输出雪碧图
  fs.writeFileSync(path.resolve(__dirname, 'sprite.png'), result.image);

  // 输出CSS
  const coordinates = result.coordinates;
  const css = Object.keys(coordinates).map(name => {
    const { x, y, width, height } = coordinates[name];
    return `.${path.basename(name, '.png')} {
  background-image: url('sprite.png');
  background-position: -${x}px -${y}px;
  width: ${width}px;
  height: ${height}px;
}`;
  }).join('\n');

  fs.writeFileSync(path.resolve(__dirname, 'sprite.css'), css);

  console.log('雪碧图生成成功！');
});