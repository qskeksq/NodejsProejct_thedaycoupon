var dao = require('../dao/wrong_infoDao');
var error = require('../error');
var logger = require('../util/logger');
var result = {
    "totalCount": 0,
    "RESULT" : {
        "CODE": "200",
        "MESSAGE": "정상 처리되었습니다"
    },
    "wrongInfo" : []
}

exports.create = function(request, response){
    logger.info('[4.1] CONTROLLER wrong_info-create');
    var postData = '';
    request.on('data', (data)=>{
        postData += data;
    });
    request.on('end', ()=>{
        var dataObj = JSON.parse(postData);
        dao.insert(dataObj, (err, rows)=>{
            if(err) return error.send(response, 500, err);
            send(response, []);
        });
    });
}

function send(response, rows) {
    result.totalCount = rows.length;
    result.wrongInfo = rows;
    response.end(JSON.stringify(result));     
    logger.info('[6] COMPLETE');    
}