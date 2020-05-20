/**
 * 第一步：拆分文件
 *  为了方便文件管理，我们把 parser 单独拆到文件中
 *  parser 接受 HTML 文本作为参数，返回一棵DOM 树
 *  
 * 第二步：
 *  我们用 FSM 来实现 HTML 的分析
 *  在 HTML 标准中，已经规定了 HTML 的状态
 *  Toy-Browser 只挑选其中一部分状态，完成一个最简版本
 * 
 * 第三步：解析标签
 *  主要的标签有：开始标签，结束标签和自封闭标签
 *  在这一步我们暂时忽略属性
 * 
 * 第四步：处理标签
 *  在状态机中，除了状态迁移，还要加入业务逻辑
 *  我们在标签结束状态提交标签 token
 * 
 * 第五步: 处理属性
 *  属性值分为单引号、双引号、无引号三种写法，因此需要较多状态处理
 *  处理属性的方式跟标签类似
 *  属性结束时，把属性加到标签 Token上
 * 
 * 第六步：构建 DOM 树
 *  从标签构建 DOM 树的基本技巧是使用栈
 *  遇到开始标签时创建元素并入栈，遇到结束标签时出栈
 *  自封闭节点可视为入栈后立刻出栈
 *  任何元素的父元素是它入栈钱的栈顶
 * 
 * 第七步： 文本节点
 *  文本节点与自封闭标签处理类似
 *  多个文本节点需要合并
 * 
 *
 * 
*/
const collectCssRules = require('./collect_css_rules');

const EOF = Symbol("EOF"); //EOF: End Of File

let currentToken = null;
let currentAttribute = null;
let currentTextNode = null;
let stack = [{type: "document", children:[]}];

function emit(token) {
    let top = stack[stack.length - 1];
    if(token.type == 'startTag') {
        let element = {
            type: "element",
            children:[],
            attributes: []
        };
        element.tagName = token.tagName;
        for(let p in token) {
            if(p != "type" && p != 'tagName') {
                element.attributes.push({
                    name: p,
                    value: token[p]
                });
            }
        }
        if(collectCssRules.computeCSS(element, stack)) {
            element = collectCssRules.computeCSS(element, stack);
        }

        top.children.push(element);
        element.parent = top;

        if(!token.isSelfClosing) {
            stack.push(element);
        }
        currentTextNode = null;

    } else if(token.type == "endTag") {
        if(top.tagName != token.tagName) {
            throw new Error("Tag start end doesn't match!");
        } else {
            // 遇到 style 标签时，执行添加 CSS 规则的操作
            if(top.tagName === 'style') {
                collectCssRules.addCSSRules(top.children[0].content);
            }
            stack.pop();
        }
        
        currentTextNode = null;
    } else if(token.type === 'text') {
        if(currentTextNode === null) {
            currentTextNode = {
                type: "text",
                content: ""
            }
            top.children.push(currentTextNode);
        }
        currentTextNode.content += token.content;
    }
}



function data(c) {
    if(c === '<') {
        return tagOpen;
    } else if(c === EOF) {
        emit({
            type: "EOF"
        });
        return ;
    } else {
        emit({
            type: "text",
            content: c
        })
        return data;
    }
}

function tagOpen(c) {
    if(c === '/') {
        return endTagOpen;
    } else if(c.match(/^[a-zA-Z]$/)) {
        currentToken = {
            type: "startTag",
            tagName: ""
        }
        return tagName(c);
    } else {
        return ;
    }
}

function tagName(c) {
    if(c.match(/^[\t\n\f ]$/)) {
        return beforeAttributeName;
    } else if(c === '/') {
        return selfClosingStartTag;
    } else if(c.match(/^[a-zA-Z]$/)) {
        currentToken.tagName += c;
        return tagName;
    } else if(c === '>') {
        emit(currentToken);
        return data;
    } else {
        return tagName;
    }
}

function beforeAttributeName(c) {
    if(c.match(/^[\t\n\f ]$/)) {
        return beforeAttributeName;
    } else if(c === '/' || c === '>' || c === EOF) {
        return afterAttributeName(c);
    } else if(c === '=') {
        
    } else {
        currentAttribute = {
            name: "",
            value: ""
        }
        return attributeName(c);
    }
}

