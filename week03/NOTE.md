# JavaScript标准里所有的对象，分析有哪些对象是我们无法实现出来的，这些对象都有哪些特性？

## 1、Ordinary Object and Exotic Objects Definitions(普通对象和外来对象)

>**备注：** *Any object that is not an ordinary object is an exotic object.所有的对象不是 ordinary objct 就是 exotic object.*

### 1.1 ordinary object
>见 ECMA-262文档4.3.6定义： object that has the default behaviour for the essential internal methods that must be supported by all objects
1. Ordinary Object Interal Methods and Interal Slots(内部方法和插槽)
```
/*Essential Internal Methods 必要的内部方法*/
内部插槽slots:
    [[propertype]]
内部方法methods：
    [[GetProtypeOf]]
    [[setPrototypeOf]]
    [[IsExtensible]]
    [[PreventExtensions]]
    [[GetOwnProperty]]
    [[DefineOwnProperty]]
    [[HasProperty]]
    [[Get]]
    [[Set]]
    [[Delete]]
    [[OwnPropertyKeys]]
    ObjectCreate ( proto [ , internalSlotsList ] )
    OrdinaryCreateFromConstructor ( constructor, intrinsicDefaultProto [ ,
    internalSlotsList ] )
    GetPrototypeFromConstructor ( constructor, intrinsicDefaultProto )
/*Funciton Object
Additional Essential Internal Methods and Internal Slots of Function Objects 函数对象内部方法和内部插槽
funciton object is an ordinary objcet*/

```
2. ECMAScript Function Objects
```
An ECMAScript function object is an ordinary object and has the same internal slots and the same internal methods as other ordinary objects.
methods:
    [[all ordinary object]]
    [[Call]] ( thisArgument, argumentsList )
    [[Construct]] ( argumentsList, newTarget )
    FunctionAllocate ( functionPrototype, strict, functionKind )
    FunctionInitialize ( F, kind, ParameterList, Body, Scope )
    FunctionCreate ( kind, ParameterList, Body, Scope, Strict [ , prototype ] )
    GeneratorFunctionCreate ( kind, ParameterList, Body, Scope, Strict )
    AsyncGeneratorFunctionCreate ( kind, ParameterList, Body, Scope, Strict )
    AsyncFunctionCreate ( kind, parameters, body, Scope, Strict )
    AddRestrictedFunctionProperties ( F, realm )
    MakeConstructor ( F [ , writablePrototype [ , prototype ] ] )
    MakeConstructor ( F [ , writablePrototype [ , prototype ] ] )
    MakeMethod ( F, homeObject )
    SetFunctionName ( F, name [ , prefix ] )
    SetFunctionLength ( F, length )
    FunctionDeclarationInstantiation ( func, argumentsList )
Slot: 
    [[Environment]]
    [[FormalParameters]]
    [[FunctionKind]]
    [[ECMAScriptCode]]
    [[ConstructorKind]]
    [[Realm]]
    [[ScriptOrModule]]
    [[ThisMode]]
    [[Strict]]
    [[HomeObject]]
    [[SourceText]]
```

### 1.2 exotic object
>见 ECMA-262文档4.3.7定义：object that does not have the default behaviour for one or more of the essential internal methods

