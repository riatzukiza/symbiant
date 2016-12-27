let socket = io("/ants");
socket.on("change", () => {
	
  console.log("change ");
  return location.reload();

});
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
  Pheremones
 } = require("./pheremons");
const { 
  complement
 } = require("./color");
const { 
  weightedRandomElement
 } = require("./random");
let george = {
  x: 20,
  y: 20
};
let sim = create(Simulation)(120, 120, 5);
global.sim = sim;
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
let black = { 
  red:0,
  green:0,
  blue:0
 };
let empty = { id: 0 };
let choice = {
  x: 60,
  y: 60
};
const { 
  Collision
 } = require("./systems/collision");
const { 
  World
 } = require("./systems/world");
const Rendering = { 
  symbol:Symbol("Rendering"),
  entities:sim.layers.get(),
  weights:[]
 };
global.world = create(World)(sim.coord, Rendering);
const { 
  Entity
 } = require("./ecs/entity");
const { 
  EntityGroup
 } = require("./ecs/group");
const { 
  Ant,
  Colony
 } = require("./entities/ant");
Entity.empty = empty;
const Plant = extend(Entity, { 
  symbol:Symbol("Plant"),
  color:green,
  life:200,
  update( pos = this.pos,system = this.system ){ 
    
      return (function() {
        if (Math.round(Math.random()) === 1) {
          var rx = (Math.round(Math.random()) === 1) ? 1 : -1;
          var ry = (Math.round(Math.random()) === 1) ? 1 : -1;
          return this.group.spawn((pos.x + Math.floor((Math.random() * ((2 - 0) + 0))) + rx), (pos.y + Math.floor((Math.random() * ((2 - 0) + 0))) + ry), this.color);
        }
      }).call(this);
    
   }
 });
const PlantGroup = extend(EntityGroup, { 
  symbol:Symbol("PlantGroup"),
  entityType:Plant
 });
Map.prototype.each = (function Map$prototype$each$(f) {
  /* Map.prototype.each eval.sibilant:136:0 */

  this.forEach(f);
  return this;
});
var start = (function start$(sim) {
  /* start eval.sibilant:138:0 */

  let plants = create(PlantGroup)();
  let reds = create(Colony)({
    x: 30,
    y: 60
  }, { 
    red:255,
    green:0,
    blue:0
   }, plants);
  global.sim = sim;
  for (let time = 0;time < 10;++(time)){
  reds.spawn()};
  for (let time = 0;time < 100;++(time)){
  plants.random()};
  return sim.start().on("tick", (now, ticks) => {
  	
    (function() {
      if ((ticks % 120) === 0) {
        return plants.update();
      }
    }).call(this);
    (function() {
      if ((ticks % 2) === 0) {
        return Colony.colonies.each((col) => {
        	
          return col.update();
        
        });
      }
    }).call(this);
    return sim.layers.update().render();
  
  });
});
let yellow = {
  red: 255,
  green: 255,
  blue: 0
};
const List = require("../../list");
const Run = { 
  symbol:Symbol("Run"),
  init( array = this.array,value = this.value,start = this.start,end = this.end,prev = this.prev ){ 
    
      this.array = array;this.value = value;this.start = start;this.end = end;this.prev = prev;
      (function() {
        if (prev) {
          return prev.next = this;
        }
      }).call(this);
      return this;
    
   },
  has( n = this.n ){ 
    
      return this.value === n === 0;
    
   },
  before__QUERY( i = this.i,start = this.start ){ 
    
      return i <= start;
    
   },
  after__QUERY( i = this.i,end = this.end ){ 
    
      return i >= end;
    
   },
  between__QUERY( i = this.i,start = this.start,end = this.end ){ 
    
      return (i >= start && i <= end);
    
   },
  each( callback = this.callback,start = this.start,end = this.end,array = this.array ){ 
    (function() {
      /* macros/js/index.sibilant:82:8 */
    
      let r = this;
      for (let i = start;start < end;++(i)){
      callback(array[i], i)};
      return r;
    }).call(this)
   }
 };
const RunIndexedArray = { 
  symbol:Symbol("RunIndexedArray"),
  init( array = this.array,indexes = [] ){ 
    
      this.array = array;this.indexes = indexes;
      let run = create(Run)(array, false, 0, 0, null, null);
      array.each((el, i) => {
      	
        return (function() {
          if (run.has(el)) {
            return run.end = i;
          } else {
            run = create(Run)(array, !(run.value), i, i, run);
            return indexes.push(run);
          }
        }).call(this);
      
      });
      return this;
    
   },
  push( v = this.v ){ 
    
   },
  pop( v = this.v ){ 
    
   },
  search( i = this.i,left = 0,right = (indexes.length - 1),m = Math.floor(((left + right) / 2)) ){ 
    
      let t = indexes[m];
      return (function() {
        if (t.after__QUERY(i)) {
          return this.search(i, left, right = (m - 1));
        } else if (t.before__QUERY(i)) {
          return this.search(i, left = (m + 1), right);
        } else if (t.between__QUERY(i)) {
          return t;
        } else {
          throw (new Error("this is not supose to happen, binary search failed fataly"))
        }
      }).call(this);
    
   },
  set( i = this.i,v = this.v,array = this.array ){ 
    
      let t = search(this, i);
      array[i] = v;
      return (function() {
        if (t.has(v)) {
          return (function() {
            if (i === t.prev.end) {
              --(t.prev.end);
              return --(t.start);
            } else if (i === t.next.start) {
              ++(t.next.start);
              return ++(t.start);
            }
          }).call(this);
        } else {
          let run = create(Run)(array, v === 0, i, i, this);
          return prev.end = (i - 1);
        }
      }).call(this);
    
   },
  get( i = this.i ){ 
    
   },
  each( f = this.f,indexes = this.indexes ){ 
    
      indexes.each((run) => {
      	
        return (function() {
          if (run.value) {
            return run.each(f);
          }
        }).call(this);
      
      });
      return this;
    
   },
  map( f = this.f,indexes = this.indexes ){ 
    
   }
 };