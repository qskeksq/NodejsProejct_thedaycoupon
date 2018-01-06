var db = require('../database');
var tablename = 'dday_info_version';

exports.select = function(callback){
    var query = 'SELECT * FROM '+tablename;
    db.executeRaw(query, callback);
}