function attributeName(c) {
    if(c.match(/^[\t\n\f ]$/) || c === '/' || c === '>' || c === EOF) {
        return afterAttributeName(c);
    } else if(c === '=') {
        return beforeAttributeValue;
    } else if(c === '\u0000') {

    } else if(c ==="\"" || c === "'" || c === "<") {

    } else {
        currentAttribute.name += c;
        return attributeName;
    }
}

function afterAttributeName(c) {
    if(c.match(/^[\t\n\f ]$/)) {
        return afterAttributeName;
    } else if(c === '/') {
        return selfClosingStartTag;
    } else if(c === '=') {
        return beforeAttributeValue;
    } else if(c === EOF) {

    } else if(c === '>') {
        emit(currentToken);
        return data;
    } else {
        currentToken = {
            name: "",
            value: ""
        };
        attributeName(c);
    }
}

function beforeAttributeValue(c) {
    if(c.match(/^[\t\n\f ]$/) || c === '/' || c === '>' || c === EOF) {
        return beforeAttributeValue;
    } else if(c === "\"") {
        return doubleQuotedAttributeValue;
    } else if(c === "'") {
        return singleQuoteAttributeValue;
    } else if(c == ">") {

    }else {
        return UnquotedAttributeValue(c);
    }
}

function doubleQuotedAttributeValue(c) {
    if(c === "\"") {
        currentToken[currentAttribute.name] = currentToken.value;
        return afterQuotedAttributeValue;
    } else if(c === '\u0000') {

    }else if(c === EOF) {

    } else {
        currentAttribute.value += c;
        return doubleQuotedAttributeValue;
    }
}

function singleQuoteAttributeValue(c) {
    if(c === "\'") {
        currentToken[currentAttribute.name] = currentAttribute.value;
        return afterQuotedAttributeValue;
    } else if(c === '\u0000') {

    } if(c === EOF) {

    } else {
        currentAttribute.value += c;
        return singleQuoteAttributeValue;
    }
}

function afterQuotedAttributeValue(c) {
    if(c.match(/^[\t\n\f ]$/)) {
        return beforeAttributeName;
    } else if(c === '/') {
        return selfClosingStartTag;
    } else if(c === '>') {
        currentToken[currentAttribute.name] = currentAttribute.value;
        emit(currentToken);
        return data;
    } else if(c == EOF) {

    }else {
        currentAttribute.value += c;
        return doubleQuotedAttributeValue;
    }
}

function UnquotedAttributeValue(c) {
    if(c.match(/^[\t\n\f ]$/)) {
        currentToken[currentAttribute.name] = currentAttribute.value;
        return beforeAttributeName;
    } else if(c === "/") {
        currentToken[currentAttribute.name] = currentAttribute.value;
        return selfClosingStartTag;
    } else if(c === '>') {
        currentToken[currentAttribute.name] = currentAttribute.value;
        emit(currentToken);
        return data;
    } else if(c === '\u0000') {

    } else if(c == "\"" || c == "'" || c == "<" || c == "=" || c == '`') {
       
    } else if(c === EOF) {

    } else {
        currentAttribute.value += c;
        return UnquotedAttributeValue;
    }
}

function selfClosingStartTag(c) {
    if(c === '>') {
        currentToken.isSelfClosing = true;
        emit(currentToken);
        return data;
    } else if(c === 'EOF') {

    } else {

    }
}

function endTagOpen(c) {
    if(c.match(/^[a-zA-Z]$/)) {
        currentToken = {
            type: 'endTag',
            tagName: ""
        }
        return tagName(c);
    } else if(c === '>') {

    } else if(c === "EOF") {

    } else {

    }
}


/*let html = `<html maaa=a >
<head>
    <style>
body div #myid{
    width:100px;
    background-color: #ff5000;
}
body div img{
    width:30px;
    background-color: #ff1111;
}
    </style>
</head>
<body>
    <div>
        <img id="myid"/>
        <img />
    </div>
</body>
</html>`;
let state = data;
    for(let c of html) {
        state = state(c);
    }
    state = state(EOF);
console.log(stack[0]);
*/

module.exports.parserHTML = function parserHTML(html) {
    let state = data;
    for(let c of html) {
        state = state(c);
    }
    state = state(EOF);
    console.log("dom 树",stack[0]);
    return stack[0];
}