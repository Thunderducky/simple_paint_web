import { div, between, clamp, Point } from "./mathHelper"

const canvasHelper = (elem, opts = {
  CANVAS_WIDTH :640,
  CANVAS_HEIGHT : 640,
  CELLS_WIDE : 16,
  CELLS_HIGH : 16
}) => {
  // INITIALIZE
  const obj = {}
  obj.CANVAS_WIDTH = opts.CANVAS_WIDTH
  obj.CANVAS_HEIGHT = opts.CANVAS_HEIGHT
  obj.CELLS_WIDE = opts.CELLS_WIDE
  obj.CELLS_HIGH = opts.CELLS_HIGH
  obj.canvasEl = elem
  obj.ctx = obj.canvasEl.getContext("2d")

  obj.canvasEl.setAttribute("width", obj.CANVAS_WIDTH)
  obj.canvasEl.setAttribute("height", obj.CANVAS_HEIGHT)

  // CALCULATE CELL SIZE
  obj.CELL_WIDTH = obj.CANVAS_WIDTH / obj.CELLS_WIDE
  obj.CELL_HEIGHT = obj.CANVAS_HEIGHT / obj.CELLS_HIGH

  // Let's make some methods for covering cells

  obj.cellByPos = (p) => {
    const {x, y} = p

    // force in range
    return Point(
      // x
      clamp(
        div(x, obj.CELL_WIDTH),
        0, obj.CELLS_WIDE -1
      ),
      // y
      clamp(
        div(y, obj.CELL_HEIGHT),
        0, obj.CELLS_HIGH -1
      )
    )
  }

  obj.inRange = (p) => {
    return between(p.x, 0, obj.CANVAS_WIDTH) && between(p.y, 0, obj.CANVAS_HEIGHT)
  }

  obj.clearCell = p => {
    obj.ctx.clearRect(p.x * obj.CELL_WIDTH, p.y * obj.CELL_HEIGHT, obj.CELL_WIDTH, obj.CELL_HEIGHT)
  }

  obj.colorCell = (color, p) => {
    obj.ctx.fillStyle = color
    obj.ctx.fillRect(p.x * obj.CELL_WIDTH, p.y * obj.CELL_HEIGHT, obj.CELL_WIDTH, obj.CELL_HEIGHT)
  }

  // All purpose
  obj.draw = (func) => {
    func(obj.ctx, obj)
  }
  return obj
}

export {
  canvasHelper
}
