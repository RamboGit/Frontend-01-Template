# 课后作业：JavaScript | 表达式，类型准换
## 字符串转数字
```
    function converStringToNumber(string, scale) {
        //判断字符串是不是可转换为 Number
        var reg = /^[\+\-]?(((((0|[1-9][0-9]*)(\.[0-9]*)?)|((0|[1-9][0-9]*)?(\.[0-9]+))))([eE][\+\-]?[0-9]+)?$|0[0-9]+$|0[xX][0-9A-Fa-f]+$|0[bB][01]+$|0[oO][0-7]+$)/;
        if (!reg.exec(string)) return NaN;

        if(arguments.length < 2)
            scale = 10;

        //区分进制 十进制，二进制，八进制，十六进制
        const bindaryReg = /^[+-]?0[bB][01]+$/;
        const octalReg = /^[+-]?0[oO][0-7]+$/;
        const hexReg = /^[+-]?0[xX][0-9A-Fa-f]+$/;

        var chars = string.split('');
        var number = 0;
        let i = 0;
        let sign = 0;
        if(chars[i] === '+' || chars[i] === '-')
                i++;
                sign = 1;
         if (bindaryReg.exec(string)) { //二进制
            i = chars.length - 1;
             let j = 0;
            while(i > 1 + sign){ //去掉 Ob两个元素
                number += (chars[i].codePointAt(0) - '0'.codePointAt(0)) * (2 ** j);
                i--;
                j++;
            }
        }
        else if (octalReg.exec(string)) { //八进制
             i = chars.length - 1;
             let j = 0;
             while(i > 1 + sign) { //去掉 Oo两个元素
                number += (chars[i].codePointAt(0) - '0'.codePointAt(0)) * (8 ** j);
                i--;
                j++;
            }
        }
        else if (hexReg.exec(string)) {  //十六进制
            i = chars.length - 1;
            let j = 0;
            bigHexReg = /[A-F]/;
            smallHexReg = /[a-f]/;
            while(i > 1 + sign) {
                //判断大小写
                if(bigHexReg.exec(chars[i])) {
                    number += (chars[i].codePointAt(0) - 55) * 16**j;
                }
                else if(smallHexReg.exec(chars[i])){
                    number += (chars[i].codePointAt(0) - 87) * 16**j;
                }
                else {
                    number += (chars[i].codePointAt(0) - '0'.codePointAt(0)) * 16**j;
                }
                i--;
                j++;
            } 
        } 
        else { //十进制整数、小数、科学计数
            let scale = 10;
            while (i < chars.length && chars[i] != ".") {
                number = number * scale;
                number += chars[i].codePointAt(0) - '0'.codePointAt(0);
                i++;
            }
            if (chars[i] == '.') {
                i++;
            }
            //小数部分
            var fraction = 0;
            let j = 1; //记录小数点位数
            while (i < chars.length && chars[i] !== 'e') {
                fraction += (chars[i].codePointAt(0) - '0'.codePointAt(0))/ (10 ** j);
                i++;
                j++;
            }
            number = number + fraction;
            //指数部分
            var exponent = 0; //指数倍数
            let exponentSymbolbit; //指数正负号
            if(chars[i] === 'e'){
                i++;
                if(chars[i] === '+' || chars[i] === '-') {
                    exponentSymbolbit = chars[i];
                    i++;
                } 
            }
            while( i < chars.length) {
                exponent += (chars[i].codePointAt(0) - '0'.codePointAt(0)) * 10**(chars.length - 1 - i);
                i++;
            }
            //判断指数是否为负数
            if(exponentSymbolbit) {
                number = number / 10**exponent;
            } else{
                number = number * 10**exponent;
            }  
        }
         //判断是否为负数
         if (chars[0] === '-') {
                 number = -number;
             }  
        return number;
    }
    /*测试字符串转数字*/
    console.log(converStringToNumber('NaN'));
    console.log(converStringToNumber('100'));
    console.log(converStringToNumber('100.0123'));
    console.log(converStringToNumber('100.34e12'));
    console.log(converStringToNumber('-100.34e2'));
    console.log(converStringToNumber('-0b111'));
    console.log(converStringToNumber('+0b111'));
    console.log(converStringToNumber('+0o12'));
    console.log(converStringToNumber('0xa11'));
    console.log(converStringToNumber('-0x11'));
```
## 数字转字符串
``` 
    function converNumberToString(number) {
        //假设输入的为数字
        //1. 判断正负号 true为正 false 为负
        let signb = true; 
        if(number/0 === -Infinity){
            signb = false;
            number = - number;
        }
        let x = 10;
        var integer = Math.floor(number);
        var fraction  = parseFloat((number - integer).toPrecision(12));
        var string = '';
        while (integer > 0) {
            string = String(integer % x) + string;
            integer = Math.floor(integer / x);
        }
        //小数部分转字符串
        if(fraction > 0){
            var fractionStr = '';
            do {
                fraction = parseFloat((fraction * 10).toPrecision(12));
            } while (fraction - Math.floor(fraction)) {
                let num = Math.floor(fraction);
                fraction = parseFloat((fraction - num).toPrecision(12));
                fractionStr += String(num);
                fraction = parseFloat((fraction * 10).toPrecision(12));
            }
            if (fractionStr.length > 0 && fractionStr !== '') {
                string = string + '.' + fractionStr;
            }
        }
        return signb ? string : ("-" + string);
    }
    /*测试数字转字符串*/
    console.log(converNumberToString(123));
    console.log(converNumberToString(123.02));
    console.log(converNumberToString(-123.1e2));
    console.log(converNumberToString(-0b11));
    console.log(converNumberToString(0o11));
    console.log(converNumberToString(0x11));
```
