const fs = require('fs');
const child_processi = require('child_process');
var express = require('express');
var app = express();
//var obj = require("./s.js");

// fs = require('fs');
// process = require('child_process');


var dependency ;

var args ;

var resspose = "" ;


//this is code for FORK ... 


app.get('/call', function (req, res) {
	
	
	 user = req.query.useridmeteor;
	 dependency = {message: user};
	 console.log("user from url : " + user );
	 
	
     args = [JSON.stringify(dependency)];
	
	var worker_process = child_processi.fork("fork_chil.js" , args);	
	
	// + process.pid
 //worker_process.send('exit');
worker_process.send('sayhello'+ process.pid);
 worker_process.on('message', function(m) {
	   
	resspose = m ;
  console.log('PARENT got message:', m);
  res.send(resspose);
  });
  
	
   worker_process.on('close', function (code) {
      console.log('child process exited with code ' + code);
   });
   
   
   
   

    
   
//worker_process.send({ hello: 'world' });



  
   
  /*  obj.getEmpDetails(function(result){
	   
	  //yog console.log('inside call');
	   //console.dir(result);
	  //yog console.log(result);
	 // a1 =  console.log(JSON.parse(JSON.stringify(result)));
	 // res.write(result);
	    res.end(result); 
   });   
   */
 
});


//giving data need to check 
 app.get('/check', function (req, res) {
	 
	 user = req.query.useridmeteor;
	 console.log("user from url : " + user );

   var ls = child_processi.exec('node s_exec.js', function (error, stdout, stderr) {
	   if (error) {
	     console.log(error.stack);
	     console.log('Error code: '+error.code);
	     console.log('Signal received: '+error.signal);
	   }
	   console.log('stdout: ' + stdout);
	   console.log('stderr: ' + stderr);
	    
		
	     res.end("ok"); 
	 });
	
	 ls.on('exit', function (code) {
	   console.log('Child process exited with exit code '+code);
	 });
   

		


});

/* app.get('/data', function (req, res) {
	
	
	var ls = process.exec('node orientdb.js', function (error, stdout, stderr) {
	if(error)
	 console.log(error.code);
	});
   
  res.send('Hello World!' + JSON.stringify(stdout, null, 4));
     res.end( JSON.stringify(stdout, null, 4) );
});
 */


app.listen(5000, function () {
  console.log('Example app listening on port 5000!');
});