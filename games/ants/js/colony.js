const { 
  Pheremones
 } = require("./pheremons");
const { 
  Ant,
  eachWeight,
  mapWeights
 } = require("./ant");
const { 
  create,
  extend,
  mixin
 } = require("./util");
const { 
  StateSpace
 } = require("./state-space");
let yellow = {
  red: 255,
  green: 255,
  blue: 0
};
const Location = { 
  symbol:Symbol("Location"),
  init( x = this.x,y = this.y,layers = [] ){ 
    
      this.x = x;this.y = y;this.layers = layers;
      return this;
    
   }
 };
var makePool = (function makePool$(width, entType) {
  /* make-pool eval.sibilant:12:0 */

  return create(Matrix)([], width, width).dmap((function(nil, x, y) {
    /* eval.sibilant:14:9 */
  
    return create(entType)(x, y, 0, 0, 0, 0);
  }));
});
var makeLayers = (function makeLayers$() {
  /* make-layers eval.sibilant:16:0 */

  return (new Layers(document.getElementById("stage"), "gl", width, scale)).setBGColor();
});
const WeightField = { 
  symbol:Symbol("WeightField"),
  fields:(new Set()),
  init( coordinatePlane = this.coordinatePlane,color = this.color,layers = this.layers,layer = layers.get() ){ 
    
      this.coordinatePlane = coordinatePlane;this.color = color;this.layers = layers;this.layer = layer;
      return this;
    
   },
  get( x = this.x,y = this.y ){ 
    
   },
  set( x = this.x,y = this.y,w = this.w ){ 
    
   },
  clear(  ){ 
    
   },
  fill( v = this.v ){ 
    
   }
 };
const Entity = { 
  symbol:Symbol("Entity"),
  init( x = this.x,y = this.y,r = this.r,g = this.g,b = this.b,system = this.system ){ 
    
      this.x = x;this.y = y;this.r = r;this.g = g;this.b = b;this.system = system;
      return this;
    
   },
  get a(  ){ 
    
      return this.field.get(this.x, this.y);
    
   }
 };
const Collision = { 
  symbol:Symbol("Collision"),
  init( layer = this.layer ){ 
    
      this.layer = layer;
      return this;
    
   }
 };
const LayerManager = { 
  symbol:Symbol("LayerManager"),
  init( layers = makeLayers(),collision = layers.get(),coordinatePlane = makePool(Location) ){ 
    
      this.layers = layers;this.collision = collision;this.coordinatePlane = coordinatePlane;
      return this;
    
   },
  add( color = this.color ){ 
    
   }
 };
const Colony = { 
  symbol:Symbol("Colony"),
  id:1,
  colonies:(new Set()),
  init( name = this.name,nest = this.nest,color = this.color,coordinatePlane = this.coordinatePlane,goals = (new Set()),ants = (new Set()),decay = 0.1,colonies = this.colonies ){ 
    
      this.name = name;this.nest = nest;this.color = color;this.coordinatePlane = coordinatePlane;this.goals = goals;this.ants = ants;this.decay = decay;this.colonies = colonies;
      colonies.add(this);
      return this;
    
   },
  serialize( ants = this.ants ){ 
    
      return ants.toArray().map((ant) => {
      	
        return ant.serialize();
      
      });
    
   },
  save(  ){ 
    
      return create(File)();
    
   },
  load(  ){ 
    
   },
  add( count = this.count,nest = this.nest,collision = this.collision ){ 
    
      eachWeight(collision, nest, (spot, i, j, x, y) => {
      	
        return Ant.spawn.call(this, x, y);
      
      }, count);
      return this;
    
   },
  move( ants = this.ants,weights = this.weights,color = this.color,nest = this.nest,decay = this.decay ){ 
    
      "Process the movement of ever ant in a set of ants, updating weights along the way.";
      ants.each((ant) => {
      	
        return ant.move();
      
      });
      return Pheremones.update(weights, decay);
    
   }
 };
exports.Colony = Colony;