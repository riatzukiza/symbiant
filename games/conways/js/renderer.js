const { 
  create,
  extend,
  mixin
 } = require("./util");
const { 
  Matrix
 } = require("./matrix");
const $ = require("jquery/dist/jquery.min.js");
var randomBit = (function randomBit$() {
  /* random-bit deps.sibilant:61:8 */

  return Math.round(Math.random());
});
let canvas = document.getElementById("game");
let ctx = canvas.getContext("2d");
var drawDead = (function drawDead$(size = this.size, x = this.x, y = this.y, ctx = this.ctx) {
  /* draw-dead deps.sibilant:61:8 */

  return ctx.strokeRect((size * x), (size * y), size, size);
});
var drawLive = (function drawLive$(size = this.size, x = this.x, y = this.y, ctx = this.ctx) {
  /* draw-live deps.sibilant:61:8 */

  return ctx.fillRect((size * x), (y * size), size, size);
});
let min = parseInt($("#r-min").val(), 10);
let max = parseInt($("#r-max").val(), 10);
let kernel = create(Matrix)([ 1, 1, 1, 1, 0, 1, 1, 1, 1 ], 3, 3);
var allZero = (function allZero$(w, h) {
  /* all-zero eval.sibilant:37:0 */

  let r = create(Matrix)([], w, h);
  return r.dmap((function() {
    /* eval.sibilant:39:12 */
  
    return 0;
  }));
});
var allOnes = (function allOnes$(w, h) {
  /* all-ones eval.sibilant:41:0 */

  let r = create(Matrix)([], w, h);
  return r.dmap((function() {
    /* eval.sibilant:43:12 */
  
    return 1;
  }));
});
var allns = (function allns$(w, h, n) {
  /* allns eval.sibilant:44:0 */

  let r = create(Matrix)([], w, h);
  return r.dmap((function() {
    /* eval.sibilant:46:12 */
  
    return n;
  }));
});
var matrixCenter = (function matrixCenter$(width, height) {
  /* matrix-center eval.sibilant:49:0 */

  return Math.round((((width * height) - 1) / 2));
});
var mooreNeighborhood = (function mooreNeighborhood$(w = this.w, h = this.h, weight = 1, c = 0) {
  /* moore-neighborhood deps.sibilant:61:8 */

  let m = create(Matrix)([], w, h).dmap((function() {
    /* eval.sibilant:37:57 */
  
    return weight;
  }));
  m.array[matrixCenter(w, h)] = c;
  return m;
});
let live = 1;
let dead = 0;
var between = (function between$(a, b) {
  /* between eval.sibilant:62:0 */

  return (function(n) {
    /* eval.sibilant:63:2 */
  
    return (n >= a && n <= b);
  });
});
var rules = (function rules$(v, x, y, m) {
  /* rules eval.sibilant:67:0 */

  let neighbors = game.neighborhood.count(x, y, m);
  return (function() {
    if (v === live) {
      return (function() {
        if (between(min, max)(neighbors)) {
          return live;
        } else {
          return dead;
        }
      }).call(this);
    } else if (neighbors === max) {
      return live;
    }
  }).call(this);
});
var sigmoid = (function sigmoid$(t) {
  /* sigmoid eval.sibilant:79:0 */

  return (1 / (1 + Math.pow(Math.E, T)));
});
const Neighborhood = { 
  symbol:Symbol("Neighborhood"),
  init( width = this.width,height = this.height,weight = this.weight,kernel = mooreNeighborhood(width, height, weight) ){ 
    
      this.width = width;this.height = height;this.weight = weight;this.kernel = kernel;
      return this;
    
   },
  resize( w = this.w,h = this.h,weight = this.weight ){ 
    
      this.kernel = mooreNeighborhood(w, h, weight);
      this.width = w;
      this.height = h;
      return this.weight = weight;
    
   },
  sample( m = this.m,x = this.x,y = this.y,kernel = this.kernel ){ 
    
      var wr = ((kernel.width - 1) / 2),
          hr = ((kernel.height - 1) / 2),
          w = kernel.width,
          h = kernel.height;
      return m.submatrix((x - wr), (y - hr), w, h);
    
   },
  count( x = this.x,y = this.y,state = this.state,kernel = this.kernel ){ 
    
      var wr = ((kernel.width - 1) / 2),
          hr = ((kernel.height - 1) / 2),
          w = kernel.width,
          h = kernel.height;
      return state.convolveSub(kernel, (x - wr), (y - hr));
    
   }
 };
