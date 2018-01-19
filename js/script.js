var map = new Map("premiere");

var joueur = new Personnage("bomberman.png", 13, 11, DIRECTION.HAUT);
map.addPersonnage(joueur);

var joueur2 = new Personnage("bomberman.png", 1, 1, DIRECTION.BAS);
map.addPersonnage(joueur2);


var listeBombes = [];
var listeBonus = [];


window.onload = function() {
	var canvas = document.getElementById('canvas');
	var ctx = canvas.getContext('2d');
	
	canvas.width  = map.getLargeur() * 64;
	canvas.height = map.getHauteur() * 64;
	
	setInterval(function() {
		map.dessinerMap(ctx);
		victoireCondition();
	}, 40);
	// Gestion du clavier perso 1
	window.onkeydown = function(event) {
		// On récupère le code de la touche
		var e = event || window.event;
		var key = e.which || e.keyCode;
		
		switch(key) {
			case 38 :  // Flèche haut
				joueur.deplacer(DIRECTION.HAUT, map, 1);
				break;
			case 40 :  // Flèche bas
				joueur.deplacer(DIRECTION.BAS, map, 1);
				break;
			case 37 :  // Flèche gauche
				joueur.deplacer(DIRECTION.GAUCHE, map, 1);
				break;
			case 39 :  // Flèche droite
				joueur.deplacer(DIRECTION.DROITE, map, 1);
				break;
			case 96: // barre espace
				if(joueur.nombreDeBombesRestantes != 0){
				var bombe = new Bombe (joueur.x,joueur.y,joueur.range, 1)
				listeBombes.push(bombe);
				joueur.nombreDeBombesRestantes--}
				break;
		//joueur 2
			case 122 : case 119 : case 90 : case 87 : //  z, w, Z, W
				joueur2.deplacer(DIRECTION.HAUT, map, 2);
				break;
			case 115 : case 83 : //  s, S
				joueur2.deplacer(DIRECTION.BAS, map, 2);
				break;
			case 113 : case 97 : case 81 : case 65 : //  q, a, Q, A
				joueur2.deplacer(DIRECTION.GAUCHE, map , 2);
				break;
			case 100 : case 68 : // d, D
				joueur2.deplacer(DIRECTION.DROITE, map, 2);
				break;
			case 32:
				if(joueur2.nombreDeBombesRestantes != 0){
				var bombe = new Bombe (joueur2.x,joueur2.y,joueur2.range, 2)
				listeBombes.push(bombe);
				joueur.nombreDeBombesRestantes--}
				break;
			default : 
				//alert(key);
				// Si la touche ne nous sert pas, nous n'avons aucune raison de bloquer son comportement normal.
				return true;
		}
		
		return false;
	}


}


// victoire

function victoireCondition(){

	if(victoire == 0){}
	else if (victoire == 2){
		document.getElementById("victoireJoueur2").innerHTML = "le joueur 2 GAGNE!"
		document.getElementById("victoireMessage").innerHTML = "le joueur 2 GAGNE!"
		document.getElementById("victoireMessage").style.display = "block"
	}
	else if (victoire == 1){
		document.getElementById("victoireJoueur1").innerHTML = "le joueur 1 GAGNE!"
		document.getElementById("victoireMessage").innerHTML = "le joueur 1 GAGNE!"
		document.getElementById("victoireMessage").style.display = "block"
	}
}