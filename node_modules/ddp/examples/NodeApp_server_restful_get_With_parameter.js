  "use strict";

  var express = require('express');
  var app = express();
  var fs = require("fs");

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

  	


  app.get('/meteorservice', function (req, res) {
  	
  	 var feedDataObj = {}; // input object for get kloojj feeds
      feedDataObj.userId = 'gTzsGsg9qnfpLZHBk';
      feedDataObj.limit = 15;
      feedDataObj.offset = 0;
  	 	  console.log("i m in check feedDataObj : "+feedDataObj.userId);
      ddpclient.call(
        "getKloojjFeed",             // name of Meteor Method being called
         [feedDataObj],            // parameters to send to Meteor Method
        function (err, result) {   // callback which returns the method call results
         // console.log("called function, result: " + result);
  		//console.log(JSON.stringify(result));
  		console.log(JSON.stringify(result, null, 4));
  		
  		 //res.end( JSON.stringify(result) );
  		 res.end( JSON.stringify(result, null, 4) );
        }
      );

  })

  /* (function () {
      var x = "Hello!!";      // I will invoke myself
  })();

   */
  app.get('/meteorservicepara', function (req, res) {
  	//var useridmeteor=req.query.useridmeteor;
  	
  	 var feedDataObj = {}; // input object for get kloojj feeds
      feedDataObj.userId = req.query.useridmeteor;
      feedDataObj.limit = 15;
      feedDataObj.offset = 0;
  	  console.log("i m in check feedDataObj : "+feedDataObj.userId);
      ddpclient.call(
       "getKloojjFeed",             // name of Meteor Method being called
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

  
  
 /*  var data = {};
       data.uid = '24RFLYgmR7DiFEwjp';
       data.fuid = 'iDvuhFodfGKWMgPD5'; 
       data.isFollow = 1;
       Meteor.call('followUser',data,function(err, response) {
        console.log(response);
      });
	   */
    
	app.get('/followuser', function (req, res) {
  	//var useridmeteor=req.query.useridmeteor;
  	
  	
      //feedDataObj.userId = req.query.useridmeteor;
     
	  
	  
	  var data = {};
	  
	   //data.uid = '24RFLYgmR7DiFEwjp';
       //data.fuid = 'iDvuhFodfGKWMgPD5'; 
	   
	   data.uid = req.query.useridmeteor;
       data.fuid = req.query.tofollowuser;

	   
       data.isFollow = 1;
	   
	   
  	  console.log("i m in check feedDataObj : "+data.uid);
      ddpclient.call(
       "followUser",             // name of Meteor Method being called
         [data],            // parameters to send to Meteor Method
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
  
  
  //ADD VIDEO Kloojjed
  
   app.get('/addkloojj', function (req, res) {
  	
		var videokloojj = {
                title:"From Node Js WebserviceScript",
                VUID: '8lU2c8ktIs0',
                desc: 'Crash Landing on Mars - Science Universe Documentary HD',
                comments: "Comment From Node Js WebserviceScript",
                starttime:143.840441,
                endtime: 160.956103,
                duration: 2543.501,
                acl: true,
                thumbnail: 'https://test.kloojj.com/commonImages/kloojjdefault.png',
                userId: 'gTzsGsg9qnfpLZHBk',
                sourceurl:'https://www.youtube.com/watch?v=8lU2c8ktIs0',
                origin: 'youtube',
                userFullName: 'yogesh salunke',
                userPhotoUrl: 'http://www.youth4work.com/Images/Users/133094.jpg'
				
            };

//userPhotoUrl: 'https://graph.facebook.com/109642672807335/picture'
//https://pbs.twimg.com/profile_images/471602601918595072/bPXR68cv.jpeg
	
            var video = {
                title: 'Title Node Js WebserviceScript',
                desc: 'Crash Landing on Mars - Science Universe Documentary HD',
                VUID: '8lU2c8ktIs0',
                sourceurl:'https://www.youtube.com/watch?v=8lU2c8ktIs0',
                origin: 'youtube',
                tags: '',
                thumbnail: ''
            };

            var data = {
                videokloojj: videokloojj,
                video: video,
                userId: 'gTzsGsg9qnfpLZHBk',
                subId: ''
            }
  	
  	 	  console.log("i m in check feedDataObj : "+videokloojj.userId);
				ddpclient.call(
				"addVideoKloojj",             // name of Meteor Method being called
				 [data],            // parameters to send to Meteor Method
				function (err, result) {   // callback which returns the method call results
				 // console.log("called function, result: " + result);
				//console.log(JSON.stringify(result));
				console.log(JSON.stringify(result, null, 4));
				
				 //res.end( JSON.stringify(result) );
				 res.end( JSON.stringify(result, null, 4) );
        }
      );

  })

  
   app.get('/addkloojjpara', function (req, res) {
	   
	   if (req.query.useridmeteor === 'gTzsGsg9qnfpLZHBk')
	   {
		 var  photourl = 'http://www.youth4work.com/Images/Users/133094.jpg' 
	   }
	   else
	   {
		 var  photourl = 'https://graph.facebook.com/109642672807335/picture' 
	   }
  	
		var videokloojj = {
                title:"From Node Js WebserviceScript",
                VUID: '8lU2c8ktIs0',
                desc: 'Crash Landing on Mars - Science Universe Documentary HD',
                comments: "Comment From Node Js WebserviceScript",
                starttime:143.840441,
                endtime: 160.956103,
                duration: 2543.501,
                acl: true,
                thumbnail: 'https://test.kloojj.com/commonImages/kloojjdefault.png',
                userId: req.query.useridmeteor,
                sourceurl:'https://www.youtube.com/watch?v=8lU2c8ktIs0',
                origin: 'youtube',
                userFullName: req.query.username,
                userPhotoUrl: photourl
				
            };

//userPhotoUrl: 'https://graph.facebook.com/109642672807335/picture'
//https://pbs.twimg.com/profile_images/471602601918595072/bPXR68cv.jpeg
	
            var video = {
                title: 'Title Node Js WebserviceScript',
                desc: 'Crash Landing on Mars - Science Universe Documentary HD',
                VUID: '8lU2c8ktIs0',
                sourceurl:'https://www.youtube.com/watch?v=8lU2c8ktIs0',
                origin: 'youtube',
                tags: '',
                thumbnail: ''
            };

            var data = {
                videokloojj: videokloojj,
                video: video,
                userId: req.query.useridmeteor,
                subId: ''
            }
  	
  	 	  console.log("i m in check feedDataObj : "+videokloojj.userId);
				ddpclient.call(
				"addVideoKloojj",             // name of Meteor Method being called
				 [data],            // parameters to send to Meteor Method
				function (err, result) {   // callback which returns the method call results
				 // console.log("called function, result: " + result);
				//console.log(JSON.stringify(result));
				console.log(JSON.stringify(result, null, 4));
				
				 //res.end( JSON.stringify(result) );
				 res.end( JSON.stringify(result, null, 4) );
        }
      );

  })
  
	
	
  app.get('/listUsers', function (req, res) {
     fs.readFile( __dirname + "/" + "users.json", 'utf8', function (err, data) {
         console.log( data );
         res.end( data );
     });
  })

  var server = app.listen(8081, function () {

    var host = server.address().address
    var port = server.address().port

    console.log("LOAD app listening at http://%s:%s", host, port)

  })
  
  
  
  
  
  
  // for analytics to capture 
  /*  Meteor.call('captureAnalytics' , source , type , function (error, result) {
            if(error) {
                  callback();
            }else
            {
               callback();
               //console.log(result);
            }
           });
 */
 
 
 /* 
 
 
 * @param {Object}  data { videoklojj {description, stime, etime, public, thumburl },
     video{sourceurl ,VUID,tittle,desc,origin,tags,thumbnail },
     userId,subId (optional - subscriptionId)}
Sent on:
12:29 pm
From:
Abhijit Shivathare
addVideoKloojj
From:
Abhijit Shivathare
// Push Kloojjed items in list and save data in database.
        $scope.saveClip = function (videoObj, videoCount) {
            var comments = '';
            if (videoObj.comments) {
                comments = videoObj.comments
            }

            var userProfilePhotoUrl = '' + kango.storage.getItem('kup');
            if (/^(chrome-extension)/.test(userProfilePhotoUrl)) {
                userProfilePhotoUrl = '';
            } else {
                userProfilePhotoUrl = decodeURIComponent(kango.storage.getItem('kup'));
            }

            var videokloojj = {
                title:"From Jmeter Script",
                VUID: '8lU2c8ktIs0',
                desc: 'Crash Landing on Mars - Science Universe Documentary HD',
                comments: "From Jemter Script",
                starttime: 0,
                endtime: 2,
                duration:  '42:23',
                acl: public,
                thumbnail: 'https://test.kloojj.com/commonImages/kloojjdefault.png',
                userId: 'gTzsGsg9qnfpLZHBk',
                sourceurl:'https://www.youtube.com/watch?v=8lU2c8ktIs0',
                origin: 'youtube',
                userFullName: 'yogesh salunke',
                userPhotoUrl: 'https://graph.facebook.com/109642672807335/picture'
				
            };

            var video = {
                title: 'Title from jmeter script',
                desc: 'Crash Landing on Mars - Science Universe Documentary HD',
                VUID: '8lU2c8ktIs0',
                sourceurl:'https://www.youtube.com/watch?v=8lU2c8ktIs0',
                origin: 'youtube',
                tags: '',
                thumbnail: ''
            };

            var data = {
                videokloojj: videokloojj,
                video: video,
                userId: 'gTzsGsg9qnfpLZHBk',
                subId: ''
            }

            $ionicAnalytics.track('click on save kloojj it');

            Meteor.call('addVideoKloojj', data, function (error, result) {
                if (result) {
                    // console.log(result);
                }
            });
        };
		
		 */
		 
		 
		 
		 //http://stackoverflow.com/questions/30024810/jmeter-web-application-performance-testing-doubts
		 