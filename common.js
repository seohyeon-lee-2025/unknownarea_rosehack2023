function randInt(min, max) {
  return Math.floor(Math.random() * (max - min + 1) + min)
}

function getMousePos(canvas, evt) {
  var rect = canvas.getBoundingClientRect();
  return {
    x: evt.clientX - rect.left,
    y: evt.clientY - rect.top
  };
}
