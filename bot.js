var HTTPS = require('https');
var cool = ['¯\\_(ツ)_/¯', '(ﾟ∩ﾟ)', '(ノಠ益ಠ)ノ彡┻━┻', '(▀̿Ĺ̯▀̿ ̿)'];

var botID = process.env.BOT_ID;

function respond() {
  var request = JSON.parse(this.req.chunks[0]),
      shrug = /^\/cool guy$/;

  if(request.text && shrug.test(request.text)) {
    this.res.writeHead(200);
    postMessage(0);
    this.res.end();
  } else {
    console.log("don't care");
    this.res.writeHead(200);
    this.res.end();
  }
}

function postMessage(i) {
  var botResponse, options, body, botReq;

  botResponse = cool[i];

  options = {
    hostname: 'api.groupme.com',
    path: '/v3/bots/post',
    method: 'POST'
  };

  body = {
    "bot_id" : botID,
    "text" : botResponse
  };

  console.log('sending ' + botResponse + ' to ' + botID);

  botReq = HTTPS.request(options, function(res) {
      if(res.statusCode == 202) {
        //neat
      } else {
        console.log('rejecting bad status code ' + res.statusCode);
      }
  });

  botReq.on('error', function(err) {
    console.log('error posting message '  + JSON.stringify(err));
  });
  botReq.on('timeout', function(err) {
    console.log('timeout posting message '  + JSON.stringify(err));
  });
  botReq.end(JSON.stringify(body));
}


exports.respond = respond;
