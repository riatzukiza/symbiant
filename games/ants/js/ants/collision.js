const { 
  create,
  extend,
  mixin
 } = require("../util");
const Collision = { 
  symbol:Symbol("Collision"),
  update(  ){ 
    
   },
  check( x = this.x,y = this.y,system = this.system ){ 
    
      return system.has(system.sim.coord.get(x, y));
    
   }
 };