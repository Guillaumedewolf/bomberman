var DIRECTION = {
	"BAS"    : 0,
	"GAUCHE" : 2,
	"DROITE" : 5,
	"HAUT"   : 1
}

var DUREE_ANIMATION = 3;
var DUREE_DEPLACEMENT = 5;


function Personnage(url, x, y, direction) {
	this.x = x; // (en cases)
	this.y = y; // (en cases)
	this.direction = direction;
	this.etatAnimation = -1;
	
	// Chargement de l'image dans l'attribut image
	this.image = new Image();
	this.image.referenceDuPerso = this;
	this.image.onload = function() {
		if(!this.complete) 
			throw "Erreur de chargement du sprite nommé \"" + url + "\".";
		
		// Taille du personnage
		this.referenceDuPerso.largeur = this.width / 3;
		this.referenceDuPerso.hauteur = this.height / 6;
	}
	this.image.src = "sprites/" + url;
}

Personnage.prototype.dessinerPersonnage = function(context) {
	var frame = 0; // Numéro de l'image à prendre pour l'animation
	var decalageX = 0, decalageY = 0; // Décalage à appliquer à la position du personnage
	if(this.etatAnimation >= DUREE_DEPLACEMENT) {
		// Si le déplacement a atteint ou dépassé le temps nécéssaire pour s'effectuer, on le termine
		this.etatAnimation = -1;
	} else if(this.etatAnimation >= 0) {
		// On calcule l'image (frame) de l'animation à afficher
		frame = Math.floor(this.etatAnimation / DUREE_ANIMATION);
		if(frame > 2) {
			frame %= 3;
		}
		
		// Nombre de pixels restant à parcourir entre les deux cases
		var pixelsAParcourir = 64 - (64 * (this.etatAnimation / DUREE_DEPLACEMENT));
		
		// À partir de ce nombre, on définit le décalage en x et y.
		if(this.direction == DIRECTION.HAUT) {
			decalageY = pixelsAParcourir;
		} else if(this.direction == DIRECTION.BAS) {
			decalageY = -pixelsAParcourir;
		} else if(this.direction == DIRECTION.GAUCHE) {
			decalageX = pixelsAParcourir;
		} else if(this.direction == DIRECTION.DROITE) {
			decalageX = -pixelsAParcourir;
		}
		
		// On incrémente d'une frame
		this.etatAnimation++;
	}
	/*
	 * Si aucune des deux conditions n'est vraie, c'est qu'on est immobile, 
	 * donc il nous suffit de garder les valeurs 0 pour les variables 
	 * frame, decalageX et decalageY
	 */
	
	context.drawImage(
		this.image, 
		this.largeur * frame, this.direction * this.hauteur, // Point d'origine du rectangle source à prendre dans notre image
		this.largeur, this.hauteur, // Taille du rectangle source (c'est la taille du personnage)
		// Point de destination (dépend de la taille du personnage)
		(this.x * 64) - (this.largeur / 2) + 32 + decalageX, (this.y * 64) - this.hauteur + 55 + decalageY,
		this.largeur, this.hauteur // Taille du rectangle destination (c'est la taille du personnage)
	);
}

Personnage.prototype.getCoordonneesAdjacentes = function(direction) {
	var coord = {'x' : this.x, 'y' : this.y};
	switch(direction) {
		case DIRECTION.BAS : 
			coord.y++;
			break;
		case DIRECTION.GAUCHE : 
			coord.x--;
			break;
		case DIRECTION.DROITE : 
			coord.x++;
			break;
		case DIRECTION.HAUT : 
			coord.y--;
			break;
	}
	return coord;
}

