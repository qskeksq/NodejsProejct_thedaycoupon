var dao = require('../dao/versionDao');
var error = require('../error');
var result = {
    "totalCount": 0,
    "RESULT" : {
        "CODE": "200",
        "MESSAGE": "정상 처리되었습니다"
    },
    "version" : 0
}

exports.readVersion = function(request, response){
    console.log('[4] CONTROLLER version-read');
    dao.select((err, rows)=>{
        if(err) return error.send(response, 500, err);
        send(response, rows);
    });
}

function send(response, rows) {
    var position = rows.length-1;
    result.version = rows[position].version;
    result.totalCount = rows.length;
    response.end(JSON.stringify(result)); 
    var now = new Date();
    console.log('[6] DB VERSION:'+result.version);  
    console.log('[6] COMPLETE : '+now);     
}