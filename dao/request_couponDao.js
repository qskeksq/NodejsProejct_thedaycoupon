var db = require('../database');
var tablename = 'request_info';

exports.insert = function(fields, callback){
    var couponObj = JSON.parse(fields.coupon);
    var the_day = couponObj.the_day;
    var main_category = couponObj.main_category;
    var sub_category = couponObj.sub_category;
    var name = couponObj.name;
    var homepage = couponObj.homepage;
    var title = couponObj.title;
    var description = couponObj.description;
    var start_date = couponObj.start_date;
    var end_date = couponObj.end_date;
    var target = couponObj.target;  
    var participate = couponObj.participate;
    var info = couponObj.info;
    var discount_rate = couponObj.discount_rate;
    var notice = couponObj.notice;
    var address = couponObj.notice;
    var longitude = couponObj.longitude;
    var latitude = couponObj.latitude;
    var business_hour = couponObj.business_hour;
    var price = couponObj.price;
    var tel = couponObj.tel;
    var reg_date = new Date();
    var logo_filename = couponObj.logo_filename;
    var values = [the_day,main_category,sub_category,name,homepage,title,description,start_date,end_date,target,
                    participate,info,discount_rate,notice,address,longitude,latitude,business_hour,price,tel,
                    reg_date,logo_filename];
    var query = 'INSERT INTO '+tablename
    query += ' (the_day,main_category,sub_category,name,homepage,title,description,start_date,end_date,';
    query += 'target,participate,info,discount_rate,notice,address,longitude,latitude,business_hour,';
    query += 'price,tel,reg_date,logo_filename) VALUES(?,?,?,?,?,?,?,?,?,? ,?,?,?,?,?,?,?,?,?,?, ?,?)'
    db.executeByValues(query, values, callback);
}