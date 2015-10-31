var express = require("express");
var mysql   = require("mysql");
var bodyParser  = require("body-parser");
var md5 = require('MD5');
var rest = require("./REST.js");
var app  = express();
var render = require('php-node')({bin:"c://php//php.exe"});

render(__dirname+'/relatorio.php', {}, function(e, r) {
    console.log(r);
})




function REST(){
    var self = this;
    self.connectMysql();
};




REST.prototype.connectMysql = function() {
    var self = this;
    var pool      =    mysql.createPool({
        connectionLimit : 4, /**/
        host     : 'localhost', /*'us-cdbr-azure-west-c.cloudapp.net'*/
        user     : 'root', /*be608e6641559c*/
        password : '', /*4ae974c0*/
        database : 'entrega_restful_api', /* as_45c42c9325ea7e0*/
        debug    :  false /*debug    :  false*/
      });
    pool.getConnection(function(err,connection){
        if(err) {
          self.stop(err);
        } else {
          self.configureExpress(connection);
        }
    });
}

REST.prototype.configureExpress = function(connection) {
      var self = this;
      app.use(bodyParser.urlencoded({ extended: true }));
      app.use(bodyParser.json());
      app.use(express.static(__dirname + '/public'))
      var router = express.Router();
      app.use('/api', router);
      var rest_router = new rest(router,connection,md5);
    
    app.set('views', __dirname);
    app.engine('php', phpnode);
    app.set('view engine', 'php');
    
    
      self.startServer();
      
}

REST.prototype.startServer = function() {
      app.listen(8080,function(){
          console.log("All right ! I am alive at Port 8080.");
      });
}

REST.prototype.stop = function(err) {
    console.log("ISSUE WITH MYSQL \n" + err);
    process.exit(1);
}

app.all('/relatorio.php', function(req, res) {
   res.render('relatorio');
})



new REST();


app.get('/', function(req, res) {
	res.redirect('./index.html');
});


  
