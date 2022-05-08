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
  Collision
 } = require("sibilant-game-engine/client/systems/collision"),
    { 
  home,
  homePos,
  target
 } = require("./entities"),
    { 
  updateParticle
 } = require("./field"),
    { 
  SignalField
 } = require("./forces/signal-field"),
    Tone = require("tone"),
    config = require("./config");
const synth = (new Tone.Synth()).toDestination();
game.events.on("collision", ([ c, c_, d ]) => {
	
  var cv = game.systems.get(Velocity, c.entity);
  var c_v = game.systems.get(Velocity, c_.entity);
  var cp = game.systems.get(Physics, c.entity);
  var c_p = game.systems.get(Physics, c_.entity);
  console.log("collision event", c, c_, d, Collision.quads, { 
    home,
    homePos,
    target
   });
  (function() {
    if (c.entity === c_.entity) {
      return console.log("something thinks its colliding with its self");
    } else if ((c.entity === home || c_.entity === home)) {
      return console.log("something collided with home", c.entity, c_.entity);
    } else if (((c.entity === home && c_.entity === target) || (c_.entity === home && c.entity === target))) {
      return console.log("target colliding with spawn");
    } else if (c.entity === target) {
      synth.triggerAttackRelease("C4", "4n");
      updateParticle(c_v, c_v.pos, SignalField.field, SignalField.layer, game.ticker.ticks, true, true, homePos);
      c_v.pos.x = homePos.x;
      c_v.pos.y = homePos.y;
      return c_v.accelerate([ (function() {
        /* eval.sibilant:33:8 */
      
        let rand = ((Math.random() * (config.collisionStatic - 0)) + 0);
        return (config.collisionStatic - (rand / 2));
      }).call(this), (function() {
        /* eval.sibilant:33:8 */
      
        let rand = ((Math.random() * (config.collisionStatic - 0)) + 0);
        return (config.collisionStatic - (rand / 2));
      }).call(this) ]);
    } else if (c_.entity === target) {
      synth.triggerAttackRelease("C4", "8n");
      console.log("ant found target");
      updateParticle(cv, cv.pos, SignalField.field, SignalField.layer, game.ticker.ticks, true, true, homePos);
      cv.pos.x = homePos.x;
      cv.pos.y = homePos.y;
      return cv.accelerate([ (function() {
        /* eval.sibilant:33:8 */
      
        let rand = ((Math.random() * (config.collisionStatic - 0)) + 0);
        return (config.collisionStatic - (rand / 2));
      }).call(this), (function() {
        /* eval.sibilant:33:8 */
      
        let rand = ((Math.random() * (config.collisionStatic - 0)) + 0);
        return (config.collisionStatic - (rand / 2));
      }).call(this) ]);
    } else if (!(((c.entity === home && c_.entity === home) || (c.entity === target && c_.entity === target)))) {
      console.log("ant is colliding with another ant", c, c_);
      synth.triggerAttackRelease("A3", "64n");
      cv.accelerate([ (function() {
        /* eval.sibilant:33:8 */
      
        let rand = ((Math.random() * (config.collisionStatic - 0)) + 0);
        return (config.collisionStatic - (rand / 2));
      }).call(this), (function() {
        /* eval.sibilant:33:8 */
      
        let rand = ((Math.random() * (config.collisionStatic - 0)) + 0);
        return (config.collisionStatic - (rand / 2));
      }).call(this) ]);
      return c_v.accelerate([ (function() {
        /* eval.sibilant:33:8 */
      
        let rand = ((Math.random() * (config.collisionStatic - 0)) + 0);
        return (config.collisionStatic - (rand / 2));
      }).call(this), (function() {
        /* eval.sibilant:33:8 */
      
        let rand = ((Math.random() * (config.collisionStatic - 0)) + 0);
        return (config.collisionStatic - (rand / 2));
      }).call(this) ]);
    }
  }).call(this);
  c_.colliding = false;
  return c.colliding = false;

});