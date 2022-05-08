var { 
  Game
 } = require("sibilant-game-engine/client/game"),
    { 
  Rendering
 } = require("sibilant-game-engine/client/systems/rendering/rendering"),
    { 
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
  Scalar
 } = require("sibilant-game-engine/client/math/scalar"),
    { 
  Component,
  System
 } = require("sibilant-game-engine/client/ecs/component"),
    noise = require("./noise"),
    Vector = require("./vector"),
    { 
  createVectorField,
  updateParticle
 } = require("./field"),
    { 
  List
 } = require("sibilant-game-engine/client/data-structures/list"),
    { 
  Collision
 } = require("sibilant-game-engine/client/systems/collision"),
    { 
  TreeMap
 } = require("tree-kit"),
    { 
  SignalField
 } = require("./forces/signal-field"),
    { 
  Friction
 } = require("./forces/friction"),
    config = require("./config");
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
const ants = [];
var spawnAnt = (function spawnAnt$(x_y$6, home, startingLife) {
  /* spawn-ant eval.sibilant:62:0 */

  var x = x_y$6[0],
      y = x_y$6[1];

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
    /* eval.sibilant:33:8 */
  
    let rand = ((Math.random() * (config.spawnStatic - 0)) + 0);
    return (config.spawnStatic - (rand / 2));
  }).call(this), (function() {
    /* eval.sibilant:33:8 */
  
    let rand = ((Math.random() * (config.spawnStatic - 0)) + 0);
    return (config.spawnStatic - (rand / 2));
  }).call(this) ]);
  return ant;
});
var number = 1;
var nextSpawn = () => {
	
  return (function() {
    if (!(ants.length >= config.antLimit)) {
      spawnAnt([ homePos.x, homePos.y ], home);
      return setTimeout(nextSpawn, config.spawnRate);
    }
  }).call(this);

};
exports.home = home;
exports.homePos = homePos;
exports.nextSpawn = nextSpawn;
nextSpawn();