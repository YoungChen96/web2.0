var http = require('http');
var port = 8000;
http.createServer(function(req, res) {
	var randomTime = 1000 + Math.round(Math.random() * 2000);
	var randomNum = 1 + Math.round(Math.random() * 9);
	setTimeout(function() {
		res.writeHead(200, {'Content-Type': 'text/plain'});
		res.end('' + randomNum);
	}).listen(port, function() {
		console.log('Server listen on ', port);
	});
})