# Week19周总结
## Create generator 步骤
* 生成 generator 工具 [yeoman](https://yeoman.io)
1. 创建 package.json 文件
```
npm init 
name: "generator-name"
```
name为 genrator 的名字
2. 添加 yeoman-generator 依赖
```
npm install --save yeoman-generator
```
3. 添加目录结构
* generators
    * app
        * index.js
4. Extending generator  (app/index.js)文件
```
var Generator = require('yeoman-generator');

module.exports = class extends Generator {
    
    constructor(args, opts) {
        // Calling the super constructor is important so our generator is correctly set up
        super(args, opts);
    }

    method1() {
        this.log('method 1 just ran');
    }
};
```
5. Running the generator
```
npm link 
yo name
```
**name为generator-name

6. 创建项目
```
 mkdir generator-test
 cd generator-test
 yo name(generator的 name)
```
7. 修改generator,创建 package.json文件，安装依赖包
```
   creating() {
        
        this.fs.copyTpl(
            this.templatePath('package.json'),
            this.destinationPath('package.json')
        );

        this.npmInstall(
            [
                '@babel/core',
                '@babel/plugin-transform-react-jsx',
                '@babel/preset-env',
                'babel-loader',
                '@babel/register',
                'ava',
                'babel-plugin-istanbul',
                'webpack',
                'webpack-cli',
                'webpack-dev-server',
                'nyc',
                'mocha',
                '@istanbuljs/nyc-config-babel',
                'html-webpack-plugin'
            ],
             { 'save-dev': true });
    }
```
8. 根据 start 、build 阶段生成项目目录结构和所需文件
* 目录结构
    * webpack.config.js
    * src
        * index.html
        * main.js
    * lib
        * createElement.js
        * gesture.js
```
 this.fs.copyTpl(
            this.templatePath('webpack.config.js'),
            this.destinationPath('webpack.config.js')
        );

        this.fs.copyTpl(
            this.templatePath('createElement.js'),
            this.destinationPath('lib/createElement.js')
        );

        this.fs.copyTpl(
            this.templatePath('gesture.js'),
            this.destinationPath('lib/gesture.js')
        );

        this.fs.copyTpl(
            this.templatePath('main.js'),
            this.destinationPath('src/main.js')
        );

        this.fs.copyTpl(
            this.templatePath('main.test.js'),
            this.destinationPath('test/main.test.js')
        );

        this.fs.copyTpl(
            this.templatePath('index.html'),
            this.destinationPath('src/index.html')
        );
```
- 需要注意的点：运行 webpack 时并不会生成 html 文件，需要在 webpack.config.js 文件中添加 html-webpack-plugin 插件
```
 plugins:[
        new (require('html-webpack-plugin'))
    ]
```
9. 添加测试功能 macha
 - 添加.babelrc 和 .nycrc文件
 - 添加 jsx 解析支持, 在.babelrc 文件中添加如下
 ```
 ["@babel/plugin-transform-react-jsx",{"pragma": "createElement"}]
 ```
 修改package.json 中 test 内容
  ```
  "test": "mocha --require @babel/register"
 ```
<!-- 注意：由于 macha 不能测试实体 DOM，所以会造成 document is not defined 错误 -->
10. 至此 generator 基本完成了，包含的内容有
    * test
    * converage
    * start
    * build
    这个几个阶段的内容，最终通过 generator 生成的项目文件目录为
    ```
    * lib(库文件)
    * src (源文件)
    * test (测试文件)
    * .babelrc
    * .nycrc
    * package.json
    * webpack.config.is
    ```

