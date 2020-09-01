var monkey, monkeyImg, bananaImg, bananaGroup, obsImg, obsGroup, backGround, backGroundImg, ground, gameOver, restart, gameOverImg, restartImg
score = 0;
var PLAY = 1;
var END = 0;
var gameState = PLAY;

function preload() {
  backGroundImg = loadImage("jungle.jpg");
  monkeyImg = loadImage("Monkey_01.png","Monkey_02.png", "Monkey_03.png","Monkey_04.png","Monkey_05.png","Monkey_06.png",
"Monkey_07.png","Monkey_08.png","Monkey_09.png","Monkey_10.png");
  
  bananaImg = loadImage("banana.png");
  obsImg = loadImage("stone.png");
  
  gameOverImg = loadImage("gameOver.png");
  restartImg = loadImage("restart.png");
} 

function setup() {
  createCanvas(600, 400);
  backGround = createSprite(300,200,600,400);
  backGround.addImage(backGroundImg);
  
  ground = createSprite(300,370,600,1);
  ground.visible = false;
  
  monkey = createSprite(50,365,10,10);
  monkey.addImage(monkeyImg);
  
  obsGroup = createGroup();
  bananaGroup = createGroup();
  
  gameOver = createSprite(300,120,10,10);
  gameOver.addImage(gameOverImg);
  gameOver.visible = false;
  
  restart = createSprite(300,180,10,10);
  restart.addImage(restartImg);
  restart.visible = false;
  
}

function draw() {
  background(220);
  
  if(backGround.x<100) {
    backGround.x = backGround.width/2;
  } 
  
  if(gameState===PLAY) {
    if(keyDown("space") && monkey.y>=314) {
      monkey.velocityY = -18;   
  } 

    monkey.velocityY = monkey.velocityY + 0.8;
    backGround.velocityX = -5;
    monkey.scale = 0.12;
    spawnObs();
    spawnFrt();
   
    if(bananaGroup.isTouching(monkey)) {
      bananaGroup.destroyEach();
      score = score+2;
   }    
    
    switch(score) {
      case 10: monkey.scale = 0.14;
               break; 
      case 20: monkey .scale = 0.15;
               break;  
      case 30: monkey.scale = 0.16;
               break;  
      case 40: monkey.scale = 0.17;
               break;    
              
      default: break;        
    }   
    
    if(obsGroup.isTouching(monkey)) {
      gameState=END;
      monkey.scale = 0.1;
    }
 }  
  
     else if(gameState===END) {
       restart.visible = true;
       gameOver.visible = true;  
       
       backGround.velocityX = 0;
       obsGroup.setVelocityXEach(0);
       bananaGroup.setVelocityXEach(0);
       obsGroup.setLifetimeEach(-1);
       bananaGroup.destroyEach();
       
      if(mousePressedOver(restart)) {
        gameState = PLAY;
        obsGroup.destroyEach();
        bananaGroup.destroyEach();
        restart.visible = false;
        gameOver.visible = false;        
        score = 0; 
    }
   }     
  
  monkey.collide(ground);   
  drawSprites();
  
  textSize(20);
  fill("white");
  stroke("white");
  text("Score: " + score, 500,40 );
}

function spawnObs() {
  if(frameCount%300 === 0) {
    var stone = createSprite(600,335,10,10);
    stone.velocityX = -7;
    stone.addImage(obsImg);
    stone.scale = 0.2;
    stone.setLifetime = 85; 
    
    obsGroup.add(stone);
  } 
}

function spawnFrt() {
  if(frameCount%100 === 0) {
    var banana = createSprite(600,round(random(120,200)),10,10);
    banana.velocityX = -6;
    banana.addImage(bananaImg);
    banana.scale = 0.06;
    banana.setCollider("rectangle", -100, 50, 700,300);
    
    banana.lifetime = 165;
    bananaGroup.add(banana);
  }
}