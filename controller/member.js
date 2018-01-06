var dao = require('../dao/memberDao');
var bkfd2Password = require("pbkdf2-password");
var hasher = bkfd2Password();
var jwt = require('jsonwebtoken');
var error = require('../error');
var config = require('../config');

/**
 * 응답은 객체로 모두 바꾼다
 */
var result = {
    // "token":"",
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
    console.log('[4] CONTROLLER member-searchMember');
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
    console.log('[4] CONTROLLER member-create');
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

// exports.create = function(request, response, qs){
//     console.log('[4] CONTROLLER member-create');

//     var postData = '';
//     request.on('data', (data)=>{
//         postData += data;            
//     });

//     request.on('end', ()=>{
//         var dataObj = JSON.parse(postData);
//         checkPassword(dataObj)
//             .then(resolveInsert)
//             .then(resolveDelete)
//             .then(sendResult)
//             .catch(sendErr);
//     });
    
//     const checkPassword = function(dataObj){
//         return new Promise((resolve, reject)=>{
//             if(dataObj.password == null)
//                 dao.insert(dataObj, qs, resolve);
//         })
//     }

//     // resolve, reject는 인자를 하나밖에 받지 못함
//     const resolveInsert = function(value){
//         return new Promise((resolve, reject)=>{
//             if(value.err) reject(value.err);
//             if(!qs.temp_id) return send(response, value.rows, "정상 처리되었습니다");
//             dao.delete(qs, resolve);
//         })
//     }

//     const resolveDelete = function(value){
//         return new Promise((resolve, reject)=>{
//             if(value.err) reject(value.err);
//             resolve(value.rows);
//         });
//     };

//     const sendResult = (rows)=>{
//         send(response, rows, "정상 처리되었습니다");
//     }

//     const sendErr = (err)=>{
//         error.send(response, 500, err);
//     }
// }

/**
 * 회원 로그인
 */
// exports.login = function(request, response){
//     console.log('[4] CONTROLLER member-login');
//     var postData = '';
//     request.on('data', (data)=>{
//         postData += data;
//     });
//     request.on('end', ()=>{
//         var dataObj = JSON.parse(postData);
//         var pwd = dataObj.password;
//         dao.login(dataObj, (err, rows)=>{
//             if(err) return error.send(response, 500, err);
//             if(rows.length > 0) return unHashPassword(response, pwd, rows);
//             return send(response, rows, "non_exists")
//         })
//     });
// }

exports.login = function(request, response){
    console.log('[4] CONTROLLER member-login');
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
            return send(response, rows, "non_exists")
        })
    });
}

// exports.login = function(request, response){
    
//     const token = request.headers['x-access-token'] || request.query.token;

//     if(!token) return error.send(response, 404, new Error("no token"));

//     jwt.verify(token, config.secret, (err, decoded) => {
//         if(err) return error.send(response, 404, error);
//         console.log(decoded);
//     });
// }


function hashPassword(dataObj, qs, callback){
    hasher({password:dataObj.password}, function(err, pass, salt, hash){
        console.log(err, pass, salt, hash);
        callback(hash, salt)
    });
}

// function unHashPassword(response, pwd, rows) {
//     hasher({password:pwd, salt:rows[0].salt}, function(err, pass, salt, hash){
//         if(hash === rows[0].password){
//             var user = rows[0];
//             var payload = {
//                 id:user.member,
//                 password:user.password
//             }
//             var secret = config.secret;
//             var token = jwt.sign(
//                 payload, 
//                 secret, 
//                 { 
//                     algorithm: 'HS256',
//                     expiresIn: '2 days',
//                     issuer: 'thedaycoupon.com',
//                     subject: 'memberInfo'
//                 }
//                 // (err, token) => {
//                 //     if (err) return error.send(response, 500, err);
//                 //     result.token = token;
//                 //     result.member.push({username : username});
//                 //     return send(response, rows, "exists"); 
//                 // }
//             );
//             result.token = token;
//             result.member.push({username : user.username});
//             return send(response, rows, "exists");         
//         } 
//         result.token = '';
//         return send(response, [], "wrong");
//     });
// }

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
    var now = new Date(); 
    console.log('[6] COMPLETE - '+message);
    console.log('[6] COMPLETE : '+now);    
}