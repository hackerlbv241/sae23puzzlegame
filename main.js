var gamePiece; 
var notify;
var timer;
var spaceY;
var spaceX;

// variables de base définies

 window.onload = function ()

{

	var puzzleArea = document.getElementById('puzzlearea');
	gamePiece = puzzleArea.getElementsByTagName('div'); // On commence par recuperer l'élément contenu dans la div 

	for (var i=0; i<gamePiece.length; i++) // Parcourt chaque div ou pièce du puzzle

	{

		gamePiece[i].className = 'puzzlepiece'; // Configuration de la classe de la pièce du puzzle

		gamePiece[i].style.left = (i%4*100)+'px'; // Calcule la position horizontale des pièces du puzzle par rapport à l'écran

		gamePiece[i].style.top = (parseInt(i/4)*100) + 'px'; // Calcule la position verticale des pièces du puzzle par rapport à l'écran

		gamePiece[i].style.backgroundPosition= '-' + gamePiece[i].style.left + ' ' + '-' + gamePiece[i].style.top; 
		// Calcule la position de l'image de fond en fonction des pièces du puzzle


		gamePiece[i].onmouseover = function() // Applique des fonctionnalités lorsque la souris survole les pièces du puzzle

		{
			if (checkMove(parseInt(this.innerHTML))) // Vérifie chaque fois qu'un déplacement est effectué

			{

				this.style.border = "3px solid red"; // Passe en rouge lorsque la pièce du puzzle est près d'un espace vide

				this.style.color = "#006600"; // La couleur du texte passe au vert lorsque la pièce du puzzle est près d'un espace vide

				this.style.textDecoration = "underline"; // Souligne le numéro de la pièce du puzzle

                this.style.backgroundImage="url('elbeuf1.jpg')"; 
                // Définit l'image de fond du puzzle

			}

		};


		gamePiece[i].onmouseout = function() // S'active lorsque la souris sort de la pièce du puzzle

		{

			this.style.border = "2px solid black"; // Revient à sa bordure de taille d'origine

			this.style.color = "#000000"; // Revient à la couleur de texte d'origine

			this.style.textDecoration = "none"; // Revient à l'état de texte d'origine

		};



		gamePiece[i].onclick = function() // S'active lorsque la souris clique sur une pièce du puzzle

		{

			if (checkMove(parseInt(this.innerHTML))) // Vérifie si la pièce du puzzle peut se déplacer dans un espace vide

			{
				swap(this.innerHTML-1); // Se déplace dans un espace vide si c'est vrai


				if (finish()) // Vérifie quand les 15 pièces sont à leur bonne place

				{

					win(); // Alerte le joueur qu'il a gagné le jeu

				}

				return;

			}

		};

	}


	var shuffle = document.getElementById('shufflebutton'); // Initialise le bouton de mélange

	spaceX = '300px'; 
	spaceY = '300px';
	
	shuffle.onclick = function() // S'active lorsque le bouton de mélange est cliqué
	
	{  // la suite de la fonction

		for (var i=0; i<300; i++) 

		{

			var rand = parseInt(Math.random()* 100) %4; // Génère un nombre aléatoire pour mélanger chaque pièce

			if (rand == 0)

			{

				var temp = up(spaceX, spaceY); // Déplace la pièce vers le haut

				if ( temp != -1)

				{

					swap(temp); // Effectue l'échange

				}

			}

			if (rand == 1)

			{

				var temp = down(spaceX, spaceY); // Déplace la pièce vers le bas

				if ( temp != -1) 

				{

					swap(temp); // Effectue l'échange

				}

			}



			if (rand == 2)

			{

				var temp = left(spaceX, spaceY); // Déplace la pièce vers la gauche

				if ( temp != -1)

				{

					swap(temp); // Effectue l'échange

				}

			}


			if (rand == 3)

			{

				var temp = right(spaceX, spaceY); // Déplace la pièce vers la droite

				if (temp != -1)

				{

					swap(temp); // Effectue l'échange

				}

			}

		}

	};

};




