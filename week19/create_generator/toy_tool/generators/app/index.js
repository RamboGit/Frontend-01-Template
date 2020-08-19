var Generator = require('yeoman-generator');

module.exports = class extends Generator {
    //该 generator 中的方法按顺序执行
    constructor(args, opts) {
        // Calling the super constructor is important so our generator is correctly set up
        super(args, opts);
    }

    collecting(){
        console.log('collecting');
    }

    creating() {
        
        this.fs.copyTpl(
            this.templatePath('package.json'),
            this.destinationPath('package.json')
        );

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

        this.fs.copyTpl(
            this.templatePath('.babelrc'),
            this.destinationPath('.babelrc')
        );

        this.fs.copyTpl(
            this.templatePath('.nycrc'),
            this.destinationPath('.nycrc')
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
};