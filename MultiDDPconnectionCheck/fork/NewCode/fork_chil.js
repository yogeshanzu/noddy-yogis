var DDPClient = require('ddp');
var connectionStatus ;
var data_result = "" ;
var useremail = "yogesh.salunke@anzu.org";
var pwd = "anzu@123";
  



//console.log('CHILD cvxcvxvc e:', data_result);
 //process.send(data_result);
  process.on('message', function(m) {
	  
var ddpclient = new DDPClient({
    // All properties optional, defaults shown 
    autoReconnect : true,
    autoReconnectTimer : 500,
    maintainCollections : true,
	  //port : 443,
    url: 'ws://test.kloojj.com/backend/websocket'
  });
 
 ddpclient.connect(function (error, wasReconnect) {
    // If autoReconnect is true, this callback will be invoked each time
    // a server connection is re-established

    if (error) {
        console.log("DDP connection error!");
        return;
    }

    if (wasReconnect) {
        console.log("Reestablishment of a connection.");
    }

    console.log("connected!");

    
 /*    ddpclient.call("login", [
        {user: {email: useremail}, password: pwd}
    ], function (err, result) {
        console.log(result);
        user_id = result.id;
        token = result.token;

        if (token) { 
            console.log("Logined!", user_id, token);*/

              var dependency = JSON.parse(process.argv[2]);

            /*
             * Subscribe to a Meteor Collection
             */
         	  	 var feedDataObj = {}; // input object for get kloojj feeds
				 feedDataObj.userId = dependency.message;
				  feedDataObj.limit = 15;
				  feedDataObj.offset = 0;
					  console.log("i m in check feedDataObj : "+feedDataObj.userId);
				  ddpclient.call(
					"getKloojjFeedEs",             // name of Meteor Method being called
					 [feedDataObj],            // parameters to send to Meteor Method
					function (err, result) {   // callback which returns the method call results
					 // console.log("called function, result: " + result);
					//console.log(JSON.stringify(result));
					console.log(JSON.stringify(result, null, 4));
					data_result = JSON.stringify(result, null, 4);
					process.send(process.pid+" : "+data_result);
  		
  		
                                      }
                                );
								
 //                     }//end of if 
					   console.log('CHILD got message:', m);
 //      });//end of login 

    ////Debug information
    //
    //ddpclient.on('message', function (msg) {
    //    console.log("ddp message: " + msg);
    //});

    /*
     ddpclient.on('socket-close', function (code, message) {
     console.log("Close: %s %s", code, message);
     });

     ddpclient.on('socket-error', function (error) {
     console.log("Error: %j", error);
     });
     */

    // close

/*     setTimeout(function () {
        // observer.stop();
        ddpclient.close();
    }, 5000); */

 });
});

