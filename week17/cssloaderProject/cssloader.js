let css = require('css');
module.exports = function(source, map) {

    var obj = css.parse(source);
    let classname = this.resourcePath.match(/([^/]+).css$/)[1];
    console.log(classname);
    for(let rule of obj.stylesheet.rules) {
        
        rule.selectors = rule.selectors.map(selector => 
            selector.match(new RegExp(`^.${classname}`)) ? selector :
            `.${classname} ${selector}`);
        console.log(rule.selectors);
    }

    return `let style = document.createElement('style');
    style.innerHTML = ${JSON.stringify(css.stringify(obj))};
    document.head.appendChild(style);`;
    
}