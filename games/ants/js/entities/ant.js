const { 
  create,
  extend,
  mixin
 } = require("../util");
const { 
  Entity
 } = require("../ecs/entity");
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
    /* eval.sibilant:30:57 */
  
    return weight;
  }));
  m.array[matrixCenter(w, h)] = c;
  return m;
});
var matrixCenter = (function matrixCenter$(width, height) {
  /* matrix-center eval.sibilant:14:0 */

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
          /* eval.sibilant:36:8 */
        
          let rand = ((Math.random() * (0.1 - 0)) + 0);
          return (0.1 - (rand / 2));
        }).call(this),
        rate:((Math.random() * (0.5 - 0)) + 0),
        mutationFactor:((Math.random() * (0.5 - 0)) + 0),
        findRate:(function() {
          /* eval.sibilant:36:8 */
        
          let rand = ((Math.random() * (1 - 0)) + 0);
          return (1 - (rand / 2));
        }).call(this),
        returnRate:(function() {
          /* eval.sibilant:36:8 */
        
          let rand = ((Math.random() * (1 - 0)) + 0);
          return (1 - (rand / 2));
        }).call(this),
        kernel:mooreNeighborhood(3, 3).dmap(() => {
        	
          return (function() {
            /* eval.sibilant:36:8 */
          
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
      return this.group.pheremones.emit(ant.pos, group.weights, emission, 20);
    
   },
  _reproduce( nest = this.nest,ant = this.ant,group = this.group ){ 
    
      ant.life = (ant.life / 2);
      ant.mutate();
      group.spawn();
      group.spawn();
      return this.group.pheremones.emit(ant.pos, group.weights, (100 * ant.genetics.rate * (ant.life / Ant.life)), 20);
    
   },
  _die( ant = this.ant,group = this.group ){ 
    
      group.delete(ant);
      return this.group.pheremones.emit(ant.pos, group.weights, (-10 * ant.genetics.rate * (ant.life / Ant.life)), 20);
    
   },
  mutate( ant = this.ant,group = this.group,nest = this.nest ){ 
    
      this.group.pheremones.emit(ant.pos, group.weights, (ant.genetics.rate));
      ant.genetics.kernel.dmap((x) => {
      	
        return (x * (function() {
          /* eval.sibilant:36:8 */
        
          let rand = ((Math.random() * (0.2 - 0)) + 0);
          return (0.2 - (rand / 2));
        }).call(this));
      
      });
      ant.genetics.returnRate = (ant.genetics.returnRate + (function() {
        /* eval.sibilant:36:8 */
      
        let rand = ((Math.random() * (ant.genetics.mutationFactor - 0)) + 0);
        return (ant.genetics.mutationFactor - (rand / 2));
      }).call(this));ant.genetics.findRate = (ant.genetics.findRate + (function() {
        /* eval.sibilant:36:8 */
      
        let rand = ((Math.random() * (ant.genetics.mutationFactor - 0)) + 0);
        return (ant.genetics.mutationFactor - (rand / 2));
      }).call(this));ant.genetics.deviance = (ant.genetics.deviance + (function() {
        /* eval.sibilant:36:8 */
      
        let rand = ((Math.random() * (ant.genetics.mutationFactor - 0)) + 0);
        return (ant.genetics.mutationFactor - (rand / 2));
      }).call(this));ant.genetics.rate = (ant.genetics.rate + (function() {
        /* eval.sibilant:36:8 */
      
        let rand = ((Math.random() * (ant.genetics.mutationFactor - 0)) + 0);
        return (ant.genetics.mutationFactor - (rand / 2));
      }).call(this));
      return ant.life = Ant.life;
    
   },
  _sated( nest = this.nest,ant = this.ant ){ 
    
      return ant.life > Ant.life;
    
   },
  _nearNest( nest = this.nest,ant = this.ant ){ 
    
      return (function() {
        /* eval.sibilant:69:8 */
      
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
      let sated__QUERY = 1;
      let cache = (new Map());
      eachInArea(group.weights.state, ant, (w, i, j, x, y) => {
      	
        let ent = collision.get(x, y);
        return (function() {
          if ((!(ent) || ent === 0)) {
            count += (w * sated__QUERY * (ant.life / Ant.life) * ant.genetics.kernel.get(i, j) * ant.genetics.deviance);
            return cache.set(ent, count);
          }
        }).call(this);
      
      }, 3);
      let rand = (count * Math.random());
      weightedRandomElement();
      eachInArea(group.weights.state, ant, (w, i, j, x, y) => {
      	
        let ent = collision.get(x, y);
        return (function() {
          if ((!(ent) || ent === 0)) {
            return (function() {
              if ((rand < cache.get(ent) && !(done))) {
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
      let newColony = create(Colony)(this.pos, { 
        red:Math.floor((Math.random() * ((256 - 0) + 0))),
        green:Math.floor((Math.random() * ((256 - 0) + 0))),
        blue:Math.floor((Math.random() * ((256 - 0) + 0)))
       }, weightedRandomElement(EntityGroup.groups, sumGroupsLife));
      console.log("creating new colony", newColony);
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
        if ((1 * ant.life) > (100 * (Ant.life + random))) {
          return ant._formNewColony();
        } else if ((2 * ant.life) > random) {
          let choice = ant.choose();
          this.move(choice.x, choice.y);
          return (function() {
            if (ant._hasDiscoveredFood()) {
              return ant._eat();
            } else if (sated__QUERY) {
              return (function() {
                if (ant._nearNest()) {
                  return ant._reproduce();
                }
              }).call(this);
            }
          }).call(this);
        } else {
          return ant._die();
        }
      }).call(this);
      return this.group.pheremones.emit(ant.pos, group.weights, (ant.genetics.rate * (0.1 * (ant.life / Ant.life))), 20);
    
   }
 });
exports.Ant = Ant;
const Colony = extend(EntityGroup, { 
  symbol:Symbol("Colony"),
  colonies:(new Set()),
  entityType:Ant,
  init( nest = this.nest,color = this.color,goals = this.goals,decay = 0.1,colonies = this.colonies,weights = create(StateSpace)(sim.width, sim.width),pheremones = create(Pheremones)(color, decay, weights, sim.layers.get()) ){ 
    
      this.nest = nest;this.color = color;this.goals = goals;this.decay = decay;this.colonies = colonies;this.weights = weights;this.pheremones = pheremones;
      EntityGroup.init.call(this);
      colonies.add(this);
      return this;
    
   },
  spawn( color = this.color,entityType = this.entityType ){ 
    
      let rx = (Math.round(Math.random()) === 1) ? 1 : -1;
      let ry = (Math.round(Math.random()) === 1) ? 1 : -1;
      let ent = entityType.spawn((this.nest.x + (Math.floor((Math.random() * (30 - 0))) + 0) + rx), (this.nest.y + (Math.floor((Math.random() * (30 - 0))) + 0) + rx), color);
      (function() {
        if (ent) {
          ent.group = this;
          this.add(ent);
          ent.nest = this.nest;
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
  update( entities = this.entities,weights = this.weights,decay = this.decay ){ 
    
      "Process the movement of ever ant in a set of ants, updating weights along the way.";
      this.each((ant) => {
      	
        return ant.update();
      
      });
      return (function() {
        if (this.entities.size === 0) {
          console.log("colonly has died");
          return this.colonies.delete(this);
        }
      }).call(this);
    
   }
 });
exports.Colony = Colony;