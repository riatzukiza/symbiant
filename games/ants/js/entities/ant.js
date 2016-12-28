const { 
  create,
  extend,
  mixin,
  curry
 } = require("../util");
const { 
  Entity
 } = require("../ecs/entity");
const R = require("ramda");
const { 
  EntityGroup
 } = require("../ecs/group");
const { 
  Matrix
 } = require("../matrix");
const { 
  Pheremones
 } = require("../pheremons");
const { 
  weightedRandomElement
 } = require("../random");
const { 
  StateSpace
 } = require("../state-space");
const { 
  complement
 } = require("../color");
var mooreNeighborhood = (function mooreNeighborhood$(w = this.w, h = this.h, weight = 1, c = 0) {
  /* moore-neighborhood deps.sibilant:61:8 */

  let m = create(Matrix)([], w, h).dmap((function() {
    /* eval.sibilant:28:57 */
  
    return weight;
  }));
  m.array[matrixCenter(w, h)] = c;
  return m;
});
var randomColor = (function randomColor$() {
  /* random-color eval.sibilant:17:0 */

  return {
    red: (Math.floor((Math.random() * ( - 255))) + 255),
    green: (Math.floor((Math.random() * ( - 255))) + 255),
    blue: (Math.floor((Math.random() * ( - 255))) + 255)
  };
});
var matrixCenter = (function matrixCenter$(width, height) {
  /* matrix-center eval.sibilant:24:0 */

  return Math.round((((width * height) - 1) / 2));
});
const { 
  eachInArea
 } = require("../area");
