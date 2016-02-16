var http = require('http');
var https = require('https');
var url = require("url");

//The url we want is: 'www.random.org/integers/?num=1&min=1&max=10&col=1&base=10&format=plain&rnd=new'
var options ="http://vnexpress.net/";

var  done;


http.createServer(function(request, response) {
responseClient = response; 
console.log(JSON.stringify(queryAsObject));
	//options = request.query.url;
	var parsedUrl = url.parse(request.url, true); // true to get query as object
	var queryAsObject = parsedUrl.query;
	var myurl = queryAsObject.url;
	var domain = myurl.split('/')[2];
	var options = {
	  hostname: domain,
	  port: 80,
	  path: myurl.split(domain).pop(),
	  method: 'GET',
	  header:{
			'Transfer-Encoding': 'chunked',
			"Content-Type": "text/html"
		  }
	};
	
	var callback = function(res) {
	var str = '';
	//another chunk of data has been recieved, so append it to `str`
	res.on('data', function (chunk) {
	  str += chunk;
	});
	res.setEncoding('utf8');
	//the whole response has been recieved, so we just print it out here
	res.on('end', function () {
			console.log(str);
	  	  response.writeHead(200, {"Content-Type": "text/html",
"Access-Control-Allow-Origin": "*"});
		  response.write(str);
		  response.end();
	  });
	}

    if(queryAsObject.url.split('://').shift() == 'http'){
        http.request(options, callback).end();  //xxxx
    }else{
        https.request(options, callback).end();  //xxxx
    }
	
}).listen(8888)
