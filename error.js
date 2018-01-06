var result = {
    "RESULT" : {
        "CODE": "200",
        "MESSAGE": "정상 처리되었습니다"
    }
}

exports.send = function(response, code, err){
    var errStr = err.toString();
    if(code === 404){
        result.RESULT.CODE = 404;
        result.RESULT.MESSAGE = "404 Page Not Found : "+errStr;
    } else if(code === 500){
        result.RESULT.CODE = 500;
        result.RESULT.MESSAGE = "500 Internal Server Error : "+errStr;
    }
    response.end(JSON.stringify(result));
    var now = new Date();
    console.log(err);
    console.log('[6] ERR : '+now);
}