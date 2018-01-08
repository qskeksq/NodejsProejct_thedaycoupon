var db = require('../database');
var tablename = 'wrong_info';

exports.insert = function(dataObj, callback){
    var title = dataObj.title;
    var content = dataObj.content;
    var email = dataObj.email;
    var tel = dataObj.tel;
    var parent_no = dataObj.parent_no;
    var reg_date = new Date();
    // 소셜로그인인 경우
    var query = 'INSERT INTO '+tablename+' (parent_no, title, content, email, tel, reg_date) VALUES (?,?,?,?,?,?)';
    var values = [parent_no, title, content, email, tel, reg_date];
    db.executeByValues(query, values, callback);
}