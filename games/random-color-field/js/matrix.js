const { 
  create,
  extend,
  mixin
 } = require("./util");
Array.prototype.each = (function Array$prototype$each$(f) {
  /* Array.prototype.each eval.sibilant:15:0 */

  this.forEach(f);
  return this;
});
Set.prototype.each = (function Set$prototype$each$(f) {
  /* Set.prototype.each eval.sibilant:18:0 */

  this.forEach(f);
  return this;
});
const Matrix = { 
  symbol:Symbol("Matrix"),
  init( array = [],width = this.width,height = this.height,matrix = array ){ 
    
      this.array = array;this.width = width;this.height = height;this.matrix = matrix;
      return this;
    
   },
  size( height = this.height,width = this.width ){ 
    
      return (width * height);
    
   },
  getCellIndex( x = this.x,y = this.y,width = this.width ){ 
    
      return ((x * width) + y);
    
   },
  getCell( x = this.x,y = this.y,width = this.width,height = this.height,array = this.array ){ 
    
      x = Math.abs((x % width));
      y = Math.abs((y % height));
      (function() {
        if ((x < 0 || y < 0)) {
          return console.log("x");
        }
      }).call(this);
      return array[((x * width) + y)];
    
   },
  setCell( x = this.x,y = this.y,value = this.value,width = this.width,height = this.height,array = this.array ){ 
    
      x = Math.abs((x % width));
      y = Math.abs((y % height));
      return array[((x * width) + y)] = value;
    
   },
  addToCell( x = this.x,y = this.y,value = this.value,height = this.height,width = this.width,array = this.array ){ 
    
      let i = ((x * width) + y);
      return array[i] = (array[i] + value);
    
   },
  add(  ){ 
    
   },
  scalarMultiply(  ){ 
    
   },
  submatrix( x = this.x,y = this.y,nw = this.nw,nh = this.nh,matrix = this ){ 
    
      let r = create(Matrix)([], nw, nh);
      for (let i = 0;i < nw;++(i)){
      for (let j = 0;j < nh;++(j)){
      r.setCell(i, j, matrix.getCell((i + x), (j + y)))}};
      return r;
    
   },
  convolveSub( B = this.B,x = this.x,y = this.y,h = B.height,w = B.width ){ 
    
      let m = 0;
      this.eachInSub(x, y, h, w, (val, i, j, x, y) => {
      	
        return m = (m + (this.getCell(x, y) * B.getCell(x, y)));
      
      });
      return m;
    
   },
  eachInSub( x = this.x,y = this.y,sw = this.sw,sh = this.sh,f = this.f,width = this.width,height = this.height ){ 
    
      let r = this;
      for (let i = 0;i < sw;++(i)){
      for (let j = 0;j < sh;++(j)){
      f(this.getCell((i + x), (j + y)), i, j, x, y)}};
      return r;
    
   },
  each( f = this.f,matrix = this,width = this.width,height = this.height ){ 
    
      let r = this;
      for (let x = 0;x < width;++(x)){
      for (let y = 0;y < height;++(y)){
      f(matrix.getCell(x, y), x, y, matrix)}};
      return r;
    
   },
  dmap( f = this.f,matrix = this,width = this.width,height = this.height ){ 
    
      return matrix.map(f, matrix, width, height, matrix);
    
   },
  map( f = this.f,matrix = this,width = this.width,height = this.height,result = create(Matrix)([], width, height) ){ 
    
      let r = result;
      matrix.each((v, x, y, matrix) => {
      	
        return r.setCell(x, y, (f(v, x, y, matrix) || 0));
      
      });
      return r;
    
   },
  transit( target = this.target,f = this.f,matrix = this,height = this.height,width = this.width ){ 
    
      return matrix.map(f, matrix, height, width, target);
    
   },
  convolveSub( B = this.B,offx = this.offx,offy = this.offy,width = B.width,height = B.height ){ 
    
      let m = 0;
      for (let x = 0;x < width;++(x)){
      for (let y = 0;y < height;++(y)){
      m = (m + (this.getCell((x + offx), (y + offy)) * B.getCell(x, y)));}};
      return m;
    
   },
  convolve( B = this.B,A = this,height = this.height,width = this.width ){ 
    
      let m = 0;
      for (let x = 0;x < width;++(x)){
      for (let y = 0;y < height;++(y)){
      m = (m + (A.getCell(x, y) * B.getCell(x, y)));}};
      return m;
    
   },
  dotProduct( B = this.B,A = this ){ 
    (function() {
      if (A.width === B.height) {
        return 
          let m = create(Matrix)(A.height, B.width);
          for (let r = 0;r < A.width;++(r)){
          for (let c = 0;c < B.height;++(c)){
          m.setCell(r, c, 0);
          for (let i = 0;i < A.height;++(i)){
          m.addToCell(r, c, (A.getCell(r, i) * self.getCell(i, c)))}}};
          return m;
        ;
      }
    }).call(this)
   }
 };
exports.Matrix = Matrix;