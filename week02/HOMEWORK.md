# 第二周作业

## 写一个正则表达式 匹配所有 Number 直接量
```
<script>
    function regNumer(num){
        var reg = /^[+-]?(((((0|[1-9]\d*)(\.\d*)?)|((0|[1-9]\d*)?(\.\d+))))([eE][+-]?\d+)?$|0[oO]?[0-7]+$|0[xX][0-9A-Fa-f]+$|0[bB][01]+$)/;
        return reg.test(num);
    }
 console.log(regNumer(1.e+12));
</script>
```
## 写一个 UTF-8 Encoding 的函数
```
<script>
     /* UTF-8 编码规则
    0000 0000-0000 007F | 0xxxxxxx
    0000 0080-0000 07FF | 110xxxxx 10xxxxxx
    0000 0800-0000 FFFF | 1110xxxx 10xxxxxx 10xxxxxx
    0001 0000-0010 FFFF | 11110xxx 10xxxxxx 10xxxxxx 10xxxxxx
    */
    function unicodeUtf8(string) {
        const codePoint = string.codePointAt(0);
        const codePointBit = codePoint.toString(2);
        let utf8Str = "";
        let templateStr = "";
        //判断范围 007F 0080-07FF 0800-FFFF 10000-10FFFF
        if(codePoint <= 0x7F){  //占一个字节
            let oneByte = "0xxxxxxx";
            templateStr = oneByte;
        } else if(codePoint <= 0x7FF) { //占两个字节
            let twoByte = "110xxxxx10xxxxxx";
            templateStr = twoByte;
        }else if(codePoint <= 0xFFFF){  //占三个字节
           let secondByte = "1110xxxx10xxxxxx10xxxxxx";
           templateStr = secondByte;
        }else if(codePoint <= 0x10FFFF) { //占四个字节
            let fourByte = "11110xxx10xxxxxx10xxxxxx10xxxxxx";
            templateStr = fourByte;
        }else{
            return "NaN";
        }
        utf8Str = replaceString(templateStr, codePointBit);
        return utf8Str;
    }

    //替换字符
    function replaceString(template, targetStr){
        var newStrArray = template.split('');
        var targetStrArray = targetStr.split('');
        let count = newStrArray.length;
        let j = targetStrArray.length - 1; 
        for(let i = count - 1; i >= 0; i--){
            if(newStrArray[i] === "x"){
                if(j >= 0){
                    newStrArray[i] = targetStrArray[j--];
                }else{
                    newStrArray[i] = "0";
                } 
            }
        }
        let newStr = newStrArray.join('');
        return newStr;
    }
    /*
    进制之间的转化
    1、通过 parseInt先转化为10进制 var a = parseInt("111001011011110010100000",2)
    2、通过 toString(16)转化为16禁止 a.toString(16)  注意：数字直接转的话需要加空格 如 2 .toString()
    */
</script>
```
## 写一个正则表达式，匹配所有的字符串直接量，单引号和双引号
暂时写不出来
**老师答案**
### 双引号的正则
```
"(?:[^"\n\\\r\u2028\u2029]|\\(?:['"\\bfnrtv\n\r\u2028\u2029]|\r\n)|\\x[0-9a-fA-F]{2}|\\u[0-9a- fA-F]{4}|\\[^0-9ux'"\\bfnrtv\n\\\r\u2028\u2029])*"
```
### 单引号的正则
```
'(?:[^'\n\\\r\u2028\u2029]|\\(?:['"\\bfnrtv\n\r\u2028\u2029]|\r\n)|\\x[0-9a-fA-F]{2}|\\u[0-9a- fA-F]{4}|\\[^0-9ux'"\\bfnrtv\n\\\r\u2028\u2029])*'
```
