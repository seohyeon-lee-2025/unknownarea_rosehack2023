var mistdir = ">" // could be < or >
var mistamt = 0

var arrow = {"x": -50, "y": -50, "xv": 0, "yv": 0}
//var cannon = {"x": -20, "y": -10, "xv": 0, "yv": 0}
function drawLevel3() {
  collisionboxes = [];
  var background= document.getElementById("contaminated_area");
  var mist = document.getElementById("mist")
  var landscape = document.getElementById("level3");
  var archer = document.getElementById("enemy");
  var arrowid = document.getElementById("arrow");
  //var cannonid = document.getElementById("cannon");
  
  if (mistdir == ">") {
    mistamt += 1
  } else {
    mistamt -= 1
  }
  if (mistamt == 800) mistdir = "<"
  if (mistamt == 0) mistdir = ">"
  
  ctx.drawImage(background, 0,0,800,600);
  updateArrowPhysics();
  //updateCannonPhysics();
  ctx.drawImage(arrowid, arrow.x, arrow.y, 50, 20)
  //ctx.drawImage(cannonid, cannon.x, cannon.y, 35, 35)
  if (debug)
    ctx.fillRect(arrow.x - 5, arrow.y - 5, 10, 10)
  ctx.drawImage(landscape, 0,0,800,600);
  ctx.drawImage(archer, -20, 60, 100, 100);
  ctx.globalAlpha = 0.25
  ctx.drawImage(mist, mistamt - 800, 0, 1600, 600)
  ctx.globalAlpha = 1
  drawProtag();

  addCollisionBox(0, 275, 200, 50);
  addCollisionBox(146, 219, 42, 100);
  addCollisionBox(191, 156, 40, 200);
  addCollisionBox(224, 239, 289-224, 80);
  addCollisionBox(289, 208, 333-289, 80);
  addCollisionBox(332, 167, 369-332, 209);
  addCollisionBox(369, 167, 400-369, 200);
  addCollisionBox(397, 247, 400-369, 100);
  addCollisionBox(442, 329, 400-369, 100);
  addCollisionBox(467, 287, 400-369, 50);
  addCollisionBox(433, 323, 400-369, 50);
  addCollisionBox(468, 286, 400-369, 50);
  addCollisionBox(499, 357, 400-369, 50);
  addCollisionBox(523, 316, 400-369, 50);
  addCollisionBox(561, 290, 179, 100);
  addCollisionBox(696, 193, 50, 150);
  addCollisionBox(647, 216, 50, 40);
  addCollisionBox(752, 244, 50, 150);

  if (frame % 100 == 0) {
    arrow.x = 0
    arrow.y = 60
    arrow.xv = randInt(30, 40)
    arrow.yv = randInt(-10, -5)
  }
}
/*
  if (frame % 170 == 0) {
    cannon.x = 10
    cannon.y = 60
    cannon.xv = randInt(30, 40)
    cannon.yv = randInt(-10, -5)
  } */


function updateArrowPhysics() {
  if(player.y < arrow.y && player.y + player.height > arrow.y) {
    if (player.x < arrow.x && player.x + player.width > arrow.x) {
      swipeFade()
      level = 1
      player.x = 20
      player.y = 100
    }
  }
  
  arrow.xv = arrow.xv * 0.95;
  arrow.x += arrow.xv;

  arrow.yv += 0.5
  arrow.y += arrow.yv
}

/* function updateCannonPhysics() {
  if(player.y < cannon.y+15 && player.y + 15 > cannon.y) {
    if (player.x < cannon.x && player.x + 15 > cannon.x) {
      swipeFade()
      level = 1
      player.x = 20
      player.y = 100
    }
  } 
  
  cannon.xv = cannon.xv * 1.2;
  cannon.x += cannon.xv;

  cannon.yv += 0.5;
  cannon.y += cannon.yv;
} */