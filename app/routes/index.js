'use strict';



module.exports = function (app) {
    app.route('/')
      .get(function (req, res) {
         res.sendFile(process.cwd() + '/public/index.html');
      });

      app.get('/:time', function (req, res) {
      	var timeResponse = {};
      	var theTime = new Date(req.params.time);
      	if(isNaN(theTime.getTime())){
      	var timeInt = parseInt(req.params.time);
      	theTime = new Date(timeInt * 1000);
      }
      if(isNaN(theTime.getTime())){
      	timeResponse.unix = null;
      	timeResponse.natural = null;
      }  
      else {
      	timeResponse.unix = theTime.getTime().toString();
      	timeResponse.natural = theTime.toDateString();
      	}

      	
      	res.send(JSON.stringify(timeResponse));
  		//res.send(req.params);
		})



};
