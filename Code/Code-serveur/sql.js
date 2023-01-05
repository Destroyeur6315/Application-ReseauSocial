exports.preparer = function(mysql, requete_sql, inserts) {
    requete_sql = mysql.format(requete_sql, inserts)
      // nous utilisons la méthode .remplace avec une expression régulière
      // pour supprimer les accents graves et les points
      .replace(/`/g, "'")
      .replace(/'\.'/g, ".")
      .replace(/'/g, "\\'");
    return requete_sql;
  }