var { 
  game
 } = require("./game"),
    { 
  Physics
 } = require("sibilant-game-engine/client/systems/physics"),
    { 
  Velocity
 } = require("sibilant-game-engine/client/systems/velocity"),
    { 
  home,
  homePos,
  target
 } = require("./entities");
game.events.on("collision", (([ c, c_, d ]) => {
	
  var cv = game.systems.get(Velocity, c.entity);
  var c_v = game.systems.get(Velocity, c_.entity);
  var cp = game.systems.get(Physics, c.entity);
  var c_p = game.systems.get(Physics, c_.entity);
  return (function() {
    if (((c.entity === home && c_.entity === target) || (c_.entity === home && c.entity === target))) {
      return console.log("target colliding with spawn");
    } else if (c.entity === target) {
      c.colliding = false;
      c_.colliding = false;
      var hpos = game.systems.get(Position, home);
      c_v.pos.x = hpos.x;
      c_v.pos.y = hpos.y;
      updateParticle(c_v, c_v.pos, SignalField.field, SignalField.layer, game.ticker.ticks, true, true, homePos);
      return c_v.accelerate([ (function() {
        /* eval.sibilant:20:8 */
      
        var rand = ((Math.random() * (config.collisionStatic - 0)) + 0);
        return (config.collisionStatic - (rand * 2));
      }).call(this), (function() {
        /* eval.sibilant:20:8 */
      
        var rand = ((Math.random() * (config.collisionStatic - 0)) + 0);
        return (config.collisionStatic - (rand * 2));
      }).call(this) ]);
    } else if (c_.entity === target) {
      c.colliding = false;
      c_.colliding = false;
      var hpos = game.systems.get(Position, home);
      cv.pos.x = hpos.x;
      cv.pos.y = hpos.y;
      updateParticle(cv, cv.pos, SignalField.field, SignalField.layer, game.ticker.ticks, true, true, homePos);
      return cv.accelerate([ (function() {
        /* eval.sibilant:20:8 */
      
        var rand = ((Math.random() * (config.collisionStatic - 0)) + 0);
        return (config.collisionStatic - (rand * 2));
      }).call(this), (function() {
        /* eval.sibilant:20:8 */
      
        var rand = ((Math.random() * (config.collisionStatic - 0)) + 0);
        return (config.collisionStatic - (rand * 2));
      }).call(this) ]);
    } else if (!((c.entity === home || c_.entity === home || c.entity === target || c_.entity === target))) {
      c.colliding = false;
      c_.colliding = false;
      cv.accelerate([ (function() {
        /* eval.sibilant:20:8 */
      
        var rand = ((Math.random() * (config.collisionStatic - 0)) + 0);
        return (config.collisionStatic - (rand * 2));
      }).call(this), (function() {
        /* eval.sibilant:20:8 */
      
        var rand = ((Math.random() * (config.collisionStatic - 0)) + 0);
        return (config.collisionStatic - (rand * 2));
      }).call(this) ]);
      return c_v.accelerate([ (function() {
        /* eval.sibilant:20:8 */
      
        var rand = ((Math.random() * (config.collisionStatic - 0)) + 0);
        return (config.collisionStatic - (rand * 2));
      }).call(this), (function() {
        /* eval.sibilant:20:8 */
      
        var rand = ((Math.random() * (config.collisionStatic - 0)) + 0);
        return (config.collisionStatic - (rand * 2));
      }).call(this) ]);
    }
  }).call(this);

})).once("error", ((err) => {
	
  console.log("error on", "collision", "of", "game.events", "given", "[ c, c_, d ]()");
  return console.log(err);

}));