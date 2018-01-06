var db = require('../database');
var tablename = 'dday_info_photo_url';

exports.select = function(qs, callback){
    var values = [qs.parent_no];
    var query = 'SELECT * FROM '+tablename+' WHERE parent_no=?';
    db.executeByValues(query, values, callback);
}