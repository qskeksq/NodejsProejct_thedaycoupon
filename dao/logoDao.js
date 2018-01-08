var fs = require('fs');

exports.select = function(qs, callback){
    var logoName = qs.logo_filename;
    var filePath = './public/logo/'+logoName;
    fs.readFile(filePath, callback);
}