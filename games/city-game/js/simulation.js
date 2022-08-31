var { 
  EventEmitter
 } = require("events");
const Location={ 
  symbol:Symbol("Location"),
  init( x = this.x,y = this.y,layers = [] ){ 
    
      this.x = x;this.y = y;this.layers = layers;
      return this;
    
   }
 };
var Simulation = extend(EventEmitter.prototype, { 
  symbol:Symbol("Simulation")
 });
mixin({ 
  init( fps = this.fps,_width = this._width,_scale = this._scale,state = false,layers = (new Layers(document.getElementById("stage"), "gl", _width, _scale)).setBGColor(),coord = matrix(_width, _width).dmap((nil, x, y) => {
  	
    return create(Location)(x, y);
  
  }),systems = (new Set()),ticks = 0,sim = this ){ 
    
      this.fps = fps;this._width = _width;this._scale = _scale;this.state = state;this.layers = layers;this.coord = coord;this.systems = systems;this.ticks = ticks;this.sim = sim;
      EventEmitter.call(this);
      return this;
    
   },
  get rate(  ){ 
    
      return (1000 / this.fps);
    
   },
  get width(  ){ 
    
      return this._width;
    
   },
  get scale(  ){ 
    
      return this._scale;
    
   },
  set width( value ){ 
    
      return this._width = value;
    
   }
 }, Simulation);
Simulation.start = (function Simulation$start$() {
  /* Simulation.start node_modules/kit/inc/core/defs.sibilant:222:8 */

  "start the simulation";
  this.state = true;
  this.previous = Date.now();
  this.tick();
  return this;
});
Simulation.toggle = (function Simulation$toggle$() {
  /* Simulation.toggle node_modules/kit/inc/core/defs.sibilant:222:8 */

  "switches the state of the simulation, if its on, turn it off, if its off, turn it on.";
  this.state = !(this.state);
  (function() {
    if (this.state) {
      return this.start();
    }
  }).call(this);
  return this;
});
Simulation.stop = (function Simulation$stop$() {
  /* Simulation.stop node_modules/kit/inc/core/defs.sibilant:222:8 */

  "stop the simulation";
  this.state = false;
  return this;
});
Simulation.tick = (function Simulation$tick$(previous = this.previous, rate = this.rate) {
  /* Simulation.tick node_modules/kit/inc/core/defs.sibilant:222:8 */

  "Decides when to tick based on specified framerate, and turns the simulation off if it was previously on and the state has since changed.";
  (function() {
    if (this.state) {
      var now = Date.now();
      this.elapsed = (now - previous);
      window.requestAnimationFrame(() => {
      	
        return this.tick();
      
      });
      return (function() {
        if (this.elapsed > rate) {
          ++(this.ticks);
          this.previous = (now - (this.elapsed % rate));
          return this.emit("tick", now, this.ticks);
        }
      }).call(this);
    }
  }).call(this);
  return this;
});
exports.Simulation = Simulation;