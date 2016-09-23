var DDPClient = require('ddp');
var connectionStatus ="connected!";

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
        connectionStatus = "DDP connection error!" ;
        return;
    }

    if (wasReconnect) {
       connectionStatus = "Reestablishment of a connection.";
    }

              var dependency =  process.argv[2];

            /*
             * Subscribe to a Meteor Collection
             */
         	  	 var feedDataObj = {}; // input object for get kloojj feeds
				 feedDataObj.userId = dependency;
				  feedDataObj.limit = 15;
				  feedDataObj.offset = 0;
				  ddpclient.call(
					"getKloojjFeedEs",             // name of Meteor Method being called
					 [feedDataObj],            // parameters to send to Meteor Method
					function (err, result) {   // callback which returns the method call results
					 
					console.log(connectionStatus +" "+JSON.stringify(result, null, 4)); 	
					 }
                    );
								
 //                    
/*     setTimeout(function () {
        // observer.stop();
        ddpclient.close();
    }, 5000); */

 });



	  
	  