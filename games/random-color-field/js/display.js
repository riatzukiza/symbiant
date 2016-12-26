var create(extend, mixin) = require("./util")["create(extend, mixin)"];
var StateSpace() = require("./state-space")["StateSpace()"];
const Display = { 
  symbol:Symbol("Display"),
  init( width = this.width,height = this.height,cellSize = this.cellSize,ctx = this.ctx,red = StateSpace(width(height)),green = StateSpace(width(height)),blue = StateSpace(width(height)) ){ 
    
      this.width = width;this.height = height;this.cellSize = cellSize;this.ctx = ctx;this.red = red;this.green = green;this.blue = blue;
      return this;
    
   },
  resize( width = this.width,height = this.height,cellSize = this.cellSize,ctx = this.ctx ){ 
    
      Display.init.call(this, width, height, cellSize, ctx);
      return this;
    
   },
  randomize(  ){ 
    
      return this.transit((color, pos) => {
      	
        return { 
          red:Math.floor((Math.random() * ((256 - 0) + 0))),
          green:Math.floor((Math.random() * ((256 - 0) + 0))),
          blue:Math.floor((Math.random() * ((256 - 0) + 0)))
         };
      
      });
    
   },
  empty(  ){ 
    
      return this.transit((color, pos) => {
      	
        return { 
          red:0,
          green:0,
          blue:0
         };
      
      });
    
   },
  set( x = this.x,y = this.y,color = this.color,red = this.red,green = this.green,blue = this.blue ){ 
    
      red.set(x, y, color.red);
      green.set(x, y, color.green);
      return blue.set(x, y, color.blue);
    
   },
  get( x = this.x,y = this.y,red = this.red,green = this.green,blue = this.blue ){ 
    
      return { 
        red:red.get(x, y),
        green:green.get(x, y),
        blue:blue.get(x, y)
       };
    
   },
  getTransition( x = this.x,y = this.y,red = this.red,green = this.green,blue = this.blue ){ 
    
      return { 
        red:red.getTransition(x, y),
        green:green.getTransition(x, y),
        blue:blue.getTransition(x, y)
       };
    
   },
  update( red = this.red,green = this.green,blue = this.blue ){ 
    
      red.update();
      green.update();
      blue.update();
      return this;
    
   },
  transit( f = this.f,width = this.width,height = this.height,red = this.red,green = this.green,blue = this.blue ){ 
    
      for (let i = 0;i < width;++(i)){
      for (let j = 0;j < height;++(j)){
      this.set(i, j, f({ 
        red:red.get(i, j),
        green:green.get(i, j),
        blue:blue.get(i, j)
       }, { 
        x:i,
        y:j
       }))}};
      return this;
    
   },
  each( f = this.f,width = this.width,height = this.height,cellSize = this.cellSize,red = this.red,green = this.green,blue = this.blue,ctx = this.ctx ){ 
    
      for (let i = 0;i < width;++(i)){
      for (let j = 0;j < height;++(j)){
      f({ 
        red:red.get(i, j),
        green:green.get(i, j),
        blue:blue.get(i, j)
       }, { 
        x:i,
        y:j
       })}};
      return this;
    
   },
  render( ctx = this.ctx,cellSize = this.cellSize ){ 
    
      let size = cellSize;
      this.each(({ 
        red:r,
        green:g,
        blue:b
       }, { 
        x:i,
        y:j
       }) => {
      	
        ctx.fillStyle = ("rgb(" + r + "," + g + "," + b + ")");
        return ctx.fillRect((size * i), (size * j), size, size);
      
      });
      return this;
    
   }
 };
exports.Display = Display;