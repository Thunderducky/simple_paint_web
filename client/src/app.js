import { Point } from "./mathHelper"
import { canvasHelper } from "./canvasHelper"
const $ = (q) =>  document.querySelector(q)
const $a = (q) =>  document.querySelectorAll(q)

const coordEl = $("#coords")
const ch = canvasHelper($("canvas"))

window.brush_color = "white"

let canvasMouseDown = false
let isErasing = false
function getMousePos(canvasEl, evt) {
  const rect = canvasEl.getBoundingClientRect()
  return Point(evt.clientX - rect.left, evt.clientY - rect.top)
}
ch.canvasEl.addEventListener("mousedown", function(e){
  const location = ch.cellByPos(getMousePos(ch.canvasEl, e))
  if(isErasing){
    ch.clearCell(location)
  } else {
    ch.colorCell(window.brush_color, location)
  }
  canvasMouseDown = true
})
document.addEventListener("mouseup", function(){
  canvasMouseDown = false
})
ch.canvasEl.addEventListener("mousemove", function(e){
  const location = ch.cellByPos(getMousePos(ch.canvasEl, e))
  coordEl.textContent = JSON.stringify(location)

  if(canvasMouseDown){
    if(isErasing){
      ch.clearCell(location)
    } else {
      ch.colorCell(window.brush_color, location)
    }
  }
})

$a("#choosable .swatch").forEach(item => item.addEventListener("click", function(e){
  //console.log()
  $("#active").setAttribute("style", "background: " + e.currentTarget.style.background)
  $("#active").innerHTML = e.currentTarget.innerHTML
  window.brush_color = e.currentTarget.style.background
  isErasing = false
}))

$a("#choosable .eraser").forEach(item => item.addEventListener("click", function(e){
  //console.log()
  $("#active").setAttribute("style", "background: " + e.currentTarget.style.background)
  $("#active").innerHTML = e.currentTarget.innerHTML
  isErasing = true
}))

// function drawGridLines(columnWidth = CELL_WIDTH, rowHeight = CELL_HEIGHT, columnGrouping = 4, rowGrouping = 4){
//
//   for(let j = 0; j < CANVAS_HEIGHT; j+=rowHeight){
//     const bigRow = (j/rowHeight) % rowGrouping == 0 && j !== 0
//     if(bigRow){
//       ctx.fillStyle= "red"
//       ctx.fillRect(0, j-1, CANVAS_WIDTH, 3)
//     } else {
//       ctx.fillStyle= "lightgray"
//       ctx.fillRect(0, j, CANVAS_WIDTH, 1)
//     }
//   }
//   for(let i = 0; i < CANVAS_WIDTH; i+=columnWidth){
//     const bigColumn = (i/columnWidth) % columnGrouping == 0 && i !== 0
//     if(bigColumn){
//       ctx.fillStyle= "red"
//       ctx.fillRect(i-1, 0, 3, CANVAS_HEIGHT)
//     } else {
//       ctx.fillStyle= "lightgray"
//       ctx.fillRect(i, 0, 1, CANVAS_HEIGHT)
//     }
//   }
// }
//
// function drawCheckerboard(){
//   ctx.fillStyle = "white";
//   for(let j = 0; j < 32; j++){
//     for(let i = 0; i < 32; i++){
//       if((i + j) % 2 == 0){
//         ctx.fillRect(i * 20, j * 20, 20, 20)
//       }
//     }
//   }
// }

//drawCheckerboard();
//drawGridLines();
