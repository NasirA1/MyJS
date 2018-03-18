#! /usr/bin/env node

'use strict'

const express = require('express');
const app = express();


//Client listens at /my-streams endpoint for server push events
//and writes them to the DOM when data is received
let clientCode = `
<!doctype html>
<html>
<head>
  <title>clientCode Page</title>
  <script>
    let evtSource = new EventSource("my-stream");

    evtSource.onopen = function() {
      console.log("Connection to server opened.");
    }

    evtSource.addEventListener("ping", function (e) {
      let obj = JSON.parse(e.data);
      //document.write("ping at " + obj.time + "<br/>");
      let content = document.getElementById("content");
      content.appendChild(document.createTextNode("ping from server at: " + obj.time + "\\n"));
    });

    evtSource.onerror = function(e) {
      console.error("EventSource failed: ", e);
    }

    console.log(evtSource);    
  </script>
</head>
<body>
    <pre id="content"></pre>
</body>
<html>\n\n`;


//HTTP endpoint
app.get('/', (req, res) => res.send(clientCode));


//Server stream endpoint
app.get("/my-stream", function (req, res) {
  res.status(200)
    .set({
      'cache-control':  'no-cache',
      'content-type':   'text/event-stream',
      'connection':     'keep-alive'
    });

  //push hello world to client every second
  setInterval( () => { pushToClient(res); }, 1000);
});


function pushToClient(res) {
  res.write('event: ping\n');
  let dt = new Date();
  res.write(`data: { "time": "${dt}" }`);
  res.write('\n\n');
}


app.listen(3000, () => console.log('Server-push app listening on port 3000...'));
