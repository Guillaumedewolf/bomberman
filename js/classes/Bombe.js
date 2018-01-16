var bombeJ1 = {
	"joueurX" : 832,
	"joueurY" : 704,
	"nombreBombePosee"  : 0,
	"tempsAvantExplosion": -1,
	"etatAnimationBombe" : 0,
	"etatAnimationBombeInverse": 6,
	"delayExplosion" : 0,
	"explosion" : 0
}

var bombeJ2 = {
	"joueurX" : 64,
	"joueurY" : 64,
	"nombreBombePosee"  : 0,
	"tempsAvantExplosion": -1,
	"etatAnimationBombe" : 0,
	"etatAnimationBombeInverse": 6,
	"delayExplosion" : 0,
	"explosion" : 0
}


Personnage.prototype.bombe = function(map, joueur) {
	//joueur 1
	if (joueur == 1){
	if(bombeJ1.nombreBombePosee <= 0){
		bombeJ1.nombreBombePosee = 1
		bombeJ1.x=this.x*64
		bombeJ1.y=this.y*64
		bombeJ1.tempsAvantExplosion=100
		
	}}
	//joueur 2
	if(joueur == 2){
	if(bombeJ2.nombreBombePosee <= 0){
		bombeJ2.nombreBombePosee = 1
		bombeJ2.x=this.x*64
		bombeJ2.y=this.y*64
		bombeJ2.tempsAvantExplosion=100
		
	}}
	

		
}


function dessinerBombe (context) {
	//joueur 1
	if(bombeJ1.nombreBombePosee == 1){
		var bombeImg = new Image()
		bombeImg.src = "sprites/bombe.png"
		context.drawImage(bombeImg, bombeJ1.x , bombeJ1.y)
		bombeJ1.tempsAvantExplosion--
	}

	if (bombeJ1.nombreBombePosee == 1){
		bombeJ1.etatAnimationBombe = 0
		bombeJ1.etatAnimationBombeInverse = 6
	}
	 if(bombeJ1.tempsAvantExplosion == 0 && bombeJ1.nombreBombePosee == 1){
	 	bombeJ1.explosion = 1
		bombeJ1.nombreBombePosee = -1
										}
		victoire()
		explosionBombe(context)

	


	//joueur 2

	if(bombeJ2.nombreBombePosee == 1){
		var bombeImg = new Image()
		bombeImg.src = "sprites/bombe.png"
		context.drawImage(bombeImg, bombeJ2.x , bombeJ2.y)
		bombeJ2.tempsAvantExplosion--
	}

	if (bombeJ2.nombreBombePosee == 1){
		bombeJ2.etatAnimationBombe = 0
		bombeJ2.etatAnimationBombeInverse = 6
		}

	if(bombeJ2.tempsAvantExplosion == 0 && bombeJ2.nombreBombePosee == 1){
	 	bombeJ2.explosion = 1
		bombeJ2.nombreBombePosee = -1
										}
		victoire()
		explosionBombe(context)

}



function explosionBombe(context) {

	var explosionImg = new Image()
	explosionImg.src = "sprites/explosionBombe.png"
	var explosionImgCentreGaucheDroite = new Image()
	explosionImgCentreGaucheDroite.src = "sprites/explosionBombeCentreGD.png"
	var explosionImgHautBas = new Image()
	explosionImgHautBas.src = "sprites/explosionBombeHautBas.png"
	//joueur 1
	//centre de l'explosion joueur 1
	if (bombeJ1.etatAnimationBombe < 7  && bombeJ1.explosion == 1) {
	context.drawImage(explosionImgCentreGaucheDroite, bombeJ1.etatAnimationBombe*64, 0, 64, 64, bombeJ1.x, bombeJ1.y, 64, 64)
	if(bombeJ1.delayExplosion == 4 && bombeJ1.explosion == 1){
		bombeJ1.etatAnimationBombeInverse--
		bombeJ1.etatAnimationBombe++
		bombeJ1.delayExplosion=0
		
	}
	else{
		bombeJ1.delayExplosion++
	}
	if(bombeJ1.etatAnimationBombe == 7){
		bombeJ1.explosion=0
	 }
	}
	

	//4 direction
	
	if (bombeJ1.etatAnimationBombe < 7  && bombeJ1.explosion == 1) {
		//droite
	context.drawImage(explosionImgCentreGaucheDroite, bombeJ1.etatAnimationBombe*64, 192, 64, 64, bombeJ1.x+64, bombeJ1.y, 64, 64)
		//gauche
	context.drawImage(explosionImgCentreGaucheDroite, bombeJ1.etatAnimationBombeInverse*64, 256, 64, 64, bombeJ1.x-64, bombeJ1.y, 64, 64)
		//haut
	context.drawImage(explosionImgHautBas, 128, bombeJ1.etatAnimationBombeInverse*64, 64, 64, bombeJ1.x, bombeJ1.y-64, 64, 64)
		//bas
	context.drawImage(explosionImgHautBas, 0, bombeJ1.etatAnimationBombe*64, 64, 64, bombeJ1.x, bombeJ1.y+64, 64, 64)
}

		//joueur 2

	if (bombeJ2.etatAnimationBombe < 7 && bombeJ2.explosion == 1) {
		context.drawImage(explosionImgCentreGaucheDroite, bombeJ2.etatAnimationBombe*64, 0, 64, 64, bombeJ2.x, bombeJ2.y, 64, 64)
		if(bombeJ2.delayExplosion == 4 && bombeJ2.nombreBombePosee != 1){
			bombeJ2.etatAnimationBombeInverse--
			bombeJ2.etatAnimationBombe++
			bombeJ2.delayExplosion=0

		}
		else{
			bombeJ2.delayExplosion++
		}
		if(bombeJ2.etatAnimationBombe == 7){
		bombeJ2.explosion= 0
	 	}
		 }
		

		//4 direction
		
		if (bombeJ2.etatAnimationBombe < 7  && bombeJ2.explosion == 1) {
		//droite
	context.drawImage(explosionImgCentreGaucheDroite, bombeJ2.etatAnimationBombe*64, 192, 64, 64, bombeJ2.x+64, bombeJ2.y, 64, 64)
		//gauche
	context.drawImage(explosionImgCentreGaucheDroite, bombeJ2.etatAnimationBombeInverse*64, 256, 64, 64, bombeJ2.x-64, bombeJ2.y, 64, 64)
		//haut
	context.drawImage(explosionImgHautBas, 128, bombeJ2.etatAnimationBombeInverse*64, 64, 64, bombeJ2.x, bombeJ2.y-64, 64, 64)
		//bas
	context.drawImage(explosionImgHautBas, 0, bombeJ2.etatAnimationBombe*64, 64, 64, bombeJ2.x, bombeJ2.y+64, 64, 64)
}
	

}

