function drawLevel4() {
  collisionboxes = [];
  var background= document.getElementById("contaminated_area");
  var landscape = document.getElementById("level4");
  var mist = document.getElementById("mist")
  
  ctx.drawImage(background, 0,0,800,600);
  ctx.globalAlpha = 0.25
  ctx.drawImage(mist, 200, 200, 800, 600)
  ctx.globalAlpha = 1
  drawProtag();
  ctx.drawImage(landscape, 0,0,800,600);

  addCollisionBox(0, 275, 200, 50);
  addCollisionBox(117, 220, 80, 50)
  addCollisionBox(160, 161, 20, 60)
  
}