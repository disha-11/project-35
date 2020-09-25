var dog,happyDog,database,foods,foodstock;
var dogs;
var write;
var ref;
var read;
var food;
var x=20;
var feed,add,fedTime,lastFed,foodobj;
var addb,feedb;

function preload()
{
dog=loadImage("images/Dog.png");
happyDog=loadImage("images/happydog.png");
}

function setup() {
  createCanvas(500, 500);
    database=firebase.database();
  dogs=createSprite(250,250,30,30);
  dogs.addImage("we",dog);
  dogs.scale=0.2;
  ref=database.ref("virtual pet pro34/food").on("value",readstock);
foodobj=new Food();

feedb=createButton("feed dog");
feedb.position(200,200);
feedb.mousePressed(feedDog);

addb=createButton("add food");
addb.position(200,30);
addb.mousePressed(addFoods);
  
}


function draw() {  
background(46,139,87);
addFoods();
feedDog();
textSize(10);
fill ("white");
stroke ("green");
text ("press up arrow to feed the dog",150,150);
text ("foodstock :"+x,150,170);

fedTime=database.ref("feedTime").on("value",function(data){
  lastFed=data.val();
})
if(lastFed<=12){
  text("last fed: "+ lastFed%12+"pm",350,30);
}else if(lastFed===0){
  text("last fed: 12 am",350,30);
}else{
  text("last fed: "+ lastFed+"pm",350,30);
}

  drawSprites();


}

function readstock(data){
foods=data.val();

}
function writeStock(x){
 
  if(x=0){
x=0;
  }
  else{
    x=x-1;
  }
  database.ref("virtual pet pro34/food").update({
    food:x
   })
}


function feedDog(){
  //dog.addImage(happyDog);

  foodobj.updateFoodStock(foodobj.getFoodStock()-1);
  database.ref("/").update({
    food:foodobj.getFoodStock(),
    feedTime:hour()
  })
}
  
function addFoods(){
  foods++;
  database.ref("value").update({
    Food:foods
  })
}