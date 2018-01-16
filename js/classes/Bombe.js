var bombeJ1 = {
	"x":64,
	"y":64,
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
	"x":64,
	"y":64,
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
	if (joueur == 1 && bombeJ1.explosion == 0){
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
		bombeJ1.nombreBombePosee = 0
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

	if(bombeJ2.tempsAvantExplosion == 0){
	 	bombeJ2.explosion = 1
	 	bombeJ2.nombreBombePosee = 0
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
	//joueur 1 +++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++
	//centre de l'explosion joueur 1
	if (bombeJ1.etatAnimationBombe < 7  && bombeJ1.explosion == 1 && bombeJ1.nombreBombePosee == 0) {
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
		bombeJ1.nombreBombePosee = -1

	 }
	}
	

	// 4 direction
		// comparaison range et obstacle
		var compHautJ1=0
		var compBasJ1=0
		var compDroiteJ1=0
		var compGaucheJ1=0

		var bombeJ1X =bombeJ1.x/64
		var bombeJ1Y =bombeJ1.y/64
		//haut
        if(mapData.terrain[bombeJ1Y-1][bombeJ2X] != 1 && bombeJ1.tempsAvantExplosion == 0){
			compHautJ1=1
			if(mapData.terrain[bombeJ1Y-1][bombeJ1X] == 4)	{mapData.terrain[bombeJ1Y-1][bombeJ1X] = 2}
			else if(mapData.terrain[bombeJ1Y-1][bombeJ1X] == 5)	{mapData.terrain[bombeJ1Y-1][bombeJ12X] = 3}
        }
        else{compHautJ1 = 0}
        //bas
        if(mapData.terrain[bombeJ1Y+1][bombeJ1X] != 1 && bombeJ1.tempsAvantExplosion == 0){
			compBasJ1=1	
			if(mapData.terrain[bombeJ1Y+1][bombeJ1X] == 4)	{mapData.terrain[bombeJ1Y+1][bombeJ1X] = 2}
			else if(mapData.terrain[bombeJ1Y+1][bombeJ1X] == 5)	{mapData.terrain[bombeJ1Y+1][bombeJ1X] = 3}
        }
        else{compBasJ1 = 0}
        //droite
        if(mapData.terrain[bombeJ1Y][bombeJ1X+1] != 1 && bombeJ1.tempsAvantExplosion == 0){
			compDroiteJ1=1	
			if(mapData.terrain[bombeJ1Y][bombeJ1X+1] == 4)	{mapData.terrain[bombeJ1Y][bombeJ1X+1] = 2}
			else if(mapData.terrain[bombeJ1Y][bombeJ1X+1] == 5)	{mapData.terrain[bombeJ1Y][bombeJ1X+1] = 3}
        }
        else{compDroiteJ1 = 0}
        //gauche
        if(mapData.terrain[bombeJ1Y][bombeJ1X-1] != 1 && bombeJ2.tempsAvantExplosion == 0){
			compGaucheJ1=1
			if(mapData.terrain[bombeJ1Y][bombeJ1X-1] == 4)	{mapData.terrain[bombeJ1Y][bombeJ1X-1] = 2}
			else if(mapData.terrain[bombeJ1Y][bombeJ1X-1] == 5)	{mapData.terrain[bombeJ1Y][bombeJ1X-1] = 3}	
        }
        else{compGaucheJ1 = 0}
	
	if (bombeJ1.etatAnimationBombe < 7  && bombeJ1.explosion == 1 && bombeJ1.nombreBombePosee == 0) {
		//droite
		if(compDroiteJ1 == 1){
	context.drawImage(explosionImgCentreGaucheDroite, bombeJ1.etatAnimationBombe*64, 192, 64, 64, bombeJ1.x+64, bombeJ1.y, 64, 64)
		}
		//gauche
		if(compGaucheJ1 == 1){
	context.drawImage(explosionImgCentreGaucheDroite, bombeJ1.etatAnimationBombeInverse*64, 256, 64, 64, bombeJ1.x-64, bombeJ1.y, 64, 64)
		}
		//haut
		if(compHautJ1 == 1){
	context.drawImage(explosionImgHautBas, 128, bombeJ1.etatAnimationBombeInverse*64, 64, 64, bombeJ1.x, bombeJ1.y-64, 64, 64)
		}
		//bas
		if(compBasJ1 == 1){
	context.drawImage(explosionImgHautBas, 0, bombeJ1.etatAnimationBombe*64, 64, 64, bombeJ1.x, bombeJ1.y+64, 64, 64)
		}
}

		//joueur 2 +++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++

	if (bombeJ2.etatAnimationBombe < 7  && bombeJ2.explosion == 1 && bombeJ2.nombreBombePosee == 0) {
	context.drawImage(explosionImgCentreGaucheDroite, bombeJ2.etatAnimationBombe*64, 0, 64, 64, bombeJ2.x, bombeJ2.y, 64, 64)
	if(bombeJ2.delayExplosion == 4 && bombeJ2.explosion == 1){
		bombeJ2.etatAnimationBombeInverse--
		bombeJ2.etatAnimationBombe++
		bombeJ2.delayExplosion=0
		
	}
	else{
		bombeJ2.delayExplosion++
	}
	if(bombeJ2.etatAnimationBombe == 7){
		bombeJ2.explosion=0
		bombeJ2.nombreBombePosee = -1

	 }
	}
		

		// 4 direction
		// comparaison range et obstacle
		var compHautJ2=0
		var compBasJ2=0
		var compDroiteJ2=0
		var compGaucheJ2=0

		var bombeJ2X =bombeJ2.x/64
		var bombeJ2Y =bombeJ2.y/64
		//haut
        if(mapData.terrain[bombeJ2Y-1][bombeJ2X] != 1 && bombeJ2.tempsAvantExplosion == 0){
			compHautJ2=1
			if(mapData.terrain[bombeJ2Y-1][bombeJ2X] == 4)	{mapData.terrain[bombeJ2Y-1][bombeJ2X] = 2}
			else if(mapData.terrain[bombeJ2Y-1][bombeJ2X] == 5)	{mapData.terrain[bombeJ2Y-1][bombeJ2X] = 3}
        }
        else{compHautJ2 = 0}
        //bas
        if(mapData.terrain[bombeJ2Y+1][bombeJ2X] != 1 && bombeJ2.tempsAvantExplosion == 0){
			compBasJ2=1	
			if(mapData.terrain[bombeJ2Y+1][bombeJ2X] == 4)	{mapData.terrain[bombeJ2Y+1][bombeJ2X] = 2}
			else if(mapData.terrain[bombeJ2Y+1][bombeJ2X] == 5)	{mapData.terrain[bombeJ2Y+1][bombeJ2X] = 3}
        }
        else{compBasJ2 = 0}
        //droite
        if(mapData.terrain[bombeJ2Y][bombeJ2X+1] != 1 && bombeJ2.tempsAvantExplosion == 0){
			compDroiteJ2=1	
			if(mapData.terrain[bombeJ2Y][bombeJ2X+1] == 4)	{mapData.terrain[bombeJ2Y][bombeJ2X+1] = 2}
			else if(mapData.terrain[bombeJ2Y][bombeJ2X+1] == 5)	{mapData.terrain[bombeJ2Y][bombeJ2X+1] = 3}
        }
        else{compDroiteJ2 = 0}
        //gauche
        if(mapData.terrain[bombeJ2Y][bombeJ2X-1] != 1 && bombeJ2.tempsAvantExplosion == 0){
			compGaucheJ2=1
			if(mapData.terrain[bombeJ2Y][bombeJ2X-1] == 4)	{mapData.terrain[bombeJ2Y][bombeJ2X-1] = 2}
			else if(mapData.terrain[bombeJ2Y][bombeJ2X-1] == 5)	{mapData.terrain[bombeJ2Y][bombeJ2X-1] = 3}	
        }
        else{compGaucheJ2 = 0}

		
		if (bombeJ2.etatAnimationBombe < 7  && bombeJ2.explosion == 1 && bombeJ2.nombreBombePosee == 0) {
		//droite
		if(compDroiteJ2 == 1){
	context.drawImage(explosionImgCentreGaucheDroite, bombeJ2.etatAnimationBombe*64, 192, 64, 64, bombeJ2.x+64, bombeJ2.y, 64, 64)
		}
		//gauche
		if(compGaucheJ2 == 1){
	context.drawImage(explosionImgCentreGaucheDroite, bombeJ2.etatAnimationBombeInverse*64, 256, 64, 64, bombeJ2.x-64, bombeJ2.y, 64, 64)
		}
		//haut
		if(compHautJ2 == 1){
	context.drawImage(explosionImgHautBas, 128, bombeJ2.etatAnimationBombeInverse*64, 64, 64, bombeJ2.x, bombeJ2.y-64, 64, 64)
		}
		//bas
		if(compBasJ2 == 1){
	context.drawImage(explosionImgHautBas, 0, bombeJ2.etatAnimationBombe*64, 64, 64, bombeJ2.x, bombeJ2.y+64, 64, 64)
		}
}

	

}

