var Bombe = {
	x: 0,
	y: 0,
	range: 1,
	compteARebours:50,
	etatAnimationExplosion:0,
	delayAnimationExplosion:0

	 
}

//constructor bombe


function Bombe (x,y,range) {

        this.x = x;
        this.y = y;
        this.range = range;

        // Chargement de l'image dans l'attribut image
	this.image = new Image();
	this.image.src = "sprites/bombe.png";


		//création de la bombe
		
    }

Bombe.prototype.dessinerBombe = function(context){

		context.drawImage(image, x,y)
}


























Personnage.prototype.bombe = function(map) {
		var xBombe=this.x
		var yBombe=this.y
		
		
}
