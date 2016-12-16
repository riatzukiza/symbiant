const { 
  create,
  extend,
  mixin
 } = require("./util");
const { 
  StateSpace
 } = require("./state-space");
const Display = { 
  symbol:Symbol("Display"),
  offx:0,
  offy:0,
  init( width = this.width,height = this.height,cellSize = this.cellSize,ctx = this.ctx,red = create(StateSpace)(width, height),green = create(StateSpace)(width, height),blue = create(StateSpace)(width, height) ){ 
    
      this.width = width;this.height = height;this.cellSize = cellSize;this.ctx = ctx;this.red = red;this.green = green;this.blue = blue;
      return this;
    
   },
  resize( width = this.width,height = this.height,cellSize = this.cellSize,ctx = this.ctx ){ 
    
      Display.init.call(this, width, height, cellSize, ctx);
      return this;
    
   },
  offset( offx = this.offx,offy = this.offy ){ 
    
      this.offx = offx;
      return this.offy = offy;
    
   },
  pan( x = this.x,y = this.y ){ 
    
      return this.offx += x;
    
   },
  randomize(  ){ 
    
      "generate a random field of pixels for the display";
      return this.transit((color, pos) => {
      	
        return { 
          red:Math.floor((Math.random() * ((256 - 0) + 0))),
          green:Math.floor((Math.random() * ((256 - 0) + 0))),
          blue:Math.floor((Math.random() * ((256 - 0) + 0)))
         };
      
      });
    
   },
  clear(  ){ 
    
      "set the display to black";
      return this.transit((color, pos) => {
      	
        return { 
          red:0,
          green:0,
          blue:0
         };
      
      });
    
   },
  set( x = this.x,y = this.y,color = this.color,red = this.red,green = this.green,blue = this.blue ){ 
    
      "set the transition value of the pixel at the given x and y.";
      x = (x + this.offx);
      y = (y + this.offy);
      red.set(x, y, color.red);
      green.set(x, y, color.green);
      return blue.set(x, y, color.blue);
    
   },
  setState( x = this.x,y = this.y,color = this.color,red = this.red,green = this.green,blue = this.blue ){ 
    
      x = (x + this.offx);
      y = (y + this.offy);
      "unsafe, manipulate the state of a pixel at position x y";
      red.setState(x, y, color.red);
      green.setState(x, y, color.green);
      return blue.setState(x, y, color.blue);
    
   },
  get( x = this.x,y = this.y,red = this.red,green = this.green,blue = this.blue ){ 
    
      "get the state of the pixel at x and y";
      x = (x + this.offx);
      y = (y + this.offy);
      return { 
        red:red.get(x, y),
        green:green.get(x, y),
        blue:blue.get(x, y)
       };
    
   },
  getTransition( x = this.x,y = this.y,red = this.red,green = this.green,blue = this.blue ){ 
    
      "get the transition value of the pixel at x and y. Is not its self unsafe, but it using it directly may\n" +
      "mean you are trying to do somthing unsafe else where.";
      x = (x + this.offx);
      y = (y + this.offy);
      return { 
        red:red.getTransition(x, y),
        green:green.getTransition(x, y),
        blue:blue.getTransition(x, y)
       };
    
   },
  update( red = this.red,green = this.green,blue = this.blue ){ 
    
      "swap the transition and the state matricies for all red green and blue.";
      red.update();
      green.update();
      blue.update();
      return this;
    
   },
  transit( f = this.f,width = this.width,height = this.height,red = this.red,green = this.green,blue = this.blue ){ 
    
      "apply a function for every value in the current state and use its returned value\n" +
      "for the value at the associated indexes in the transition.";
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
    
      "apply a function for every value in the current state.\n" +
      "Does not directly effect either the state or transition";
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
    
      "load the current state into the canvas";
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