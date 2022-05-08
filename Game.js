
class Game {
    constructor() {
      this.resetTitle = createElement("h2");
      this.resetButton = createButton("");
    }
  
    getState() {
      var gameStateRef = database.ref("gameState");
      gameStateRef.on("value", function(data) {
        gameState = data.val();
  
      });
  
    }
    update(state){
      database.ref("/").update({
        gameState:state
      })
    }
  
    start() {
      player = new Player();
      playerCount = player.getCount();
  
      form = new Form();
      form.display();

      console.log("hello")
  
    shooter1 = createSprite(displayWidth-1150, displayHeight-300, 50, 50);
    shooter1.addImage(shooterImg)
    shooter1.scale = 0.3
    shooter1.debug = true
    shooter1.setCollider("rectangle",-100,30,150,150)
    shooter2 = createSprite(displayWidth-300, displayHeight-300, 50, 50);
    shooter2.addImage(shooterImg1)
    shooter2.scale = 0.3
    shooter2.debug = true
    shooter2.setCollider("rectangle",100,30,150,150)

    shooter=[shooter1,shooter2]

    }
  
    handleElements() {
      form.hide();
      form.titleImg.position(40, 50);
      form.titleImg.class("gameTitleAfterEffect");

      this.resetTitle.html("Reset Game");
    this.resetTitle.class("resetText");
    this.resetTitle.position(width / 2 + 200, 40);

    this.resetButton.class("resetButton");
    this.resetButton.position(width / 2 + 230, 100);
    }
  
     play() {
    this.handleElements()

    console.log("hi")

    this.handleresetbutton();                                 

    Player.getPlayersInfo();
    
       if(allPlayers !== undefined){
        var index = 0;
      for (var plr in allPlayers) {
        //add 1 to the index for every loop
        index = index + 1;

        //use data form the database to display the shooters in x and y direction
        var x = allPlayers[plr].positionX;
        var y = height - allPlayers[plr].positionY;

        shooter[index - 1].position.x = x;
        shooter[index - 1].position.y = y;
  
            
  
          if (index === player.index) {
            // stroke(10);
            // fill("red");
            // ellipse(x, y, 60, 60);
            }
            
          }
    
   
          this.handelplayercontrol();
          drawSprites();
    }
 }
 handleresetbutton() {
  this.resetButton.mousePressed(() => {
    database.ref("/").set({
      playerCount: 0,
      gameState: 0,
      players: {}
    });
    window.location.reload();
  });

}

handelplayercontrol(){
  if(keyIsDown(UP_ARROW)){
    player.positionY = player.positionY+30
    player.update();
  }
  if(keyIsDown(DOWN_ARROW)){
   player.positionY = player.positionY-30
   player.update();
  }
}

}





















  