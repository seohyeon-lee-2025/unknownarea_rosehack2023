const canvas = document.getElementById("canvas");
const ctx = canvas.getContext("2d");
var frame = 0;
var level = -1; // -1 = title screen, 0 = cinematic, 1-> levels
var mousex = 0;
var mousey = 0;
var mouseclicked = false;
var dialognum = 0;

var dialogmessage = [
  "Maybe I should've answered as [      ] told me to.", //why is the escape character not working?
  "They made an example out of me.",
  "I don't have a future here.",
  "Nobody came back alive and coherent from this.",
];
var startnum = 1;
var keys = [];
var dialogscroll = 0;
var future_scroll = 0;
var collisionboxes = [];
var debug = false;
var cinematicover = false;

var player = {x: 0, y: 0, xv: 0, yv: 0, width: 50, height: 60, jumping: false};
var protagonist = document.getElementById("protagonist");

// transition gradient
var gradientframe = -2000; // frame which nobody changes
var transitionactive = false;
var transitionsc; // transition screenshot
var grd = ctx.createLinearGradient(-100, 300, 900, 300);
grd.addColorStop(0, "white");
grd.addColorStop(0.2, "black");
grd.addColorStop(0.8, "black");
grd.addColorStop(1, "white");

//endgame
var endgame = false;

const transparent_white = ctx.createLinearGradient(-100, 300, 900, 300);
transparent_white.addColorStop( 0, "transparent" );
transparent_white.addColorStop( 1, "white" );

const white_transparent = ctx.createLinearGradient(-100, 300, 900, 300);
white_transparent.addColorStop( 0, "white" );
white_transparent.addColorStop( 1, "transparent" );

//mouse X and Y boundaries for start button

const xMin = 388;
const xMax = 740;
const yMin = 496;
const yMax = 590;

/*this function covers everything we want to draw*/
function draw() {
  if (level == -1) {
    drawBegin();
  }

  if (level == 0) {
    if(!cinematicover) {
      drawCinematic();
    } else {
      drawFuture();
    }
  }

  if (level == 1) {
    drawLevel1();
    if (player.x > 800) {
      swipeFade()
      level=2;
      player.x = 20
      player.y = 100
    }
  }

  if (level == 2) {
    drawLevel2();
    if (player.x > 800) {
      swipeFade()
      level=3;
      player.x = 20
      player.y = 100
    }
  }

  if (level == 3) {
    drawLevel3();
    if (player.x > 800) {
      swipeFade()
      level=4;
      player.x = 20
      player.y = 100
    }
  }
    if (endgame) {
       endGame();
     }
   if (level == 4) {
    drawLevel4();
    if (player.y > 600) {
      frame=0;
    drawHole();
    }

  }

  if (level > 0) {
    updatePhysics()
  }

  if (debug) {
    drawCollisionBoxes()
    ctx.fillRect(player.x - 5, player.y - 5, 10, 10)
    ctx.strokeRect(player.x, player.y, player.width, player.height)
    ctx.fillText("mousex: " + mousex + ", mousey: " + mousey, 0, 50)
  }

  updateTransition()
  
  frame++;
  gradientframe++;
}

function swipeFade() {
  transitionactive = true;
  gradientframe = 1600;
  transitionsc = ctx.getImageData(0, 0, 800, 600);
}

function updateTransition() {
  if (transitionactive) {
    if (gradientframe > -1000) {
      ctx.putImageData(transitionsc, 0, 0)
    }
    for(var i = 0; i < 10; i++) {
      ctx.globalAlpha = i/10;
      ctx.fillStyle = "black";
      ctx.strokeStyle = "black";
      ctx.fillRect(gradientframe + (i*160), 0, 3200 - (320*i) , 600);
    }
    ctx.globalAlpha = 1;
    gradientframe -= 30;
    if (gradientframe < -3200) {
      transitionactive = false;
    }
  }
}

function drawProtag() {
  ctx.drawImage(protagonist, player.x - 18, player.y - 20, 100, 100);
}

function addCollisionBox(x, y, w, h) {
  collisionboxes.push({"x": x, "y": y, "w": w, "h": h});
}

function drawCollisionBoxes() {
  ctx.strokeStyle = "#00FF00";
  ctx.lineWidth = 5;
  for(var i = 0; i < collisionboxes.length; i++) {
    ctx.strokeRect(collisionboxes[i].x, collisionboxes[i].y, collisionboxes[i].w, collisionboxes[i].h)
  }
}
//physics engine by Moti
function updatePhysics() {
  const playerSpeed = 2;
  const playerFallSpeed = 1.25;

  if(keys["ArrowRight"]) {
    player.xv += playerSpeed
  }

  if(keys["ArrowLeft"]) {
    player.xv -= playerSpeed
  }

  player.xv = player.xv * 0.7;
  player.x += player.xv;

   wallCollision()
  
  if (!floorCollision()) {
    player.yv += playerFallSpeed
  } else {
    player.yv = 0;
    player.jumping = false;
  }

  player.y += player.yv

  if (floorCollision() && keys["ArrowUp"] && !player.jumping) {
    console.log("jump")
    player.jumping = true;
    player.yv -= 17;
    player.y -= 2;
  }
}

