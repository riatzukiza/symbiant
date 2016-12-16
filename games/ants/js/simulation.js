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
const Simulation = extend(EventEmitter.prototype, { 
  symbol:Symbol("Simulation"),
  goal:{
    x: 100,
    y: 100
  },
  nest:{
    x: 20,
    y: 20
  },
  nests:(new Set()),
  ants:(new Set()),
  weights:create(StateSpace)(120, 120),
  collision:create(StateSpace)(120, 120),
  stats:{ 
    returningAnts:0,
    huntingAnts:0,
    successfulReturns:0
   },
  weightConstant:0.1,
  emissionRate:0.01,
  decay:0.1,
  init( display = this.display,fps = this.fps,state = this.state,rate = (1000 / fps),ticks = 0,sim = this ){ 
    
      this.display = display;this.fps = fps;this.state = state;this.rate = rate;this.ticks = ticks;this.sim = sim;
      this.collision.set = this.collision.setState;
      EventEmitter.call(this);
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
  tick( display = this.display,previous = this.previous,rate = this.rate ){ 
    
      (function() {
        if (this.state) {
          let now = Date.now();
          this.elapsed = (now - previous);
          window.requestAnimationFrame(() => {
          	
            return this.tick(display);
          
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
        /* eval.sibilant:94:42 */
      
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