'use strict';

var colors = require('colors');
var http = require('http');
var https = require('https');

//Print out message
function printMessage(username, badgeCount, points){
  console.log(username.cyan + " has " + badgeCount.toString().yellow + " badge(s) and "
              + points.toString().yellow + " points in " + "JavaScript".magenta);
}

//Print out error messages
function printError(error){
  console.error(error.message.red);
}

//Fetch the profile data
function get(username){
  var req = https.get('https://teamtreehouse.com/' + username + ".json", function(res){
          var body = '';
          res.on('data', function(chunk){
            body += chunk;
          });

          res.on('end', function(){
            if(res.statusCode == 200){
              try{
                var profile = JSON.parse(body);
                var badges = parseInt(profile.badges.length);
                var points = parseInt(profile.points.JavaScript);

                printMessage(username, badges, points);
              }
              catch(e){
                printError(e)
              }
            }
            else{
              printError({message:'There was an error fetching the profile data. (' +
                          http.STATUS_CODES[res.statusCode] + ')'});
            }

          });
        });

  req.on('error', function(e){
    printError(e);
  });
}

module.exports.get = get;