#### 1.2.1 Built-in Exotic Object Internal Methods and Slots
1. Bound Function Exotic Objects
```  
定义：A bound function is an exotic object that wraps another function object.
Bound function objects do not have the internal slots of ECMAScript function objects;绑定函数没有 函数对象的内部插槽。
Bound Function Exotic internal slots and interal methods（绑定函数中的内部插槽和内部方法如下）:
slots:
    [[BoundTargetFunction]]
    [[BoundThis]]
    [[BoundArguments]]
methods:
    [[all ordinary objects methods]]
    [[Call]] ( thisArgument, argumentsList )
    [[Construct]] ( argumentsList, newTarget )
    BoundFunctionCreate ( targetFunction, boundThis, boundArgs )
```
2. Array Exotic Objects
```
定义：An Array object is an exotic object that gives special treatment to array index property keys
Array Exotic Objects interal slots and methods:
methods:
    [[all ordinary objects methods]]
    [[DefineOwnProperty]] ( P, Desc )
    ArrayCreate ( length [ , proto ] )
    ArraySpeciesCreate ( originalArray, length )
    ArraySetLength ( A, Desc )
```
3. String Exotic Objects
```
定义：A String object is an exotic object that encapsulates a String value and exposes virtual integer-indexed data properties
corresponding to the individual code unit elements of the String value. String exotic objects always have a data property
named "length" whose value is the number of code unit elements in the encapsulated String value. Both the code unit
data properties and the "length" property are non-writable and non-configurable.
String Exotic Objects interal slots and methods:
slots:
    [[all ordinary objects interal slots]]
    [[StringData]] 
methods:
    [[all ordinary objects methods]]
    [[GetOwnProperty]] ( P )
    [[DefineOwnProperty]] ( P, Desc )
    [[OwnPropertyKeys]] ( )
    StringCreate ( value, prototype )
    StringGetOwnProperty ( S, P )
```
4. Arguments Exotic Objects
```
定义：An arguments exotic object is an exotic object whose array index properties map to the formal parameters bindings of an invocation of its associated ECMAScript function.
Arguments Exotic Objects interal Slots:
slots:
    [[all ordinary objects interal slots]]
    [[ParameterMap]]
methods:
    [[all ordinary objects methods]]
    [[GetOwnProperty]] ( P )
    [[DefineOwnProperty]] ( P, Desc )
    [[Get]] ( P, Receiver )
    [[Set]] ( P, V, Receiver )
    [[Delete]] ( P )
    CreateUnmappedArgumentsObject ( argumentsList )
    CreateMappedArgumentsObject ( func, formals, argumentsList, env )
    MakeArgGetter ( name, env )
    MakeArgSetter ( name, env )
```
5. Integer-Indexed Exotic Objects
```
定义：An Integer-Indexed exotic object is an exotic object that performs special handling of integer index property keys.
Integer-Indexed Exotic Objects interal Slots and methods:
slots:
    [[all ordinary objects slots]]
    [[ViewedArrayBuffer]]
    [[ArrayLength]]
    [[ByteOffset]]
    [[TypedArrayName]]
methods:
    [[all ordinary objects methods]]
    [[GetOwnProperty]] ( P )
    [[HasProperty]] ( P )
    [[DefineOwnProperty]] ( P, Desc )
    [[Get]] ( P, Receiver )
    [[Set]] ( P, V, Receiver )
    [[OwnPropertyKeys]] ( )
    IntegerIndexedObjectCreate ( prototype, internalSlotsList )
    IntegerIndexedElementGet ( O, index )
    IntegerIndexedElementSet ( O, index, value )
```
6. Module Namespace Exotic Objects
```
定义：A module namespace object is an exotic object that exposes the bindings exported from an ECMAScript Module.
Module Namespace Exotic Objects Slots and methods:
Slots:
    [[Module]]
    [[Exports]]
    [[Prototype]] Null
methods:
    [[SetPrototypeOf]](V)
    [[IsExtensible]]()
    [[PreventExtensions]]()
    [[GetOwnProperty]] (P)
    [[DefineOwnProperty]] ( P, Desc )
    [[HasProperty]] ( P )
    [[Get]] ( P, Receiver )
    [[Set]] ( P, V, Receiver )
    [[Delete]] ( P )
    [[OwnPropertyKeys]] ( )
    ModuleNamespaceCreate ( module, exports )
```
7. Immutable Prototype Exotic Objects
```
定义：An immutable prototype exotic object is an exotic object that has a [[Prototype]] internal slot that will not change once it is initialized.
Immutable Prototype Exotic Objects interal methods and Slots:
    [[Propertype]]
    [[SetPrototypeOf]](V)
    SetImmutablePrototype(O,V)
```
### 1.3. 为什么不能实现 exotic objects？
因为 exotic obejcts 不具备所有基本对象具有的内部方法和内部插槽，大部分exotic objects都持有特定的内部方法和内部插槽或重写部分基本对象含有的内部方法。
## 2. 本周总结
 通过这几周的学习，学到的最重要的一点就是不会的情况去源头找答案(在这里指看标准文档)是最有效的方法，在接下来的时间里对自己的要求是多看文档查漏补缺，建立体系。 

