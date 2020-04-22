# 什么是乔姆斯基谱系？
乔姆斯基文法是一种采用有限的机制，生成无限句子集的方法。
# 什么是产生式(BNF)？
BNF范式是一种用递归的思想来表述计算机语言符号集的定义规范
法则：
::=表示定义；
“ ”双引号里的内容表示字符；
<>尖括号里的内容表示必选内容；
| 竖线两边的是可选内容，相当于or；
# 什么是图灵完备性?
  一切可计算的问题都能计算，这样的虚拟机或者编程语言就叫图灵完备的。图灵完备意味着你的语言可以做到能够用图灵机能做到的所有事情，可以解决所有的可计算问题。就是说图灵完备的语言，有循环执行语句，判断分支语句等。理论上能解决任何算法。但有可能进入死循环而程序崩溃。
  图灵不完备也不是没有意义, 有些场景我们需要限制语言本身. 如限制循环和递归, 可以保证该语言能写的程序一定是终止的。图灵不完备，应该是不允许或限制循环。可以保证，每段程序都不会死循环，都有运行完的时候。
# JavaScript语言类型
## 文法 Grammar

### 字符集类别

- ASCII:美国信息交换标准代码：共128个字符

    - 脱出字符：通常用于终端连线，以脱出字符^开头，再接一个符号。范围：U+0000~U+001F和 U+007F，  共33个。
    - 可显示字符：包含26个基本拉丁字母、阿拉伯数字和英式标点符号。范围：U+0020~U+007E

- Unicode字符集

    - blocks

        - 表示字符的数字叫做码点，如：A:65,a:97
        - BMP(基本多文种平面) 4位16进制以内表示，范围：U+0000~U+FFFF

    - Categories

- UCS : Unicode 的 BMP 范围U+000 - U+FFFF
- GB国标

    - GB2312
    - GBK(GB13000)
    - GB18030

- ISO-8859
- BIG5

### Lexical Grammar 词法

- WhileSpace

    - <TAB> 横向制表符
    - <VT> 纵向制表符
    - <FF> Form Feed
    - <SP> 空格
    - <NBSP> 
    - <ZWNBSP> 零宽空格
    - <USP>

- LineTerminator 换行

    - <LF> :\n 一般统一使用\n
    - <CR>: \r
    - <LS>
    - <PS>

- Comment注释

    - /**/
    - //

- Token

    - Punctuator 符号
    - Literal 

        - Number

            - IEEE 754 Double Float 表示法

                - Sign(1)标志位
                - Exponent(11)
                - Fraction(52)

            - Number Grammar

                - DecimalLiteral 小数语法

                    - 0
                    - 0.
                    - .2
                    - 1e3

                - IntegerLiteral 整数型语法

                    - BinaryIntegerLiteral 二进制语法 : 0b111
                    - OctallntegerLiteral 八进制语法 : 0o10
                    - HexIntegerLiteral 十六进制语法: 0xFF
                    - DecimalLiteral 十进制语法

        - String

            - Character
            - Code Point 码点
            - Encoding

                - UTF

                    - UTF-8:占一个字节 - 可变编码方式
                    - UTF-16:占 两个字节
                    - UIT-32：占4个字节，太耗内存

            - String Grammar

                - 双引号："abc"
                - 单引号: 'abc'
                - 反引号（字符串模板）:`abc`

        - Boolean
        - Null
        - Undefined
        - Ojbect
        - Symbol

    - IdentifiedName

      声明 IdentifiedName 时最好限制在 ASCII 以内的字符表示

        - Identifier 标识符

            - 变量名不能与关键字重名
            - 属性名可以与关键字重名

        - Keywords 关键字
        - Future reserved Keywords: enum

### Synatx

- Atom原子
- Expression表达式
- Statement语句
- structure结构
- Program/Module 程序/模块
