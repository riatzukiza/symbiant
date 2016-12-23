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
let socket = io("/ants");
let sim = create(Simulation)(120, 120, 5);
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
function eachInArea( matrix = this.matrix,pos = this.pos,f = this.f,size = 3,rad = Math.floor((size / 2)) ){ 
  
    "apply a function to every element in a kernel of the weight matrix.\n" +
    "Values are not changed unless done so explicitly by the function as a side effect.";
    return matrix.eachInSub((pos.x - rad), (pos.y - rad), size, size, (v, i, j, x, y) => {
    	
      return f(v, i, j, (x + i), (y + j));
    
    });
  
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
  Ant
 } = require("./entities/ant");
Entity.empty = empty;
const Colony = extend(EntityGroup, { 
  symbol:Symbol("Colony"),
  colonies:(new Set()),
  entityType:Ant,
  init( nest = this.nest,color = this.color,goals = this.goals,decay = 0.1,colonies = this.colonies,weights = create(StateSpace)(sim.width, sim.width) ){ 
    
      this.nest = nest;this.color = color;this.goals = goals;this.decay = decay;this.colonies = colonies;this.weights = weights;
      EntityGroup.init.call(this);
      weights.layer = sim.layers.get();
      weights.each((w, x, y) => {
      	
        return weights.layer.add({ 
          x,
          y,
          get weight(  ){ 
            
              return weights.get(x, y);
            
           },
          get color(  ){ 
            
              return (function() {
                if (this.weight >= 0) {
                  return color;
                } else {
                  return complement(color);
                }
              }).call(this);
            
           },
          get r(  ){ 
            
              return this.color.red;
            
           },
          get g(  ){ 
            
              return this.color.green;
            
           },
          get b(  ){ 
            
              return this.color.blue;
            
           },
          get a(  ){ 
            
              return Math.abs((160 * this.weight));
            
           }
         });
      
      });
      weights.layer.moveUp();
      colonies.add(this);
      return this;
    
   },
  spawn( color = this.color,entityType = this.entityType ){ 
    
      let rx = (Math.round(Math.random()) === 1) ? 1 : -1;
      let ry = (Math.round(Math.random()) === 1) ? 1 : -1;
      let ent = entityType.spawn((this.nest.x + Math.floor((Math.random() * ((30 - 0) + 0))) + rx), (this.nest.y + Math.floor((Math.random() * ((30 - 0) + 0))) + rx), color);
      (function() {
        if (ent) {
          ent.group = this;
          this.add(ent);
          ent.nest = this.nest;
          return ent;
        }
      }).call(this);
      return this;
    
   },
  serialize( ants = this.ants ){ 
    
      return ants.toArray().map((ant) => {
      	
        return ant.serialize();
      
      });
    
   },
  update( entities = this.entities,weights = this.weights,decay = this.decay ){ 
    
      "Process the movement of ever ant in a set of ants, updating weights along the way.";
      this.each((ant) => {
      	
        return ant.update();
      
      });
      return (function() {
        if (this.entities.size === 0) {
          return this.colonies.delete(this);
        } else {
          return Pheremones.update(this.weights, 0.1);
        }
      }).call(this);
    
   }
 });
const Plant = extend(Entity, { 
  symbol:Symbol("Plant"),
  color:green,
  life:200,
  update( pos = this.pos,system = this.system ){ 
    
      return (function() {
        if (Math.round(Math.random()) === 1) {
          var rx = (Math.round(Math.random()) === 1) ? 1 : -1;
          var ry = (Math.round(Math.random()) === 1) ? 1 : -1;
          return requestAnimationFrame(() => {
          	
            return this.group.spawn((pos.x + Math.floor((Math.random() * ((2 - 0) + 0))) + rx), (pos.y + Math.floor((Math.random() * ((2 - 0) + 0))) + ry), this.color);
          
          });
        }
      }).call(this);
    
   }
 });
const PlantGroup = extend(EntityGroup, { 
  symbol:Symbol("PlantGroup"),
  entityType:Plant
 });
Map.prototype.each = (function Map$prototype$each$(f) {
  /* Map.prototype.each eval.sibilant:190:0 */

  this.forEach(f);
  return this;
});
var start = (function start$(sim) {
  /* start eval.sibilant:192:0 */

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
  for (let time = 0;time < 100;++(time)){
  reds.spawn()};
  for (let time = 0;time < 1000;++(time)){
  plants.random()};
  interface(sim);
  return sim.start().on("tick", (now, ticks) => {
  	
    (function() {
      if ((ticks % 5) === 0) {
        return plants.update();
      }
    }).call(this);
    for (let time = 0;time < 2;++(time)){
    Colony.colonies.each((col) => {
    	
      return col.update();
    
    })};
    return sim.layers.update().render();
  
  });
});
let yellow = {
  red: 255,
  green: 255,
  blue: 0
};
let canvas = sim.layers.canvas;
let context = $("#container");
var interface = (function interface$(sim) {
  /* interface eval.sibilant:217:0 */

  canvas.onselectstart = () => {
  	
    return false;
  
  };
  let interfaceContainer = (function(context) {
    /* macros/jquery.sibilant:14:9 */
  
    var here = $("<div>", {  });
    context.append(here);
    context = here;
    let colonies = (function(context) {
      /* macros/jquery.sibilant:14:9 */
    
      var here = $("<div>", {
        class: "panel",
        id: "colonies"
      });
      context.append(here);
      context = here;
      let heading = (function(context) {
        /* macros/jquery.sibilant:14:9 */
      
        var here = $("<b>", {
          text: "colonies",
          class: "bordered"
        });
        context.append(here);
        context = here;
        return here;
      })(context);
      ;
      (function() {
        /* eval.sibilant:7:24 */
      
        var table = $("<table>");
        let headerRow = $("<tr>");
        headerRow.append($("<th>").text("name"));
        headerRow.append($("<th>").text("numbers"));
        table.append(headerRow);
        Colony.colonies.each((c) => {
        	
          var row = $("<tr>");
          let name = (function() {
            /* eval.sibilant:27:50 */
          
            let colData = $("<td> ").text(c.name);
            row.append(colData);
            return colData;
          }).call(this);
          let numbers = (function() {
            /* eval.sibilant:27:50 */
          
            let colData = $("<td> ").text(c.entities.size);
            row.append(colData);
            return colData;
          }).call(this);
          table.append(row);
          name.css("color", ("rgb(" + [ c.color.red, c.color.green, c.color.blue ].join(",") + ")"));
          return sim.on("tick", () => {
          	
            return numbers.text(c.entities.size);
          
          });
        
        });
        return here.append(table);
      }).call(this);
      return here;
    })(context);
    ;
    return here;
  })(context);
  ;
  return context;
});
sim.load(start);
socket.on("change", () => {
	
  console.log("change ");
  return location.reload();

});