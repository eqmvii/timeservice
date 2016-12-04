'use strict';

var moment = require('moment');

module.exports = function (app) {
    app.route('/')
      .get(function (req, res) {
         res.sendFile(process.cwd() + '/public/index.html');
      });

      //Handle time requests as Unix timestamps or natural formatting.
      app.get('/:timeString', function (req, res) {
      	var timeResponse = {}; //object to hold data to respond to request
         var theTime = moment(req.params.timeString); //hey maybe it will work!

         //Check to see if timeString was a unix number, meaning creating the moment failed.
         if(!isNaN(parseInt(req.params.timeString))) {
            theTime = moment.unix(parseInt(req.params.timeString));
         }

         timeResponse["unix"] = theTime.format("X"); //Unix formatting
         timeResponse.natural = theTime.format("dddd, MMMM Do YYYY"); //Pleasant natural formatting

         //Check to see if all of that failed, and if so, set response object values to null
         if(isNaN(timeResponse.unix)){
            timeResponse.unix = null;
            timeResponse.natural = null;
         }
         res.json(timeResponse);
		})


};
