var db = require('../database');
var tablename = 'member_info'

exports.select = function(qs, callback){
    var query = 'SELECT * FROM '+tablename+' WHERE member_id = \"'+qs.member_id+'\"';  
    db.executeRaw(query, callback); 
}

// 일반 login - insert로 변경
exports.insertWithPassword = function(dataObj, hash, salt, qs, callback){
    var member_id = dataObj.member_id;
    var username = dataObj.username;
    var reg_date = new Date();
    var values = [member_id, username, hash, salt, reg_date];
    var query = 'INSERT INTO '+tablename+' (member_id, username, password, salt, reg_date) VALUES(?,?,?,?,?)'
    db.executeByValues(query, values, callback);
}

// SNS login - insertToken으로 변경
exports.insert = function(dataObj, qs, callback){
    var member_id = dataObj.member_id;
    var reg_date = new Date();
    var username = dataObj.username;
    var values = [member_id, username, reg_date];
    var query = 'INSERT INTO '+tablename+' (member_id, username, reg_date) VALUES(?,?,?)'
    db.executeByValues(query, values, callback);
}

// 임시아이디 삭제
exports.delete = function(qs, resolve){
    var query = 'DELETE FROM '+tablename+' WHERE member_id = ?';
    var values = [qs.temp_id];
    db.executeByValues(query, values, resolve);
}

exports.login = function(dataObj, callback){
    var id = dataObj.member_id;
    var query = 'SELECT * FROM '+tablename+' WHERE member_id = \"'+id+'\"';    
    db.executeRaw(query, callback);
}