var routerUtil = require('../util/routerUtil')
var coupon = require('../controller/coupon');
var detailPhoto = require('../controller/detail_photo');
var favorite = require('../controller/favorite');
var member = require('../controller/member');
var version = require('../controller/version');
var logo = require('../controller/logo');

exports.process = function(request, response){        
    var pathname = routerUtil.parsePathname(request);
    console.log('[3.2] '+ routerUtil.parsePath(request)); 
    if(pathname[1] == 'coupon' && pathname[2] == 'all'){
        console.log('[3.3] 쿠폰 전체 데이터');
        coupon.readAll(request, response);
    } else if(pathname[1] == 'coupon' && pathname[2] == 'photo'){
        console.log('[3.3] 쿠폰 상세 사진')
        var qs = routerUtil.parseQueryString(request);        
        detailPhoto.readPhotoUrl(request, response, qs);
    } else if(pathname[1] == 'favorite' && pathname[2] == 'info'){
        console.log('[3.3] 즐겨찾기 정보');
        var qs = routerUtil.parseQueryString(request);    
        favorite.readFavorites(request, response, qs);
    } else if(pathname[1] == 'member' && pathname[2] == 'info'){
        console.log('[3.3] 멤버 정보');
        var qs = routerUtil.parseQueryString(request);        
        member.searchMember(request, response, qs);
    } else if(pathname[1] == 'version'){
        console.log('[3.3] 데이터베이스 버전 확인');
        version.readVersion(request, response);
    } else if(pathname[1] == 'logo' && pathname[2] == 'info'){
        console.log('[3.3] 로고 파일');
        var qs = routerUtil.parseQueryString(request);        
        logo.readLogoFiles(request, response, qs);
    }
}