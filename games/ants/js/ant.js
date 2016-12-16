const { 
  Entity
 } = require("./entity");
const { 
  Pheremones
 } = require("./pheremons");
const { 
  Matrix
 } = require("./matrix");
const { 
  create,
  extend,
  mixin
 } = require("./util");
const { 
  StateSpace
 } = require("./state-space");
var mooreNeighborhood = (function mooreNeighborhood$(w = this.w, h = this.h, weight = 1, c = 0) {
  /* moore-neighborhood deps.sibilant:61:8 */

  let m = create(Matrix)([], w, h).dmap((function() {
    /* eval.sibilant:43:57 */
  
    return weight;
  }));
  m.array[matrixCenter(w, h)] = c;
  return m;
});
var matrixCenter = (function matrixCenter$(width, height) {
  /* matrix-center eval.sibilant:23:0 */

  return Math.round((((width * height) - 1) / 2));
});
let empty = { id: 0 };
Entity.empty = empty;
let choice = {
  x: 60,
  y: 60
};
function eachWeight( weights = this.weights,pos = this.pos,f = this.f,size = 3,rad = Math.floor((size / 2)) ){ 
  
    "apply a function to every element in a kernel of the weight matrix.\n" +
    "Values are not changed unless done so explicitly by the function as a side effect.";
    return weights.state.eachInSub((pos.x - rad), (pos.y - rad), size, size, (v, i, j, x, y) => {
    	
      return f(v, i, j, (x + i), (y + j));
    
    });
  
 };
exports.eachWeight = eachWeight;
function mapWeights( weights = this.weights,pos = this.pos,f = this.f,size = 3,rad = Math.floor((size / 2)) ){ 
  
    "apply a function to every element in a kernel of the weight matrix,\n" +
    "assigning the weight value to the value returned";
    return eachWeight(weights, pos, (w, i, j, x, y) => {
    	
      return weights.set((x + i), (y + j), f(w, i, j, x, y));
    
    }, size, rad);
  
 };
