const jwt = require('jsonwebtoken')

exports.generate = function (response, pwd, rows) {
    var user = rows[0];
    var payload = {
        id:user.member,
        password:user.password
    }
    var secret = config.secret;
    var token = jwt.sign(
        payload, 
        secret, 
        { 
            algorithm: 'HS256',
            expiresIn: '2 days',
            issuer: '',
            subject: ''
        }
    );
    return token
}

exports.verify = function(request, callback){
    const token = request.headers['x-access-token'] || request.query.token;
    if(!token) return error.send(response, 404, new Error("no token"));
    jwt.verify(token, config.secret, (err, decoded) => {
        callback();
    });
}