var bonusTab = ["rien","bombe","range"]
var bonusRandom


var victoire = 0

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
        this.etatBombe = true

        // Chargement de l'image dans l'attribut image
		this.image = new Image();
		this.image.src = "sprites/bombe.png";


		
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




		if(this.etatBombe == true){
			//explosion centre
			context.drawImage(explosionSpriteCentreGD, this.animationExplosion*64,0, 64, 64, this.x, this.y, 64,64 )


			//explosion droite
			for(i=1 ; i<=this.range ; i++){
				if(map.terrain[this.y/64][this.x/64+i]==1){break}
				else if(i==this.range || map.terrain[this.y/64][this.x/64+i+1]==1||map.terrain[this.y/64][this.x/64+i]>= 4){
					context.drawImage(explosionSpriteCentreGD, this.animationExplosion*64,3*64, 64, 64, this.x+i*64, this.y, 64,64 )
					//suppression caisse
					if(this.animationExplosion > 6){
					if(map.terrain[this.y/64][this.x/64+i] == 4){
						map.terrain[this.y/64][this.x/64+i] = 2
						//pop bonus
						randomCaisse()
						var bonus = new Bonus (this.x+i*64,this.y,bonusRandom)
						listeBonus.push(bonus);
					}
					else if(map.terrain[this.y/64][this.x/64+i] == 5){
						map.terrain[this.y/64][this.x/64+i] = 3
						//pop bonus
						randomCaisse()
						var bonus = new Bonus (this.x+i*64,this.y,bonusRandom)
						listeBonus.push(bonus);

					}}

					break
				}
				else{context.drawImage(explosionSpriteCentreGD, this.animationExplosion*64,1*64, 64, 64, this.x+i*64, this.y, 64,64 )}
				
			}

			//explosion Gauche
			for(i=1 ; i<=this.range ; i++){
				if(map.terrain[this.y/64][this.x/64-i]==1){break}
				else if(i==this.range || map.terrain[this.y/64][this.x/64-i-1]==1 || map.terrain[this.y/64][this.x/64-i]>= 4){
					context.drawImage(explosionSpriteCentreGD, this.animationExplosionInverse*64,4*64, 64, 64, this.x-i*64, this.y, 64,64 )
						//suppression caisse
					if(this.animationExplosion > 6){
					if(map.terrain[this.y/64][this.x/64-i] == 4){
						map.terrain[this.y/64][this.x/64-i] = 2
						//pop bonus
						randomCaisse()
						var bonus = new Bonus (this.x-i*64,this.y,bonusRandom)
						listeBonus.push(bonus);
					}
					else if(map.terrain[this.y/64][this.x/64-i] == 5){
						map.terrain[this.y/64][this.x/64-i] = 3
						//pop bonus
						randomCaisse()
						var bonus = new Bonus (this.x-i*64,this.y,bonusRandom)
						listeBonus.push(bonus);
					}}
					break
				}
				else{context.drawImage(explosionSpriteCentreGD, this.animationExplosionInverse*64,2*64, 64, 64, this.x-i*64, this.y, 64,64 )}
						
				
			}



		//explosion Bas
			for(i=1 ; i<=this.range ; i++){
				if(map.terrain[this.y/64+i][this.x/64]==1){break}
				else if(i==this.range || map.terrain[this.y/64+i+1][this.x/64]==1||map.terrain[this.y/64+i][this.x/64]>= 4){
					context.drawImage(explosionSpriteHautBas, 0*64,this.animationExplosion*64, 64, 64, this.x, this.y+i*64, 64,64 )
					//suppression caisse
					if(this.animationExplosion > 6 	){
					if(map.terrain[this.y/64+i][this.x/64] == 4){
						map.terrain[this.y/64+i][this.x/64] = 2
						// pop bonus
						randomCaisse()
						var bonus = new Bonus (this.x,this.y+i*64,bonusRandom)
						listeBonus.push(bonus);
					}
					else if(map.terrain[this.y/64+i][this.x/64] == 5){
						map.terrain[this.y/64+i][this.x/64] = 3
						//pop bonus
						randomCaisse()
						var bonus = new Bonus (this.x,this.y+i*64,bonusRandom)
						listeBonus.push(bonus);
					}}

					break
				}
				else{context.drawImage(explosionSpriteHautBas, 4*64,this.animationExplosion*64, 64, 64, this.x, this.y+i*64, 64,64 )}

				
			}

			//explosion Haut
			for(i=1 ; i<=this.range ; i++){
				if(map.terrain[this.y/64-i][this.x/64]==1){break}
				else if(i==this.range || map.terrain[this.y/64-i-1][this.x/64]==1 || map.terrain[this.y/64-i][this.x/64]>= 4){
					context.drawImage(explosionSpriteHautBas, 2*64,this.animationExplosionInverse*64, 64, 64, this.x, this.y-i*64, 64,64 )
						//suppression caisse
					if(this.animationExplosion > 6){
					if(map.terrain[this.y/64-i][this.x/64] == 4){
						map.terrain[this.y/64-i][this.x/64] = 2
						//pop bonus
						// randomCaisse()
						var bonus = new Bonus (this.x,this.y-i*64,bonusRandom)
						listeBonus.push(bonus);
					}
					else if(map.terrain[this.y/64-i][this.x/64] == 5){
						map.terrain[this.y/64-i][this.x/64] = 3
						//pop bonus
						randomCaisse()
						var bonus = new Bonus (this.x,this.y-i*64,bonusRandom)
						listeBonus.push(bonus);
					}}
					break
				}
				else{context.drawImage(explosionSpriteHautBas, 6*64,this.animationExplosionInverse*64, 64, 64, this.x, this.y-i*64, 64,64 )}


				
			}

			//condition victoire
				for(i=1 ; i<=this.range ; i++){
					if(joueur.x==this.x/64 && joueur.y == this.y/64){victoire=1}
					else if(joueur.x==this.x/64+i && joueur.y == this.y/64){victoire=1}
					else if(joueur2.x==this.x/64 && joueur2.y == this.y/64){victoire=2}
					else if(joueur2.x==this.x/64+i && joueur2.y == this.y/64){victoire=2}

					else if(joueur.x==this.x/64-i && joueur.y == this.y/64){victoire=1}
					else if(joueur2.x==this.x/64-i && joueur2.y == this.y/64){victoire=2}

					else if(joueur.x==this.x/64 && joueur.y == this.y/64+i){victoire=1}
					else if(joueur2.x==this.x/64 && joueur2.y == this.y/64+i){victoire=2}

					else if(joueur.x==this.x/64 && joueur.y == this.y/64-i){victoire=1}
					else if(joueur2.x==this.x/64 && joueur2.y == this.y/64-i){victoire=2}
				}
	}



		if(this.animationExplosion==7){
			this.x = 0
			this.y = 0
			this.etatBombe = false
		}

			
			

		

		//incrémentation frame suivante aniamtion
			this.delayFrameExplosion++
			if(this.delayFrameExplosion == 2){
			this.animationExplosion++
			this.animationExplosionInverse--
			this.delayFrameExplosion = 0
		}
		}

		






// bonus caisse 

function randomCaisse (){
	bonusRandom = Math.floor(Math.random() * Math.floor(bonusTab.length))

}



function Bonus(x,y,type) {
	this.x=x
	this.y=y
	this.type= type
	this.etatAnimation = 0

}


Bonus.prototype.dessinerBonus = function(context){
	var imgBonus = new Image()
	imgBonus.src = "sprites/bonus.png"


	if(this.type==0){}
	else{
		context.drawImage(imgBonus, 64*this.type-64,0, 64, 64, this.x, this.y, 64,64 )
	}
	

	if(this.x == joueur.x*64 && this.y == joueur.y*64){
		if(this.type == 1){joueur.nombreDeBombesRestantes++}
		else if(this.type == 2){joueur.range++}
			this.type=0

	}
	if(this.x == joueur2.x*64 && this.y == joueur2.y*64){
		if(this.type == 1){joueur2.nombreDeBombesRestantes++}
		else if(this.type == 2){joueur2.range++}
			this.type=0

	}
}