function checkMove(position) // Vérifie si la pièce peut etre déplacée vers un espace vide et à proximité

{
    // Vérifie si la pièce peut être déplacée vers la gauche et si l'espace vide est à la position attendue
	if (left(spaceX, spaceY) == (position-1))
	{
		return true; // Si c'est le cas, renvoie vrai
	}

    // Vérifie si la pièce peut être déplacée vers le bas et si l'espace vide est à la position attendue
	if (down(spaceX, spaceY) == (position-1))
	{
		return true; // Si c'est le cas, renvoie vrai
	}

    // Vérifie si la pièce peut être déplacée vers le haut et si l'espace vide est à la position attendue
	if (up(spaceX, spaceY) == (position-1))
	{
		return true; // Si c'est le cas, renvoie vrai
	}

    // Vérifie si la pièce peut être déplacée vers la droite et si l'espace vide est à la position attendue
	if (right(spaceX, spaceY) == (position-1))
	{
		return true; // Si c'est le cas, renvoie vrai
	}
}



function Notify() //Envoyer une notif à l'utilisateur 

{

	notify --; // décrémente la valeur de notify

	if (notify == 0) // si la valeur atteint zéro

	{

		var body = document.getElementsByTagName('body'); // récupère l'élément body dans le HTML

		body[0].style.backgroundImage= "none"; // revient à l'arrière-plan de la page d'origine

		alert('Bravo, vous avez gagné. Voulez-vous rejouer ?'); // informe l'utilisateur qu'il a gagné le jeu

		var para=document.getElementsByClassName('explanation');
	    para[0].style.visibility="visible"; // rétablit la visibilité à son état d'origine

		return;

	}

	else  (notify % 2) 

	{

		var body = document.getElementsByTagName('body'); 

	    body[0].style.backgroundImage= "url('winn.jpeg')";
	    // définir une image d'arrière-plan pour montrer à l'utilisateur qu'il a terminé le puzzle
		
	}

    timer= setTimeout(Notify, 200); // informe l'utilisateur pendant 2 secondes
}




function win() // Fonction pour notifier l'utilisateur s'il a gagné 

{
	var body = document.getElementsByTagName('body');

	
	body[0].style.backgroundImage= "url('winn.jpeg)"; // image de fond à afficher si l'utilisateur a gagné

	notify = 10; // initialise la variable notify

	timer= setTimeout(Notify, 200);

	var para=document.getElementsByClassName('explanation');
	para[0].style.visibility="hidden"; // masque le texte lorsque l'utilisateur est notifié
}



function finish() // Vérifie quand le jeu est finit

{
	var flag = true; // Initialise un drapeau à vrai pour indiquer que le puzzle est complet

	for (var i = 0; i < gamePiece.length; i++) // Pour chaque pièce du puzzle 
	{

		var top = parseInt(gamePiece[i].style.top); // Récupère la position verticale de la pièce
		var left = parseInt(gamePiece[i].style.left); // Récupère la position horizontale de la pièce


		if (left != (i%4*100) || top != parseInt(i/4)*100) // Vérifie si chaque pièce correspond à sa position horizontale et verticale attendue
		{

			flag = false; // Si une pièce est mal placée, met le drapeau à faux
			break; // Sort de la boucle

		}

	}

	return flag; // Renvoie vrai si toutes les pièces sont à leur place, sinon renvoie faux
}




function left(x, y) // Calcule jusqu'où à gauche une pièce du puzzle devrait être positionnée 

{
	var cordX = parseInt(x); // Convertit la coordonnée x en nombre entier
	var cordY = parseInt(y); // Convertit la coordonnée y en nombre entier

	if (cordX > 0) // Si la coordonnée x est supérieure à 0
	{
		for (var i = 0; i < gamePiece.length; i++)  // Pour chaque pièce du puzzle
		{
			if (parseInt(gamePiece[i].style.left) + 100 == cordX && parseInt(gamePiece[i].style.top) == cordY) // Si la position horizontale de la pièce plus 100 correspond à cordX et la position verticale de la pièce correspond à cordY
			{
				return i; // Renvoie l'index de la pièce
			} 
		}
	}
	else  // Sinon (si la coordonnée x est inférieure ou égale à 0)
	{
		return -1; // Renvoie -1 pour indiquer qu'aucune pièce ne peut être déplacée vers la gauche
	}
}




