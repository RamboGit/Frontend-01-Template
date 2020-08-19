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

//发送打包数据
archive.pipe(req);
archive.finalize();
archive.on('end', () => {
    console.log('打包完成---', archive.pointer());
    req.end();
});
archive.on('error', function (err) {
    throw err;
});

