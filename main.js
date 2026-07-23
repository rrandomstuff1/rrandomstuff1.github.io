const allpages=document.querySelectorAll(".page"); //reference all pages
//Audio for webside
const gameDeathSfx = new Audio("audio/boom.wav");
const buttonSfx = new Audio('audio/button.mp3');

function hideall() //function to hide all pages
{ 
	for(let onepage of allpages) //go through all subtopic pages
	{ 
		onepage.style.display="none"; //hide it
	}
}
function show(pgno){ //function to show selected page no
hideall();
//select the page based on the parameter passed in
let onepage=document.querySelector("#page"+pgno);
onepage.style.display="block"; //show the page
onepage.style.opacity = 1;
}
/*Listen for clicks on the buttons, assign anonymous
eventhandler functions to call show function*/
document.addEventListener("click", function (event) { //event delegation to hsndle all the page bnuttons

    const butn = event.target.closest("[data-page]");
    if (!butn) return;

    show(butn.dataset.page);
    buttonSfx.play();
});


//run on initialisation
hideall();
show("Home");





//gear icon/mobile nav button for mobile code
const gearIcon=document.querySelector("#gearIcon");
const mobNavBar=document.querySelector(".hideMobNavSideBar");
gearIcon.addEventListener("click",GearFunc );

function GearFunc()
{
	buttonSfx.play();
	mobNavBar.classList.toggle("showMobNavBar"); //Toggle show/hiding mob nav space
	if (gearIcon.classList.contains("animateRotate")) 
	{
		gearIcon.classList.remove("animateRotate"); //Remove previous rotation css
		gearIcon.classList.add("animateRotateRev"); //animate anticlockwise
	}
	else
	{
		if (gearIcon.classList.contains("animateRotateRev"))
		{
			gearIcon.classList.remove("animateRotateRev"); //Remove previous rotation css
		}
		gearIcon.classList.add("animateRotate"); //animate clockwise
	}
	
}



//Space facts code
const factButton=document.querySelector("#factButton");
const factAnswer=document.querySelector("#factAns");
const spaceFacts= [
	"Every star has a life cycle.",
	"Saturn is famous for its bright ring system.",
	"Without the Moon, Earth's seasons and climate would be much less stable.",
	"Over one million Earths could fit inside the Sun by volume.",
	"The Moon always shows the same face to Earth because it is tidally locked.",
	"Venus has crushing atmospheric pressure about 90 times that of Earth's.",
	"A year on Mercury lasts 88 Earth days.",
	"Around 71% of Earth's surface is covered by water.",
	"More than 1,300 Earths could fit inside Jupiter.",
	"Winds on Neptune can exceed 2,000 km/h.",
	"Stars shine because of nuclear fusion.",
	"Most galaxies contain a supermassive black hole at their center.",
	"The Milky Way contains roughly 100–400 billion stars.",
	"Black holes have gravity so strong that not even light can escape once it passes the event horizon.", 
	"Most asteroids orbit in the asteroid belt between Mars and Jupiter.", 
	"Astronauts become slightly taller in space because their spines expand.", 
	"The first artificial satellite was Sputnik 1 (1957).", 
	"Looking at distant galaxies is literally looking into the past.", 
	"One light-year is about 9.46 trillion kilometers."
];

let cycleFacts = -1;
let lettersInAns = 0;
let typingSpeed;
ShowFact();

factButton.addEventListener("click",ShowFact );

function ShowFact(){
    clearInterval(typingSpeed);  //stop previous typing thing
    cycleFacts++;
    if (cycleFacts >= spaceFacts.length) {
        cycleFacts = 0;
    }
	buttonSfx.play();
    lettersInAns = 0;
    factAnswer.textContent = "Fact: ";
    typingSpeed = setInterval(TypeFact, 100); //Set typing speed in ms here 
}

function TypeFact() {

    if (lettersInAns < spaceFacts[cycleFacts].length) 
	{
        factAnswer.textContent += spaceFacts[cycleFacts][lettersInAns];
        lettersInAns++;
    } 
	else 
	{
        clearInterval(typingSpeed);
    }
}

