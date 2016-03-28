var express = require('express');
var bodyParser = require("body-parser");
var app = express();
var mysql = require('mysql');
var connection = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: 'root',
    database: 'DB'
});

app.use(bodyParser.urlencoded({extended: false}));
app.use(bodyParser.json());

app.sync = function (req, res, time) {
    try {
        //connection.connect();
        var select = "SELECT * FROM sync_info WHERE timestamp > " + time;

        connection.query(select, function (err, rows) {
            console.log('Error while performing Query.' + err);
            if (!err) {
                //connection.end();
                res.writeHead(200, {"Content-Type": "json"});
                var data={};
                data.syncTime = new Date().getTime();
                data.rows = rows;
                res.write(JSON.stringify(data));
                res.end();
            } else {
                //connection.end();
                res.send('Error while performing Query.');
                console.log('Error while performing Query.');
            }
        });

    } catch (ex) {
        res.send('Hello world !' + ex.toString());
        //connection.end();
    }
};

app.getAll = function (req, res) {
    console.log('getAll');
    try {
        var countTable = DB_CONFIG.tables.length;
        DB_CONFIG.tables.forEach(function (table) {
            var query = 'SELECT * FROM ' + table.name;
            console.log('query: ' + query);
            connection.query(query, function (err, rows) {
                countTable--;
                if (!err) {
                    table.rows = rows;
                } else {
                    console.log('Error while performing Query.');
                }
                if (countTable == 0) {
                    res.writeHead(200, {"Content-Type": "json"});
                    DB_CONFIG.syncTime = new Date().getTime();
                    res.write(JSON.stringify(DB_CONFIG));
                    res.end();
                }
            });
        });
    } catch (ex) {
        console.log('Error while performing Query: ' + ex);
    }
};

app.addSync = function (commands,req, res) {
    try {
        var countTable = commands.length;
        commands.forEach(function (command) {
            var query = "INSERT INTO sync_info (query, bindings, timestamp) VALUES (?,?,"+new Date().getTime()+")";
            connection.query(query,[command.query, command.bindings, command.timestamp], function (err) {
                countTable--;
                if(err){
                    console.log('err: ' + err);
                }else {
                    app.insert(command);
                }

                if (countTable == 0) {
                    res.writeHead(200, {"Content-Type": "json"});
                    var data={};
                    data.syncTime = new Date().getTime();
                    res.write(JSON.stringify(data));
                    res.end();
                }
            });
        });
    } catch (ex) {
        console.log('Error while performing Query: ' + ex);
    }

};

app.insert = function (command) {
    try {

        connection.query(command.query, JSON.parse(command.bindings), function (err) {
            console.log('err: ' + err);
        });
    } catch (ex) {
        console.log('Error while performing Query: ' + ex);
    }
};
app.listValue = function (objects) {
    var values = [];
    for (var key in objects) {
        values.push(objects[key]);
    }
    return values;
}

require('./config/routes.js')(app);

//Init database
var DB_CONFIG = require('./config/schema.js');
connection.query("CREATE DATABASE IF NOT EXISTS " + DB_CONFIG.name, function (err) {
    console.log('Error: ' + err);
});

var query = 'DROP TABLE sync_info';
connection.query(query, function (err) {
    console.log('Error: ' + query);
});

DB_CONFIG.tables.forEach(function (table) {
    var columns = [];

    table.columns.forEach(function (column) {
        columns.push(column.name + ' ' + column.type);
    });

    var query = 'CREATE TABLE IF NOT EXISTS ' + table.name + ' (' + columns.join(',') + ')';
    console.log('Error: ' + query);
    connection.query(query, function (err) {
        console.log('Error: ' + err);
    });

});

console.log('Error while performing Query.' + DB_CONFIG.name);
app.listen(8080);
