var routerUtil = require('../util/routerUtil')
var member = require('../controller/member');
var favorite = require('../controller/favorite');
var request_coupon = require('../controller/request_coupon');
var wrongInfo = require('../controller/wrong_info');
var logger = require('../util/logger');

exports.process = function(request, response){
    var pathname = routerUtil.parsePathname(request);
    var path = routerUtil.parsePath(request);
    logger.info('[3.2] '+path); 
    if(pathname[1] == 'member' && pathname[2] == 'info'){
        var qs = routerUtil.parseQueryString(request);
        member.create(request, response, qs);
    } else if(pathname[1] == 'member' && pathname[2] == 'login'){
        member.login(request, response);
    } else if(pathname[1] == 'favorite' && pathname[2] == 'info'){
        favorite.createFavorite(request, response);
    } else if(pathname[1] == 'favorite' && pathname[2] == 'leftOvers' && pathname[3] == 'create'){
        favorite.createLeftOvers(request, response);
    } else if(pathname[1] == 'favorite' && pathname[2] == 'leftOvers' && pathname[3] == 'delete'){
        favorite.deleteLeftOvers(request, response);
    } else if(pathname[1] == 'request' && pathname[2] == 'info'){
        request_coupon.create(request, response);
    } else if(pathname[1] == 'wrongInfo'){
        wrongInfo.create(request, response);
    }
}