var dao = require('../dao/memberDao');
var logger = require('../util/logger');
var bkfd2Password = require("pbkdf2-password");
var hasher = bkfd2Password();
var error = require('../error');
var config = require('../config');

/**
 * 응답은 객체로 모두 바꾼다
 */
var result = {
    "totalCount": 0,
    "RESULT" : {
        "CODE": "200",
        "MESSAGE": "정상 처리되었습니다"
    },
    "member" : []
}

/**
 * 아이디 중복 확인
 */
exports.searchMember = function(request, response, qs){
    logger.info('[4.1] CONTROLLER member-searchMember');
    dao.select(qs, (err, rows)=>{
        if(err) return error.send(response, 500, err);
        if(rows.length > 0) return send(response, rows, "exists");
        return send(response, rows, "non_exists");       
    })
}

/**
 * 회원정보 생성
 */
exports.create = function(request, response, qs){
    logger.info('[4.1] CONTROLLER member-create');
    var postData = '';
    request.on('data', (data)=>{
        postData += data;
    });
    request.on('end', ()=>{
        var dataObj = JSON.parse(postData);
        // 소셜로그인인 경우
        if(dataObj.password == null){
            dao.insert(dataObj, qs, (err, rows)=>{
                if(err) return error.send(response, 500, err);
                if(!qs.temp_id) return send(response, [], "정상 처리되었습니다");
                dao.delete(qs, (err, rows)=>{
                    if(err) return error.send(response, 500, err);
                    return send(response, [], "정상 처리되었습니다");
                });
            });
        } else {
            hashPassword(dataObj, qs, (hash, salt)=>{
                dao.insertWithPassword(dataObj, hash, salt, qs, (err, rows)=>{
                    if(err) return error.send(response, 500, err);
                    if(!qs.temp_id) return send(response, rows, "정상 처리되었습니다");
                    dao.delete(qs, (err, rows)=>{
                        if(err) return error.send(response, 500, err);
                        return send(response, [], "정상 처리되었습니다");
                    });
                });
            })
        }
    });
}

exports.login = function(request, response){
    logger.info('[4.1] CONTROLLER member-login');
    var postData = '';
    request.on('data', (data)=>{
        postData += data;
    });
    request.on('end', ()=>{
        var dataObj = JSON.parse(postData);
        var pwd = dataObj.password;
        dao.login(dataObj, (err, rows)=>{
            if(err) return error.send(response, 500, err);
            if(rows.length > 0) return unHashPassword(response, pwd, rows);
            return send(response, [], "non_exists")
        })
    });
}

function hashPassword(dataObj, qs, callback){
    hasher({password:dataObj.password}, function(err, pass, salt, hash){
        callback(hash, salt)
    });
}

function unHashPassword(response, pwd, rows) {
    hasher({password:pwd, salt:rows[0].salt}, function(err, pass, salt, hash){
        if(hash === rows[0].password){
            result.member.push({username : user.username});
            return send(response, rows, "exists");         
        } 
        return send(response, [], "wrong");
    });
}

function send(response, rows, message) {
    if(rows != null) result.totalCount = rows.length;
    result.member = rows;
    result.RESULT.MESSAGE = message;
    response.end(JSON.stringify(result));    
    logger.info('[6] COMPLETE');     
}