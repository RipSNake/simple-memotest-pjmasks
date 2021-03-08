/** MEMOTEST PJ MASKS **/

// Main variables
const pairs = ['catboy','owlette','gekko','romeo','lunagirl','nightninja','pjrobot','wolfykids','anyu','motsuki','splatmonster','armadylan'];
var score = 0;
var time = Date.now(); // Takes the actual time
var selected = [];
var correct = 0;

// Shuffle the diferent pairs randomly. It takes every single possible card and put two copies of it, then moves to the next card
function shuffleTiles(){
	let cont = 0;
	let totalPosibilities = pairs.length * 2;
	let placed = []; // number array: contains the tile's indexes allready asigned, to avoid overwrite
	let tileIndex;
	placed.push(emptyTile); // Agregamos el index del Tile del medio
	for(let i = 0; i < totalPosibilities; i++){
		do{
			tileIndex = Math.floor(Math.random() * tiles.length);
		}while(placed.includes(tileIndex)); // Si el número ya fue asignado vuelve a generar otro
		
		tiles[tileIndex].classList.add(pairs[cont]);
		placed.push(tileIndex);	
		
		if(i%2 != 0){
			cont++;
		}
	}
}


// Function that shows or hiddes the content of the tile -- added as an event listener
function reveal(){
	if(!this.classList.contains('correct')){
		if(this.classList.contains('unrevealed') ){
			revealTile(this);
			selected.push(this);
			if(selected.length == 2){
				document.getElementById('tileDisplay').classList.add('clickGetter');
				setTimeout(arePair,500);
			}
		} else {
			hideTile(this);
			selected.splice(selected.indexOf(this),1);
		}	
	}
}

function revealTile(tile){
	tile.classList.remove('unrevealed');
	/*tile.classList.add('revealed');*/
}

function hideTile(tile){
	/*tile.classList.remove('revealed');*/
	tile.classList.add('unrevealed');
}

function clearSelected(){
	while(selected.length > 0){
		hideTile(selected.pop());
	}
}

// This function compares if the two tiles are a match
function arePair(){
	if(selected[0].classList.value === selected[1].classList.value){
		selected.pop().classList.add('correct');
		selected.pop().classList.add('correct');
		score += 2;
		correct += 2;
		showScore();
		hasWon();
	} else { // If their are not a pair
		clearSelected();
	}
	document.getElementById('tileDisplay').classList.remove('clickGetter');
}

function hasWon(){
	if(correct == (tiles.length -1) ){
		console.log('You WIN');
		let div = document.createElement('div');
		div.className = 'winDiv';
		let winText = document.createTextNode('Felicitaciones ! Has ganado!');
		div.appendChild(winText);

		let btn = document.createElement('button');
		let btnText = document.createTextNode('Volver a Jugar');
		btn.appendChild(btnText);
		
		div.appendChild(btn);

		let main = document.getElementsByTagName('main');
		main[0].appendChild(div);
		/*btn.onclick = reset();*/
	}
}
/* Add event on click for every memotest tile */
var tiles = document.getElementsByClassName('tile');
var emptyTile;

for(let i = 0; i < tiles.length; i++){
	if(!tiles[i].classList.contains('empty')){
		tiles[i].addEventListener('click',reveal,false);
	} else {
		emptyTile = i; // Si es el tile Central agrega el indice a la variable para que podamos usarlo en otras funciones
	}
}

// Refresh score on the scoreboard
function showScore(){
	document.getElementById('score').innerHTML = score;
}
// Refresh time on the scoreboard

function showTimeElapsed(){
	let elapsed =  Date.now();
	document.getElementById('time').innerHTML = Math.floor((elapsed - time)/1000);
}

setInterval(showTimeElapsed,1000);

//Restarts the game
document.getElementById('reset').addEventListener('click',reset,false);

function reset(){
	for(let i = 0; i < tiles.length; i++){
		if(!tiles[i].classList.contains('empty')){
			tiles[i].className = 'tile unrevealed';
		}
	}
	score = 0;
	showScore();
	time = Date.now();
	shuffleTiles();
}

// Initiate the Game

reset();


// Locally Storaged High Scores
/*
	Locally Storage data is saved in name/value pairs always as a string
	Convert them to another format if needed.
*/
function canStorage() {
	if (typeof(Storage) !== "undefined") {
		console.log("Web Storage Supported");
		return true;
	} else {
		console.log("NO Web Storage Support");
		return false;
	}
}

function seeHighScores() {
	console.log(localStorage);
}

function addHighScore() {
	localStorage.setItem("High Score ", score);
}

function clearHighScores() {
	localStorage = "";
}


canStorage();






/*

// Only for node.js learning

// Dependencies
const fileSystem = require('fs'); // Modulo para escribir archivos

// Read data RECOMMEND according to fs documentation
function seeHighScores() {
	fileSystem.open('./highScores.txt','r', (err, fd) => {
		if(err) {
			if(err.code === 'ENOENT') {
				console.error('my file does not exist');
				return;
			}
			throw err;
		}

		readMyData(fd);
	})
}


// Using append File to add the new information to the end of the file
function addHighScore(score) {
	fileSystem.appendFile('./highScores.txt','data to append', (err) => {
		if(err) {
			throw err;
		}
		console.log('The "data to append" was appended to file!');
	})
}

function clearHighScores() {
	fileSystem.write("./highScores.txt","", (err) => {
		if(err) {
			console.log(err);
		}
	})
}
*/