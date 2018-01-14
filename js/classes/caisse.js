function Caisse(url, x, y) {
	this.x = x; // (en cases)
	this.y = y; // (en cases)
	this.etatAnimation = -1;
	
	// Chargement de l'image dans l'attribut image
	this.image = new Image();
	this.image.referenceDuPerso = this;
	this.image.onload = function() {
		if(!this.complete) 
			throw "Erreur de chargement du sprite nommé \"" + url + "\".";
	}
	this.image.src = "tilesets/" + url;
}

