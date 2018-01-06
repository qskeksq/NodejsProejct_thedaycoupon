var result = {
    "totalCount": 0,
    "RESULT" : {
        "CODE": "200",
        "MESSAGE": "정상 처리되었습니다"
    },
    "detailImage" : []
}

exports.send = function(code, message, rows, response) {
    result.totalCount = rows.length;
    result.RESULT.CODE = code;
    result.RESULT.MESSAGE = message;
    result.coupon = rows;
    response.end(JSON.stringify(result));     
    var now = new Date();
    console.log('[6] COMPLETE : '+now);    
}