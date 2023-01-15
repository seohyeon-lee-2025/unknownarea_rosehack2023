
function drawLevel1() {
  var background = document.getElementById("contaminated_area");
  var landscape = document.getElementById("level1");

  collisionboxes = []
  
  ctx.drawImage(background, 0, 0, 800, 600);
  ctx.drawImage(landscape, 0, 0, 800, 600);
  drawProtag()
  
  addCollisionBox(0, 400, 200, 20)
  addCollisionBox(190, 300, 70, 100)
  addCollisionBox(210, 200, 20, 100)
  addCollisionBox(0, 400, 200, 20)
  addCollisionBox(270, 380, 200, 20)
  addCollisionBox(400, 290, 90, 100)
  addCollisionBox(450, 400, 150, 20)
  addCollisionBox(580, 335, 60, 100)
  addCollisionBox(650, 400, 200, 20)
}