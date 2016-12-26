const { 
  create,
  extend,
  mixin
 } = require("./util");
const { 
  StateSpace
 } = require("./state-space");
const { 
  Layer
 } = require("./layer");
const $ = require("jquery/dist/jquery.min.js");
const Display = { 
  symbol:Symbol("Display"),
  offx:0,
  offy:0,
  init( width = this.width,height = this.height,cellSize = this.cellSize ){ 
    
      this.width = width;this.height = height;this.cellSize = cellSize;
      return this;
    
   },
  resize( width = this.width,height = this.height,cellSize = this.cellSize,canvas = this.canvas ){ 
    
      Display.init.call(this, width, height, cellSize, canvas);
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
  set( pos = this.pos,layers = this.layers ){ 
    
      "set the transition value of the pixel at the given x and y.";
      pos.x = (x + this.offx);
      pos.y = (y + this.offy);
      return transition.set(x, y, color);
    
   },
  setState( x = this.x,y = this.y,color = this.color,state = this.state ){ 
    
      "unsafe, manipulate the state of a pixel at position x y";
      x = (x + this.offx);
      y = (y + this.offy);
      return state.set(x, y, color);
    
   },
  get( x = this.x,y = this.y,state = this.state ){ 
    
      "get the state of the pixel at x and y";
      x = (x + this.offx);
      y = (y + this.offy);
      return state.get(x, y);
    
   },
  getTransition( x = this.x,y = this.y,transition = this.transition ){ 
    
      "get the transition value of the pixel at x and y. Is not its self unsafe, but it using it directly may\n" +
      "mean you are trying to do somthing unsafe else where.";
      x = (x + this.offx);
      y = (y + this.offy);
      return transition.get(x, y);
    
   },
  update( state = this.state,transition = this.transition ){ 
    
      "swap the transition and the state matricies for all red green and blue.";
      $(state.canvas).hide();
      $(transition.canvas).show();
      this.state = transition;
      this.transition = state;
      return this;
    
   },
  transit( f = this.f,width = this.width,height = this.height,red = this.red,green = this.green,blue = this.blue ){ 
    
      "apply a function for every value in the current state and use its returned value\n" +
      "for the value at the associated indexes in the transition.";
      for (let i = 0;i < width;++(i)){
      for (let j = 0;j < height;++(j)){
      this.set(i, j, f(this.get(i, j), { 
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
  render( state = this.state ){ 
    
      "load the current state into the canvas";
      state.update();
      return this;
    
   }
 };
exports.Display = Display;