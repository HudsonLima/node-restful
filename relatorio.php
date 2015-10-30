<?php

// Conexão Local
$hostname = 'localhost';
$username = 'root';
$senha = '';
$banco = 'entrega_restful_api';

$conexao = mysql_pconnect($hostname, $username, $senha);
mysql_select_db($banco, $conexao);

$lista = array();
$dens = array();
$cor = array();
$cor[0] = '#ff3300';
$cor[1] = '#0000ff';
$cor[2] = '#006600';
$cor[3] = '#ff0066';
$i = 0;
$sql = "SELECT COUNT(*) AS total, IF(propriocomprador=1,'Proprio Comprador','Terceiro') as propriocomprador FROM entrega GROUP BY propriocomprador";
$resultado = mysql_query($sql);   
while ($row = mysql_fetch_object($resultado)){
 $total = $row->total;
 $propriocomprador = $row->propriocomprador;
 $lista[$i] = $propriocomprador;
 $dens[$i] = $total;
 $i = $i + 1;
}
?>



<!DOCTYPE html PUBLIC "-//W3C//DTD XHTML 1.0 Transitional//EN" "http://www.w3.org/TR/xhtml1/DTD/xhtml1-transitional.dtd">
<html xmlns="http://www.w3.org/1999/xhtml">
<head>
<meta http-equiv="Content-Type" content="text/html; charset=utf-8" />
<title>Untitled Document</title>
</head>
<script type="text/javascript" src="https://www.google.com/jsapi"></script>
<link rel="stylesheet" type="text/css" href="css.css"> 
<script type="text/javascript">
    google.load("visualization", "1", {packages:["corechart"]});
    google.setOnLoadCallback(drawChart);
    function drawChart() {
      var data = google.visualization.arrayToDataTable([
        ["propriocomprador", "total", { role: "style" } ],
  <?php
  $k = $i;
  for ($i = 0; $i < $k; $i++) {
  ?>
          ['<?php echo $lista[$i] ?>', <?php echo $dens[$i] ?>, '<?php echo $cor[$i] ?>'],
  <?php } ?>
      ]);

      var view = new google.visualization.DataView(data);
      view.setColumns([0, 1,
                       { calc: "stringify",
                         sourceColumn: 1,
                         type: "string",
                         role: "annotation" },
                       2]);

      var options = {
        title: "Relatório de recebibimento: Próprio Comprador x Outra Pessoa",
        width: 600,
        height: 400,
        bar: {groupWidth: "60%"},
        legend: { position: "none" },
      };
      var chart = new google.visualization.ColumnChart(document.getElementById("columnchart_values"));
      chart.draw(view, options);
  }
  </script>
<div id="columnchart_values" style="width: 900px; height: 300px;"></div>
<body>
    
    
<h2>Relatório detalhado das entregas</h2>

      

 <table class="cssTable">
<tr>
<td>Código</td>
<td>Cod. Pedido</td>
<td>Cod Cliente</td>
<td>Nome Recebedor</td>
<td>CPF Recebedor</td>
<td>ProprioComprador</td>
<td>Data</td>
<td>Localizacao</td>
</tr>

 <?php
$conn=mysql_connect("localhost","root","");
mysql_select_db("entrega_restful_api",$conn);
$sql="SELECT Id,PedidoID, ClienteID, NomeRecebedor, CPFRecebedor, IF(propriocomprador=1,'Proprio Comprador','Terceiro') as propriocomprador, Data, Localizacao  from entrega";
$rs=mysql_query($sql,$conn) or die(mysql_error());
while($result=mysql_fetch_array($rs))
{
echo '<tr>
<td>'.$result["Id"].'</td>
<td>'.$result["PedidoID"].'</td>
<td>'.$result["ClienteID"].'</td>
<td>'.$result["NomeRecebedor"].'</td>
<td>'.$result["CPFRecebedor"].'</td>
<td>'.$result["propriocomprador"].'</td>
<td>'.$result["Data"].'</td>
<td>'.$result["Localizacao"].'</td>
</tr>';
}
 '</table>'
?>

    
    
    
    
    
</body>
</html>