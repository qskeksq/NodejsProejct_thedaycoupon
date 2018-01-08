var routerUtil = require('../util/routerUtil')
var coupon = require('../controller/coupon');
var detailPhoto = require('../controller/detail_photo');
var favorite = require('../controller/favorite');
var member = require('../controller/member');
var version = require('../controller/version');
var logo = require('../controller/logo');
var logger = require('../util/logger');

exports.process = function(request, response){        
    var pathname = routerUtil.parsePathname(request);
    var path = routerUtil.parsePath(request);
    logger.info('[3.2] '+path); 
    if(pathname[1] == 'coupon' && pathname[2] == 'all'){
        coupon.readAll(request, response);
    } else if(pathname[1] == 'coupon' && pathname[2] == 'photo'){
        var qs = routerUtil.parseQueryString(request);        
        detailPhoto.readPhotoUrl(request, response, qs);
    } else if(pathname[1] == 'favorite' && pathname[2] == 'info'){
        var qs = routerUtil.parseQueryString(request);    
        favorite.readFavorites(request, response, qs);
    } else if(pathname[1] == 'member' && pathname[2] == 'info'){
        var qs = routerUtil.parseQueryString(request);        
        member.searchMember(request, response, qs);
    } else if(pathname[1] == 'version'){
        version.readVersion(request, response);
    } else if(pathname[1] == 'logo' && pathname[2] == 'info'){
        var qs = routerUtil.parseQueryString(request);        
        logo.readLogoFiles(request, response, qs);
    }
}