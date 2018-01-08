var winston = require('winston');
const timeFormat = () => (new Date()).toLocaleTimeString();
const dateFormat = (new Date()).toLocaleTimeString();
const logger = new winston.Logger({
    transports :
                [
                    new winston.transports.Console({
                        level : 'debug',
                        colorize : true,
                        timestamp : dateFormat
                    }),
                    new (require('winston-daily-rotate-file'))({
                        level: 'info',
                        filename: './log/out.log',
                        timestamp: timeFormat,
                        datePattern: 'yyyy-MM-dd',
                        colorize : true,
                        maxsize: 100000,
                        prepend: true
                    }),
                    new winston.transports.File({
                        level: 'error',
                        filename: './log/err.log',
                        colorize : true,
                        maxsize: 100000,
                        timestamp: dateFormat,
                    })
                ]
});

exports.debug = function(msg){
    logger.debug(msg);
}

exports.info = function(msg){
    logger.info(msg);
}

exports.error = function(msg){
    logger.error(msg);
}
