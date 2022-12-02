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
    document.
});
