/*
const charClassList = ['warrior','archer','mage'];
// Creador de Personaje : clase solo puede tomar los valores 0, 1 o 2
function Character(name, clase){
	// El operador crea un nuevo objeto this;
	this.name = name;
	this.charClass = charClassList[clase];
	this.lifePoints = 20;
	this.isAlive = true;
	this.weapon = {};
	if(this.charClass == 'warrior'){this.damage = 3;}else if(this.charClass == 'archer'){this.damage = 2;}else if(this.charClass == 'mage'){this.damage = 1;};
	this.level = 1;
	// Devuelve el objeto this;
}

Character.prototype.amIAlive = function() {
	if(this.lifePoints > 0){
		this.isAlive = true;
		console.log('You are still alive');
	} else {
		this.isAlive = false;
		console.log("You are dead");
	}
}

Character.prototype.cambiarClase = function(choice) {
	this.charClass = charClassList[choice];
}

Character.prototype.atacar = function(tile){
	if(tile.occupiedBy != ''){
		tile.occupiedBy.lifePoints = tile.occupiedBy.lifePoints - this.damage;
	} else {
		console.log('There is no one there');
	}
}
/*
warrior: attack melee

archer: attack 3 squares

mage: attack 5 squares
*/
/*
// Enemy creator
function Enemy(name, lifePoints) {
	this.name = name;
	this.lifePoints = lifePoints;
	this.isAlive = true;
	this.damage = 2;
}

Enemy.prototype.attack = function(targetTile){
	if(!targetTile.isEmpty()){
		targetTile.occupiedBy.lifePoints = target.occupiedBy.lifePoints - this.damage;
	}
}

Enemy.prototype.amIAlive = function() {
	if(this.lifePoints > 0){
		this.isAlive = true;
		console.log('You are still alive');
	} else {
		this.isAlive = false;
		console.log("The enemy is dead");
	}
}

var enemy1 = new Enemy('malito',4);

const player1 = new Character('Jugador',2); // Jugador Mago

// MAIN GAME single direction
// Create map tile
function MapTile() {
	this.terrain = 'plain';
	this.occupiedBy = '';
}

MapTile.prototype.isEmpty = function(){
	if(this.occupiedBy == ''){
		return true;
	} else {
		return false;
	}
}
// Create map = Array of array of tiles
function createMap(rows, cols) {
	var map = [];
	for (let i = 0; i < rows; i++) {
		let row = [];
		for(let j = 0; j < cols; j++){
			row.push(new MapTile());
		}
		map.push(row);
	}
	return map;
}
// Create a 8x8 map grid, simulating a chessboard
var map = createMap(8,8);

// Place character in map

map[0][4].occupiedBy = player1;
map[2][7].occupiedBy = enemy1;

//
function printMap() {
	for(let i = 0; i < map.length-1; i++){
		for(let j = 0; j < map[i].length-1; j++){
			console.log(map[i][j]);
		}
	}	
}

printMap();

// Funcion para determinar si se puede atacar o no
function sePuedeAtacar(){

}
*/
/** MEMOTEST PJ MASKS **/
// Main variables
const pairs = ['catboy','owlette','gekko','romeo','lunagirl','nightninja','pjrobot','wolfykids','anyu','motsuki','splatmonster','armadylan'];
var score = 0;
var time = new Date().getTime(); // Takes the actual time
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
		btn.onclick = reset();
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
	let elapsed = new Date().getTime();
	time = (elapsed - time); // Turn ms into seconds
	document.getElementById('time').innerHTML = time;
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
	time = 0;
	showTimeElapsed();
	shuffleTiles();
}

// Initiate the Game

reset();
