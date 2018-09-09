const div = (a,b) => Math.floor(a/b)

const clamp = (t,a,b) => {
  if(b < a){
    return clamp(t,b,a)
  } else {
    if(t < a){ return a }
    else if(t > b){ return b }
    else { return t}
  }
}

const between = (t,a,b, inclusive=true) => {
  if(b < a){
    return between(t,b,a, inclusive)
  } else {

    return (inclusive)
      ? t >= a && t <= b
      : t > a && t < b
  }
}

// Apply RECTANGLE to an object, possible a fresh one
const Point = (x,y, obj = {}) => {
  // fix for zeroes
  obj.x = x || obj.x || 0
  obj.y = y || obj.y || 0
  return obj
}
const Rectangle = (x,y,width,height,obj = {}) => {
  Point(x,y, obj)
  obj.width = width || obj.width
  obj.height = height || obj.height
  return obj
}

export {
  div,
  clamp,
  between,
  Point,
  Rectangle
}
