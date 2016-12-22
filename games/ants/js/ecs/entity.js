const { 
  create,
  extend,
  mixin
 } = require("../util");
const { 
  World
 } = require("../world");
const Entity = { 
  symbol:Symbol("Entity"),
  world:World,
  init( pos = this.pos,world = this.world,color = this.color ){ 
    
      this.pos = pos;this.world = world;this.color = color;
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
  spawn( x = this.x,y = this.y,color = this.color,world = this.world ){ 
    
      let pos = world.coord.get(x, y);
      return (function() {
        if (!(world.collision.has(pos))) {
          let ent = create(this)(pos, world, color);
          world.add(ent);
          return ent;
        }
      }).call(this);
    
   },
  move( x = this.x,y = this.y,world = this.world ){ 
    
      let pos = world.coord.get(x, y);
      return (function() {
        if (!(world.collision.has(pos))) {
          return this.pos = pos;
        }
      }).call(this);
    
   },
  random( world = this.world ){ 
    
      return this.spawn(Math.floor((Math.random() * ((world.coord.width - 0) + 0))), Math.floor((Math.random() * ((world.coord.width - 0) + 0))));
    
   }
 };
exports.Entity = Entity;