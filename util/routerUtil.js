var url = require('url');
var querystring = require('querystring');

exports.parseUrl = function(request){
    return url.parse(request.url);
}

exports.parsePath = function(request){
    return this.parseUrl(request).path;
}

exports.parsePathname = function(request){
    return (this.parseUrl(request)).pathname.split('/');
}

exports.parseQueryString = function(request){
    return querystring.parse(this.parseUrl(request).query);
}