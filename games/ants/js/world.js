const { 
  Layers
 } = require("./webgl-layer");
const { 
  Matrix
 } = require("./matrix");
const { 
  create,
  extend,
  mixin
 } = require("./util");
let width = 250;
let scale = 5;
const Location = { 
  symbol:Symbol("Location"),
  init( x = this.x,y = this.y,layers = [] ){ 
    
      this.x = x;this.y = y;this.layers = layers;
      return this;
    
   }
 };
const Collision = { 
  symbol:Symbol("Collision"),
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
  has( pos = this.pos,entities = this.entities ){ 
    
      return entities.has(pos);
    
   }
 };
let layers = (new Layers(document.getElementById("stage"), "gl", width, scale)).setBGColor();
const Rendering = { 
  symbol:Symbol("Rendering"),
  layers:layers,
  entities:layers.get(),
  weights:[]
 };
const World = { 
  symbol:Symbol("World"),
  collision:create(Collision)(),
  roord:create(Matrix)([], width, width).dmap((function(nil, x, y) {
    /* eval.sibilant:28:63 */
  
    return create(Location)(x, y);
  })),
  rendering:Rendering,
  entities:(new Set()),
  width:width,
  scale:scale,
  init( collision = this.collision,coord = this.coord,glLayer = this.glLayer ){ 
    
      this.collision = collision;this.coord = coord;this.glLayer = glLayer;
      return this;
    
   },
  add( ent = this.ent,rendering = this.rendering,collision = this.collision,coord = this.coord,entities = this.entities ){ 
    
      rendering.entities.add(ent);
      entities.add(ent);
      return collision.set(ent.pos, ent);
    
   },
  update( entities = this.entities ){ 
    
      console.log(this.rendering);
      return entities.each((ent) => {
      	
        return ent.update();
      
      });
    
   }
 };
exports.World = World;