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
let sim = create(Simulation)(display, 30, false);
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
  /* eval.sibilant:77:15 */

  return create(Goal)(x, y);
}));
// for (let time = 0;time < 100;++(time)){
// Ant.spawn(60, 60, georges, sim, 2, 1, -0.2, white)};
var start = (function start$(sim) {
  /* start eval.sibilant:89:0 */

  let goals = (new Set());
  var randomGoal = (function randomGoal$() {
    /* random-goal eval.sibilant:94:2 */
  
    return Goal.spawn((Math.floor((Math.random() * (sim.collision.height - 0))) + 0), (Math.floor((Math.random() * (sim.collision.height - 0))) + 0), goals, sim.collision);
  });
  // for (let time = 0;time < 1000;++(time)){
  // randomGoal()};
  console.log("sim", sim);
  Colony.display = sim.display;
  Colony.collision = sim.collision;
  Colony.stats = sim.stats;
  Colony.ants = sim.ants;
  let antiSet = (new Set());
  let yellers = create(Colony)({
    x: 20,
    y: 20
  }, yellow, antiSet);
  let reds = create(Colony)({
    x: 30,
    y: 60
  }, { 
    red:255,
    green:0,
    blue:155
   }, yellers.ants);
  let georges = create(Colony)({
    x: 100,
    y: 100
  }, { 
    red:0,
    green:0,
    blue:255
   }, reds.ants);
  let antiGeorges = create(Colony)({
    x: 100,
    y: 30
  }, { 
    red:30,
    green:236,
    blue:231
   }, georges.ants, antiSet);
  let ultraPred = create(Colony)({
    x: 10,
    y: 40
  }, { 
    red:30,
    green:200,
    blue:231
   }, goals.union(reds.ants).union(yellers.ants).union(antiGeorges.ants));
  interface(sim);
  let black = { 
    red:0,
    green:0,
    blue:0
   };
  return sim.start().on("tick", (now, ticks) => {
  	
    reds.spawn(2);
    yellers.spawn(2);
    georges.spawn(2);
    antiGeorges.spawn(2);
    
    (function() {
      if ((ticks % Math.round((1000 * Math.random() * Math.sin(ticks)))) === 0) {
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
    [ reds, yellers, georges, antiGeorges ].each((colony) => {
    	
      colony.weights.update();
      return Pheremones.update(colony.weights, colony.display, colony.decay, colony.color);
    
    });
    sim.collision.each((v, x, y) => {
    	
      color = display.getTransition(x, y);
      color.red = Math.round((color.red / 4));
      color.green = Math.round((color.green / 4));
      color.blue = Math.round((color.blue / 4));
      color.alpha = Math.round((color.alpha / 4));
      return display.set(x, y, color);
    
    });
    for (let time = 0;time < 2;++(time)){
    reds.move();
    yellers.move();
    georges.move();
    antiGeorges.move()};
    display.set(sim.nest.x, sim.nest.y, yellow);
    display.set(georges.nest.x, georges.nest.y, yellow);
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