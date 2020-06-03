# 周总结
##  一、CSS语法
### 1. Selector 
#### 1.1 Simple selectors 简单选择器
- type selector 如：div
- Universal selector 通用选择器：*
- attribute selectors
- Class selectors
- ID selector
- Pseudo-classes 伪类选择器
- Pseudo-elements 伪元素选择器
#### 1.2 Selector Grammar 选择器语法
- <复合选择器>
  - <简单选择器><简单选择器><简单选择器>
  - '*' 或者 div 必须写在最前面
- 复杂选择器
  - <复合选择器><sp><复合选择器>
  - <复合选择器>">"<复合选择器>
  - <复合选择器>"~"<复合选择器>
  - <复合选择器>"+"<复合选择器>
  - <复合选择器>"||"<复合选择器>
#### 1.3 选择器优先级
- 优先级计算规则根据[x, a, b, c]计算如下：
   - x 表示内联样式优先级为最高优先级
   - a 表示#id 类选择器
   - b 表示.class, [attr='value'], :psedo-classes 
   - c 表示 类型选择器， ::pseudo-elements
**注:(:not())该选择器不算伪类选择器。(Selectors inside the negation pseudo-class are counted like any other, but the negation itself does not count as a pseudo-class.**
#### 1.4 combinators
  - sp(空格)
  - '>'
  - '+'
  - '~'
### 2. Pseudo-classes 伪类
- **Linguistic 语言伪类**
     * :dir()
     * :lang()
-  **Location 伪类**
  * :any-link
  * :link
  * :visited
  * :local-link
  * :target
  * :target-within
  * :scope
- **User Action 伪类**
  * :hover
  * :active
  * :focus
  * :focus-visible
  * :focus-within
- **Time-dimensional 伪类**
  * :current
  * :past
  * :future
- **Resourse State 伪类**
  * :playing
  * :paused
- **Input 伪类**
- **Tree-structural 伪类**
  * :root
  * :empty
  * :nth-child()
  * :first-child
  * :last-child
  * :only-child
  * nth-of-type()
  * nth-last-of-type()
  * first-of-type
  * last-of-type
  * only-of-type
### 3. Pseudo-elements 伪元素
  - ::first-line
  - ::first-letter
  - ::before
  - ::after
### 4. 参考地址
[selector-3](https://www.w3.org/TR/selectors-3/#grammar)
[selector-4](https://www.w3.org/TR/selectors-4/#pseudo-element)
## 二、CSS 排版
### 1. tag标签、element元素、box盒表示含义
 - 标签：源代码中的内容
- 元素：语义中表示的内容
- 盒：内容的表现
### 2. Box Model 盒模型
- content
- padding
- border
- margin
#### box-sizing: 
- content-box:  (default属性）
  该属性下，盒的 width 和 height 只包含 content box的大小，不包含padding/border/margin,
  即如下结果：
  - width = content-width;
  - height = content-height;
- border-box： 
  该属性下，盒的 width 和 height 包含 content box/padding/border的大小，不包含margin
  即如下结果：
  - width = content-width + padding-left-width+ padding-right-width + border-left-width + border-right-width
  - height = content-height + padding-top-width + padding-bottom-width + border-top-width + border-bottom-width
### 3. visual formatting model 视觉格式化模型[参考地址](https://www.w3.org/TR/2011/REC-CSS2-20110607/visuren.html)
#### 3.1 正常流 Normal flow
 ##### 正常流排版
   - 收集盒进行
   - 计算盒在行中的排布
   - 计算行的排布
##### Block formatting contexts(BFC)
**margin 折叠（collapsing margins）**[参考地址](https://www.w3.org/TR/2011/REC-CSS2-20110607/box.html#box-model)
**margin 折叠只可能发生在 BFC 中！**
##### Inline formatting contexts(IFC)
##### Relative positioning
#### 3.2 Floats
#### 3.3 Absolute positioning
 ##### fixed positioning
#### 3.4 Layered presentation
### 4. display 的取值（[display 取值参考](https://www.w3.org/TR/2020/CR-css-display-3-20200519/)）
<display-outside>  = block | inline | run-in
<display-inside>   = flow | flow-root | table | flex | grid | ruby
<display-listitem> = <display-outside>? && [ flow | flow-root ]? && list-item
<display-internal> = table-row-group | table-header-group |
                     table-footer-group | table-row | table-cell |
                     table-column-group | table-column | table-caption |
                     ruby-base | ruby-text | ruby-base-container |
                     ruby-text-container
<display-box>      = contents | none
<display-legacy>   = inline-block | inline-table | inline-flex | inline-grid
### 5. 相关术语
- **block container**
  A block container either contains only inline-level boxes participating in an inline formatting context, or contains only block-level boxes participating in a block formatting context.
  要么只包含行内格式上下文中的内联级盒，要么只包含块级格式上下文中的块级盒。
- **block box**
在一般情况下，一个块级盒也是一个 block container。特殊情况如：display:flex 则为 flex container.
- **formatting context**
- **independent formatting context** 独立格式上下文
- **block formatting context**([参考地址](https://www.w3.org/TR/CSS2/visuren.html#normal-flow))
- **inline formatting context**([参考地址](https://www.w3.org/TR/CSS2/visuren.html#normal-flow))
### 6. Flex
#### 6.1 Flex 排版
- 收集盒进行
- 计算盒在主轴方向的排布
- 计算盒在交叉方向的排布
##### 6.2 分行
- 根据主轴尺寸，把元素分进行
- 若设置了 no-wrap, 则强行分配进第一行
##### 6.3 计算主轴方向
- 找到所有 Flext 元素
- 把主轴方向的剩余尺寸按比例分配给这些元素
- 若剩余空间为负数，所有 flex 元素为0，等比压缩剩余元素
##### 计算交叉轴方向
- 根据每一行中最大元素尺寸计算行高
- 根据行高 flex-align和 item-align 确定元素具体位置
