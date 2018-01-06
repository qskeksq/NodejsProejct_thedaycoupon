var routerUtil = require('../util/routerUtil');
var favorite = require('../controller/favorite');

exports.process = function(request, response){
    var pathname = routerUtil.parsePathname(request);
    var path = routerUtil.parsePath(request);
    var qs = routerUtil.parseQueryString(request);
    console.log('[3.2] PATH : '+path); 
    if(pathname[1] == 'favorite' && pathname[2] == 'info'){
        console.log('[3.3] 즐겨찾기 삭제');
        favorite.deleteFavorite(request, response, qs);
    } else if(pathname[1] == 'favorite' && pathname[2] == 'signedUp'){
        console.log('[3.3] 회원가입한 아이디로 저장한 즐겨찾기 삭제');
        favorite.deleteSignedUpFavorites(request, response, qs);
    } else if(pathname[1] == 'favorite' && pathname[2] == 'temp'){
        console.log('[3.3] 임시아이디로 저장한 즐겨찾기 삭제');
        favorite.deleteTempFavorites(request, response, qs);
    }
} 