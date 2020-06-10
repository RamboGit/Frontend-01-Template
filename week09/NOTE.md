# Week09周总结
## 1.本周 CSS部分总结
- CSS 属性中有不少未见过和未使用的过的属性，需要其他时间补充一下
- CSS 中SVG内容接触的过少，未掌握
### transition属性内容
```
transition-property 要变换的属性
transition-duration 变换时长
transition-timing-function(时间曲线) : <timing-funciton>
    <timing-funciton>(<easing funciton>) = linear | <cubic-bezier-easing-function> | <step-easing-funciton>
        <cubic-bezier-easing-funciton>(三次贝塞尔曲线):ease | ease-in | ease-out | ease-in-out | cubic-bezier(<number>, <number>,<number>, <number>)
            ease = cubic-bezier(0.25, 0.1, 0.25, 1)
            ease-in = cubic-bezier(0.42, 0, 1, 1)
            ease-out = cubic-bezier(0, 0, 0.58, 1)
            ease-in-out = cubic-bezier(0.42, 0, 0.58, 1)
            cubic-bezier(x1,y1,x2,y2)
transition-delay 延迟
div {
    transition: <property> <duration> <timing-funciton> <delay>;
}
```
## 2. 本周 HTML 部分总结
- 标签语义内容不熟悉，对标签理解程度不够，不能在实际场景合理运用语义标签
    **注： HTML框架图总结了部分内容**

