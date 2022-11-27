# Connection à mysql
-> Définir un mot de passe pour root :
    mysql -u root -p password monmotdepasse
-> Puis pour se connecter au serveur sql :
    mysql -u root -p 
    Taper le mdp : monmotdepasse

# Pour se connecter à son serveur mysql
-> il faut installer MAMP 
-> puis lancer son serveur (l'application à une interface graphique) 
-> le serveurs est lancé quand le rond est vert 

# Installer 2 packets pour les authentifications et pour cripter mdp
-> npm install jsonwebtoken --save
-> npm install bcrypt --save

# Binding
-> faire du binding pour passer des infos au front

# Fontion asynchrone
-> Fonction qui se lance et le programme lance les lignes d'après même si la fonction résultat n'a pas encore retourné son résultat
-> On utilise des fonction de callback, qui sont appelé pour gérer les résultats