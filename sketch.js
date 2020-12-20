var dog, database, foodS, foodStock;

function preload() {
  dogImg = loadImage("images/dogImg.png");
  dogHappy = loadImage("images/dogImg1.png");
  
}

function setup() {
  database = firebase.database();

  createCanvas(1000, 500);
  dog = createSprite(350, 300, 50, 50);
  dog.addImage(dogImg);
  dog.scale = 0.2;


  FoodObject = new Food;
  
  
  foodStock = database.ref('Food');
  foodStock.on("value", readStock, writeStock);

}


function draw() {
  background(46, 139, 87);
  if (keyWentDown(UP_ARROW)) {
    writeStock(foodS);
    dog.addImage(dogHappy);

    stroke("black");
    textSize(35);
    fill("white");
    text("food remaining: " + foodS, width - 400, 50);
    textSize(14);
    text("press up arrow key to feed russell milk", 130, 10);

    fill(255, 255, 254);
    textSize(15);
    if (lastFed >= 12) {
      text("Last Feed :" + lastFed % 12 + "PM", 350, 30);
    } else if (lastFed == 0) {
      text("Last Feed: 12 AM", 350, 350);
    } else {
      text("Last Feed:" + lastFed + "AM", 350, 30);
    }
   
      fedTime=database.ref('FeedTime');
      fedTime.on("value",function (data) {
       lastFed=data.val()  ;
        
      })
      }

  }


    drawSprites();
  }

  function readStock(data) {
    foodS = data.val();

  }
  function writeStock(x) {

    if (x <= 0) {
      x = 0;
    }
    else {
      x = x - 1;
    }
    database.ref('/').update({
      Food: x
    })
  }
  feed = createButton("Feed Russell");
  feed.position(700, 95);
  feed.mousePressed(feedRussell);

  addFood = createButton("Add Food");
  addFood.position(800, 95);
  addFood.mousePressed(addFoods);

 function feedRussell(){
   dog.addImage(happyDog);

   foodObj.updateFoodStock(foodObj.getFoodStock()-1);
   database.ref('/').update({
   Food:foodObj.getFoodStock()


   
   })
  }

   