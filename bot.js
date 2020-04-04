var HTTPS = require('https');
var cool = ['¯\\_(ツ)_/¯', '(ﾟ∩ﾟ)', '(ノಠ益ಠ)ノ彡┻━┻', '(▀̿Ĺ̯▀̿ ̿)', '( ͡° ͜ʖ ͡°)', '( ͡°( ͡° ͜ʖ( ͡° ͜ʖ ͡°)ʖ ͡°) ͡°)', 'ヽ( •_)ᕗ',
               '(☞ﾟ∀ﾟ)☞',  '(ง •̀_•́)ง', '(｡)(｡)'];

var botID = process.env.BOT_ID;

function respond() {
  var request = JSON.parse(this.req.chunks[0]),
      shrug = /^\/shrug$/;
      sadface = /^\/sadface$/;
      tableFlip = /^\/table flip$/;
      tooCool = /^\/too cool$/;
      happy = /^\/happy$/;
      gang = /^\/gang$/;
      dab = /^\/dab$/;
      myMan = /^\/my$/;
      fight = /^\/fight me$/;
      boobies = /^\/boobies$/;

  if(request.text && shrug.test(request.text)) {
    this.res.writeHead(200);
    postMessage(0);
    this.res.end();
  }
  else if(request.text && sadface.test(request.text)) {
    this.res.writeHead(200);
    postMessage(1);
    this.res.end()
  }
  else if(request.text && tableFlip.test(request.text)) {
    this.res.writeHead(200);
    postMessage(2);
    this.res.end()
  }
  else if(request.text && tooCool.test(request.text)) {
    this.res.writeHead(200);
    postMessage(3);
    this.res.end()
  }
  else if(request.text && happy.test(request.text)) {
    this.res.writeHead(200);
    postMessage(4);
    this.res.end()
  }
  else if(request.text && gang.test(request.text)) {
    this.res.writeHead(200);
    postMessage(5);
    this.res.end()
  }
  else if(request.text && dab.test(request.text)) {
    this.res.writeHead(200);
    postMessage(6);
    this.res.end()
  }
  else if(request.text && myMan.test(request.text)) {
    this.res.writeHead(200);
    postMessage(7);
    this.res.end()
  }
  else if(request.text && fight.test(request.text)) {
    this.res.writeHead(200);
    postMessage(8);
    this.res.end()
  }
  else if(request.text && boobies.test(request.text)) {
    this.res.writeHead(200);
    postMessage(9);
    this.res.end()
  }
  
  else {
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