Personnage.prototype.deplacer = function(direction, map, perso) {
	
	// On ne peut pas se déplacer si un mouvement est déjà en cours !
	if(this.etatAnimation >= 0) {
		return false;
	}

	// On change la direction du personnage
	this.direction = direction;
		
	// On vérifie que la case demandée est bien située dans la carte
	var prochaineCase = this.getCoordonneesAdjacentes(direction);
	if(prochaineCase.x < 1 || prochaineCase.y < 1 || prochaineCase.x >= map.getLargeurBis() || prochaineCase.y >= map.getHauteurBis()) {
		// On retourne un booléen indiquant que le déplacement ne s'est pas fait, 
		// Ça ne coute pas cher et ca peut toujours servir
		return false;
	}
	// bloquer les case metal
	// bloquer les caisses
	if(mapData.terrain[prochaineCase.y][prochaineCase.x] >= 4 ||  mapData.terrain[prochaineCase.y][prochaineCase.x] == 1){
		return false

	}

	// On commence l'animation
	this.etatAnimation = 1;
		
	// On effectue le déplacement
	this.x = prochaineCase.x;
	this.y = prochaineCase.y;
	
	
	//ajout du déplacement dans la variable bombe
	if(perso == 1){
		bombeJ1.joueurX = this.x*64
		bombeJ1.joueurY = this.y*64
	}
	else if(perso == 2){
		bombeJ2.joueurX = this.x*64
		bombeJ2.joueurY = this.y*64
	}
	
		
	return true;
}



// mort des joueurs
function victoire(){

// if (bombeJ1.joueurX == bombeJ1.x && bombeJ1.joueurY == bombeJ1.y && bombeJ1.tempsAvantExplosion == 0 || bombeJ1.joueurX == bombeJ2.x && bombeJ1.joueurY == bombeJ2.y && bombeJ2.tempsAvantExplosion == 0 ){
// 	alert("le joueur 1 est mort, le joueur 2 gagne!!")
// 	bombeJ1.tempsAvantExplosion--
	
// }
// if (bombeJ2.joueurX == bombeJ2.x && bombeJ1.joueurY == bombeJ2.y && bombeJ2.tempsAvantExplosion == 0 || bombeJ2.joueurX == bombeJ1.x && bombeJ2.joueurY == bombeJ1.y && bombeJ1.tempsAvantExplosion == 0){
// 	alert("le joueur 2 est mort, le joueur 1 gagne!!")
// 	bombeJ1.tempsAvantExplosion--
	
// }

// victoire avec range
/*for (i=-1; i<2 ; i++){
	rangeX= bombeJ1.x + i*64
	rangeX2= bombeJ2.x + i*64
	//joueur 1 mort
	if (bombeJ1.joueurX == rangeX && bombeJ1.joueurY == bombeJ1.y && bombeJ1.tempsAvantExplosion == 0 || bombeJ1.joueurX == rangeX && bombeJ1.joueurY == bombeJ2.y && bombeJ2.tempsAvantExplosion == 0 ){
		alert("le joueur 1 est mort, le joueur 2 gagne!!")
		bombeJ1.tempsAvantExplosion = -1
	}
	// joueur 2 mort
	if (bombeJ2.joueurX == rangeX2 && bombeJ1.joueurY == bombeJ2.y && bombeJ2.tempsAvantExplosion == 0 || bombeJ2.joueurX == rangeX && bombeJ2.joueurY == bombeJ1.y && bombeJ1.tempsAvantExplosion == 0){
		alert("le joueur 2 est mort, le joueur 1 gagne!!")
		bombeJ1.tempsAvantExplosion = -1
	}

}
for (n=-1; n<2 ; n++){
	rangeY= bombeJ1.y + n*64
	rangeY2= bombeJ2.y + n*64
	if (bombeJ1.joueurX == bombeJ1.x && bombeJ1.joueurY == rangeY && bombeJ1.tempsAvantExplosion == 0 || bombeJ1.joueurX == bombeJ2.x && bombeJ1.joueurY == bombeJ2.y && bombeJ2.tempsAvantExplosion == 0 ){
		alert("le joueur 1 est mort, le joueur 2 gagne!!")
		bombeJ1.tempsAvantExplosion = -1
}
	if (bombeJ2.joueurX == bombeJ2.x && bombeJ1.joueurY == rangeY2 && bombeJ2.tempsAvantExplosion == 0 || bombeJ2.joueurX == rangeX && bombeJ2.joueurY == rangeY && bombeJ1.tempsAvantExplosion == 0){
		alert("le joueur 2 est mort, le joueur 1 gagne!!")
		bombeJ1.tempsAvantExplosion = -1
	}
}*/

}