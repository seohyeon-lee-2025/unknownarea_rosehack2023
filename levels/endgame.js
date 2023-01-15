
var dialog_endgame= ["*I'm glad you made it here.", "*We will be alright."];
dialognum=0;
function endGame() {
  var img = document.getElementById("storysharing");
  ctx.fillRect(0, 0, 800, 600); //clear background
  ctx.drawImage(img, 0, 0, 800, img.height*800/img.width);

  if (dialog_endgame[dialognum] != undefined) {
    ctx.fillStyle = "black";
    ctx.fillRect(0, 500, 800, 300);
  
    ctx.fillStyle = "#ffffff";
    ctx.font = "30px Monospace";
    //var dialog_split = dialog_future[dialognum].split("\n");
  
    if(dialog_endgame[dialognum][0]=="*") {
      ctx.fillStyle = "#32cd32"; //green dialog for future self
    }
  
    ctx.fillText(dialog_endgame[dialognum].replace("*", ""), 20, 550, 760);
    frame = 0;
  }

  if (keys["Enter"]) {
    dialognum++;
    console.log("next dialog");
  }
  
  if(dialognum > dialog_future.length) {
    console.log("game ended");
    swipeFade();
    frame = 0;
    level = 1;
  } 
}
