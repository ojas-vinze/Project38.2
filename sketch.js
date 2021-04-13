var trex,cactus,ground,sun,gameover,restart,inground;
var cloudimg,groundimg,cactusimg,trexanimation,deadtrex,sceneimg;
var cactus1,cactus1,cactus2,cactus3,cactus4,gameoverimg,restartimg;
var obstacleg,cloudg;
var jumpsound,collidesound;
var PLAY=1;
var END=0;
var gameState;
var score,rand;
var cnt=0;

function preload(){
  cloudimg=loadImage("assets/cloud.png");
  trexanimation=loadAnimation("assets/trex_1.png","assets/trex_2.png","assets/trex_3.png");
  deadtrex=loadAnimation("assets/trex_collided.png");
  cactus1 = loadImage("assets/obstacle1.png");
  cactus2 = loadImage("assets/obstacle2.png");
  cactus3 = loadImage("assets/obstacle3.png");
  cactus4 = loadImage("assets/obstacle4.png");
  groundimg = loadImage("assets/ground.png");
  sunimg = loadImage("assets/sun.png");
  restartimg = loadImage("assets/restart.png");
  gameoverimg = loadImage("assets/gameOver.png");
  sceneimg = loadImage("assets/backgroundImg.png")
  
  jumpsound = loadSound("assets/sounds/jump.wav");
  collidesound = loadSound("assets/sounds/collided.wav");
}

function setup() {
  createCanvas(windowWidth,windowHeight);

  ground=createSprite(width/2,height,width,2);
  ground.addImage(groundimg);
  
  trex = createSprite(55,height-68,20,20);
  trex.addAnimation("running",trexanimation);
  trex.addAnimation("collided",deadtrex);
  trex.setCollider('circle',0,0,320);
  trex.scale = 0.08;
  // trex.velocityX=-(6 + 3* score/100);
  gameover = createSprite(width/2,height/2-50);
  gameover.addImage(gameoverimg);
  gameover.scale = 0.5;
  gameover.visible=false;

  camera.position.x=trex.x;
  camera.position.y=height-68; 
  
    
  // restart = createSprite(width/2,height/2);
  // restart.addImage(restartimg);
  // restart.scale=0.1;
  // restart.visible=false;
  
  inground = createSprite(width/2,height-10,width,120);
  inground.visible = false;
  
  sun = createSprite(width-90,90,10,10);
  sun.addImage(sunimg);
  sun.scale = 0.1;

  gameState = PLAY;
  score=0;
  cloudg= new Group();
  obstacleg= new Group();
  
}

function draw() {
  background(sceneimg);
  if(gameState === PLAY){
    
    trex.velocityX=6;
    camera.position.x=trex.x+550;
    camera.position.y=height/2;

    sun.x=camera.position.x+500;
    gameover.x=camera.position.x;

    score = score+ Math.round(getFrameRate()/60);
    
    if(trex.x>1100){
      trex.x=55;
    }
    if(touches.length<0 || keyDown("space") && trex.y>=height-130){
      trex.velocityY=-12;
      jumpsound.play();
      touches = [];
    }
    trex.velocityY=trex.velocityY+0.8;
    trex.collide(inground);
    
    Clouds();
    Obstacles();
    score=Math.round(frameCount/60);
    text("Score: "+score,camera.position.x+100,55);
    if(trex.isTouching(obstacleg)){
      collidesound.play()
      gameState=END;
    }
  } else if(gameState === END){
          trex.changeAnimation("collided",deadtrex);
        
          gameover.visible=true;
          // restart.visible=true;
    
          trex.setVelocity(0,0);
          // ground.velocityX=0;
          // obstacleg.setVelocityEach(0,0);
          // cloudg.setVelocityEach(0,0);
    
          obstacleg.setLifetimeEach(-1);
          cloudg.setLifetimeEach(-1);
          // if(mousePressedOver(restart) || keyDown("space") || touches.length>0){
          //   reset();
          //   touches = [];
          // }
    }
  drawSprites();
}

function Clouds(){
  if(frameCount % 5 === 0){
    cnt=cnt+150;
    var cloud = createSprite(width/2+cnt,height-300,40,10);
    cloud.y=Math.round(random(100,220))
    cloud.addImage(cloudimg);
    // cloud.velocityX=-3;
    cloud.scale=0.5;
    cloud.lifetime=3000;
    cloud.depth=trex.depth;
    trex.depth=cloud.depth+1;
    cloudg.add(cloud);
  }
}

function Obstacles(){
  if(frameCount % 10 === 0){
    cnt=cnt+30;
    rand = Math.round(random(1,2));
    cactus = createSprite(200+cnt,height-95,20,30);
    switch(rand){
      case 1:cactus.addImage(cactus1);
             break;
      case 2:cactus.addImage(cactus2);
             break;
      default:break;
    }
    // cactus.velocityX=-(6 + 3* score/100);
    cactus.lifetime=3000;
    cactus.scale = 0.3;
    trex.depth=cactus.depth+1;
    obstacleg.add(cactus);
  }
}
// function reset(){
//   gameState = PLAY;
//   obstacleg.destroyEach();
//   cloudg.destroyEach();
//   trex.changeAnimation("running",trexanimation);
//   score = 0;
//   gameover.visible = false;
//   restart.visible = false;
// }
