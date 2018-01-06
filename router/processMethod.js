var processGET = require('./processGET');
var processPOST = require('./processPOST');
var processPUT = require('./processPUT');
var processDELETE = require('./processDELETE');

exports.route = function(request, response){
    console.log('[3] ROUTING...')
    switch(request.method){
        case 'GET':
            console.log('[3.1] GET');
            processGET.process(request, response);  
            break;
        case 'POST':
            console.log('[3.1] POST');
            processPOST.process(request, response);
            break;
        case 'PUT':
            console.log('[3.1] PUT');
            processPUT.process(request, response);   
            break;
        case 'DELETE':
            console.log('[3.1] DELETE');
            processDELETE.process(request, response);            
            break;
    }
}