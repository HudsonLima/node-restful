var mysql   = require("mysql");

function REST_ROUTER(router,connection,md5) {
    var self = this;
    self.handleRoutes(router,connection,md5);
}

REST_ROUTER.prototype.handleRoutes = function(router,connection,md5) {
    var self = this;
    router.get("/",function(req,res){
        res.json({"Message" : "RestFull Api by Hudson Lima !"});
    });

    router.get("/entrega",function(req,res) {
        var query = "SELECT * FROM ??";
        var table = ["entrega"];
        query = mysql.format(query,table);
        connection.query(query,function(err,rows){
            if(err) {
                res.json({"Error" : true, "Message" : "Error executing MySQL query"});
            } else {
                res.json({"Error" : false, "Message" : "Success", "Entregas" : rows});
            }
        });
    });

    router.get("/entrega/:Id",function(req,res){
        var query = "SELECT * FROM ?? WHERE ??=?";
        var table = ["entrega","Id",req.params.Id];
        query = mysql.format(query,table);
        connection.query(query,function(err,rows){
            if(err) {
                res.json({"Error" : true, "Message" : "Error executing MySQL query"});
            } else {
                res.json({"Error" : false, "Message" : "Success", "Entrega" : rows});
            }
        });
    });

    router.post("/entrega",function(req,res){
        var query = "INSERT INTO ??(??,??,??,??,??,??,??) VALUES (?,?,?,?,?,?,?)";
        var table = ["entrega","PedidoID","ClienteID","NomeRecebedor","CPFRecebedor","ProprioComprador","Data","Localizacao",req.body.PedidoID,req.body.ClienteID,req.body.NomeRecebedor,req.body.CPFRecebedor,req.body.ProprioComprador,req.body.Data,req.body.Localizacao];
        
        
        query = mysql.format(query,table);
        connection.query(query,function(err,rows){
            if(err) {
                res.json({"Error" : true, "Message" : "Error executing MySQL query "});
            } else {
                res.json({"Error" : false, "Message" : "Entrega Adicionada !"});
            }
        });
    });

    router.put("/entrega/:Id",function(req,res){
        var query = "UPDATE ?? SET ?? = ?, ?? = ?,?? = ?,?? = ?,?? = ?,?? = ?,?? = ? WHERE ?? = ?";
        var table = ["entrega","PedidoID",req.body.PedidoID,"ClienteID",req.body.ClienteID,"NomeRecebedor",req.body.NomeRecebedor,"CPFRecebedor",req.body.CPFRecebedor,"ProprioComprador",req.body.ProprioComprador,"Data",req.body.Data,"Localizacao",req.body.Localizacao,"Id",req.params.Id];
        query = mysql.format(query,table);
        connection.query(query,function(err,rows){
            if(err) {
                res.json({"Error" : true, "Message" : "Error executing MySQL query "+ query });
            } else {
                res.json({"Error" : false, "Message" : "Entrega atualizada: "+req.params.Id});
            }
        });
    });

    router.delete("/entrega/:Id",function(req,res){
        var query = "DELETE from ?? WHERE ??=?";
        var table = ["entrega","Id",req.params.Id];
        query = mysql.format(query,table);
        connection.query(query,function(err,rows){
            if(err) {
                res.json({"Error" : true, "Message" : "Error executing MySQL query"});
            } else {
                res.json({"Error" : false, "Message" : "Entrega deletada com sucesso "+req.params.Id});
            }
        });
    });
}

module.exports = REST_ROUTER;
