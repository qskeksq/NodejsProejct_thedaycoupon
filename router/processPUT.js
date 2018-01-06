var routerUtil = require('../util/routerUtil');
var favorite = require('../controller/favorite');

exports.process = function(request, response){
    var pathname = routerUtil.parsePathname(request);
    var qs = routerUtil.parseQueryString(request);
    console.log('[3.2] PATH : '+pathname); 
    if(pathname[1] == 'favorite' && pathname[2] == 'temp'){
        console.log('[3.3] 임시아이디로 저장한 즐겨찾기 업데이트');
        favorite.updateTempFavoriteName(request, response, qs);
    }
}