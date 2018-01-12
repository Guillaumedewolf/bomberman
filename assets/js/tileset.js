function Tileset(url) {
	// Chargement de l'image dans l'attribut image
	this.image = new Image();
	this.image.referenceDuTileset = this;
	this.image.src = "assets/tilesets/" + url;
	this.image.onload = function() 
	{


		this.referenceDuTileset.largeur = this.width / 64;
	}

}

// Méthode de dessin du tile numéro "numero" dans le contexte 2D "context" aux coordonnées x et y
Tileset.prototype.dessinerTile = function(numero, context, xDestination, yDestination) {
		
		var xSourceEnTiles = numero % this.largeur;
		if(xSourceEnTiles == 0) xSourceEnTiles = this.largeur;
		var ySourceEnTiles = Math.ceil(numero / this.largeur);
		var xSource = (xSourceEnTiles - 1) * 64;
		var ySource = (ySourceEnTiles - 1) * 64;
		context.drawImage(this.image, xSource, ySource, 64, 64, xDestination, yDestination, 64, 64);
	
}



