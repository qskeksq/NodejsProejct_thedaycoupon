var http = require('http');
var router = require('./router/processMethod');
var hostname = '192.168.0.123';
var port = 3000;
var db = require('./database');
var logger = require('./util/logger');

/**
 * 데이터베이스 서버 연결
 */
db.connect(err=>{
    if(err){
        console.log('데이터베이스에 접속할 수 없습니다');
        console.log(err);
    } else {
        console.log('[1] DATABASE IS RUNNING...');
        logger.info('[1.1] DATABASE IS RUNNING...');
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
    logger.info(`[2.1] SERVER IS RUNNING AT http://${hostname}:${port}`);
});