function right (x, y) // Calcule jusqu'où à droite une pièce du puzzle devrait être positionnée 
{
	var cordX = parseInt(x); // Convertit la coordonnée x en nombre entier
	var cordY = parseInt(y); // Convertit la coordonnée y en nombre entier

	if (cordX < 300) // Si la coordonnée x est inférieure à 300
	{
		for (var i =0; i<gamePiece.length; i++){ // Pour chaque pièce du puzzle
			if (parseInt(gamePiece[i].style.left) - 100 == cordX && parseInt(gamePiece[i].style.top) == cordY)  // Si la position horizontale de la pièce moins 100 correspond à cordX et la position verticale de la pièce correspond à cordY
			{
				return i; // Renvoie l'index de la pièce
			}
		}
	}
	else // Sinon (si la coordonnée x est supérieure ou égale à 300)
	{
		return -1; // Renvoie -1 pour indiquer qu'aucune pièce ne peut être déplacée vers la droite
	} 
}




function up(x, y) // Calcule jusqu'où une pièce du puzzle doit se positionner vers le haut
{
	var cordX = parseInt(x); // Convertit la coordonnée x en nombre entier
	var cordY = parseInt(y); // Convertit la coordonnée y en nombre entier

	if (cordY > 0) // Si la coordonnée y est supérieure à 0
	{
		for (var i=0; i<gamePiece.length; i++) // Pour chaque pièce du puzzle
		{
			if (parseInt(gamePiece[i].style.top) + 100 == cordY && parseInt(gamePiece[i].style.left) == cordX) // Si la position verticale de la pièce plus 100 correspond à cordY et la position horizontale de la pièce correspond à cordX
			{
				return i; // Renvoie l'index de la pièce
			}
		} 
	}
	else // Sinon (si la coordonnée y est inférieure ou égale à 0)
	{
		return -1; // Renvoie -1 pour indiquer qu'aucune pièce ne peut être déplacée vers le haut
	}
}


function down (x, y) // Calcule jusqu'où une pièce du puzzle doit se positionner vers le bas
{

	var cordX = parseInt(x); // Convertit la coordonnée x en nombre entier
	var cordY = parseInt(y); // Convertit la coordonnée y en nombre entier

	if (cordY < 300) // Si la coordonnée y est inférieure à 300
	{
		for (var i=0; i<gamePiece.length; i++) // Pour chaque pièce du puzzle
		{
			if (parseInt(gamePiece[i].style.top) - 100 == cordY && parseInt(gamePiece[i].style.left) == cordX)  // Si la position verticale de la pièce moins 100 correspond à cordY et la position horizontale de la pièce correspond à cordX
			{
				return i; // Renvoie l'index de la pièce
			}
		}
	}
	else // Sinon (si la coordonnée y est supérieure ou égale à 300)
	{
		return -1; // Renvoie -1 pour indiquer qu'aucune pièce ne peut être déplacée vers le bas
	} 
}

function swap (position) // Déplace la pièce du puzzle en échangeant sa position avec un espace vide
{
	var temp = gamePiece[position].style.top; // Stocke temporairement la position verticale de la pièce
	gamePiece[position].style.top = spaceY; // Déplace la pièce à la position de l'espace vide sur l'axe vertical
	spaceY = temp; // Met à jour la position de l'espace vide sur l'axe vertical avec la position précédente de la pièce

	temp = gamePiece[position].style.left; // Stocke temporairement la position horizontale de la pièce
	gamePiece[position].style.left = spaceX; // Déplace la pièce à la position de l'espace vide sur l'axe horizontal
	spaceX = temp; // Met à jour la position de l'espace vide sur l'axe horizontal avec la position précédente de la pièce
}