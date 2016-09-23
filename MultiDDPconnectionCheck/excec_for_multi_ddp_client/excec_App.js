var exec = require('child_process').exec;
var express = require('express');
var app = express();

	app.get('/exec', function (req, res) {
	 
     user = req.query.useridmeteor;
	 console.log("user from url : " + user );
	 var child = exec('node exec.js '+user);
	 
	child.stdout.on('data', function(data) {
		console.log('stdout: ' + data);
		
		 res.end(data); 
	});
	child.stderr.on('data', function(data) {
		console.log('stderr: ' + data);
	});
	child.on('close', function(code) {
		console.log('closing code: ' + code);
	});

	});


	app.listen(4000, function () {
	  console.log('Example app listening on port 4000!');
	});



