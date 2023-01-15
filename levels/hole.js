var count=0;
function drawHole(){
  var background= document.getElementById("contaminated_area");
  var background2 = document.getElementById("mist");

  ctx.drawImage(background, -count,0,800,600);
  ctx.drawImage(background, -count+800, 0,800,600);
  ctx.drawImage(background, -count+1600,0,800,600);
  ctx.drawImage(background2, -count,0,800,600);
  ctx.drawImage(background2, -count+800,0,800,600);
  ctx.drawImage(background2, -count+1600,0,800,600);
  count=count+30; //pan view

  if (count>1600){
    endgame=true;
  }
}

