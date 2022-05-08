var { 
  Physics
 } = require("sibilant-game-engine/client/systems/physics"),
    { 
  Collision
 } = require("sibilant-game-engine/client/systems/collision");
var config = require("../config");
var Friction = Physics.Force.define("Friction", { 
  apply( c ){ 
    
      var v = c.velocity;
      var collision = c.system.process.systems.get(Collision, c.entity);
      return (function() {
        if (!(collision.colliding)) {
          v.xd += (-1 * (1 + (v.xd / config.friction)));
          return v.yd += (-1 * (1 + (v.yd / config.friction)));
        }
      }).call(this);
    
   }
 });
exports.Friction = Friction;