const Game = { 
  symbol:Symbol("Game"),
  init( width = $("#width").val(),height = $("#height").val(),cellSize = $("#cell-size").val(),state = this.randomize(),transition = create(Matrix)([], height, width).dmap((function() {
    /* eval.sibilant:36:57 */
  
    return 0;
  })),running = false,neighborhood = create(Neighborhood)($("#n-width").val(), $("#n-height").val(), $("#n-weight").val()),living = 0,generation = 0 ){ 
    
      this.width = width;this.height = height;this.cellSize = cellSize;this.state = state;this.transition = transition;this.running = running;this.neighborhood = neighborhood;this.living = living;this.generation = generation;
      return this;
    
   },
  randomize( width = this.width,height = this.height ){ 
    
      "create a random board configuration, stops the simulation if its running.";
      console.log("neighborhood", this.neighborhood);
      this.stop();
      var r = create(Matrix)([], width, height),
          setRandomState = () => {
      	
        let value = Math.round(Math.random());
        (function() {
          if (value === live) {
            return ++(this.living);
          }
        }).call(this);
        return value;
      
      };
      this.living = 0;
      this.generation = 0;
      return this.state = r.dmap(setRandomState);
    
   },
  transform( rules = this.rules,state = this.state,transition = this.transition ){ 
    
      ++(this.generation);
      this.living = 0;
      this.state = state.transit(transition, (v, x, y, m) => {
      	
        let r = rules(v, x, y, m);
        (function() {
          if (r === live) {
            return ++(this.living);
          }
        }).call(this);
        return r;
      
      });
      return this.transition = state;
    
   },
  start(  ){ 
    
      this.running = true;
      return $("#toggle").html("stop");
    
   },
  stop(  ){ 
    
      this.running = false;
      return $("#toggle").html("start");
    
   },
  toggle( running = this.running ){ 
    
      this.running = !(running);
      return $("#toggle").html((this.running) ? "stop" : "start");
    
   },
  resize( w = this.w,h = this.h,c = this.c ){ 
    
      this.stop();
      return Game.init.call(this, w, h, c);
    
   },
  toggleCell( x = this.x,y = this.y,state = this.state ){ 
    
      this.stop();
      let cell = state.getCell(x, y);
      return (function() {
        if (cell === live) {
          return state.setCell(x, y, dead);
        } else {
          return state.setCell(x, y, live);
        }
      }).call(this);
    
   },
  draw( state = this.state,cellSize = this.cellSize ){ 
    
      return state.each((v, x, y, m) => {
      	
        return (function() {
          if (v === 1) {
            return drawLive(cellSize, x, y, ctx);
          } else {
            return drawDead(cellSize, x, y, ctx);
          }
        }).call(this);
      
      });
    
   }
 };
let game = create(Game)();
var draw = (function draw$() {
  /* draw eval.sibilant:187:0 */

  ctx.clearRect(0, 0, canvas.height, canvas.width);
  (function() {
    if (game.running) {
      return game.transform(rules);
    }
  }).call(this);
  game.draw();
  $("#live-cells").text(game.living);
  $("#generations").text(game.generation);
  return window.requestAnimationFrame(draw);
});
$(canvas).click((function(e) {
  /* eval.sibilant:11:22 */

  console.log("clicked", canvas);
  return game.toggleCell(Math.floor(((e.pageX - canvas.offsetLeft) / game.cellSize)), Math.floor(((e.pageY - canvas.offsetTop) / game.cellSize)));
}));
$("#toggle").click((function(e) {
  /* eval.sibilant:11:22 */

  console.log("clicked", "#toggle");
  return game.toggle();
}));
$("#randomize").click((function(e) {
  /* eval.sibilant:11:22 */

  console.log("clicked", "#randomize");
  return game.randomize();
}));
$("#resize").click((function(e) {
  /* eval.sibilant:11:22 */

  console.log("clicked", "#resize");
  game.resize($("#width").val(), $("#height").val(), $("#cell-size").val());
  return game.randomize();
}));
$("#n-resize").click((function(e) {
  /* eval.sibilant:11:22 */

  console.log("clicked", "#n-resize");
  game.neighborhood.resize(parseInt($("#n-width").val(), 10), parseInt($("#n-height").val(), 10), parseFloat($("#n-weight").val(), 10));
  return game.randomize();
}));
$("#change-rules").click((function(e) {
  /* eval.sibilant:11:22 */

  console.log("clicked", "#change-rules");
  min = parseFloat($("#r-min").val(), 10);
  max = parseFloat($("#r-max").val(), 10);
  return game.randomize();
}));
window.requestAnimationFrame(draw);
game.randomize();
game.start();