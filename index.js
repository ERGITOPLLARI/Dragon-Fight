let xp = 0;
let health = 100;
let gold = 50;
let currentWeapon = 0;
let fighting;
let mosterHealth;
let inventory =["stick"];

const button1 = document.querySelector('#button1');
const button2 = document.querySelector('#button2');
const button3 = document.querySelector('#button3');
const text = document.querySelector('#text');
const xpText = document.querySelector('#xpText');
const healthText = document.querySelector('#healthText');
const goldText = document.querySelector('#goldText');
const monsterStats = document.querySelector('#monsterStats');
const monsterNameText = document.querySelector('#monsterNameText');
const monsterHealthText = document.querySelector('#monsterHealthText');


const weapons =[
	{
		name:"stick",
		power: 5
	},
	{
		name:"knife",
		power: 30
	},
	{
		name:"hammer",
		power: 50
	},
	{
		name:"sword",
		power: 100
	}
]
/** Parameter i funksionit update */
const locations =[
	{
		name: "town square",
		"button text": ["Go to store","Go to cave","Fight Dragon"],
		"button functions":[goStore, goCave, fightDragon],
		text: "You are in the town square."
},
{
	name: "store",
	"button text": ["Buy 10 health(10 gold)","Buy weapon(30 gold)","Go to town square"],
	"button functions":[buyHealth, buyWeapon, goTown],
	text: "You enter the store."
},
{
	name: "cave",
	"button text": ["Fight slime","Fight fanged beast","Go to town square"],
	"button functions":[fightSlime, fightBeast, goTown],
	text: "You enter the cave.You see some monsters."
},
{
	name: "fight",
	"button text": ["Attack","Dodge","Run"],
	"button functions":[attack, dodge, run],
	text: "You enter the cave.You see some monsters."
},
{
	name: "kill monster",
	"button text": ["Go to town square","Go to town square","Go to town square"],
	"button functions":[goTown, goTown, goTown],
	text: 'The monster screams "Arg!" as it dies. You gain experience points and find gold.'
},
{
	name: "lose",
	"button text": ["Replay","Replay","Replay"],
	"button functions":[restart, restart, restart],
	text: 'YOU DIE!'
},
{
	name: "win",
	"button text": ["Replay","Replay","Replay"],
	"button functions":[restart, restart, restart],
	text: 'YOU WIN THE GAME!'
}
];

const monsters = [
	{
		name:"slime",
		level:2,
		health:15
	},
	{
		name:"beast",
		level:8,
		health:60
	},
	{
		name:"dragon",
		level:20,
		health:300
	}
];
//initialize buttons
button1.onclick = goStore;
button2.onclick = goCave;
button3.onclick = fightDragon;

 function update(location){
	monsterStats.style.display = "none";
	button1.innerText = location["button text"][0];
	button2.innerText = location["button text"][1];
    button3.innerText = location["button text"][2];
 	button1.onclick = location["button functions"][0];
	button2.onclick = location["button functions"][1];
	button3.onclick = location["button functions"][2];
	text.innerText = location.text;
 }
function goTown(){
	update(locations[0]);
}
function goStore(){
	update(locations[1]);
}
function goCave(){
	update(locations[2]);
}


function buyHealth(){
	if(gold >= 10){
		gold -= 10;
        health += 10;
        goldText.innerText = gold;
        healthText.innerText = health;
	}else{
		text.innerText = "You do not have enough gold to buy health.";

	}

}
function buyWeapon(){
	if(currentWeapon < weapons.length - 1){
		if(gold >= 30){
			gold -=30;
			currentWeapon ++;
			goldText.innerText = gold;
			let newWeapon = weapons[currentWeapon.name];
			text.innerText = "You now have a " + newWeapon + ".";
			inventory.push(newWeapon);
			text.innerText = "In your inventory you have: " + inventory;
	}else{
		text.innerText = "You do not have enough gold to buy a weapon."
	}
	}else{
		text.innerText = "You already have the most powreful weapon!"
		button2.innerText = "Sell weapon for 15 gold.";
		button2.onclick = sellWeapon;
	}
}
function sellWeapon(){
	if(inventory.length > 1){
		gold += 15;
		goldText.innerText = gold;
		let currentWeapon = inventory.shift();
		text.innerText = "You sold a " +currentWeapon + ".";
			text.innerText += "In your inventory you have " +inventory;
		}else{
			text.innerText = "Dont sell your only weapon!"
		}
	}
	function fightSlime(){
		fighting = 0;
		goFight();
	}
	function fightBeast(){
		fighting = 1;
		goFight();
	}
	function fightDragon(){
		fighting = 2;
		goFight();
	}
	function goFight(){
		update(locations[3]);
		mosterHealth = monsters[fighting].health;
		monsterStats.style.display = "block";
		monsterNameText.innerText = monsters[fighting].name;
		monsterHealthText.innerText = mosterHealth;
		
}
function attack(){
		 text.innerText = "The " +monsters[fighting].name + "attacks.";
		 text.innerText = "You attack it with your  " +weapons[currentWeapon].name + ".";
		 if(isMonsterHit()){
			health -= getMonsterAttackValue(monsters[fighting].level);
		 }else{
			text.innerText += "You miss.";
		 }
		 
		 mosterHealth -= weapons[currentWeapon].power + Math.floor(Math.random() * xp) + 1;
		 healthText.innerText = health;
		 monsterHealthText.innerText = mosterHealth;
		 if(health <= 0){
			lose();
		 } else if(mosterHealth <= 0){
			fighting === 2 ? winGame() : defeatMonster();
		 }
		 if(Math.random() <= .1 && inventory.length !== 1){
			text.innerText += "Your " + inventory.pop() + "breaks.";
			currentWeapon--;
		 }
		}
function getMonsterAttackValue(level){
	let hit = (level * 5) - (Math.floor(Math.random() * xp));
	console.log(hit);
	return hit;
}

function isMonsterHit(){
	return Math.random() > .2 || health < 20;
}

function dodge(){
	text.innerText = "You dodge the attack from the " + monsters[fighting].name + ".";
}
function run(){

}
function defeatMonster(){
	gold += Math.floor(monsters[fighting].level) *6.7;
	xp += monsters[fighting].level;
	goldText.innerText = gold;
	xpText.innerText = xp;
	update(locations[4]);
}
function lose(){
	update(locations[5]);
}
function winGame(){
	update(locations[6]);
}
function restart(){
	 xp = 0;
 health = 100;
 gold = 50;
 currentWeapon = 0;
 inventory =["stick"];
 goldText.innerText = gold;
 healthText.innerText = health;
 xpText.innerText = xp;
 goTown();

}