//Code for quiz
const btnSubmit=document.querySelector("#btnSubmit");
btnSubmit.addEventListener("click",CheckAns);
const scorebox=document.querySelector("#scorebox");
var q1,q2,q3,q4,q5,score=0;
function CheckAns(){
	score=0; //reset score to 0, check ans and give score if correct
	//read the value of the selected radio button for every qn
	q1=document.querySelector("input[name='q1']:checked").value;
	if(q1=="q1a3")score++;
	q2=document.querySelector("input[name='q2']:checked").value;
	if(q2=="q2a2")score++;
	q3=document.querySelector("input[name='q3']:checked").value;
	if(q3=="q3a1")score++;
	q4=document.querySelector("input[name='q4']:checked").value;
	if(q4=="q4a4")score++;
	q5=document.querySelector("input[name='q5']:checked").value;
	if(q5=="q5a4")score++;
	scorebox.innerHTML="<p>Score:"+score+ "/5</p>";
	const scorePara = scorebox.querySelector("p");
	if (score == 5)
	{
		//make text yellow if user gets every qn correct
		scorePara.style.color = "rgb(255, 204, 0)";
	}
	else
	{
		//remove all checkked radios if user doesnt get every qn correct
		scorePara.style.color = "rgb(165, 132, 228)";
		document.querySelector("input[name='q1']:checked").checked = false;
		document.querySelector("input[name='q2']:checked").checked = false;
		document.querySelector("input[name='q3']:checked").checked = false;
		document.querySelector("input[name='q4']:checked").checked = false;
		document.querySelector("input[name='q5']:checked").checked = false;
		
	}
}

//Code for resetting everything
const resetWebButton = document.querySelector("#resetWebButton");
resetWebButton.addEventListener("click",ResetWeb);
function ResetWeb()
{
	buttonSfx.play();
	//reset quiz
	for (let i = 1; i <= 5; i++) {
    const selected = document.querySelector("input[name='q"+i+"']:checked");
    if (selected) {
        selected.checked = false;
    }
}
	scorebox.innerHTML="<p> Not Submitted </p>";
	
	//reset fact generator
	cycleFacts = -1;
	ShowFact();
	
	//reset page
	hideall();
	show("Home");
	
	//reset game
	ResetGame();
	gameOver = true;
	timer.textContent = "Press 'Reset Game' to start";
	
	//reste mobile nav menu 
	if (mobNavBar.classList.contains("showMobNavBar"))
	{
		GearFunc();
	}
}




//Game Code/////////////////////////////////////////////////////////
const player=document.querySelector("#gamePlayer");
const timer=document.querySelector("#gameTimer");
const resetButton=document.querySelector("#gameReset");
const UpButton=document.querySelector("#gameUpButton");
const DownButton=document.querySelector("#gameDownButton");
const LeftButton=document.querySelector("#gameLeftButton");
const RightButton=document.querySelector("#gameRightButton");
let meteors = [];
let posY = 44;
let posX = 44;
let playerFrame = 0;
const playerSpeed =0.5;
const meteorSpeed = 0.2;
let Wdown = false;
let Sdown = false;
let Adown = false;
let Ddown = false;
let time = 0;
let gameOver = true;
const gameTick = setInterval(GameTick, 10);
const spawnMeteor = setInterval(SpawnMeteor, 1000);
const animatePlayer = setInterval(Animate, 200);

function Animate() //Animate the player sprite
{
	playerFrame = (playerFrame + 1) % 2;
    player.style.backgroundPositionX = (playerFrame * 100) + "%";
}
//Player movement detection
//Pc movement////////////////////////////////////////
document.addEventListener("keydown", function(event){
  if (event.code == "KeyW" && posY > 0)
  {
	Wdown = true;
  }
   if (event.code == "KeyS" && posY< 90)
  {
	Sdown = true;
  }
  if (event.code == "KeyA" && posX > 0)
  {
	Adown = true;
  }
   if (event.code == "KeyD" && posX < 90)
  {
	Ddown = true;
  }
});

