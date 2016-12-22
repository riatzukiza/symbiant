const { 
  create,
  extend,
  mixin
 } = require("./util");
const { 
  EventEmitter
 } = require("events");
const { 
  StateSpace
 } = require("./state-space");
const { 
  Colony,
  Ant,
  eachWeight,
  mapWeights
 } = require("./ant");
const fs = require("browserify-fs");
const { 
  Matrix
 } = require("./matrix");
const { 
  Entity
 } = require("./entity");
const { 
  Layers
 } = require("./webgl-layer");
const Location = { 
  symbol:Symbol("Location"),
  init( x = this.x,y = this.y,layers = [] ){ 
    
      this.x = x;this.y = y;this.layers = layers;
      return this;
    
   }
 };
const Simulation = extend(EventEmitter.prototype, { 
  symbol:Symbol("Simulation"),
  init( fps = this.fps,width = this.width,scale = this.scale,state = false,layers = (new Layers(document.getElementById("stage"), "gl", width, scale)).setBGColor(),coord = create(Matrix)([], width, width).dmap((function(nil, x, y) {
    /* eval.sibilant:27:34 */
  
    return create(Location)(x, y);
  })),systems = (new Set()),rate = (1000 / fps),ticks = 0,sim = this ){ 
    
      this.fps = fps;this.width = width;this.scale = scale;this.state = state;this.layers = layers;this.coord = coord;this.systems = systems;this.rate = rate;this.ticks = ticks;this.sim = sim;
      EventEmitter.call(this);
      return this;
    
   },
  add( system = this.system ){ 
    
      return this;
    
   },
  start(  ){ 
    
      this.state = true;
      this.previous = Date.now();
      this.tick();
      return this;
    
   },
  toggle(  ){ 
    
      this.state = !(this.state);
      (function() {
        if (this.state) {
          return this.start();
        }
      }).call(this);
      return this;
    
   },
  stop(  ){ 
    
      this.state = false;
      return this;
    
   },
  tick( previous = this.previous,rate = this.rate ){ 
    
      (function() {
        if (this.state) {
          let now = Date.now();
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
    
   },
  save(  ){ 
    
      let storage = {
        ants: [],
        weights: sim.weights,
        stats: sim.stats
      };
      sim.ants.each((ant) => {
      	
        delete ant.ants;
        delete ant.sim;
        delete ant.ant;
        delete ant.weights;
        delete ant.collision;
        return storage.ants.push(ant);
      
      });
      fs.writeFile("./sim.json", JSON.stringify(storage), (err) => {
      	
        (function() {
          if (err) {
            return this.emit("error", err);
          }
        }).call(this);
        return this.emit("save");
      
      });
      return this;
    
   },
  load( cb = this.cb ){ 
    
      this.on("load", (cb || (function(sim) {
        /* eval.sibilant:92:42 */
      
        return sim;
      })));
      fs.readFile("./sim.json", (err, simState) => {
      	
        return (function() {
          if (err) {
            return this.emit("load", this);
          } else {
            let json = JSON.parse(simState);
            console.log("loaded file", json);
            return (function() {
              if (json.weights) {
                this.ants = (new Set(json.ants.map((ant) => {
                	
                  ant.sim = this;
                  ant.kernel = create(Matrix)(ant.kernel.array, ant.kernel.width, ant.kernel.height);
                  return create(extend(Ant, ant))();
                
                })));
                this.stats = (json.stats || this.stats);
                this.weights = create(StateSpace)(120, 120, create(Matrix)(json.weights.state.array, json.weights.width, json.weights.height), create(Matrix)(json.weights.transition.array, json.weights.width, json.weights.height));
                return this.emit("load", this);
              }
            }).call(this);
          }
        }).call(this);
      
      });
      return this;
    
   }
 });
exports.Simulation = Simulation;