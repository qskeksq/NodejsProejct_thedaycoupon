var db = require('../database');
var tablename = 'favorite_info'


// 즐겨찾기 쿼리
exports.selectFavorites = function(qs, callback){
    var values = qs.member_id;
    var query = 'SELECT * FROM '+tablename+' WHERE member_id = \"'+values+'\"';
    console.log('[4.1] '+query);
    db.executeRaw(query, callback);
}

// 즐겨찾기 한 개 생성
exports.insertFavorite = function(dataObj, callback){
    var values = [dataObj.member_id, dataObj.parent_no, new Date()];
    var query = 'INSERT INTO '+tablename+' (member_id, parent_no, reg_date) VALUES(?,?,?)'
    console.log('[4.1]'+query);
    db.executeByValues(query, values, callback);
}

// 즐겨찾기 다중 생성
exports.insertFavorites = function(values, callback){
    var query = 'INSERT INTO '+tablename+' (member_id, parent_no, reg_date) VALUES '+values;
    console.log('[4.1]'+query);
    db.executeRaw(query, callback);
}

// 즐겨찾기 한 개 삭제
exports.deleteFavorite = function(qs, callback){
    var query = 'DELETE FROM '+tablename+' WHERE member_id = ? AND parent_no=?';
    var values = [qs.member_id, qs.parent_no];
    console.log('[4.1]'+query);
    db.executeByValues(query, values, callback);
}

// 즐겨찾기 다중 삭제
exports.deleteFavorites = function(dataObj, values, callback){
    var query = 'DELETE FROM '+tablename+' WHERE member_id = ? AND parent_no IN ('+values+')';
    var queryValue = [dataObj[0].member_id];
    console.log('[4.1]'+query);
    db.executeByValues(query, queryValue, callback);
}

// 즐겨찾기 다중 삭제
exports.deleteFavoritesById = function(qs, callback){
    var query = 'DELETE FROM '+tablename+' WHERE member_id = ?';
    var values = [qs.member_id];
    console.log('[4.1]'+query);
    db.executeByValues(query, values, callback);
}

// 임시 즐겨찾기 전체 삭제
exports.deleteTempFavorites = function(qs, callback){
    var query = 'DELETE FROM '+tablename+' WHERE member_id = ?';
    var values = [qs.temp_id];
    console.log('[4.1] '+query);
    db.executeByValues(query, values, callback);
}

// 즐겨찾기 업데이트
exports.updateTempFavoriteName = function(qs, callback){
    var query = 'UPDATE '+tablename+' SET member_id = ? WHERE member_id = ?';
    var values = [qs.member_id, qs.temp_id];
    console.log('[4.1]'+query);
    db.executeByValues(query, values, callback);
}

// 즐겨찾기 count++
exports.addFavoriteCount = function(dataObj, callback){
    var query = 'UPDATE dday_info_detail SET favorite_count = IF (isnull(favorite_count), 1, favorite_count+1) WHERE no = ?';
    var values = [dataObj.parent_no];
    console.log('[4.2]'+query);
    db.executeByValues(query, values, callback);
}

// 즐겨찾기 다중 count++
exports.addFavoritesCount = function(values, callback){
    var query = 'UPDATE dday_info_detail SET favorite_count = IF (isnull(favorite_count), 1, favorite_count+1) WHERE no IN('+values+')';
    console.log('[4.2]'+query);
    db.executeRaw(query, callback);
}

// 즐겨찾기 count++
exports.subFavoriteCount = function(qs, callback){
    var query = 'UPDATE dday_info_detail SET favorite_count = IF (isnull(favorite_count), 0, favorite_count-1) WHERE no = ?';
    var values = [qs.parent_no];
    console.log('[4.2]'+query);
    db.executeByValues(query, values, callback);
}

// 즐겨찾기 다중 count--
exports.subFavoritesCount = function(values, callback){
    var query = 'UPDATE dday_info_detail SET favorite_count = IF (isnull(favorite_count), 0, favorite_count-1) WHERE no IN('+values+')';
    console.log('[4.2]'+query);
    db.executeRaw(query, callback);
}