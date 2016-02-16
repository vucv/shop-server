var url = require("url");
module.exports = function(app) {
    //CORS middleware
    var allowCrossDomain = function(req, res) {
        res.header('Access-Control-Allow-Origin', '*');
        res.header('Access-Control-Allow-Methods', 'GET,PUT,POST,DELETE');
        res.header('Access-Control-Allow-Headers', 'Content-Type');
    }
    app.get('/ping', function(req, res) {
        allowCrossDomain(req, res);
        res.send('OK');
    });
    app.get('/sync', function(req, res) {
        allowCrossDomain(req, res);
        var parsedUrl = url.parse(req.url, true); // true to get query as object
        var queryAsObject = parsedUrl.query;
        console.log("time: "+ JSON.stringify(queryAsObject));
        var time = queryAsObject.time;

        if(time == 0){
            //get all database
            app.getAll(req,res);
        }else{
            //Sync database from time
            app.sync(req, res, time);
        }
    });

    app.post('/sync', function(req, res) {
        allowCrossDomain(req, res);
        var parsedUrl = url.parse(req.url, true); // true to get query as object
        var queryAsObject = parsedUrl.query;
        console.log("time: "+ JSON.stringify(queryAsObject));
        var commands = JSON.parse(queryAsObject.commands);
        app.addSync(commands);
        res.send('OK');
    });
};