const Ant = extend(Entity, { 
  symbol:Symbol("Ant"),
  life:1000,
  collision:world.collision,
  init( pos = this.pos,color = this.color,life = this.life,ant = this ){ 
    
      this.pos = pos;this.color = color;this.life = life;this.ant = ant;
      this.genetics = { 
        deviance:(function() {
          /* eval.sibilant:33:8 */
        
          let rand = ((Math.random() * (0.1 - 0)) + 0);
          return (0.1 - (rand / 2));
        }).call(this),
        rate:((Math.random() * (0.5 - 0)) + 0),
        mutationFactor:((Math.random() * (0.5 - 0)) + 0),
        findRate:(function() {
          /* eval.sibilant:33:8 */
        
          let rand = ((Math.random() * (1 - 0)) + 0);
          return (1 - (rand / 2));
        }).call(this),
        returnRate:(function() {
          /* eval.sibilant:33:8 */
        
          let rand = ((Math.random() * (1 - 0)) + 0);
          return (1 - (rand / 2));
        }).call(this),
        kernel:mooreNeighborhood(3, 3).dmap(() => {
        	
          return (function() {
            /* eval.sibilant:33:8 */
          
            let rand = ((Math.random() * (1 - 0)) + 0);
            return (1 - (rand / 2));
          }).call(this);
        
        })
       };
      return this;
    
   },
  _hasDiscoveredFood( group = this.group,ant = this.ant ){ 
    
      let true__QUERY = false;
      eachInArea(world.coord, ant, (spot, i, j, x, y) => {
      	
        spot = world.collision.entities.get(spot);
        return (function() {
          if ((!(true__QUERY) && group.goals.has(spot))) {
            this._food = spot;
            return true__QUERY = true;
          }
        }).call(this);
      
      }, 5);
      return true__QUERY;
    
   },
  _eat( group = this.group,ant = this.ant ){ 
    
      group.goals.delete(ant._food);
      ant.life = (ant.life + ant._food.life);
      let emission = (ant.genetics.rate * ant.genetics.findRate * 10);
      this.group.foodWeights.update();
      return this.group.foodWeights.emit(ant.pos, group.weights, emission, 20);
    
   },
  _reproduce( nest = this.nest,ant = this.ant,group = this.group ){ 
    
      ant.life = (ant.life / 2);
      ant.mutate();
      group.spawn();
      this.group.matingWeights.update();
      return this.group.matingWeights.emit(ant.pos, group.matingWeights.weights, (10 * ant.genetics.rate * (ant.life / Ant.life)), 20);
    
   },
  _die( ant = this.ant,group = this.group ){ 
    
      console.log("die", ant);
      group.delete(ant);
      return this.seeking.emit(ant.pos, this.seeking.weights, (-10 * ant.genetics.rate * (ant.life / Ant.life)), 20);
    
   },
  mutate( ant = this.ant,group = this.group,nest = this.nest ){ 
    
      this.group.foodWeights.emit(ant.pos, group.weights, (ant.genetics.rate));
      ant.genetics.kernel.dmap((x) => {
      	
        return (x * (function() {
          /* eval.sibilant:33:8 */
        
          let rand = ((Math.random() * (0.2 - 0)) + 0);
          return (0.2 - (rand / 2));
        }).call(this));
      
      });
      ant.genetics.returnRate = (ant.genetics.returnRate + (function() {
        /* eval.sibilant:33:8 */
      
        let rand = ((Math.random() * (ant.genetics.mutationFactor - 0)) + 0);
        return (ant.genetics.mutationFactor - (rand / 2));
      }).call(this));ant.genetics.findRate = (ant.genetics.findRate + (function() {
        /* eval.sibilant:33:8 */
      
        let rand = ((Math.random() * (ant.genetics.mutationFactor - 0)) + 0);
        return (ant.genetics.mutationFactor - (rand / 2));
      }).call(this));ant.genetics.deviance = (ant.genetics.deviance + (function() {
        /* eval.sibilant:33:8 */
      
        let rand = ((Math.random() * (ant.genetics.mutationFactor - 0)) + 0);
        return (ant.genetics.mutationFactor - (rand / 2));
      }).call(this));ant.genetics.rate = (ant.genetics.rate + (function() {
        /* eval.sibilant:33:8 */
      
        let rand = ((Math.random() * (ant.genetics.mutationFactor - 0)) + 0);
        return (ant.genetics.mutationFactor - (rand / 2));
      }).call(this));
      return ant.life = Ant.life;
    
   },
  _sated( nest = this.nest,ant = this.ant ){ 
    
      let sated__QUERY = ant.life > Ant.life;
      (function() {
        if (sated__QUERY) {
          return this.seeking = this.group.matingWeights;
        } else {
          return this.seeking = this.group.foodWeights;
        }
      }).call(this);
      return sated__QUERY;
    
   },
  _nearNest( nest = this.nest,ant = this.ant ){ 
    
      return (function() {
        /* eval.sibilant:14:8 */
      
        let true__QUERY = false;
        eachInArea(world.coord, ant, (spot, i, j, x, y) => {
        	
          return (function() {
            if ((nest.x === x && nest.y === y)) {
              return true__QUERY = true;
            }
          }).call(this);
        
        }, 10);
        return true__QUERY;
      }).call(this);
    
   },
  choose( group = this.group,collision = this.collision,ant = this ){ 
    
      let count = 0;
      let sum = 0;
      let done = false;
      let choice = {
        x: ant.x,
        y: ant.y
      };
      (function() {
        if (!(ant.genetics.kernel)) {
          return ant.genetics.kernel = mooreNeighborhood(3, 3, ant.genetics.deviance);
        }
      }).call(this);
      let weights = null;
      var totalWeight = (function totalWeight$(w, i, j) {
        /* total-weight eval.sibilant:98:18 */
      
        return (ant.genetics.deviance + 1 + (w * (ant.life / Ant.life) * ant.genetics.kernel.get(i, j)));
      });
      eachInArea(this.seeking.weights.state, ant, (w, i, j, x, y) => {
      	
        let ent = collision.get(x, y);
        return (function() {
          if ((!(ent) || ent === 0)) {
            return count += totalWeight(w, i, j);
          }
        }).call(this);
      
      }, 3);
      let rand = (count * Math.random());
      eachInArea(this.seeking.weights.state, ant, (w, i, j, x, y) => {
      	
        let ent = collision.get(x, y);
        return (function() {
          if ((!(ent) || ent === 0)) {
            sum += totalWeight(w, i, j);
            return (function() {
              if ((rand <= sum && !(done))) {
                choice.x = x;
                choice.y = y;
                return done = true;
              }
            }).call(this);
          }
        }).call(this);
      
      }, 3);
      return choice;
    
   },
  _formNewColony(  ){ 
    
      let sumGroupsLife = (group) => {
      	
        let totalLife = 0;
        group.entities.each((ent) => {
        	
          return totalLife += ent.life;
        
        });
        return totalLife;
      
      };
      let newColony = create(Colony)(this.pos, randomColor(), weightedRandomElement(EntityGroup.groups, sumGroupsLife));
      this.group.remove(this);
      newColony.add(this);
      for (let time = 0;time < 10;++(time)){
      this._reproduce()};
      return this.color = newColony.color;
    
   },
  update( group = this.group,nest = this.nest,life = this.life,ant = this ){ 
    
      let x = 0;
      let y = 0;
      --(ant.life);
      let random = (Math.floor((Math.random() * ((Ant.life / 2) - 0))) + 0);
      let sated__QUERY = ant._sated();
      (function() {
        if ((2 * ant.life) > random) {
          let choice = ant.choose();
          this.move(choice.x, choice.y);
          return (function() {
            if (sated__QUERY) {
              return (function() {
                if (ant._nearNest()) {
                  return ant._reproduce();
                } else if (Math.random() > 0.999) {
                  return ant._formNewColony();
                }
              }).call(this);
            } else if (ant._hasDiscoveredFood()) {
              return ant._eat();
            }
          }).call(this);
        } else {
          return ant._die();
        }
      }).call(this);
      return this.seeking.emit(ant.pos, this.seeking.weights, (ant.genetics.rate * (ant.life / Ant.life)), 10);
    
   }
 });
