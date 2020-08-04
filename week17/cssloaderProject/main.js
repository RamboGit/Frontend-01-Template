import {createElement, Text, Wrapper} from './createElement';
// import {Timeline, Animation} from './animation';
import {Carousel} from './Carousel';
import {Panel} from './Panel.js';
import {TabPanel} from './TabPanel.js';
import {ListView} from './ListView';

// import {Carousel} from './carousel.view';

let component = <Carousel data= {[
    "https://static001.geekbang.org/resource/image/bb/21/bb38fb7c1073eaee1755f81131f11d21.jpg",
    "https://static001.geekbang.org/resource/image/1b/21/1b809d9a2bdf3ecc481322d7c9223c21.jpg",
    "https://static001.geekbang.org/resource/image/b6/4f/b6d65b2f12646a9fd6b8cb2b020d754f.jpg",
    "https://static001.geekbang.org/resource/image/73/e4/730ea9c393def7975deceb48b3eb6fe4.jpg",
]}/>
component.mountTo(document.body);

/* let panel = <TabPanel title="this is my panel">
    <span title="title1">This is content1</span>
    <span title="title2">This is content2</span>
    <span title="title3">This is content3</span>
    <span title="title4">This is content4</span>
</TabPanel>
panel.mountTo(document.body);
window.panel = panel; */

/* let data = data= [
    {title: '蓝猫', url:"https://static001.geekbang.org/resource/image/bb/21/bb38fb7c1073eaee1755f81131f11d21.jpg"},
    {title: '橘猫加白', url:"https://static001.geekbang.org/resource/image/1b/21/1b809d9a2bdf3ecc481322d7c9223c21.jpg"},
    {title: '狸猫加白', url:"https://static001.geekbang.org/resource/image/b6/4f/b6d65b2f12646a9fd6b8cb2b020d754f.jpg"},
    {title: '橘猫', url:"https://static001.geekbang.org/resource/image/73/e4/730ea9c393def7975deceb48b3eb6fe4.jpg"},
]; 
let list = <ListView data={data}>
{ record => <figure>
    <img src={record.url} style="width: 300px; height: 200px;"/>
    <figcaption>{record.title}</figcaption>
</figure>}
</ListView>;
list.mountTo(document.body); */