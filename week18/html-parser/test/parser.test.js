import {parseHTML} from "../src/parser";
let assert = require("assert");

 it("parse a single element", () => {
   let div = parseHTML("<div></div>").children[0];
   assert.equal(div.tagName, 'div');
   assert.equal(div.children.length, 0);
   assert.equal(div.type, "element");
   assert.equal(div.attributes.length, 2);
}); 

it("parse a single element with text content", () => {
    let doc = parseHTML("<div>hello</div>");
    let text = doc.children[0].children[0];
    assert.equal(text.content, "hello");
    assert.equal(text.type, "text");
 });
 
 it("tag mismatch", () => {
    try{
        let doc = parseHTML("<div>hello</ivd>");  
    } catch(e) {
        assert.equal(e.message, "Tag start end doesn't match!");
    }
 });

 it("tag open", () => {
    let doc = parseHTML("<div>a < hello</div>"); 
    let text = doc.children[0].children[0];
    assert.equal(text.content, "a < hello");
    assert.equal(text.type, "text");
 });

 it("with property", () => {
    let doc = parseHTML("<div id=a class='cls' data=\"abc\" ></div>"); 
    let proel = doc.children[0];
    let count = 0;
    for(let attr of proel.attributes) {
        if(attr.name === 'id') {
            count++;
            assert.equal(attr.value, "a");
        }
        if(attr.name === 'class') {
            count++;
            assert.equal(attr.value, "cls");
        }
        if(attr.name === 'data') {
            count++;
            assert.equal(attr.value, "abc");
        }
    }
    assert.ok(count, 3);
 });

 it("with property 2", () => {
    let doc = parseHTML("<div id=a class='cls' data=\"abc\"></div>"); 
    let proel = doc.children[0];
    let count = 0;
    for(let attr of proel.attributes) {
        if(attr.name === 'id') {
            count++;
            assert.equal(attr.value, "a");
        }
        if(attr.name === 'class') {
            count++;
            assert.equal(attr.value, "cls");
        }
        if(attr.name === 'data') {
            count++;
            assert.equal(attr.value, "abc");
        }
    }
    assert.ok(count, 3);
 });
 
 
 it("selfclosingTag", () => {
    let doc = parseHTML("<div id=a class='cls' data=\"abc\" />"); 
    let proel = doc.children[0];
    let count = 0;
    for(let attr of proel.attributes) {
        if(attr.name === 'id') {
            count++;
            assert.equal(attr.value, "a");
        }
        if(attr.name === 'class') {
            count++;
            assert.equal(attr.value, "cls");
        }
        if(attr.name === 'data') {
            count++;
            assert.equal(attr.value, "abc");
        }
    }
    assert.ok(count, 3);
 });


 it("script test", () => {
     let content = `
     <div>abcd</div>
     <span>x<span>
     /script>
     <
     </
     </s
     </sc
     </scr
     </scri
     </scrip
     </script
     `;
    let doc = parseHTML(`<script>${content}</script>`); 
    let script = doc.children[0].children[0];
    assert.equal(script.content, content);
 });

it('attributes', () => {
    let doc = parseHTML("<div id=q></div>");
    let proel = doc.children[0];
});


it('attributesName', () => {
    let doc = parseHTML("<div class id />");
    let proel = doc.children[0];
});

it('afterQuotedAttributeValue', () => {
    let doc = parseHTML("<div class id=\"sd\"sd/>");
    let proel = doc.children[0];
});


