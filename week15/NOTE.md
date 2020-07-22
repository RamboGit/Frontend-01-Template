# 完善 component
## 通过 animation.js组件实现的 Carousel 功能如下：
- 轮播图片定时轮播
- 轮播组件通过手势可左右滑动
-  解决自动轮播与手势滑动冲突问题
- 修改后的文件地址：[main.js](https://github.com/RamboGit/Frontend-01-Template/blob/master/week15/AnimationCarousel/main.js)

### 定时轮播修改后主要代码如下：
```
let position = 0;
let linear = t => t;
var timeId = null;

//运用 animation组件修改 carousel
let nextPic = ()=> {
    let tl = new Timeline();
    let nextPosition = (position + 1) % this.data.length;
    //获取第一个图片
    let current = children[position];
    let next = children[nextPosition];

    tl.add(new Animation(current.style, 'transform', - 100 * position, - 100 - 100 * position, 1000, 0, linear, v => `translateX(${v}%)`));
    tl.add(new Animation(next.style, 'transform', 100 - 100 * nextPosition, -100 * nextPosition, 1000, 0, linear, v => `translateX(${v}%)`));
    tl.start();

    position = nextPosition;
    
    timeId = setTimeout(nextPic, 3000);
}
nextPic();
```

### 手势滑动修改后主要代码如下：
```
this.addEventListener('mousedown', event =>{
        //手动滑动轮播时停掉自动轮播setTimeout
        clearTimeout(timeId);

        let tl = new Timeline();
        
        let startX = event.clientX, startY = event.clientY;

        let lastPosition = (position - 1 + this.data.length) % this.data.length;
        let nextPosition = (position + 1) % this.data.length;

        let current = children[position];
        let last = children[lastPosition];
        let next = children[nextPosition];

        let currentAnimation = new Animation(current.style, 'transform', - 500 * position,  - 500 * position,  0, 0, linear, v => `translateX(${v}px)`);
        let lastAnimation = new Animation(last.style, 'transform', - 500 - 500 * lastPosition, - 500 - 500 * lastPosition,  0, 0, linear, v => `translateX(${v}px)`);
        let nextAnimation = new Animation(next.style, 'transform', 500 - 500 * nextPosition, 500 - 500 * nextPosition,  0, 0, linear, v => `translateX(${v}px)`);
        
        tl.add(currentAnimation);
        tl.add(lastAnimation);
        tl.add(nextAnimation);
        tl.start();

        let move = event => {
            let timeline = new Timeline();

            let currentAnimation = new Animation(current.style, 'transform', - 500 * position, event.clientX - startX - 500 * position,  0, 0, linear, v => `translateX(${v}px)`);
            let lastAnimation = new Animation(last.style, 'transform', - 500 - 500 * lastPosition, event.clientX - startX - 500 - 500 * lastPosition,  0, 0, linear, v => `translateX(${v}px)`);
            let nextAnimation = new Animation(next.style, 'transform', 500 - 500 * nextPosition, event.clientX - startX + 500 - 500 * nextPosition,  0, 0, linear, v => `translateX(${v}px)`);
            
            timeline.add(currentAnimation);
            timeline.add(lastAnimation);
            timeline.add(nextAnimation);
            timeline.start();
        }

        let up = event => {
            let timeline = new Timeline();

            let offset = 0;
            if(event.clientX - startX > 250) {
                offset = 1;
            }else if(event.clientX - startX < -250) {
                offset = -1;
            }

            let currentAnimation = new Animation(current.style, 'transform', event.clientX - startX - 500 * position, offset * 500 - 500 * position,  500, 0, linear, v => `translateX(${v}px)`);
            let lastAnimation = new Animation(last.style, 'transform', event.clientX - startX - 500 - 500 * lastPosition, offset * 500 - 500 - 500 * lastPosition,  500, 0, linear, v => `translateX(${v}px)`);
            let nextAnimation = new Animation(next.style, 'transform', event.clientX - startX + 500 - 500 * nextPosition, offset * 500 + 500 - 500 * nextPosition,  500, 0, linear, v => `translateX(${v}px)`);
            
            timeline.add(currentAnimation);
            timeline.add(lastAnimation);
            timeline.add(nextAnimation);
            timeline.start();

            position = (position - offset + this.data.length) % this.data.length;

            document.removeEventListener("mousemove", move);
            document.removeEventListener("mouseup", up);
            //启用自动播放轮播
            setTimeout(nextPic, 1000); 
        }
        document.addEventListener("mousemove", move);
        document.addEventListener("mouseup", up);
    });
    return root;
}
```

### 解决手势与定时轮播冲突问题思路：
*监听点击事件状态：*
1. 'mousedown'状态下获取定时任务 id，clear掉定时任务。
2. 'mouseup'状态下重新启动 nexpic，需延迟开启，防止 与 'mouseup'下的动画冲突造成展示效果不佳。
