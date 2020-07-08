# 编程与算法训练与 组件化
## Proxy 与双向绑定
## 组件化： 组件的基本知识，轮播组件
### 对象与组件
1. 对象包含的内容
* Properties
* Methods
* Inherit
2. 组件包含的内容
* Properties
* Methods
* Inherit
* Attribute
* Config & State
* Event
* Lifecycle
* Children

### Component
### Attribute vs Property
* Attribute 强调描述性
```
<my-component attribute='v' />
myComponent.getAttribute('a')
myComponent.setAttribute('a', 'value');
```
* Property 强调从属关系
```
myComponent.a = 'value';
```
* Attribute vs Property
```
<input value='cute'/>
<script>
var input = document.getElementByTagName('input'); //若 property 没有设置，则结果是 attribute
input.value //cute
input.getAttribute('value');  //cute
input.value = 'hello';  //若 value 属性已经设置，则 attribute 不变，property 变化，元素上实际的效果是 property 优先
input.value //hello
input.getAttribute('value');  //cute  
</script>
```

### 如何设计组件状态
|Markup set|JS set |JS Change|User Input Change| |
| - | - | - | - | - |
| ❎ | ✅ |✅|❓| property|
| ✅ | ✅ |✅|❓| attribute|
| ❎ | ❎ |❎|✅| state|
| ❎ | ✅ |✅|❎| config|

### Lifecycle
* create
  * mount
  * unmount
* JS change/set
* User Input
  * render/update
* destroyed
### Children
* Content 型 Children 与 Template 型 Children
```
<my-button><img src="{{icon}}"/>{{title}}</my-button>
<my-list>
  <li><img src="{{icon}}"/>{{title}}</li>
</my-list>
```
