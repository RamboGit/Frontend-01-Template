# 本周学习总结
## 一、浏览器排版与绘制
### 排版
#### 1.第一步：设置 flex 下元素属性的默认值

#### 2. 第二步：收集元素进行
* 分行: 
* 根据主轴尺寸，把元素分进 行
* 若设置了 no-wrap, 则强行分配进第一行

#### 3.第三步： 计算主轴方向
* 找出所有 Flex 元素
*  把主轴方向的剩余尺寸按比例分配给这些元素
*  若剩余空间为负数，所有 flex 元素为0，等比压缩剩余元素
#### 4. 第四步 计算交叉轴方向
* 根据每一行中最大元素尺寸计算行高
* 根据行高 flex-align 和 item-align,确定元素具体位置

### 绘制
#### 1. 第一步绘制单个元素
* 绘制需要依赖一个图形环境
* 这里采用 npm 包 images
* 绘制在一个 viewport 上进行
*  与绘制相关的属性： background-color、border、background-image等
 
 #### 2.第二步 绘制  DOM
* 递归调用子元素的绘制方法完成 DOM 树的绘制
* 忽略一些不需要绘制的节点
* 实际浏览器中，文字绘制是难点，需要依赖字体库，这里忽略
* 实际浏览器中，还会对一些图层做 compositing,这里也忽略了

## 二、重学CSS
### CSS 总体结构
    * @charset
    * @import
    * rules
        * @media
        * @page
        * rule
### CSS 分类
    * At-Rules
    * Rules
        * selector
        * declaration
            * key
                * properties
                * variables
            * value
        
    

