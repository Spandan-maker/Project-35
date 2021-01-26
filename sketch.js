var backgroundImg, balloonImg, balloonImg2, balloonImg3
var balloon, database, position, balloonPosition

function preload(){
  backgroundImg = loadImage("background.png");

  balloonImg = loadAnimation("Hot_Air_Ballon-01.png");
  balloonImg2 = loadAnimation("Hot Air Ballon-02.png");
  balloonImg3 = loadAnimation("Hot Air Ballon-03.png");
}

function setup() {
  createCanvas(1365,650);

  balloon = createSprite(250,380,10,10);
  balloon.addAnimation("balloonImg", balloonImg);
  balloon.scale = 0.7

  database = firebase.database();

  ballposition = database.ref('balloon/position');

  ballposition.on("value", readPosition, showError);

}

function draw() {
  background(backgroundImg); 
  
  fill("black");
  textSize(20);
  text("Use arrow keys to move the balloon", 50, 50);

  if(keyDown(LEFT_ARROW)){
    changePosition(-5,0);
    balloon.addAnimation("balloonImg", balloonImg);
}
else if(keyDown(RIGHT_ARROW)){
    changePosition(5,0);
    balloon.addAnimation("balloonImg", balloonImg);
}
else if(keyDown(UP_ARROW)){
    changePosition(0,-5);
    balloon.scale = balloon.scale - 0.01;
    balloon.addAnimation("balloonImg", balloonImg2);
}
else if(keyDown(DOWN_ARROW)){
    changePosition(0,+5);
    balloon.scale = balloon.scale + 0.01;
    balloon.addAnimation("balloonImg", balloonImg3);
}

  drawSprites();
}

function changePosition(x,y){
  database.ref('balloon/position').set(
    {
      'x' : position.x + x,
      'y' : position.y + y
    })
}

function readPosition(data){
    position = data.val();
    balloon.x = position.x;
    balloon.y = position.y;
}

function showError(){
  console.log("Error");
}