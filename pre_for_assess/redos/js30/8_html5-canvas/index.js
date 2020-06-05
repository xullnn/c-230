let canvas, ctx, hue = 0, widthDelta = 1;

document.addEventListener('DOMContentLoaded', function() {
  canvas = document.querySelector('#draw');
  ctx = canvas.getContext('2d');

  canvas.width = window.innerWidth
  canvas.height = window.innerHeight

  ctx.strokeStyle = 'blue';
  ctx.lineJoin = 'round';
  ctx.lineCap = 'round';
  ctx.lineWidth = '10';

  let isDrawing = false;

  function draw(e) {
    if (!isDrawing) return;

    ctx.lineTo(e.offsetX, e.offsetY);
    ctx.stroke();

    ctx.strokeStyle = `hsl(${hue}, 100%, 50%)`;
    hue += 1;

    ctx.lineWidth += widthDelta
    if(ctx.lineWidth < 10 || ctx.lineWidth > 100){
    widthDelta = -widthDelta
}
  };

  canvas.addEventListener('mousemove', draw);
  canvas.addEventListener('mousedown', (e) => {
    isDrawing = true;
    ctx.moveTo(e.offsetX, e.offsetY)
  });
  canvas.addEventListener('mouseup', () => isDrawing = false);
  canvas.addEventListener('mouseout', () => isDrawing = false);


})
