var mysql = require('mysql');
var config = require('../config');
var pool;

/**
 * 커넥션 풀을 통해 연결 제한
 */
exports.connect = function(done){
    pool = mysql.createPool(config.db_options);
    done();
}

exports.executeRaw = function(query, callback){
    console.log('[5] DAO executeRaw');
    pool.query(query, (err, rows, fields)=>{
        if(err) {
            console.log('[5.1] DAO 쿼리 오류')
            console.log(err);
            callback(err);
        } else {
            console.log('[5.1] DAO 쿼리 성공')
            callback(err, rows);
        }
    });
}

exports.executeByValues = function(query, values, callback){
    console.log('[5] DAO executeByValues');
    pool.query(query, values, (err, rows, fields)=>{
        if(err){
            console.log('[5.1] DAO 쿼리 오류')
            console.log(err);
            callback(err);
        } else {
            console.log('[5.1] DAO 쿼리 성공')
            callback(err, rows);
        }
    });
}

// exports.executeByValues = function(query, values, resolve){
//     console.log('[5] DAO executeByValues');
//     pool.query(query, values, (err, rows, fields)=>{
//         if(err){
//             console.log('[5.1] DAO 쿼리 오류')
//             console.log(err);
//             resolve(err);
//         } else {
//             console.log('[5.1] DAO 쿼리 성공')
//             resolve({"err":err, "rows":rows});
//         }
//     });
// }