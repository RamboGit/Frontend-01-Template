import {createElement, Text, Wrapper} from './createElement';

export class ListView {
    constructor(config){
        this.children = [];
        this.attributes = new Map();
        this.properties = new Map();
        this.state = Object.create(null);
    }
    render(){
        let data = this.getAttribute('data');
        return <div class="list-view" style="width:400px;">
        {
            data.map(this.children[0])
        }
        </div>;
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