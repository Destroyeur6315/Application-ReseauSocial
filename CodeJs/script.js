let nom = "Romain";

// affiche dans la console et non sur la page web
console.log(nom + " Fillot"); 

const monTexte = document.getElementById('texte');
console.log(monTexte);

const contents = document.getElementsByClassName('content');
console.log(contents[0]);

const bouton1 = document.getElementById("button1");
const bouton2 = document.getElementById("button2");

bouton1.onclick = () => document.body.style.backgroundColor = "blue";
bouton2.onclick = () => document.body.style.backgroundColor = "red";
