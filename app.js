var express = require('express');
var bodyParser     =         require("body-parser");
var app = express();
var mysql      = require('mysql');
var connection = mysql.createConnection({
    host     : 'localhost',
    user     : 'root',
    password : 'root',
    database : 'DB'
});

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.sync=function(req, res, time){
    try{
        //connection.connect();
        var select = "SELECT * FROM sync_info WHERE timestamp < " + time;

        connection.query(select, function(err, rows) {
            console.log('Error while performing Query.'+ err);
            if (!err){
                //connection.end();
                var countRows = rows.length;
                rows.forEach(function(row){
                    var selectData = "SELECT * FROM "+row.tableName+" WHERE ID = " + row.uuid;
                    console.log('select: '+ selectData);
                    console.log('row: '+ row);
                    connection.query(selectData, function(err, data) {
                        countRows --;
                        if (!err){
                            row.data = data.pop();
                        }else{
                            console.log('Error while performing Query.');
                        }
                        if(countRows == 0){
                            res.writeHead(200, {"Content-Type": "json","Access-Control-Allow-Origin": "*"});
                            res.write(JSON.stringify(rows));
                            res.end();
                        }
                    });
                });
            }else{
                //connection.end();
                res.send('Error while performing Query.');
                console.log('Error while performing Query.');
            }
        });

    }catch(ex){
        res.send('Hello world !' + ex.toString());
        //connection.end();
    }
};

app.getAll=function(req, res){
    console.log('getAll');
    try{
        var countTable = DB_CONFIG.tables.length;
        DB_CONFIG.tables.forEach(function (table) {
            var query = 'SELECT * FROM ' + table.name;
            console.log('query: '+ query);
            connection.query(query, function(err, rows) {
                countTable --;
                if (!err){
                    table.rows = rows;
                }else{
                    console.log('Error while performing Query.');
                }
                if(countTable == 0){
                    res.writeHead(200, {"Content-Type": "json","Access-Control-Allow-Origin": "*"});
                    res.write(JSON.stringify(DB_CONFIG));
                    res.end();
                }
            });
        });
    }catch(ex){
        console.log('Error while performing Query: ' + ex);
    }
};

app.addSync=function(commands){
    try{
        commands.forEach(function (command) {
            var query = "INSERT INTO sync_info (action,tableName, uuid, timestamp) "
                +"VALUES ('"+command.action+"','"+command.tableName+"','"+command.uuid+"','"+new Date().getTime()+"')";
            console.log('query: '+ query);
            connection.query(query, function(err) {
                app.insert(command);
                console.log('err: '+ err);
            });
        });
    }catch(ex){
        console.log('Error while performing Query: ' + ex);
    }

};

app.insert =function(command){
    try{
            var query = "INSERT INTO "+command.tableName +"("+Object.keys(command.data).join(',')
                +") VALUES ('"+app.listValue(command.data).join("','")+"')";

            console.log('query: '+ query);
            connection.query(query, function(err, rows) {
                console.log('err: '+ err);
            });
    }catch(ex){
        console.log('Error while performing Query: ' + ex);
    }
};
app.listValue =function(objects) {
    var values =[];
    for (var key in objects) {
        values.push(objects[key]);
    }
    return values;
}

require('./config/routes.js')(app);

//Init database
var DB_CONFIG = require('./config/schema.js');
connection.query("CREATE DATABASE IF NOT EXISTS " + DB_CONFIG.name, function(err) {
    console.log('Error: '+ err);
});

DB_CONFIG.tables.forEach(function (table) {
    var columns = [];

    table.columns.forEach(function (column) {
        columns.push(column.name + ' ' + column.type);
    });

    var query = 'CREATE TABLE IF NOT EXISTS ' + table.name + ' (' + columns.join(',') + ')';
    console.log('Error: '+ query);
    connection.query(query, function(err) {
        console.log('Error: '+ err);
    });

});

console.log('Error while performing Query.'+ DB_CONFIG.name);
app.listen(4000);