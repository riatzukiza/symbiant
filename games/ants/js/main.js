const { 
  euclidianDistance
 } = require("./math");
const { 
  create,
  extend,
  mixin
 } = require("./util");
const $ = require("jquery/dist/jquery.min.js");
const fs = require("browserify-fs");
const { 
  Matrix
 } = require("./matrix");
const { 
  StateSpace
 } = require("./state-space");
const { 
  Simulation
 } = require("./simulation");
const { 
  Display
 } = require("./display");
const { 
  Layer
 } = require("./layer");
const { 
  interface
 } = require("./interface");
const { 
  Pheremones
 } = require("./pheremons");
let george = {
  x: 20,
  y: 20
};
let socket = io("/ants");
let sim = create(Simulation)(60, 120, 5);
let white = { 
  red:255,
  green:255,
  blue:255
 };
let green = { 
  red:0,
  green:255,
  blue:0
 };
let black = { 
  red:0,
  green:0,
  blue:0
 };
var mooreNeighborhood = (function mooreNeighborhood$(w = this.w, h = this.h, weight = 1, c = 0) {
  /* moore-neighborhood deps.sibilant:61:8 */

  let m = create(Matrix)([], w, h).dmap((function() {
    /* eval.sibilant:36:57 */
  
    return weight;
  }));
  m.array[matrixCenter(w, h)] = c;
  return m;
});
var matrixCenter = (function matrixCenter$(width, height) {
  /* matrix-center eval.sibilant:41:0 */

  return Math.round((((width * height) - 1) / 2));
});
let empty = { id: 0 };
let choice = {
  x: 60,
  y: 60
};
function eachInArea( matrix = this.matrix,pos = this.pos,f = this.f,size = 3,rad = Math.floor((size / 2)) ){ 
  
    "apply a function to every element in a kernel of the weight matrix.\n" +
    "Values are not changed unless done so explicitly by the function as a side effect.";
    return matrix.eachInSub((pos.x - rad), (pos.y - rad), size, size, (v, i, j, x, y) => {
    	
      return f(v, i, j, (x + i), (y + j));
    
    });
  
 };
const Collision = { 
  symbol:Symbol("Collision"),
  coord:sim.coord,
  init( entities = (new Map()),coord = this.coord ){ 
    
      this.entities = entities;this.coord = coord;
      return this;
    
   },
  serialize( entities = this.entities ){ 
    
      return entities.toArray().map((ent) => {
      	
        return ent.serialize();
      
      });
    
   },
  move( entities = this.entities ){ 
    
      entities.delete(this.pos);
      return entities.set(ent.pos, ent);
    
   },
  check( x = this.x,y = this.y,coord = this.coord ){ 
    
      return this.has(coord.get(x, y));
    
   },
  set( pos = this.pos,ent = this.ent,entities = this.entities ){ 
    
      return entities.set(pos, ent);
    
   },
  get( x = this.x,y = this.y,entities = this.entities,coord = this.coord ){ 
    
      return entities.get(coord.get(x, y));
    
   },
  delete( key = this.key ){ 
    
      return this.entities.delete(key);
    
   },
  has( pos = this.pos,entities = this.entities ){ 
    
      return entities.has(pos);
    
   }
 };
const Movement = { 
  symbol:Symbol("Movement"),
  init(  ){ 
    
      
      return this;
    
   }
 };
const Rendering = { 
  symbol:Symbol("Rendering"),
  entities:sim.layers.get(),
  weights:[]
 };
const World = { 
  symbol:Symbol("World"),
  collision:create(Collision)(),
  coord:sim.coord,
  rendering:Rendering,
  entities:(new Set()),
  init( collision = this.collision,coord = this.coord,glLayer = this.glLayer ){ 
    
      this.collision = collision;this.coord = coord;this.glLayer = glLayer;
      return this;
    
   },
  add( ent = this.ent,rendering = this.rendering,collision = this.collision,coord = this.coord,entities = this.entities ){ 
    
      rendering.entities.add(ent);
      entities.add(ent);
      return collision.set(ent.pos, ent);
    
   },
  remove( ent = this.ent,rendering = this.rendering,collision = this.collision,coord = this.coord,entities = this.entities ){ 
    
      rendering.entities.delete(ent);
      entities.delete(ent);
      return collision.delete(ent.pos, ent);
    
   },
  update( entities = this.entities ){ 
    
      return entities.each((ent) => {
      	
        return ent.update();
      
      });
    
   }
 };
