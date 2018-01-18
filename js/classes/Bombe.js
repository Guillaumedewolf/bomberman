

//constructor bombe


function Bombe (x,y,range, joueur) {

        this.x = x*64;
        this.y = y*64;
        this.range = range;
        this.joueur = joueur
        this.detonateur = 50
        this.animationExplosion = 0
        this.animationExplosionInverse = 6
        this.delayFrameExplosion=0

        // Chargement de l'image dans l'attribut image
		this.image = new Image();
		this.image.src = "sprites/bombe.png";


		//création de la bombe
    }

Bombe.prototype.dessinerBombe = function(context){
		if(this.detonateur >= 0){
		context.drawImage(this.image, this.x,this.y)
		this.detonateur--

	}

		//explosion
		if(this.detonateur==0){
			joueur.nombreDeBombesRestantes++
		}
		if(this.detonateur<0){
			this.explosion(context)
		}
}

Bombe.prototype.explosion = function(context){
		explosionSpriteCentreGD = new Image()
		explosionSpriteCentreGD.src = "sprites/explosionBombeCentreGD.png"

		explosionSpriteHautBas = new Image()
		explosionSpriteHautBas.src = "sprites/explosionBombeHautBas.png"

			//explosion centre
			context.drawImage(explosionSpriteCentreGD, this.animationExplosion*64,0, 64, 64, this.x, this.y, 64,64 )
			//explosion droite
			for(i=1 ; i<=this.range ; i++){
				if(map.terrain[this.y/64][this.x/64+i]==1){break}
				else if(i==this.range || map.terrain[this.y/64][this.x/64+i+1]==1||map.terrain[this.y/64][this.x/64+i]>= 4){
					context.drawImage(explosionSpriteCentreGD, this.animationExplosion*64,3*64, 64, 64, this.x+i*64, this.y, 64,64 )
					break
				}
				else{context.drawImage(explosionSpriteCentreGD, this.animationExplosion*64,1*64, 64, 64, this.x+i*64, this.y, 64,64 )}
			}

			//explosion Gauche
			for(i=1 ; i<=this.range ; i++){
				if(map.terrain[this.y/64][this.x/64-i]==1){break}
				else if(i==this.range || map.terrain[this.y/64][this.x/64-i-1]==1 || map.terrain[this.y/64][this.x/64-i]>= 4){
					context.drawImage(explosionSpriteCentreGD, this.animationExplosionInverse*64,4*64, 64, 64, this.x-i*64, this.y, 64,64 )
					break
				}
				else{context.drawImage(explosionSpriteCentreGD, this.animationExplosionInverse*64,2*64, 64, 64, this.x-i*64, this.y, 64,64 )}
			}






			//incrémentation frame suivante aniamtion
			this.delayFrameExplosion++
			if(this.delayFrameExplosion == 20){
			this.animationExplosion++
			this.animationExplosionInverse--
			this.delayFrameExplosion = 0
		}
			

		if(this.animationExplosion==7){
			this.x = 0
			this.y = 0
		}
		}

		

























Personnage.prototype.bombe = function(map) {
		var xBombe=this.x
		var yBombe=this.y
		
		
}
