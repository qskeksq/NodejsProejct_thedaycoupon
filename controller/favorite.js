var dao = require('../dao/favoriteDao');
var datetime = require('node-datetime');
var tablename_dday_info_detail = 'dday_info_detail';
var logger = require('../util/logger');
var error = require('../error');
var result = {
    "totalCount": 0,
    "RESULT" : {
        "CODE": "200",
        "MESSAGE": "정상 처리되었습니다"
    },
    "favorite" : []
}

/**
 * 회원가입한 아이디로 즐겨찾기 쿼리
 */
exports.readFavorites = function(request, response, qs){
    logger.info('[4.1] CONTROLLER favorite-readFavorites');
    dao.selectFavorites(qs, (err, rows)=>{
        if(err) return error.send(response, 500, err);
        send(response, rows);
    })
}

/**
 * 즐겨찾기 추가
 */
exports.createFavorite = function(request, response){
    logger.info('[4.1] CONTROLLER favorite-create');
    var postData = '';
    request.on('data', (data)=>{
        postData += data;
    });
    request.on('end', ()=>{
        var dataObj = JSON.parse(postData);
        dao.insertFavorite(dataObj, (err, rows)=>{
            if(err) return error.send(response, 500, err);
            dao.addFavoriteCount(dataObj, (err, rows)=>{
                if(err) return error.send(response, 500, err);
                send(response, []);
            })
        }); 
    });
}

/**
 * 네트워크 문제로 추가되지 않은 즐겨찾기 데이터 반영
 */
exports.createLeftOvers = function(request, response){
    logger.info('[4.1] CONTROLLER favorite-createLeftOvers');
    var postData = '';
    request.on('data', (data)=>{
        postData += data;
    });
    request.on('end', ()=>{
        var dataObj = JSON.parse(postData);
        makeInsertValue(dataObj, (values)=>{
            dao.insertFavorites(values, (err, rows)=>{
                if(err) return error.send(response, 500, err);
                makeUpdateValue(dataObj, (values)=>{
                    dao.addFavoritesCount(values, (err, rows)=>{
                        if(err) return error.send(response, 500, err);
                        send(response, []);
                    })
                })
            });
        });
    });
};

/**
 * 임시아이디로 저장한 데이터 유지 -> 회원 아이디로 저장한 데이터가 없는 경우
 */
exports.updateTempFavoriteName = function(request, response, qs){
    logger.info('[4.1] CONTROLLER favorite-updateTempFavoriteToSignUpId');
    dao.updateTempFavoriteName(qs, (err, rows)=>{
        if(err) return error.send(response, 500, err);
        send(response, []);
    });
}

/**
 * 네트워크 문제로 삭제되지 않은 즐겨찾기 데이터 삭제
 */
exports.deleteLeftOvers = function(request, response){
    logger.info('[4.1] CONTROLLER favorite-deleteLeftOvers');
    var postData = '';
    request.on('data', (data)=>{
        postData += data;
    });
    request.on('end', ()=>{
        var dataObj = JSON.parse(postData);
        makeUpdateValue(dataObj, (values)=>{
            dao.subFavoritesCount(values, (err, rows)=>{
                if(err) return error.send(response, 500, err);
                dao.deleteFavorites(dataObj, values, (err, rows)=>{
                    if(err) return error.send(response, 500, err);
                    send(response, []);
                });
            });
        });
    });
};

/**
 * 임시아이디로 저장한 데이터 유지 -> 회원 아이디로 저장한 데이터가 있는 경우
 * 1. 회원 아이디로 저장한 쿠폰 데이터 삭제()
 * 2. 임시아이디로 저장한 데이터 회원 아이디로 바꿔줌
 */
exports.deleteSignedUpFavorites = function(request, response, qs){
    logger.info('[4.1] CONTROLLER favorite-deleteSignedUpFavorite');
    dao.selectFavorites(qs, (err, rows)=>{
        if(err) return error.send(response, 500, err);
        if(rows.length == 0) return send(response, []);
        makeUpdateValue(rows, (values)=>{
            dao.subFavoritesCount(values, (err, rows)=>{
                if(err) return error.send(response, 500, err);
                dao.deleteFavoritesById(qs, (err, rows)=>{
                    if(err) return error.send(response, 500, err);
                    dao.updateTempFavoriteName(qs, (err, rows)=>{
                        if(err) return error.send(response, 500, err);
                        send(response, []);
                    });
                });
            });
        });
    });
}

/**
 * 즐겨찾기 한 개 삭제
 */
exports.deleteFavorite = function(request, response, qs){
    logger.info('[4.1] CONTROLLER favorite-delete');
    dao.deleteFavorite(qs, (err, rows)=>{
        if(err) return error.send(response, 500, err);
        dao.subFavoriteCount(qs, (err, rows)=>{
            if(err) return error.send(response, 500, err);
            send(response, []);
        });
    });
}

/**
 * 회원아이디로 저장한 데이터 유지 -> 임시데이터가 있는 경우
 */
exports.deleteTempFavorites = function(request, response, qs){
    logger.info('[4.1] CONTROLLER favorite-deleteTempFavorite');
    dao.deleteTempFavorites(qs, (err, rows)=>{
        if(err) return error.send(response, 500, err);
        send(response, []);
    });
}

function send(response, rows) {
    result.totalCount = rows.length;
    result.favorite = rows;
    response.end(JSON.stringify(result));     
    logger.info('[6] COMPLETE');    
}

function makeInsertValue(dataObj, callback){
    var values = '';
    var reg_date = '';
    var dt = datetime.create();
    var formatted = dt.format('Y-m-d H:M:S');
    for(var i=0; i<dataObj.length; i++){
        if(dataObj.reg_date == null){
            reg_date = formatted;
        }
        values += "(\""+dataObj[i].member_id+"\", \""+dataObj[i].parent_no+"\", \""+reg_date+"\")";
        if(dataObj.length-1 != i){
            values += ', ';
        }
    }
    callback(values);
}

function makeUpdateValue(dataObj, callback) {
    var values = '';
    for(var i=0; i<dataObj.length; i++){
        values += dataObj[i].parent_no;
        if(dataObj.length-1 != i){
            values += ', ';
        }
    }
    callback(values);
}