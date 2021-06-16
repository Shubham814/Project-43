var backImage,backgr;
var player, player_running;
var ground,ground_img;

var monkeyScale;

var END =0;
var PLAY =1;
var gameState = PLAY;


var fruit,fruitImg,fruitGroup;
var stone,stoneImg,stoneGroup;

var gameOver,gameOverImg;

var score;

function preload(){
  backImage=loadImage("jungle.jpg");
  player_running = loadAnimation("Monkey_01.png","Monkey_02.png","Monkey_03.png","Monkey_04.png","Monkey_05.png","Monkey_06.png","Monkey_07.png","Monkey_08.png","Monkey_09.png","Monkey_10.png");
  fruitImg = loadImage("banana.png");
  stoneImg = loadImage("stone.png");
  gameOverImg = loadImage("gameOver.png");
}

function setup() {
  createCanvas(800,400);
  
  backgr=createSprite(0,0,800,400);
  backgr.addImage(backImage);
  backgr.scale=1.5;
  backgr.x=backgr.width/2;
  backgr.velocityX=-4;
  
  player = createSprite(100,340,20,50);
  player.addAnimation("Running",player_running);
  player.scale = 0.1;
  
  ground = createSprite(400,350,800,10);
  ground.x=ground.width/2;
  ground.visible=false;

  gameOver = createSprite(width/2,height/2,400,100);
  gameOver.addImage("over",gameOverImg);
  gameOver.visible=false;

  fruitGroup = createGroup();
  stoneGroup = createGroup();

  score = 0;

}

function draw() { 
  background(0);


  

  if(gameState===PLAY){
  
  if(backgr.x<100){
    backgr.x=backgr.width/2;
  }
  
    if((keyDown("space") || keyDown("up_arrow")) && gameState === PLAY) {
      player.velocityY = -12;
    }
    player.velocityY = player.velocityY + 0.8;
  
    player.collide(ground);

  }


  for(var i = 0; i < fruitGroup.length; i++){
    if(fruitGroup.get(i).isTouching(player)){
        fruitGroup.get(i).destroy();
        score += 2;
        player.scale += 0.05;
        
        console.log("Monkey Scale: " + player.scale);
    }
  }

  if(stoneGroup.isTouching(player)){
    gameState = END;
  }
  if(gameState === END){
    backgr.velocityX = 0;

    player.visible=false;

    fruitGroup.destroyEach();
    stoneGroup.destroyEach();

    fruitGroup.velocityX = 0;
    stoneGroup.velocityX = 0; 

    gameOver.visible = true;
  }

  

  
  spawnFruits();
  spawnStone();
  drawSprites();

  fill(255);
  textSize(25);
  text("Score: " + score, width-100,20);
}


function spawnFruits(){
  if(frameCount%60===0){
    fruit = createSprite(width+50,Math.round(random(120,250)),20,20);
    fruit.addImage(fruitImg);
    fruit.scale = 0.075;
    fruit.velocityX = -5;
    fruit.lifeTime = 200;
    fruitGroup.add(fruit);
    
    
  }
}

function spawnStone(){
  if(frameCount%100===0){
    stone = createSprite(width+50,340,20,20);
    stone.addImage(stoneImg);
    stone.scale = 0.2;
    stone.velocityX = -7;
    stone.lifeTime = 200;
    stoneGroup.add(stone);
    
    
  }
}
