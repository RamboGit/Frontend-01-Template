import {createElement, Text, Wrapper} from './createElement';

export class TabPanel {
    constructor(config){
        this.children = [];
        this.attributes = new Map();
        this.properties = new Map();
        this.state = Object.create(null);
    }

    render(){

        this.childViews = this.children.map(child => <div style="width: 400px; min-height: 300px;">{child}</div>)
    this.titleViews = this.children.map((child, i) => <div onClick={() => this.select(i)}  style="width: 100px; min-height: 45px; background-color:#f0f0f0; display:inline-block;">{child.getAttribute('title') || " "}</div>)

        setTimeout(() => this.select(0), 16);

        return <div class="TabPanel" style="border: solid 1px lightgreen; width:400px;">
            <h1 style="background-color:lightgreen; width: 400px; margin:0;">{this.titleViews}</h1>
           <div >
           {this.childViews}
           </div>
        </div>;
   }


   select(i) {
    for(let view of this.childViews) {
        view.style.display = 'none';
    }
    this.childViews[i].style.display = "";

    for(let view of this.titleViews) {
        view.classList.remove('selected');
    }
    this.titleViews[i].classList.add('selected');
    // this.titleViews.innerText = this.children[i].title;
}

    setAttribute(name, value) {
        this[name] = value;
    }

    getAttribute(name) {
      return  this[name];
    }

    appendChild(child){
        this.children.push(child);
    }

  

    addEventListener(type, handler, config) {
        document.addEventListener(...arguments);
    }

    get classList() {
        return this.root.classList;
    }
        
    mountTo(parent){
        this.render().mountTo(parent)
    }

}