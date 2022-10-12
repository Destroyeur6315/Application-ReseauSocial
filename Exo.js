// Jasmine, mocha.js, Mocha, FRAMEWORK pour test fonctionnels
//Exo creation de classe et recuperation des donnees
class Episode {
  constructor(title, duration, hasBeenWatched) {
    this.title = title;
    this.duration = duration;
    this.hasBeenWatched = hasBeenWatched;
  }
}

let firstEpisode = new Episode('Dark Beginnings', 45, true);
let secondEpisode = new Episode('The Mystery Continues', 45, false);
let thirdEpisode = new Episode('The Unexpected Climax', 60, false);

// Exo creation de tableau et recuperation des variables dans le tab
let episodes = [firstEpisode, secondEpisode, thirdEpisode];



//Fonctionnement du switch


switch (firstUser.accountLevel) {
  case 'normal':
        console.log('You have a normal account!');
  
  break;
  case 'premium':
        console.log('You have a premium account!');
  
  break;
  case 'mega-premium':
        console.log('You have a mega premium account!');
  break;
  
  default:
        console.log('Unknown account type!');
  }


  try {
    // code susceptible a l'erreur ici
    } catch (error) {
    // reaction aux erreurs ici
    }