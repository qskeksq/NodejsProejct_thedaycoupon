var db = require('../database');
var tablename = 'dday_info_detail';

exports.selectAll = function(callback){
    var query = 'SELECT * FROM '+tablename;
    console.log('[4.1] DAO - '+query);    
    db.executeRaw(query, callback)
}

exports.selectByLocation = function(qs, callback){
    var user_lat = parseFloat(qs.latitude);
    var user_long = parseFloat(qs.longitude);
    var radius = qs.radius; // 결과값이 km인 값을 params로 전달해줘야 함
    var distance = '(6371*(acos(cos(radians(?)) * cos(radians(latitude)) * cos(radians(longitude)-radians(?))'
                    +'+ sin(radians(?)) * sin(radians(latitude)))))';
    var query = 'SELECT *, '+distance+' AS distance FROM '+tablename+' HAVING distance <= '+radius+' ORDER BY distance';   
    var values = [user_lat, user_long, user_lat];
    db.executeByValues(query, values, callback);
}