  
function drawLevel2() {
  var background= document.getElementById("contaminated_area");
  var landscape = document.getElementById("level2");
  
  collisionboxes = [];
  
  ctx.drawImage(background, 0,0,800,600);
  ctx.drawImage(landscape, 0,0,800,600);
  drawProtag();
  
  addCollisionBox(0, 145, 25, 174);
  addCollisionBox(27, 253, 25, 84);
  addCollisionBox(57, 326, 22, 30);
  addCollisionBox(80, 261, 33, 70);
  addCollisionBox(118, 167, 75, 182);
  addCollisionBox(202, 287, 60, 40);
  addCollisionBox(261, 318, 22, 40);
  addCollisionBox(275, 288, 22, 60);
  addCollisionBox(293, 328, 15, 60);
  addCollisionBox(315, 274, 20, 60);
  addCollisionBox(340, 263, 126, 50);
  addCollisionBox(468, 282, 60, 85);
  addCollisionBox(501, 301, 20, 100);
  addCollisionBox(522, 276, 33, 100);
  addCollisionBox(544, 239, 40, 60);
  addCollisionBox(583, 295, 30, 60);
  addCollisionBox(601, 266, 70, 75);
  addCollisionBox(682, 304, 35, 75);
  addCollisionBox(714, 269, 30, 75);
  addCollisionBox(730, 318, 60, 40);
  addCollisionBox(757, 348, 50, 75);


}