exports.Ant = Ant;
const { 
  EventEmitter
 } = require("events");
const Colony = extend(EntityGroup, { 
  symbol:Symbol("Colony"),
  colonies:(new Set()),
  entityType:Ant,
  init( nest = this.nest,color = this.color,goals = this.goals,decay = 0.1,colonies = this.colonies,foodWeights = create(Pheremones)(color, decay),matingWeights = create(Pheremones)({ 
    red:color.red,
    green:color.green,
    blue:255
   }, decay),event = (new EventEmitter()),ants = [] ){ 
    
      this.nest = nest;this.color = color;this.goals = goals;this.decay = decay;this.colonies = colonies;this.foodWeights = foodWeights;this.matingWeights = matingWeights;this.event = event;this.ants = ants;
      EntityGroup.init.call(this);
      colonies.add(this);
      return this;
    
   },
  spawn( color = this.color,entityType = this.entityType ){ 
    
      let rx = (Math.round(Math.random()) === 1) ? 1 : -1;
      let ry = (Math.round(Math.random()) === 1) ? 1 : -1;
      let ent = entityType.spawn((this.nest.x + (Math.floor((Math.random() * (30 - 1))) + 1)), (this.nest.y + (Math.floor((Math.random() * (30 - 1))) + 1)), color);
      (function() {
        if (ent) {
          ent.group = this;
          ent.seeking = this.foodWeights;
          this.add(ent);
          this.ants.push(ent);
          ent.nest = this.nest;
          this.event.emit("spawn", ent);
          return ent;
        }
      }).call(this);
      return this;
    
   },
  serialize( ants = this.ants ){ 
    
      return ants.toArray().map((ant) => {
      	
        return ant.serialize();
      
      });
    
   },
  update( entities = this.entities,weights = this.weights,decay = this.decay,matingWeights = this.matingWeights,foodWeights = this.foodWeights ){ 
    
      "Process the movement of ever ant in a set of ants, updating weights along the way.";
      let update = (ant) => {
      	
        ant.update();
        return ant;
      
      };
      let has = (entities) => {
      	
        return (ant) => {
        	
          return this.entities.has(ant);
        
        };
      
      };
      this.ants = this.ants.each(update).filter(has(entities));
      return (function() {
        if (this.entities.size === 0) {
          this.event.emit("extinct", this);
          return this.colonies.delete(this);
        }
      }).call(this);
    
   }
 });
exports.Colony = Colony;