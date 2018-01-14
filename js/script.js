var map = new Map("premiere");

var joueur = new Personnage("bomberman.png", 1, 1, DIRECTION.BAS);
map.addPersonnage(joueur);

var joueur2 = new Personnage("bomberman.png", 13, 11, DIRECTION.HAUT);
map.addPersonnage(joueur2);


var caisse = new Personnage("caisse.png",5,5,DIRECTION.HAUT)
map.addPersonnage(caisse);

window.onload = function() {
	var canvas = document.getElementById('canvas');
	var ctx = canvas.getContext('2d');
	
	canvas.width  = map.getLargeur() * 64;
	canvas.height = map.getHauteur() * 64;
	
	setInterval(function() {
		map.dessinerMap(ctx);
	}, 40);
	// Gestion du clavier perso 1
	window.onkeydown = function(event) {
		// On récupère le code de la touche
		var e = event || window.event;
		var key = e.which || e.keyCode;
		
		switch(key) {
			case 38 :  // Flèche haut
				joueur.deplacer(DIRECTION.HAUT, map);
				break;
			case 40 :  // Flèche bas
				joueur.deplacer(DIRECTION.BAS, map);
				break;
			case 37 :  // Flèche gauche
				joueur.deplacer(DIRECTION.GAUCHE, map);
				break;
			case 39 :  // Flèche droite
				joueur.deplacer(DIRECTION.DROITE, map);
				break;
			case 32: // barre espace
				joueur.bombe(map);
				break;
		//joueur 2
			case 122 : case 119 : case 90 : case 87 : //  z, w, Z, W
				joueur2.deplacer(DIRECTION.HAUT, map);
				break;
			case 115 : case 83 : //  s, S
				joueur2.deplacer(DIRECTION.BAS, map);
				break;
			case 113 : case 97 : case 81 : case 65 : //  q, a, Q, A
				joueur2.deplacer(DIRECTION.GAUCHE, map);
				break;
			case 100 : case 68 : // d, D
				joueur2.deplacer(DIRECTION.DROITE, map);
				break;
			default : 
				//alert(key);
				// Si la touche ne nous sert pas, nous n'avons aucune raison de bloquer son comportement normal.
				return true;
		}
		
		return false;
	}


}
