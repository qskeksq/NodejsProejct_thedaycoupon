var http = require('http');
var router = require('./router/processMethod');
var hostname = '172.30.1.56';
var port = 3000;
var db = require('./database');

/**
 * 데이터베이스 서버 연결
 */
db.connect(err=>{
    if(err){
        console.log('데이터베이스에 접속할 수 없습니다');
        console.log(err);
    } else {
        console.log('[1] DATABASE IS RUNNING...');
    }
});

/**
 * 서버 연결시 라우팅
 */
var server = http.createServer((request, response)=>{
    router.route(request, response);
});

/**
 * 서버 연결
 */
server.listen(port, hostname, ()=>{
    console.log(`[2] SERVER IS RUNNING AT http://${hostname}:${port}`);
});