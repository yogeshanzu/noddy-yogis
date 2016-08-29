#!/bin/env node
//  OpenShift sample Node application
var express = require('express');
var app = express();
var fs   = require('fs');



 server = require('http').createServer(app)
 io = require("socket.io").listen(server)
var server_port = process.env.OPENSHIFT_NODEJS_PORT || 8080 ;
var server_ip_address = process.env.OPENSHIFT_NODEJS_IP || '127.0.0.1' ;
app.set('port', process.env.OPENSHIFT_NODEJS_PORT || 8080);
app.set('ipaddr', process.env.OPENSHIFT_NODEJS_IP || '127.0.0.1'); 


  var DDPClient = require('ddp');
  var connectionStatus ;


  var ddpclient = new DDPClient({
    // All properties optional, defaults shown 
    autoReconnect : true,
    autoReconnectTimer : 500,
    maintainCollections : true,
    url: 'ws://test.kloojj.com/backend/websocket'
  });

  ddpclient.connect(function(err,wasReconnect) {
      //connection.subscribe('some_name');
  	
  	if (err) {
      console.log("DDP connection error!");
  	connectionStatus = "DDP connection error!" ;
      return;
  	}

    else if (wasReconnect) {
      console.log("Reestablishment of a connection.");
  	connectionStatus = "Reestablishment of a connection.";
    }
   else {
  	console.log("connected!"); 
  	connectionStatus = "connected!";
   }
    
    //res.end( "Meteor connection is succesful by web serices " );
  });


  app.get('/connection', function (req, res) {
  	
   res.end( connectionStatus );

  })

 app.get('/meteorservicepara', function (req, res) {
  	//var useridmeteor=req.query.useridmeteor;
  	
  	 var feedDataObj = {}; // input object for get kloojj feeds
      feedDataObj.userId = req.query.useridmeteor;
      feedDataObj.limit = 15;
      feedDataObj.offset = 0;
  	  console.log("i m in check feedDataObj : "+feedDataObj.userId);
      ddpclient.call(
       "getKloojjFeedEs",             // name of Meteor Method being called getKloojjFeed
         [feedDataObj],            // parameters to send to Meteor Method
        function (err, result) {   // callback which returns the method call results
         // console.log("called function, result: " + result);
  		//console.log(JSON.stringify(result));
  		
  		console.log(JSON.stringify(result, null, 4));
  		//For Plain Text
  	    //res.end( JSON.stringify(result) );
  		//For Formatted text 
  	 res.end( JSON.stringify(result, null, 4));
  		 	
        }
      );

  })
 
server.listen(server_port, server_ip_address, function () {
  console.log( "Listening on " + server_ip_address + ", server_port " + server_port )
});