const Entity = { 
  symbol:Symbol("Entity"),
  world:World,
  collision:World.collision,
  init( pos = this.pos,world = this.world,color = this.color,collision = this.collision ){ 
    
      this.pos = pos;this.world = world;this.color = color;this.collision = collision;
      return this;
    
   },
  get r(  ){ 
    
      return this.color.red;
    
   },
  get g(  ){ 
    
      return this.color.green;
    
   },
  get b(  ){ 
    
      return this.color.blue;
    
   },
  get a(  ){ 
    
      return 255;
    
   },
  get x(  ){ 
    
      return this.pos.x;
    
   },
  get y(  ){ 
    
      return this.pos.y;
    
   },
  set x( num ){ 
    
      return this.move(num, this.y);
    
   },
  set y( num ){ 
    
      return this.move(this.x, num);
    
   },
  spawn( x = this.x,y = this.y,color = this.color,world = this.world,collision = this.collision ){ 
    
      let pos = world.coord.get(x, y);
      return (function() {
        if (!(collision.has(pos))) {
          let ent = create(this)(pos, world, color);
          world.add(ent);
          return ent;
        }
      }).call(this);
    
   },
  move( x = this.x,y = this.y,world = this.world,collision = this.collision ){ 
    
      let pos = world.coord.get(x, y);
      return (function() {
        if (!(collision.has(pos))) {
          return this.pos = pos;
        }
      }).call(this);
    
   },
  remove( world = this.world ){ 
    
      return world.remove(this);
    
   },
  random( world = this.world ){ 
    
      return this.spawn(Math.floor((Math.random() * ((world.coord.width - 0) + 0))), Math.floor((Math.random() * ((world.coord.width - 0) + 0))));
    
   }
 };
Entity.empty = empty;
const EntityGroup = extend(Entity, { 
  symbol:Symbol("EntityGroup"),
  init( entityType = this.entityType,entities = (new Set()) ){ 
    
      this.entityType = entityType;this.entities = entities;
      return this;
    
   },
  serialize( entities = this.entities ){ 
    
      return entities.toArray().map((ent) => {
      	
        return ent.serialize();
      
      });
    
   },
  add( ent = this.ent,entities = this.entities ){ 
    
      return entities.add(ent);
    
   },
  has( ent = this.ent,entities = this.entities ){ 
    
      return entities.has(ent);
    
   },
  delete( ent = this.ent ){ 
    
      return null;
    
   },
  each( f = this.f,entities = this.entities ){ 
    
      entities.each(f);
      return this;
    
   },
  spawn( x = this.x,y = this.y,color = this.color,entityType = this.entityType ){ 
    
      let ent = entityType.spawn(x, y);
      (function() {
        if (ent) {
          console.log("spawn safe, adding to group", ent);
          ent.group = this;
          this.add(ent);
          return ent;
        }
      }).call(this);
      return this;
    
   },
  update( entities = this.entities ){ 
    
      return entities.each((ent) => {
      	
        return ent.update();
      
      });
    
   }
 });
const StraightLiner = extend(Entity, { 
  symbol:Symbol("StraightLiner"),
  color:{ 
    red:0,
    green:151,
    blue:116
   },
  update(  ){ 
    
      ++(this.x);
      return ++(this.y);
    
   }
 });