document.addEventListener("keyup", function(event) {
  if (event.code == "KeyW")
  {
	Wdown = false;
  }
   if (event.code == "KeyS")
  {
	Sdown = false;
  }
  if (event.code == "KeyA")
  {
	Adown = false;
  }
   if (event.code == "KeyD")
  {
	Ddown = false;
  }
});
/////////////////////////////////////////////////////////
//Mob movment
UpButton.addEventListener("click", function () {
	if (posY > 0)
  {
	posY-= playerSpeed*4;
	player.style.top = posY +"%";
  }
});
DownButton.addEventListener("click", function () {
	if (posY< 90)
  {
	posY+= playerSpeed*4;
	player.style.top = posY +"%";
  }
});
LeftButton.addEventListener("click", function () {
	if (posX > 0)
  {
	posX-= playerSpeed*4;
	player.style.left = posX +"%";
  }
});
RightButton.addEventListener("click", function () {
	if (posX < 90)
  {
	posX+= playerSpeed*4;
	player.style.left = posX +"%";
  }
});
///////////////////////////////////////////////////////////////////////

function SpawnMeteor()
{
	if (!gameOver)
	{
		for (let i=0; i<(1+Math.floor(time/10)); i++) //num of meteors spawned every spawning tick, (1+ time/10)
		{
			const meteor = document.createElement("div");
			meteor.classList.add("gameMeteor");
			const x = Math.random() * 90; 
			const y = 0;
			meteor.style.left = x + "%";
			meteor.style.top = y + "%";
			document.querySelector("#gameContainer").appendChild(meteor);
			meteors.push
			({
				obj: meteor, x, y
			});
		}
		//increase timer by 1sec
		time++;
		timer.textContent = time;
	}
	
}

function GameTick()
{
	//Handle player movement
	if (Wdown && posY > 0)
  {
	posY-= playerSpeed;
	player.style.top = posY +"%";
  }
   if (Sdown && posY< 90)
  {
	posY+= playerSpeed;
	player.style.top = posY +"%";
  }
  if (Adown && posX > 0)
  {
	posX-= playerSpeed;
	player.style.left = posX +"%";
  }
   if (Ddown && posX < 90)
  {
	posX+= playerSpeed;
	player.style.left = posX +"%";
  }
  ////////////////////////////////////////
  //Meteor tick 
	for (const meteor of meteors) 
	{
		//make meteor go downwards
		meteor.y += meteorSpeed;
		meteor.obj.style.top = meteor.y + "%";
		//Coll detection to kill player
		let distance = Math.sqrt((posX+5-(meteor.x+3.5))*(posX+5-(meteor.x+3.5)) + (posY+5-(meteor.y+3.5))*(posY+5-(meteor.y+3.5)));
		if (distance < 5.2 && !gameOver)
		{
			if (document.querySelector("#page3").style.display == 'block')
			{
				gameDeathSfx.play();
			}
			gameOver = true;
			player.style.display = "none";
		}
		
		
		
		//once meteor reaches end delete meteor and remove from array
		if (meteor.y > 90)
		{
			meteors.splice(meteors.indexOf(meteor),1);
			meteor.obj.remove();
		}
	}
}
resetButton.addEventListener("click",ResetGame);
function ResetGame()
{
	buttonSfx.play();
	gameOver=false;
	//reset player
	posX = 44;
	posY = 44;
	player.style.top = posY +"%";
	player.style.left = posX +"%";
	player.style.display= "inline-block";
	
	//reset time
	time = 0;
	timer.textContent = time;
	
	//delete meteros
	for (const meteor of meteors) 
	{
		meteor.obj.remove();
	}
	meteors = [];
}
//the javascript validator is giving me a warning when using the interval I created would sabotage my game so this is just to get rid of it
const useless = true;
JustToGetRidOfUselessWarning();
function JustToGetRidOfUselessWarning()
{
	if (useless == false)
	{
	clearInterval(gameTick);
	clearInterval(spawnMeteor);
	clearInterval(animatePlayer);
	}
}