exports.mapWeights = mapWeights;
const Ant = { 
  symbol:Symbol("Ant"),
  life:1000,
  init( x = this.x,y = this.y,emitting = this.emitting,ants = this.ants,goals = this.goals,id = 1,color = this.color,nest = this.nest,weights = this.weights,collision = this.collision,display = this.display,stats = this.stats,ant = this,life = this.life ){ 
    
      this.x = x;this.y = y;this.emitting = emitting;this.ants = ants;this.goals = goals;this.id = id;this.color = color;this.nest = nest;this.weights = weights;this.collision = collision;this.display = display;this.stats = stats;this.ant = ant;this.life = life;
      this.genetics = { 
        deviance:((function() {
          if (Math.random() < 0.5) {
            return -1;
          } else {
            return 1;
          }
        }).call(this) * ((Math.random() * (1 - 0)) + 0)),
        rate:((function() {
          if (Math.random() < 0.5) {
            return -1;
          } else {
            return 1;
          }
        }).call(this) * ((Math.random() * (1 - 0)) + 0)),
        mutationFactor:((function() {
          if (Math.random() < 0.5) {
            return -1;
          } else {
            return 1;
          }
        }).call(this) * ((Math.random() * (1 - 0)) + 0)),
        findRate:((function() {
          if (Math.random() < 0.5) {
            return -1;
          } else {
            return 1;
          }
        }).call(this) * ((Math.random() * (50 - 0)) + 0)),
        returnRate:((function() {
          if (Math.random() < 0.5) {
            return -1;
          } else {
            return 1;
          }
        }).call(this) * ((Math.random() * (50 - 0)) + 0)),
        kernel:mooreNeighborhood(3, 3).dmap(() => {
        	
          return ((function() {
            if (Math.random() < 0.5) {
              return -1;
            } else {
              return 1;
            }
          }).call(this) * ((Math.random() * (1 - 0)) + 0));
        
        })
       };
      return this;
    
   },
  save( path = this.path,genetics = this.genetics,life = this.life ){ 
    
      let storage = { 
        
       };
      return fs.writeFile("./sim.json", JSON.stringify(storage), (err) => {
      	
        (function() {
          if (err) {
            return this.emit("error", err);
          }
        }).call(this);
        return this.emit("save");
      
      });
    
   },
  load(  ){ 
    
   },
  spawn( x = this.x,y = this.y,color = this.color,ants = this.ants,collision = this.collision ){ 
    
      "create an ant of the given type at location given,\n" +
      "if there is not already one present. No ant is created if there is already an ant present.";
      let ent = collision.get(x, y);
      return (function() {
        if ((!(ent) || ent === empty || ent === 0)) {
          let ant = create(extend(Ant, this))(x, y);
          ants.add(ant);
          return collision.set(x, y, ant);
        }
      }).call(this);
    
   },
  _hasDiscoveredFood( goals = this.goals,collision = this.collision,ant = this.ant ){ 
    
      let true__QUERY = false;
      eachWeight(collision, ant, (spot, i, j, x, y) => {
      	
        return (function() {
          if ((goals.has(spot) && this.life < 1000)) {
            goals.delete(spot);
            return true__QUERY = true;
          }
        }).call(this);
      
      }, 3);
      return true__QUERY;
    
   },
  _eat( stats = this.stats,weights = this.weights,ant = this.ant ){ 
    
      ant.life = (ant.life + 500);
      ant.emitting = true;
      return Pheremones.emit(ant, weights, (ant.genetics.rate * ant.genetics.findRate), 120);
    
   },
  _reproduce( nest = this.nest,ant = this.ant,weights = this.weights ){ 
    
      console.log("ant has is making babies");
      ant.life = (ant.life / 2);
      ant.mutate();
      ant.spawn(nest.x, nest.y);
      return Pheremones.emit(ant, weights, (ant.genetics.rate * ant.genetics.returnRate), 120);
    
   },
  mutate( ant = this.ant,weights = this.weights,nest = this.nest ){ 
    
      Pheremones.emit(ant, weights, (ant.genetics.rate));
      ant.genetics.kernel.dmap((x) => {
      	
        return (x + ((function() {
          if (Math.random() < 0.5) {
            return -1;
          } else {
            return 1;
          }
        }).call(this) * ((Math.random() * (0.2 - 0)) + 0)));
      
      });
      ant.genetics.returnRate = (ant.genetics.returnRate + ((function() {
        if (Math.random() < 0.5) {
          return -1;
        } else {
          return 1;
        }
      }).call(this) * ((Math.random() * (ant.genetics.mutationFactor - 0)) + 0)));ant.genetics.findRate = (ant.genetics.findRate + ((function() {
        if (Math.random() < 0.5) {
          return -1;
        } else {
          return 1;
        }
      }).call(this) * ((Math.random() * (ant.genetics.mutationFactor - 0)) + 0)));ant.genetics.deviance = (ant.genetics.deviance + ((function() {
        if (Math.random() < 0.5) {
          return -1;
        } else {
          return 1;
        }
      }).call(this) * ((Math.random() * (ant.genetics.mutationFactor - 0)) + 0)));ant.genetics.rate = (ant.genetics.rate + ((function() {
        if (Math.random() < 0.5) {
          return -1;
        } else {
          return 1;
        }
      }).call(this) * ((Math.random() * (ant.genetics.mutationFactor - 0)) + 0)));
      return ant.life = Ant.life;
    
   },
  _sated( nest = this.nest,ant = this.ant,collision = this.collision ){ 
    
      let true__QUERY = false;
      eachWeight(collision, ant, (spot, i, j, x, y) => {
      	
        return (function() {
          if ((nest.x === x && nest.y === y && ant.life > Ant.life)) {
            return true__QUERY = true;
          }
        }).call(this);
      
      }, 10);
      return true__QUERY;
    
   },
  choose( weights = this.weights,collision = this.collision,ant = this ){ 
    
      let count = 0;
      let sum = 0;
      let done = false;
      (function() {
        if (!(ant.genetics.kernel)) {
          return ant.genetics.kernel = mooreNeighborhood(3, 3, ant.genetics.deviance);
        }
      }).call(this);
      eachWeight(weights, ant, (w, i, j, x, y) => {
      	
        let ent = collision.get(x, y);
        return (function() {
          if ((!(ent) || ent === empty || ent === 0)) {
            return count += (w + ant.genetics.deviance + ant.genetics.kernel.getCell(i, j));
          }
        }).call(this);
      
      }, 3);
      let rand = (count * Math.random());
      return eachWeight(weights, ant, (w, i, j, x, y) => {
      	
        let ent = collision.get(x, y);
        return (function() {
          if ((!(ent) || ent === empty || ent === 0)) {
            sum += (w + ant.genetics.deviance + ant.genetics.kernel.getCell(i, j));
            return (function() {
              if ((rand < sum && !(done))) {
                choice.x = x;
                choice.y = y;
                return done = true;
              }
            }).call(this);
          }
        }).call(this);
      
      }, 3);
    
   },
  _die( weights = this.weights,ant = this.ant,ants = this.ants ){ 
    
      ants.delete(ant);
      return Pheremones.emit(ant, weights, ((ant.genetics.rate * ant.genetics.returnRate)), 120);
    
   },
  move( weights = this.weights,ants = this.ants,nest = this.nest,collision = this.collision,life = this.life,emitting = this.emitting,ant = this ){ 
    
      let x = 0;
      let y = 0;
      --(ant.life);
      let random = (Math.floor((Math.random() * ((Ant.life / 2) - 0))) + 0);
      (function() {
        if (ant.life > random) {
          ant.choose();
          Entity.move.call(ant, choice.x, choice.y);
          return (function() {
            if (ant._hasDiscoveredFood()) {
              return ant._eat();
            } else if (ant._sated()) {
              return ant._reproduce();
            }
          }).call(this);
        } else {
          return ant._die();
        }
      }).call(this);
      return Pheremones.emit(ant, weights, (ant.genetics.rate * (ant.life / Ant.life)));
    
   }
 };
exports.Ant = Ant;
const Colony = { 
  symbol:Symbol("Colony"),
  id:1,
  colonies:(new Set()),
  init( nest = this.nest,color = this.color,goals = (new Set()),ants = (new Set()),stats = this.stats,collision = this.collision,weights = create(StateSpace)(120, 120),display = this.display,decay = 0.1 ){ 
    
      this.nest = nest;this.color = color;this.goals = goals;this.ants = ants;this.stats = stats;this.collision = collision;this.weights = weights;this.display = display;this.decay = decay;
      console.log("collision", collision);
      return this;
    
   },
  save(  ){ 
    
   },
  load(  ){ 
    
   },
  spawn( count = this.count,nest = this.nest,collision = this.collision ){ 
    
      eachWeight(collision, nest, (spot, i, j, x, y) => {
      	
        return Ant.spawn.call(this, y, x);
      
      }, count);
      return this;
    
   },
  move( ants = this.ants,weights = this.weights,display = this.display,color = this.color ){ 
    
      "Process the movement of ever ant in a set of ants, updating weights along the way.";
      return ants.each((ant) => {
      	
        return ant.move();
      
      });
    
   }
 };
exports.Colony = Colony;