const Ant = extend(Entity, { 
  symbol:Symbol("Ant"),
  life:1000,
  color:{ 
    red:255,
    green:0,
    blue:0
   },
  init( pos = this.pos,world = this.world,color = this.color,life = this.life,ant = this ){ 
    
      this.pos = pos;this.world = world;this.color = color;this.life = life;this.ant = ant;
      this.genetics = { 
        deviance:(function() {
          /* eval.sibilant:43:8 */
        
          let rand = ((Math.random() * (0.1 - 0)) + 0);
          return (0.1 - (rand / 2));
        }).call(this),
        rate:((Math.random() * (0.5 - 0)) + 0),
        mutationFactor:((Math.random() * (0.5 - 0)) + 0),
        findRate:(function() {
          /* eval.sibilant:43:8 */
        
          let rand = ((Math.random() * (1 - 0)) + 0);
          return (1 - (rand / 2));
        }).call(this),
        returnRate:(function() {
          /* eval.sibilant:43:8 */
        
          let rand = ((Math.random() * (1 - 0)) + 0);
          return (1 - (rand / 2));
        }).call(this),
        kernel:mooreNeighborhood(3, 3).dmap(() => {
        	
          return (function() {
            /* eval.sibilant:43:8 */
          
            let rand = ((Math.random() * (1 - 0)) + 0);
            return (1 - (rand / 2));
          }).call(this);
        
        })
       };
      return this;
    
   },
  _hasDiscoveredFood( group = this.group,collision = this.collision,ant = this.ant ){ 
    
      let true__QUERY = false;
      eachInArea(World.coord, ant, (spot, i, j, x, y) => {
      	
        return (function() {
          if ((group.goals.has(spot) && this.life < 1000)) {
            group.goals.delete(spot);
            collision.set(x, y, empty);
            return true__QUERY = true;
          }
        }).call(this);
      
      }, 5);
      return true__QUERY;
    
   },
  _eat( group = this.group,ant = this.ant ){ 
    
      console.log("ant eating");
      ant.life = (ant.life + Ant.life);
      let emission = (ant.genetics.rate * ant.genetics.findRate * (ant.life / Ant.life));
      return Pheremones.emit(ant, group.weights, emission, 120);
    
   },
  _reproduce( nest = this.nest,ant = this.ant,group = this.group ){ 
    
      console.log("ant is making babies");
      ant.life = (ant.life / 2);
      ant.mutate();
      ant.spawn(ant.x, ant.y);
      ant.spawn((1 + ant.x), (1 + ant.y));
      return Pheremones.emit(ant, group.weights, (ant.genetics.rate * (ant.life / Ant.life)), 120);
    
   },
  _die( ant = this.ant,group = this.group,collision = this.collision ){ 
    
      console.log(this, "died");
      group.delete(ant);
      ant.remove();
      return Pheremones.emit(ant, group.weights, (-1 * ant.genetics.rate * (ant.life / Ant.life)), 120);
    
   },
  mutate( ant = this.ant,group = this.group,nest = this.nest ){ 
    
      Pheremones.emit(ant, group.weights, (ant.genetics.rate));
      ant.genetics.kernel.dmap((x) => {
      	
        return (x * (function() {
          /* eval.sibilant:43:8 */
        
          let rand = ((Math.random() * (0.2 - 0)) + 0);
          return (0.2 - (rand / 2));
        }).call(this));
      
      });
      ant.genetics.returnRate = (ant.genetics.returnRate + (function() {
        /* eval.sibilant:43:8 */
      
        let rand = ((Math.random() * (ant.genetics.mutationFactor - 0)) + 0);
        return (ant.genetics.mutationFactor - (rand / 2));
      }).call(this));ant.genetics.findRate = (ant.genetics.findRate + (function() {
        /* eval.sibilant:43:8 */
      
        let rand = ((Math.random() * (ant.genetics.mutationFactor - 0)) + 0);
        return (ant.genetics.mutationFactor - (rand / 2));
      }).call(this));ant.genetics.deviance = (ant.genetics.deviance + (function() {
        /* eval.sibilant:43:8 */
      
        let rand = ((Math.random() * (ant.genetics.mutationFactor - 0)) + 0);
        return (ant.genetics.mutationFactor - (rand / 2));
      }).call(this));ant.genetics.rate = (ant.genetics.rate + (function() {
        /* eval.sibilant:43:8 */
      
        let rand = ((Math.random() * (ant.genetics.mutationFactor - 0)) + 0);
        return (ant.genetics.mutationFactor - (rand / 2));
      }).call(this));
      return ant.life = Ant.life;
    
   },
  _sated( nest = this.nest,ant = this.ant,collision = this.collision ){ 
    
      return ant.life > Ant.life;
    
   },
  _nearNest( nest = this.nest,ant = this.ant,collision = this.collision ){ 
    
      return (function() {
        /* eval.sibilant:27:8 */
      
        let true__QUERY = false;
        eachInArea(collision, ant, (spot, i, j, x, y) => {
        	
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
      let sated__QUERY = (ant._sated()) ? -1 : 1;
      eachInArea(group.weights.state, ant, (w, i, j, x, y) => {
      	
        let ent = collision.get(x, y);
        return (function() {
          if ((!(ent) || ent === empty || ent === 0)) {
            // let calcDevi = ((Ant.life * ant.life) / ant.genetics.deviance);
            return count += (w + sated__QUERY + ant.genetics.kernel.get(i, j) + ant.genetics.deviance);
          }
        }).call(this);
      
      }, 3);
      let rand = (count * Math.random());
      eachInArea(group.weights.state, ant, (w, i, j, x, y) => {
      	
        let ent = collision.get(x, y);
        return (function() {
          if ((!(ent) || ent === empty || ent === 0)) {
            sum += (w + sated__QUERY + ant.genetics.kernel.get(i, j) + ant.genetics.deviance);
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
      return choice;
    
   },
  update( group = this.group,nest = this.nest,life = this.life,ant = this ){ 
    
      let x = 0;
      let y = 0;
      --(ant.life);
      let random = Math.floor((Math.random() * (((Ant.life / 2) - 0) + 0)));
      let sated__QUERY = ant._sated();
      (function() {
        if ((2 * ant.life) > random) {
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
      return Pheremones.emit(ant, group.weights, (ant.genetics.rate * (0.1 * (ant.life / Ant.life))), 7);
    
   }
 });
const Colony = extend(EntityGroup, { 
  symbol:Symbol("Colony"),
  colonies:(new Set()),
  entityType:Ant,
  init( nest = this.nest,color = this.color,goals = this.goals,decay = 0.1,colonies = this.colonies,weights = create(StateSpace)(sim.width, sim.width) ){ 
    
      this.nest = nest;this.color = color;this.goals = goals;this.decay = decay;this.colonies = colonies;this.weights = weights;
      EntityGroup.init.call(this);
      colonies.add(this);
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
      return Pheremones.update(this.weights, 0.1);
    
   }
 });
const Plant = extend(Entity, { 
  symbol:Symbol("Plant"),
  color:green,
  update( pos = this.pos,system = this.system ){ 
    
      return (function() {
        if (Math.round(Math.random()) === 1) {
          return requestAnimationFrame(() => {
          	
            return this.spawn((pos.x + Math.floor((Math.random() * ((2 - -2) + -2)))), (pos.y + Math.floor((Math.random() * ((2 - -2) + -2)))));
          
          });
        }
      }).call(this);
    
   }
 });
Map.prototype.each = (function Map$prototype$each$(f) {
  /* Map.prototype.each eval.sibilant:285:0 */

  this.forEach(f);
  return this;
});
var start = (function start$(sim) {
  /* start eval.sibilant:287:0 */

  let plants = create(EntityGroup)(Plant);
  let reds = create(Colony)({
    x: 30,
    y: 60
  }, { 
    red:255,
    green:0,
    blue:155
   }, plants);
  let lineWalker = StraightLiner.spawn(60, 60);
  for (let time = 0;time < 10;++(time)){
  reds.random()};
  for (let time = 0;time < 100;++(time)){
  plants.random()};
  return sim.start().on("tick", (now, ticks) => {
  	
    for (let time = 0;time < 2;++(time)){
    reds.update()};
    return sim.layers.update().render();
  
  });
});
let yellow = {
  red: 255,
  green: 255,
  blue: 0
};
sim.load(start);
socket.on("change", () => {
	
  console.log("change ");
  return location.reload();

});