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
