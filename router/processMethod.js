var processGET = require('./processGET');
var processPOST = require('./processPOST');
var processPUT = require('./processPUT');
var processDELETE = require('./processDELETE');
var logger = require('../util/logger');

exports.route = function(request, response){
    switch(request.method){
        case 'GET':
            logger.info('[3.1] GET');
            processGET.process(request, response);  
            break;
        case 'POST':
            logger.info('[3.1] POST');
            processPOST.process(request, response);
            break;
        case 'PUT':
            logger.info('[3.1] PUT');
            processPUT.process(request, response);   
            break;
        case 'DELETE':
            logger.info('[3.1] DELETE');
            processDELETE.process(request, response);            
            break;
    }
}