var routerUtil = require('../util/routerUtil')
var member = require('../controller/member');
var favorite = require('../controller/favorite');
var request_coupon = require('../controller/request_coupon');
var wrongInfo = require('../controller/wrong_info');

exports.process = function(request, response){
    var pathname = routerUtil.parsePathname(request);
    console.log('[3.2] PATH : '+pathname); 
    if(pathname[1] == 'member' && pathname[2] == 'info'){
        console.log('[3.3] 멤버정보 생성');
        var qs = routerUtil.parseQueryString(request);
        member.create(request, response, qs);
    } else if(pathname[1] == 'member' && pathname[2] == 'login'){
        console.log('[3.3] 로그인');
        member.login(request, response);
    } else if(pathname[1] == 'favorite' && pathname[2] == 'info'){
        console.log('[3.3] 즐겨찾기 저장');
        favorite.createFavorite(request, response);
    } else if(pathname[1] == 'favorite' && pathname[2] == 'leftOvers' && pathname[3] == 'create'){
        console.log('[3.3] 미반영 즐겨찾기 데이터 저장');
        favorite.createLeftOvers(request, response);
    } else if(pathname[1] == 'favorite' && pathname[2] == 'leftOvers' && pathname[3] == 'delete'){
        console.log('[3.3] 미반영 즐겨찾기 데이터 삭제');
        favorite.deleteLeftOvers(request, response);
    } else if(pathname[1] == 'request' && pathname[2] == 'info'){
        console.log('[3.3] 쿠폰 요청');
        request_coupon.create(request, response);
    } else if(pathname[1] == 'wrongInfo'){
        console.log('[3.3] 잘못된 정보 제보');
        wrongInfo.create(request, response);
    }
}