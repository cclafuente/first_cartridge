'use strict';
var server = require('server');
var Logger = require('dw/system/Logger');
const LocalServiceRegistry = require('dw/svc/LocalServiceRegistry');

server.extend(module.superModule); 


var recaptchaValidate = LocalServiceRegistry.createService("google_captcha", {
  createRequest: function(svc, params) {
      var serviceUrl = svc.getConfiguration().getCredential().getURL();

      // set the correct call URL
      // svc.URL = serviceUrl + "?format=json&lang=en-us&nojsoncallback=true";
      svc.URL = serviceUrl + "?secret=6Ld1H8gUAAAAAM_AE-7uUpZOMLcppV5aeNW437EL" + "&response=" + params.recaptcha;
      
      // Need to set some header
      svc.setEncoding('UTF-8');
      svc.setRequestMethod("GET");
      // svc.addHeader("Authorization", "Bearer " + params.token);

      return svc;
  },
  execute: function(svc, params) {
      svc.send(params);
  },
  parseResponse: function(svc, client) {
      return client.text;
  }
});


server.prepend("Subscribe", function(req, res, next){

    //'<h1>This information is inserted before the original Suscribe Route.</h1>');
    var recaptcha = req.form.captcha;
    var email = req.form.emailId;
    var logger = Logger.getLogger("Captcha", "newsletter");
    logger.warn("recaptcha response requested " + recaptcha + " email " + email + " body: ");

    let svc = recaptchaValidate;
    //svc.params.recaptcha = recaptcha;
    
    let result = svc.setThrowOnError().call({ 'recaptcha': recaptcha });
    
    if (result.isOk()){
        let content = result.getObject();
        let recaptchaResponse = JSON.parse(content);
        logger.warn(recaptchaResponse);
        logger.warn(recaptchaResponse.success);
        if (recaptchaResponse.success == true){
          logger.warn("-- recaptcha OK --");
        }else{
          logger.debug("-- recaptcha FAIL --");
        }
    }

    next();
});




module.exports = server.exports();
