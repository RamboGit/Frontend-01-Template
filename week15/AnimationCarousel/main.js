import {createElement, Text, Wrapper} from './createElement';
import {Timeline, Animation} from './animation';
// import {Carousel} from './carousel.view';


class Carousel {
    constructor(config){
        this.children = [];
    }

    setAttribute(name, value) {
        this[name] = value;
    }

    appendChild(child){
        this.children.push(child);
    }

    addEventListener(type, handler, config) {
        document.addEventListener(...arguments);
    }

    render(){

        let children = this.data.map((url) => {
            let element = <img src={url}/>;
            element.addEventListener('dragstart', event => event.preventDefault());
            return element;
        });
        
         let root = <div class='carousel'>
             {children}
         </div>;

     

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
        /*
        render(){

        let children = this.data.map((url) => {
            let element = <img src={url}/>;
            element.addEventListener('dragstart', event => event.preventDefault());
            return element;
        });
        
         let root = <div class='carousel'>
             {children}
         </div>;

        let position = 0;
        let nextPic = () => {
            let current = children[position];
            let next = children[nextPosition];

            let nextPosition = (position + 1) % this.data.length;

            current.style.transition = 'ease 0s';
            next.style.transition = 'ease 0s';

            current.style.transform = `translateX(${- 100 * position}%)`;
            next.style.transform = `translateX(${100 - 100 * nextPosition}%)`;
            setTimeout(function () {
                current.style.transition = '';
                next.style.transition = '';

                current.style.transform = `translateX(${- 100 - 100 * position}%)`;
                next.style.transform = `translateX(${- 100 * nextPosition}%)`;
                //不会超出 this.data 的长度取余
                position = nextPosition;
            }, 16);

            setTimeout(nextPic, 3000);
        }
         setTimeout(nextPic, 3000);
          this.addEventListener("mousedown", event => {
            let startX = event.clientX, startY = event.clientY;

            let lastPosition = (position - 1 + this.data.length) % this.data.length;
            let nextPosition = (position + 1) % this.data.length;

            let current = children[position];
            let last = children[lastPosition];
            let next = children[nextPosition];

            current.style.transition = 'ease 0s';
            last.style.transition = 'ease 0s';
            next.style.transition = 'ease 0s';

            current.style.transform = `translateX(${- 500 * position}px)`;
            last.style.transform = `translateX(${- 500 - 500 * lastPosition}px)`;
            next.style.transform = `translateX(${500 - 500 * nextPosition}px)`;


            let move = event => {
                let current = children[position];

                current.style.transition = 'ease 0s';

                current.style.transform = `translateX(${event.clientX - startX - 500 * position}px)`;
                last.style.transform = `translateX(${event.clientX - startX - 500 - 500 * lastPosition}px)`;
                next.style.transform = `translateX(${event.clientX - startX + 500 - 500 * nextPosition}px)`;
                console.log(event.clientX - startX, event.clientX - startY);
            };
            let up = event => {
                //拖过一半改变当前显示图片内容
                let offset = 0;

                if (event.clientX - startX > 250) {
                    offset = 1;
                } else if (event.clientX - startX < -250) {
                    offset = -1;
                }

                current.style.transition = '';  //打开动画效果
                last.style.transition = '';
                next.style.transition = '';

                current.style.transform = `translateX(${offset * 500 - 500 * position}px)`;
                last.style.transform = `translateX(${offset * 500 - 500 - 500 * lastPosition}px)`;
                next.style.transform = `translateX(${offset * 500 + 500 - 500 * nextPosition}px)`;

                position = (position - offset + this.data.length) % this.data.length;

                document.removeEventListener("mousemove", move);
                document.removeEventListener("mouseup", up);
            };
            document.addEventListener("mousemove", move);
            document.addEventListener("mouseup", up);
        }); 
         return root;
    }
    */
     

    mountTo(parent){
        this.render().mountTo(parent)
    }

}

// let component = new Carousel();
let component = <Carousel data= {[
    "https://static001.geekbang.org/resource/image/bb/21/bb38fb7c1073eaee1755f81131f11d21.jpg",
    "https://static001.geekbang.org/resource/image/1b/21/1b809d9a2bdf3ecc481322d7c9223c21.jpg",
    "https://static001.geekbang.org/resource/image/b6/4f/b6d65b2f12646a9fd6b8cb2b020d754f.jpg",
    "https://static001.geekbang.org/resource/image/73/e4/730ea9c393def7975deceb48b3eb6fe4.jpg",
]}/> 
    
component.mountTo(document.body);