function wallCollision() {
  for (var i = 0; i < collisionboxes.length; i++) {
    if(player.x + player.width > collisionboxes[i].x && player.x < collisionboxes[i].x && player.y + player.height - 3 >= collisionboxes[i].y) {
      player.x = collisionboxes[i].x - player.width - 2;
    }

    if(player.x < collisionboxes[i].x + collisionboxes[i].w && player.x > collisionboxes[i].x && player.y + player.height - 3 >= collisionboxes[i].y) {
      player.x = collisionboxes[i].x + collisionboxes[i].w + 2;
    }
  }
}

function floorCollision() {
  for (var i = 0; i < collisionboxes.length; i++) {
    if (player.x + player.width >= collisionboxes[i].x && player.x < collisionboxes[i].x + collisionboxes[i].w && collisionboxes[i].y < player.y + player.height && collisionboxes[i].y + collisionboxes[i].h > player.y + player.height) {
      player.y = collisionboxes[i].y - player.height + 1;
      return true;
    }
  }
  return false;
}

function drawCinematic() {
  var img = document.getElementById("cinematic"); // will change
  img.scaledHeight = img.height*800/img.width;
  ctx.fillRect(0, 0, 800, 600); //clear background
  
  ctx.drawImage(img, 0, -dialogscroll, 800, img.scaledHeight);
  
  if (dialogmessage[dialognum] != undefined) { // once we run out of dialog don't show anything
    // draw text background
    ctx.fillStyle = "black";
    ctx.fillRect(0, 500, 800, 300);

    ctx.fillStyle = "#ffffff";
    ctx.font = "30px Monospace";
  var dialog_split = dialogmessage[dialognum].split("\n");

    for (var j = 0; j < dialog_split.length; j++) {
      ctx.fillText(dialog_split[j], 20, 550 + (j*40), 760);
    }

  if(dialogmessage[dialognum][0]=="*") {
    ctx.fillStyle = "#32cd32"; //green dialog for future self
  }
    
  for (var i = 0; i < dialog_split.length; i++) {
    ctx.fillText(dialog_split[i], 20, 550 + (i*40), 760);
  }
//don't put level 1 here -> will skip to level 1 in a single frame
}

  if (keys["Enter"]) {
    dialognum++;
    console.log("next dialog");
  }

  if (dialogscroll < img.scaledHeight-600) { //dialogscroll
    dialogscroll+=1.5;
    frame = 0;
  } else if (frame == 100) {
    swipeFade()
    cinematicover=true;
    dialognum=0
    frame = 151;
  }

}

var dialog_future = ["*You have to leave.", "Who are you?", "*I'm here to help.", "*Run!"];

function drawFuture() {
  var img = document.getElementById("storysharing");
  ctx.fillRect(0, 0, 800, 600); //clear background
  ctx.drawImage(img, 0, 0, 800, img.height*800/img.width);

  if (dialog_future[dialognum] != undefined) {
    ctx.fillStyle = "black";
    ctx.fillRect(0, 500, 800, 300);
  
    ctx.fillStyle = "#ffffff";
    ctx.font = "30px Monospace";
    //var dialog_split = dialog_future[dialognum].split("\n");
  
    if(dialog_future[dialognum][0]=="*") {
      ctx.fillStyle = "#32cd32"; //green dialog for future self
      
    }
  
    ctx.fillText(dialog_future[dialognum].replace("*", ""), 20, 550, 760);
    frame = 0;
  }

  if (keys["Enter"]) {
    dialognum++;
    console.log("next dialog");
  }
  
  if(frame == 50 && dialog_future[dialognum] == undefined) {
    console.log("next level")
    swipeFade()
    frame = 0;
    level = 1;
  } 
}

function drawBegin() {
  var img = document.getElementById("start" + startnum);
  var unknownarea = document.getElementById("unknownarea")
  var controls = document.getElementById("controls")
  var credits = document.getElementById("credits")
  
  ctx.drawImage(img, 140, 25);
  ctx.drawImage(unknownarea, 30, 0)
  ctx.drawImage(controls, 0, 240, 350, 300)
  ctx.drawImage(credits, 0, 500, 300, 100)

  if (frame % 20 == 0) {
    startnum = randInt(1, 3);
  }

  if (mousex > xMin && mousex < xMax && mousey > yMin && mousey < yMax && mouseclicked) {
    console.log("start clicked");
    level = 0;
    frame = 0;
  }
}

setInterval(draw, 33); /*draw things in the draw function*/
canvas.addEventListener('mousedown', function(e) {
  mouseclicked = true;
})
canvas.addEventListener('mouseup', function(e) {
  mouseclicked = false;
})
canvas.addEventListener('mousemove', function(e) {
  mousex = e.clientX;
  mousey = e.clientY;
})
document.addEventListener('keydown', function(event) {
  keys[event.key] = true;
  if (event.key == "Enter") {
    draw(); // force draw a frame
    keys[event.key] = false; // set to false to avoid repeated key press
    draw();
  }
});
document.addEventListener('keyup', function(event) {
  keys[event.key] = false;
});


