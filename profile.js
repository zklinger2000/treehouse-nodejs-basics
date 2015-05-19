//PROBLEM: we need to get a user's badge and javascript points
//SOLUTION: use Node.js to connect to Treehouse's API to get profile information and

//this is requiring the module 'http' to be loaded
var http = require("http");
//my username at Treehouse for testing

//print out messages
function printMessage(username, badgeCount, points) {
  var message = username + " has " + badgeCount + " total badge(s) and " + points + " points in JavaScript";
  console.log(message);  
}

//print out error messages
function printError(e) {
  console.error(e.message);  
}

function get(username) {
  //Connect to the API URL (http://teamtreehouse.com/username.json)
  var request = http.get("http://teamtreehouse.com/" + username + ".json", function(response) {
    var body = "";
    //Read the data
    response.on('data', function (chunk) {
      body += chunk;
    });
    response.on('end', function() {
      if (response.statusCode === 200) {
        try {
        //Parse the data
        var profile = JSON.parse(body);
        //Print the data
        printMessage(username, profile.badges.length, profile.points.JavaScript);
        } catch(e) {
          //Parse Error (because right above we're using JSON.parse()
          printError(e);
        }
      } else {
        //Status Code Error
        printError({message: "Error getting profile for " + username + ". (" + http.STATUS_CODES[response.statusCode] + ")"});
      }
    });
  });
  
  //Connection Error
  request.on('error', printError);
}

module.exports.get = get;