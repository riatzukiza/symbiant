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
var isCollision = false;
var isWin = false;
var isLoose = false;
const collisionSynth = (new Tone.Synth()).toDestination();
const looseSynth = (new Tone.Synth()).toDestination();
const winSynth = (new Tone.Synth()).toDestination();
const winLoop = (new Tone.Loop((time) => {
	
  return (function() {
    if (isWin) {
      winSynth.triggerAttackRelease("C4", "32n", time);
      return isWin = false;
    }
  }).call(this);

}, "64n")).start(0);
const looseLoop = (new Tone.Loop((time) => {
	
  alert("This is supose to go off when people loose");
  return (function() {
    if (isLoose) {
      looseSynth.triggerAttackRelease("B4", "32n", time);
      return isLoose = false;
    }
  }).call(this);

}, "64n")).start("8n");
const collisionLoop = (new Tone.Loop((time) => {
	
  return (function() {
    if (isCollision) {
      collisionSynth.triggerAttackRelease("A4", "32n", time);
      return isCollision = false;
    }
  }).call(this);

}, "64n")).start("16n");
Tone.Transport.start();
Tone.Transport.bpm(800, 10);
game.events.on("loose", () => {
	
  return isLoose = true;

});
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
      isWin = true;
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
      isWin = true;
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
      isCollision = true;
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