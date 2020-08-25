var express = require('express');
var fs = require('fs');
var unzipper = require('unzipper');
const http = require('https');
const querystring = require('querystring');

var router = express.Router();

/* GET home page. */
router.get('/', function(req, res, next) {
  console.log(req);
  res.send("get Hello world");
});

router.get('/auth', function(req, res, next) {
  console.log(req.query.code);

  //发送 auth申请 token
  const url = `https://github.com/login/oauth/access_token?client_id=Iv1.c51b99c8fbc711e6&client_secret=8b236502d70cf3ea3b6cee8b8054ea4d77ca53ee&code=${req.query.code}&redirect_uri=http://localhost:8081/auth&state=change`
  const options = {
    method: 'POST'
  };
  const request = http.request(url,options, (response) => {
    response.setEncoding('utf8');
    let token,error;
    response.on('data', (chunk) => {
      console.log(`响应主体` + chunk);
      error = chunk.match(/^error=([^&]+)/);
      if(error){

      }else{
        let result = chunk.match(/^access_token=([^&]+)/);
        token = result[1];
        console.log('access_token',token);
      }
      console.log(error);
    });
    response.on('end', () => {
      console.log('响应中已无数据');
      if(!error){
        res.set({
          'Content-Type': 'text/html',
          'Access-Token': token
        })
        res.status(200).send(`<a href=http://localhost:8080/publish?token=${token}>publish</a>`);
      } else{
        res.set({
          'Content-Type': 'text/plain'
        });
        res.status(200).send(`not found`);
      }
      
    });
  });

  request.on('error', (e) => {
    console.error(`请求遇到问题: ${e.message}`);
  });
  request.end();
 
});

router.post('/publish', function (req, res, next) {

  //校验用户以及用户权限检查
  let userToken = req.headers.token;
  const options = {
    method: 'GET',
    port: 443,
    headers: {
      'Authorization': "token " + userToken,
      'User-Agent': 'change-toy-publish'
    }
  };
  const request = http.request("https://api.github.com/user", options, (response) => {
    let body = "";
    response.on('data', (chuck) => {
      body += chuck.toString();

    });
    response.on('end', () => {
      console.log('data', body);
      console.log('获取用户信息');
      //真正的操作
      let writeStream = unzipper.Extract({ path: './public/' });
      req.pipe(writeStream);
      req.on('end', () => {
        console.log('接收数据完成');
        writeStream.on('finish', () => {
          console.log('解压完成');
          res.status(200).jsonp({ message: 'success' })
        });
        writeStream.on('error', (e) => {
          console.log('解压失败');
          res.status(200).jsonp({ message: 'error' })
        });
      });
      req.on('error', (error) => {
        console.log('请求错误', error);
      });
    });
  });
  request.on('error', (e) => {
    console.error(`请求遇到问题: ${e.message}`);
  });
  request.end();
});



  //把发送过来的数据进行解压

  
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

module.exports = router;
