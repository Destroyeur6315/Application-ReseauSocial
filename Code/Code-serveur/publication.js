const mysql=require('mysql')

const contenu1=document.getElementById("contenu1")
const contenu2=document.getElementById("contenu1")
const contenu3=document.getElementById("contenu1")
const contenu4=document.getElementById("contenu1")

const con = mysql.createConnection({   host: "localhost",   user: "root",   password: "root",   database : "romain_application" });

    // Try to connect
con.connect(function(err) {   
    if (err) throw err;   
    console.log("Connecté à la base de données MySQL!");  
});

var requete_sql = '\
    SELECT contenu FROM Publication LIMIT BY 4 ORDERBY DESC datecreation ';


con.query(requete_sql,function(err,results,fields){
    if(err) throw err;
    var c1=contenu1.textContent=result[0];
    var c2=contenu2.textContent=results[1];
    var c3=contenu3.textContent=results[2];
    var c4=contenu4.textContent=results[3];
    alert(c1);
    alert(c2);
    alert(c3);
    alert(c4);
});
