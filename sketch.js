//Create variables here
var dog,happyDog,database,foodS,
dogImg,happyDogImg
var fedTime,lastFed,foodObj
function preload()
{
  //load images here
  dogImg=loadImage("dogImg.png")
  happyDogImg=loadImage("dogImg1.png")
  
}

function setup() {
  createCanvas(500, 500);
  database=firebase.database()
  console.log(database)
  foodObj=new Food()
  foodStock=database.ref('Food');
  foodStock.on("value",readStock);
  
  dog=createSprite(150,50,20,20)
  dog.addImage(dogImg)
  dog.scale=0.1
  
 
  feed=createButton("Feed The Dog");
  feed.position(700,95);
  feed.mousePressed(feedDog);

  addFood=createButton("Add Food");
  addFood.position(800,95);
  addFood.mousePressed(addFoods);
 

}


function draw() {  
  background(46,139,87)
  foodObj.display();
  fill(255,255,254)
  textSize(15)
  if(lastFed>=12){
    text("Last Feed: "+lastFed%12+" PM",350,30)
  }else if(lastFed==0){
    text("Last Feed : 12AM",350,30)
  }else{
    text("Last Feed : "+lastFed+" AM",350,30);
  }

  fedTime=database.ref('lastFed');
  fedTime.on("value",function(data){
    lastFed=data.val();
  })
drawSprites()
}
function readStock(data){
  foodS=data.val();
  foodObj.updateFoodStock(foodS);
}
function feedDog(){
  dog.addImage(happyDogImg)

  foodObj.updateFoodStock(foodObj.getFoodStock()-1);
  database.ref('/').update({
    Food: foodObj.getFoodStock(),
    lastFed:hour()
  })
  }
function addFoods(){
  foodS++;
  database.ref('/').update({
    Food:foodS
  })

  
}






