var map = new Map("map01");

window.onload = function() {
	var canvas = document.getElementById('canvas');
	var ctx = canvas.getContext('2d');
	
	canvas.width  = map.getLargeur() * 64;
	canvas.height = map.getHauteur() * 64;
	
	map.dessinerMap(ctx);

	map.addPersonnage(new Personnage("personnage.png", 1, 1, DIRECTION.HAUT));
	

}

