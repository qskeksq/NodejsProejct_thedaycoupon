var dao = require('../dao/detail_photoDao');
var error = require('../error');
var logger = require('../util/logger');
var result = {
    "totalCount": 0,
    "RESULT" : {
        "CODE": "200",
        "MESSAGE": "정상 처리되었습니다"
    },
    "detailImage" : []
}

/**
 * 상세정보 사진 URL
 */
exports.readPhotoUrl = function(request, response, qs){
    logger.info('[4.1] CONTROLLER detail_photo');
    dao.select(qs, (err, rows)=>{
        if(err) return error.send(response, 500, err);
        send(response, rows);
    });
}

function send(response, rows) {
    result.totalCount = rows.length;
    result.detailImage = rows;
    response.end(JSON.stringify(result));     
    logger.info('[6] COMPLETE');    
}