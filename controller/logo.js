var dao = require('../dao/logoDao');
var error = require('../error');
var logger = require('../util/logger');
var result = {
    "totalCount": 0,
    "RESULT" : {
        "CODE": "200",
        "MESSAGE": "정상 처리되었습니다"
    },
    "logoImage" : []
}

/**
 * 로고 파일 읽기
 */
exports.readLogoFiles = function(request, response, qs){
    logger.info('[4.1] CONTROLLER logo-read');
    dao.select(qs, (err, data)=>{
        if(err) return error.send(response, 500, err);
        send(response, data);
    })
}

function send(response, rows) {
    result.totalCount = rows.length;
    result.logoImage = rows;
    response.end(JSON.stringify(result));     
    logger.info('[6] COMPLETE');    
}