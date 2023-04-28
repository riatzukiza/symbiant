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
const collisionSynth = (new Tone.FMSynth()).toDestination();
const looseSynth = (new Tone.FMSynth()).toDestination();
const winSynth = (new Tone.FMSynth()).toDestination();
const winLoop = (new Tone.Loop((time) => {
	
  return (function() {
    if (isWin) {
      winSynth.triggerAttackRelease("C4", "32n", time);
      return isWin = false;
    }
  }).call(this);

}, "64n")).start(0);
const looseLoop = (new Tone.Loop((time) => {
	
  return (function() {
    if (isLoose) {
      looseSynth.triggerAttackRelease("B3", "32n", time);
      return isLoose = false;
    }
  }).call(this);

}, "64n")).start("64n");
const collisionLoop = (new Tone.Loop((time) => {
	
  return (function() {
    if (isCollision) {
      collisionSynth.triggerAttackRelease("A2", "32n", time);
      return isCollision = false;
    }
  }).call(this);

}, "64n")).start("16n");
Tone.Transport.start();
Tone.Transport.bpm.rampTo(800, 100);
game.events.on("loose", () => {
	
  return isLoose = true;

});
game.events.on("collision", ([ c, c_, d ]) => {
	
  var cv = game.systems.get(Velocity, c.entity);
  var c_v = game.systems.get(Velocity, c_.entity);
  var cp = game.systems.get(Physics, c.entity);
  var c_p = game.systems.get(Physics, c_.entity);
  (function() {
    if (config.printCollisionEvent) {
      return console.log("collision event", c, c_, d, Collision.quads, { 
        home,
        homePos,
        target
       });
    }
  }).call(this);
  (function() {
    if (c.entity === c_.entity) {
      return (function() {
        if (config.printCollisionEvent) {
          return console.log("something thinks its colliding with its self");
        }
      }).call(this);
    } else if ((c.entity === home || c_.entity === home)) {
      return (function() {
        if (config.printCollisionEvent) {
          return console.log("something collided with home", c.entity, c_.entity);
        }
      }).call(this);
    } else if (((c.entity === home && c_.entity === target) || (c_.entity === home && c.entity === target))) {
      return (function() {
        if (config.printCollisionEvent) {
          return console.log("target colliding with spawn");
        }
      }).call(this);
    } else if (c.entity === target) {
      isWin = true;
      updateParticle(c_v, c_v.pos, SignalField.field, SignalField.layer, game.ticker.ticks, true, true, homePos);
      c_v.pos.x = homePos.x;
      c_v.pos.y = homePos.y;
      return (function() {
        if (!(config.collisionStatic === 0)) {
          return c_v.accelerate([ ((Math.random() * (config.collisionStatic - (-1 * config.collisionStatic))) + (-1 * config.collisionStatic)), ((Math.random() * (config.collisionStatic - (-1 * config.collisionStatic))) + (-1 * config.collisionStatic)) ]);
        }
      }).call(this);
    } else if (c_.entity === target) {
      isWin = true;
      (function() {
        if (config.printCollisionEvent) {
          return console.log("ant found target");
        }
      }).call(this);
      updateParticle(cv, cv.pos, SignalField.field, SignalField.layer, game.ticker.ticks, true, true, homePos);
      cv.pos.x = homePos.x;
      cv.pos.y = homePos.y;
      return (function() {
        if (!(config.collisionStatic === 0)) {
          return cv.accelerate([ ((Math.random() * (config.collisionStatic - (-1 * config.collisionStatic))) + (-1 * config.collisionStatic)), ((Math.random() * (config.collisionStatic - (-1 * config.collisionStatic))) + (-1 * config.collisionStatic)) ]);
        }
      }).call(this);
    } else if (!(((c.entity === home && c_.entity === home) || (c.entity === target && c_.entity === target)))) {
      (function() {
        if (config.printCollisionEvent) {
          return console.log("ant is colliding with another ant", c, c_);
        }
      }).call(this);
      isCollision = true;
      (function() {
        if (!(config.collisionStatic === 0)) {
          cv.accelerate([ (((Math.random() * (config.collisionStatic - (-1 * config.collisionStatic))) + (-1 * config.collisionStatic)) / c_p.mass), (((Math.random() * (config.collisionStatic - (-1 * config.collisionStatic))) + (-1 * config.collisionStatic)) / c_p.mass) ]);
          return c_v.accelerate([ (((Math.random() * (config.collisionStatic - (-1 * config.collisionStatic))) + (-1 * config.collisionStatic)) / cp.mass), (((Math.random() * (config.collisionStatic - (-1 * config.collisionStatic))) + (-1 * config.collisionStatic)) / cp.mass) ]);
        }
      }).call(this);
      var m = cp.mass;
      var m_ = c_p.mass;
      cv.xd = (((cv.xd * (m - m_)) + (2 * m_ * c_v.xd)) / (m + m_));
      cv.yd = (((cv.yd * (m - m_)) + (2 * m * m_)) / (m + m_));
      c_v.xd = (((c_v.xd * (m_ - m)) + (2 * m * cv.xd)) / (m_ + m));
      return c_v.yd = (((c_v.yd * (m_ - m)) + (2 * m * cv.yd)) / (m_ + m));
    }
  }).call(this);
  c_.colliding = false;
  return c.colliding = false;

});