var formidable = require('formidable');
var form = new formidable.IncomingForm();
var logger = require('../util/logger');
var error = require('../error');
var dao = require('../dao/request_couponDao');
var result = {
    "totalCount": 0,
    "RESULT" : {
        "CODE": "200",
        "MESSAGE": "정상 처리되었습니다"
    },
    "coupon" : 0
}

exports.create = function(request, response){
    logger.info('[4.1] CONTROLLER request_coupon-create');
    form.on('fileBegin', (name, file)=>{
        var length = file.name.length;
        if(file.name.endsWith('.png')) {
            file.path = './public/request_logo/' + file.name;
        } else {
            file.path = './public/request_detail/' + file.name;
        }
    });
    form.parse(request, function(err, fields, files) {
        dao.insert(fields, (err, rows)=>{
            if(err) return error.send(response, 500, err);
            send(response, []);
        })
    });
}

function send(response, rows) {
    result.totalCount = rows.length;
    result.coupon = rows;
    response.end(JSON.stringify(result));     
    logger.info('[6] COMPLETE');       
}