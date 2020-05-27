/** 绘制
 * 第一步绘制单个元素
 *      绘制需要依赖一个图形环境
 *      这里采用 npm 包 images
 *      绘制在一个 viewport 上进行
 *      与绘制相关的属性： background-color、border、background-image等
 * 
 * 第二步 绘制  DOM
 *      递归调用子元素的绘制方法完成 DOM 树的绘制
 *      忽略一些不需要绘制的节点
 *      实际浏览器中，文字绘制是难点，需要依赖字体库，这里忽略
 *      实际浏览器中，还会对一些图层做 compositing,这里也忽略了
 * 
*/
const images = require('images');

function render(viewport, element) {
    if (element.style) {
        let img = images(element.style.width, element.style.height);
        if(element.style["background-color"]) {
            let color = element.style['background-color'] || "rgb(0,0,0)";
            color.match(/rgb\((\d+),(\d+),(\d+)\)/);
            img.fill(Number(RegExp.$1), Number(RegExp.$2), Number(RegExp.$3), 1);
            viewport.draw(img, element.style.left || 0, element.style.top || 0);
        }
    }
    if(element.children) {
        for(let child of element.children) {
            render(viewport, child);
        }
    }
}

module.exports = render;