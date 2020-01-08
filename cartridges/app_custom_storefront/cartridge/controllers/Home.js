'use strict';

var server = require('server');
//inherit functionality with module.superModule by using the extend method

server.extend(module.superModule); 

server.prepend("Show", function(req, res, next){
//insert functionality before the Show Route using server.prepend

	   var viewData = res.getViewData();
	   viewData.param1 = 'Home with Promo Details.';
       res.setViewData(viewData);
	   next();
	});

//modify the Show Route by adding functionality using server.append
	
server.append("Show", function(req, res, next){
	var viewData = res.getViewData();
	   //declare param1 as a variable that equals 'General company details.'
	   var param1 = 'General company details';

	   if(req.querystring.promo == 1){
		   param1 = null;   
	   }
	   res.setViewData({
		   param1: param1 ? param1 : viewData.param1
	   });
	   next();
	});

module.exports = server.exports();