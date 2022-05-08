var R = require("ramda");
var { 
  create,
  extend,
  mixin,
  conditional,
  cond,
  partiallyApplyAfter
 } = require("@kit-js/core/js/util");
var { 
  Dot
 } = require("sibilant-game-engine/client/systems/rendering/dot"),
    { 
  Position
 } = require("sibilant-game-engine/client/systems/position"),
    { 
  Velocity
 } = require("sibilant-game-engine/client/systems/velocity"),
    { 
  Physics
 } = require("sibilant-game-engine/client/systems/physics"),
    { 
  Component,
  System
 } = require("sibilant-game-engine/client/ecs/component"),
    { 
  Collision
 } = require("sibilant-game-engine/client/systems/collision"),
    { 
  SignalField
 } = require("./forces/signal-field"),
    { 
  Friction
 } = require("./forces/friction"),
    { 
  game,
  activeGameSystems
 } = require("./game"),
    { 
  TreeMap
 } = require("tree-kit"),
    config = require("./config");
TreeMap.get = (function TreeMap$get$(...args) {
  /* Tree-map.get eval.sibilant:26:0 */

  return this.find(...args).value;
});
var memoize = (function memoize$(f) {
  /* memoize eval.sibilant:29:0 */

  var cache = create(TreeMap)();
  return ((...args) => {
  	
    return (function() {
      if (cache.has(args)) {
        return cache.get(args);
      } else {
        return (function(value) {
          /* node_modules/kit/inc/scope.sibilant:12:9 */
        
          cache.set(args, value);
          return value;
        })((function() {
          /* node_modules/kit/inc/macros.sibilant:30:25 */
        
          return f(...args);
        }).call(this));
      }
    }).call(this);
  
  });
});
var rgba = memoize(((r, g, b, a) => {
	
  return { 
    r,
    g,
    b,
    a
   };

}));
var entity = (function entity$(aspects) {
  /* entity eval.sibilant:36:0 */

  return game.ent.spawn(aspects);
});
var home = entity([ Dot, Position, Physics, Collision ]);
var homePos = game.systems.get(Position, home);
game.systems.get(Dot, home).color = rgba(0, 255, 0, 255);
game.systems.get(Position, home).x = (Math.floor((Math.random() * (config.dimensions[0] - 1))) + 1);
game.systems.get(Position, home).y = (Math.floor((Math.random() * (config.dimensions[1] - 1))) + 1);
game.systems.get(Position, home).z = 1;
game.systems.get(Physics, home).scale = 30;
game.systems.get(Physics, home).mass = 1;
game.systems.get(Physics, home).forces = [];
var target = entity([ Dot, Position, Physics, Collision, Velocity ]);
game.systems.get(Dot, target).color = rgba(0, 0, 255, 255);
game.systems.get(Position, target).x = (Math.floor((Math.random() * (config.dimensions[0] - 1))) + 1);
game.systems.get(Position, target).y = (Math.floor((Math.random() * (config.dimensions[1] - 1))) + 1);
game.systems.get(Position, target).z = 1;
game.systems.get(Physics, target).scale = 40;
game.systems.get(Physics, target).mass = 10000;
game.systems.get(Physics, target).forces = [ Friction ];
const ants=[];
var spawnAnt = (function spawnAnt$(x_y$2, home, startingLife) {
  /* spawn-ant eval.sibilant:79:0 */

  var x = x_y$2[0],
      y = x_y$2[1];

  var ant = entity(activeGameSystems);
  ants.push(ant);
  console.log(ant);
  game.systems.get(Dot, ant).color = rgba(255, 0, 0, 255);
  game.systems.get(Position, ant).x = x;
  game.systems.get(Position, ant).y = y;
  game.systems.get(Position, ant).z = 1;
  game.systems.get(Physics, ant).scale = 10;
  game.systems.get(Physics, ant).mass = 1;
  game.systems.get(Physics, ant).forces = [ SignalField, Friction ];
  var v = game.systems.get(Velocity, ant);
  v.accelerate([ (function() {
    /* eval.sibilant:20:8 */
  
    var rand = ((Math.random() * (config.spawnStatic - 0)) + 0);
    return (config.spawnStatic - (rand * 2));
  }).call(this), (function() {
    /* eval.sibilant:20:8 */
  
    var rand = ((Math.random() * (config.spawnStatic - 0)) + 0);
    return (config.spawnStatic - (rand * 2));
  }).call(this) ]);
  return ant;
});
var number = 1;
var nextSpawn = (() => {
	
  return (function() {
    if (!(ants.length >= config.antLimit)) {
      spawnAnt([ homePos.x, homePos.y ], home);
      return setTimeout(nextSpawn, config.spawnRate);
    }
  }).call(this);

});
exports.target = target;
exports.home = home;
exports.homePos = homePos;
exports.nextSpawn = nextSpawn;