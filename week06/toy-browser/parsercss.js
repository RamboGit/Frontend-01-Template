/** 
 * 第一步：收集 CSS 规则
 *  遇到 style 标签时，把 CSS规则保存起来
 *  调用 CSS Parser 来分析 CSS 规则
 *  要仔细研究此库分析 CSS规则的格式
 * 
 * 第二步: 添加调用
 *  当我们创建一个元素后，立即计算 CSS
 *  理论上，当我们分析一个元素时，所有 CSS 规则已经收集完毕
 *  在真实浏览器中，可能遇到写在 body 的 style 标签，需要重新 CSS 计算的情况，这里我们忽略
 *  重排必然造成重绘，重新计算 CSS必然会重排
 * 
 * 第三步：获取父元素序列
 *  在 computeCSS 函数中，必须知道元素的所有父元素才能判断元素与规则是否匹配
 *  从上一步的 stack，可以获取本元素所有的父元素
 *  我们首先获取的是"当前元素",所以我们获得和计算父元素匹配的顺序是从内向外
 * 
 * 第四步：拆分选择器
 *  选择器也要从当前元素向外排列
 *  复杂选择器拆成针对单个元素的选择器，用循环匹配父元素队列
 * 
 * 第五步：计算选择器与元素匹配
 *  根据选择器的类型和元素属性，计算是否与当前元素匹配
 *  这里仅仅实现了三种基本选择器，实际的浏览器要处理复合选择器
 * 
 * 第六步： 生成 computed 属性
 *  一旦选择匹配，就应用选择器到元素上，形成computedStyle
 * 
 * 第七步: 确定规则覆盖关系
*/

const css  = require('css');

//把 CSS 规则暂存到一个数组里
let rules = [];
module.exports.addCSSRules = function addCSSRules(text) {
    var ast = css.parse(text);
    rules.push(...ast.stylesheet.rules); 
}

module.exports.computeCSS = function computeCSS(element, stack) {  //拿到元素和元素对应的规则
    var elements = stack.slice().reverse();
    if(!element.computedStyle) {
        element.computedStyle = {};
    }
    for(let rule of rules) {
        var selectorParts  = rule.selectors[0].split(" ").reverse();
        if(!match(element, selectorParts[0]))
            continue;
        let matched = false;
        var j = 1;
        for(var i = 0; i < elements.length; i++) {
            if(match(elements[i], selectorParts[j])) {
                j++;
            }
        }
        if(j >= selectorParts.length) {
            matched = true;
        }
        if(matched) { //如果匹配到，我们要加入
            console.log("ELement", element , "matched rule", rule);
            var sp = specificity(rule.selectors[0]);
            var computedStyle = element.computedStyle;
            for(let declaration of rule.declarations) {
                if(!computedStyle[declaration.property]) {
                    computedStyle[declaration.property] = {}
                }
                if(!computedStyle[declaration.property].specificity) {
                    computedStyle[declaration.property].value = declaration.value;
                    computedStyle[declaration.property].specificity = sp;
                } else if(compare(computedStyle[declaration.property].specificity, sp) < 0) {
                    //找到冲突属性进行覆盖
                    computedStyle[declaration.property].value = declaration.value;
                    computedStyle[declaration.property].specificity = sp;
                }else {
                    console.log('冲突属性',sp);
                }
            }
            console.log(element);
            return element;
        }
    }
}

function match(element, selector) {
    if(!selector || !element.attributes) {
        return false;
    }

    if(selector.charAt(0) == '#') {
        var attr = element.attributes.filter(attr => attr.name === 'id')[0];
        if(attr && attr.value === selector.replace('#', '')) {
            return true;
        }
    } else if(selector.charAt(0) == '.') {
        var attr = element.attributes.filter(attr => attr.name === 'class')[0];
        if(attr && attr.value === selector.replace(".", '')) {
            return true;
        } 
    } else {
        if(element.tagName === selector) {
            return true;
        }
    }
    return false;
}

function specificity(selector) {
    var p = [0, 0, 0, 0];
    var selectorParts = selector.split(' ');
    for(let part of selectorParts) {
        if(part.charAt(0) === '#') {
            p[1] += 1;
        } else if(part.charAt(0) === '.') {
            p[2] += 1;
        } else {
            p[3] += 1;
        }
    }
    return p;
}

function compare(sp1, sp2) {
    if(sp1[0] - sp2[0]) 
        return sp1[0] - sp2[0];
    if(sp1[1] - sp2[1])
        return sp1[1] - sp2[1];
    if(sp1[2] - sp2[2])
        return sp1[2] - sp2[2];
    else 
        return sp1[3] - sp2[3];
}
