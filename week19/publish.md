# 实现一个本地 Web发布系统
需要的用到的库
* [express](http://expressjs.com/)
* [Node.js 文件库](http://nodejs.cn/api/fs.html#fs_fs_createwritestream_path_options)
* [压缩文件库 Archiver](https://www.npmjs.com/package/archiver)
* 解压文件库(二选一) 
    * [unzip](https://www.npmjs.com/package/unzip)
    * [unzipper](https://www.npmjs.com/package/unzipper)
    
## 需要的系统有：
1.  server --用于用户访问的系统
2.  publish-tool   -- 用于开发者发布系统用的发布工具（客户端）
3.  publish-server   -- 用于连接 pulish-tool 和 server的服务系统
    * 接收 pblish-tool的内容提交
    * 通过把提交的文件内容存储到 server 中相应的目录下
    * 对开发者的身份进行验证
    * 发布版本控制

## 1. 创建 server系统
```
cd server
npx express-generator --no-view
npm install
npm start(运行)
```
* 需要注意的坑：删除 public 目录下的 index.html,要不访问 server 时不会调用 routes/index.js  下的router  方法

## 2. 创建 publish-server
```
cd publish-server
npx express-generator --no-view
npm install
```

## 3. 创建 publish-tool
```
mkdir publish-tool
cd publish-tool
npm init

修改名称 index.js -> publish.js
添加需要打包的目录文件 package
```
1.  启动 publish-server 服务（端口8081）
```
在 routers/index.js 中监听请求
router.get('/', function(req, res, next) {
  console.log(req);
  res.send("Hello world");  //返回 hello world
});

```
2.  在publish-tool创建网络请求使其能访问发送数据到 publish-server
``` publish.js
const querystring = require('querystring');
const http = require('http');

const postData = querystring.stringify({
    'msg': '你好世界'
  });
  
  const options = {
    hostname: '127.0.0.1',
    port: 8081,
    path: '/',
    method: 'POST',
    headers: {
      'Content-Type': 'application/x-www-form-urlencoded',
      'Content-Length': Buffer.byteLength(postData)
    }
  };
  
  const req = http.request(options, (res) => {
    console.log(`状态码: ${res.statusCode}`);
    console.log(`响应头: ${JSON.stringify(res.headers)}`);
    res.setEncoding('utf8');
    res.on('data', (chunk) => {
      console.log(`响应主体: ${chunk}`);
    });
    res.on('end', () => {
      console.log('响应中已无数据');
    });
  });
  
  req.on('error', (e) => {
    console.error(`请求遇到问题: ${e.message}`);
  });
  
  // 将数据写入请求主体。
  req.write(postData);
  req.end();
```
运行 node publish.js可以获取到 publish-server 返回的数据
3. 正式进入文件压缩打包环节（在 pubish-tool 中进行打包）
 * 把需要打包的文件放入 package 文件中
 * 添加 fs 文件操作库
 * 添加 archiver 文件压缩库
 ```
 const querystring = require('querystring');
 const http = require('http');
 var fs = require('fs');
 var archiver = require('archiver');

 const options = {
     hostname: '127.0.0.1',
     port: 8081,
     path: '/',
     method: 'POST',
     headers: {
         'Content-Type': 'application/octet-stream'
     }
 };

 let archive = archiver('zip', {
     zlib: { level: 9 }
 });
 archive.directory('./package', false);

 const req = http.request(options, (res) => {
     // console.log(`状态码: ${res.statusCode}`);
     // console.log(`响应头: ${JSON.stringify(res.headers)}`);
     res.setEncoding('utf8');
     res.on('data', (chunk) => {
         // console.log(`响应主体: ${chunk}`);
     });
     res.on('end', () => {
         // console.log('响应中已无数据');
     });
 });

 req.on('error', (e) => {
     console.error(`请求遇到问题: ${e.message}`);
 });

 //发送压缩文件数据
 archive.pipe(req);
 archive.finalize();
 archive.on('end', () => {
     console.log('打包完成---', archive.pointer());
     req.end();
 });
 archive.on('error', function (err) {
     throw err;
 });


 ```
 4. 接收压缩文件解压并存储到相应目录
 ```
 var express = require('express');
 var fs = require('fs');
 var unzipper = require('unzipper');

 var router = express.Router();

 /* GET home page. */
 router.get('/', function(req, res, next) {
   console.log(req);
   res.send("get Hello world");
 });

 router.post('/', function(req, res, next) {
   //把发送过来的数据进行解压
   let writeStream = unzipper.Extract({ path: '../server/public/' });
   req.pipe(writeStream);
   req.on('end', ()=>{
     writeStream.end();
     res.send('ok');
   })
   /*let writeStream = fs.createWriteStream("./public/package.zip");
   req.pipe(writeStream);
   req.on('end', ()=>{
     writeStream.end(); //记得结束写文件操作
     res.send('ok');
   });*/
   /*req.on('data', truck =>{
     console.log(truck);
     writeStream.write(truck);
   });
   req.on('end', (truck) => {
     writeStream.end(truck);
     res.send('ok');
   })*/
 });

 module.exports = router;
 ```
 完成 ！！！！

