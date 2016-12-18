const { 
  euclidianDistance
 } = require("./math");
const { 
  create,
  extend,
  mixin
 } = require("./util");
const $ = require("jquery/dist/jquery.min.js");
const fs = require("browserify-fs");
const { 
  Matrix
 } = require("./matrix");
const { 
  StateSpace
 } = require("./state-space");
const { 
  Simulation
 } = require("./simulation");
const { 
  Display
 } = require("./display");
const { 
  Layer
 } = require("./layer");
const { 
  interface
 } = require("./interface");
const { 
  Pheremones
 } = require("./pheremons");
const { 
  Entity
 } = require("./entity");
const { 
  Colony,
  Ant,
  eachWeight,
  mapWeights
 } = require("./ant");
let empty = Entity.empty;
let socket = io("/ants");
let canvas = document.getElementById("game");
let canvasb = document.getElementById("game");
let ctx = canvas.getContext("2d");
ctx.scale(5, 5);
let display = create(Display)(120, 120, 5, canvas, canvasb);
let sim = create(Simulation)(display, 60, false);
let george = {
  x: 20,
  y: 20
};
let white = { 
  red:255,
  green:255,
  blue:255
 };
let green = { 
  red:0,
  green:255,
  blue:0
 };
const Goal = { 
  symbol:Symbol("Goal"),
  deviance:1,
  pool:Matrix,
  id:3,
  init( x = this.x,y = this.y ){ 
    
      this.x = x;this.y = y;
      return this;
    
   },
  spawn( x = this.x,y = this.y,goals = this.goals,collision = this.collision ){ 
    
      let ent = collision.get(x, y);
      return (function() {
        if ((!(ent) || ent === empty || ent === 0)) {
          display.set(x, y, green);
          let goal = Goal.pool.getCell(x, y);
          goals.add(goal);
          return collision.set(x, y, goal);
        }
      }).call(this);
    
   }
 };
Goal.pool = create(Matrix)([], 120, 120).dmap((function(nil, x, y) {
  /* eval.sibilant:81:15 */

  return create(Goal)(x, y);
}));
// for (let time = 0;time < 100;++(time)){
// Ant.spawn(60, 60, georges, sim, 2, 1, -0.2, white)};
var start = (function start$(sim) {
  /* start eval.sibilant:93:0 */

  let goals = (new Set());
  var randomGoal = (function randomGoal$() {
    /* random-goal eval.sibilant:98:2 */
  
    return Goal.spawn((Math.floor((Math.random() * (sim.collision.height - 0))) + 0), (Math.floor((Math.random() * (sim.collision.height - 0))) + 0), goals, sim.collision);
  });
  for (let time = 0;time < 1000;++(time)){
  randomGoal()};
  console.log("sim", sim);
  Colony.display = sim.display;
  Colony.collision = sim.collision;
  Colony.stats = sim.stats;
  Colony.ants = sim.ants;
  let reds = create(Colony)("reds", {
    x: 30,
    y: 60
  }, { 
    red:255,
    green:0,
    blue:155
   }, goals);
  let georges = create(Colony)("georges", {
    x: 100,
    y: 100
  }, { 
    red:0,
    green:0,
    blue:255
   }, reds.ants);
  // let georges = create(Colony)("georges", {
  //   x: 100,
  //   y: 100
  // }, { 
  //   red:0,
  //   green:0,
  //   blue:255
  //  }, reds.ants)// let yellers = create(Colony)("yellers", {
  //   x: 20,
  //   y: 20
  // }, yellow, goals)// let antiGeorges = create(Colony)("anti-georges", {
  //   x: 100,
  //   y: 30
  // }, { 
  //   red:30,
  //   green:236,
  //   blue:231
  //  }, georges.ants)// let antiYellers = create(Colony)("anti-yellers", {
  //   x: 46,
  //   y: 30
  // }, { 
  //   red:30,
  //   green:24,
  //   blue:45
  //  }, yellers.ants);
  interface(sim);
  let black = { 
    red:0,
    green:0,
    blue:0
   };
  reds.spawn(20);
  return sim.start().on("tick", (now, ticks) => {
  	
    
    display.clear(black, 120);
    (function() {
      if ((ticks % Math.round((10000 * Math.random() * Math.sin(ticks)))) === 0) {
        return goals.each((goal) => {
        	
          return (function() {
            if (Math.round(Math.random()) === 1) {
              return requestAnimationFrame(() => {
              	
                return Goal.spawn((goal.x + (Math.floor((Math.random() * (2 - -2))) + -2)), (goal.y + (Math.floor((Math.random() * (2 - -2))) + -2)), goals, sim.collision);
              
              }, 0);
            }
          }).call(this);
        
        });
      }
    }).call(this);
    for (let time = 0;time < 2;++(time)){
    Colony.colonies.each((colony) => {
    	
      colony.move();
      colony.weights.update();
      return Pheremones.update(colony.weights, colony.display, colony.decay, colony.color);
    
    })};
    goals.each((goal) => {
    	
      return display.set(goal.x, goal.y, green);
    
    });
    sim.collision.update();
    display.render();
    return display.update();
  
  });
});
let yellow = {
  red: 255,
  green: 255,
  blue: 0
};
sim.load(start);
socket.on("change", () => {
	
  console.log("change ");
  return location.reload();

});