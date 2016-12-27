const R = require("ramda");
const { 
  create,
  extend,
  mixin
 } = require("./util");
const { 
  StateSpace
 } = require("./state-space");
const { 
  euclidianDistance
 } = require("./math");
const { 
  Layer
 } = require("./layer");
const { 
  complement
 } = require("./color");
let colors = [];
function decayPositive( x,y,v,decay,color ){ 
  
    "brings a positive weight closer to zero, ";
    return (v - decay);
  
 };
var combine = (function combine$(old, addi) {
  /* combine eval.sibilant:26:0 */

  return Math.round((old + addi));
});
function decayNegative( x,y,v,decay,color ){ 
  
    "brings a positive weight closer to zero, ";
    return (v + decay);
  
 };
function eachInArea( matrix = this.matrix,pos = this.pos,f = this.f,size = 3,rad = Math.floor((size / 2)) ){ 
  
    "apply a function to every element in a kernel of the weight matrix.\n" +
    "Values are not changed unless done so explicitly by the function as a side effect.";
    return matrix.eachInSub((pos.x - rad), (pos.y - rad), size, size, (v, i, j, x, y) => {
    	
      return f(v, i, j, (x + i), (y + j));
    
    });
  
 };
var addMixingLayer = (function addMixingLayer$(entity, weights, layer) {
  /* add-mixing-layer eval.sibilant:46:0 */

  weights.layer = layer;
  weights.each((w, x, y) => {
  	
    return layer.add({ 
      x,
      y,
      get weight(  ){ 
        
          return weights.get(x, y);
        
       },
      get color(  ){ 
        
          return (function() {
            if (this.weight >= 0) {
              return entity.color;
            } else {
              return complement(entity.color);
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
  return layer.moveUp();
});
var decay = (function decay$(coord, v, decay) {
  /* decay eval.sibilant:64:0 */

  let { 
    x,
    y
   } = coord;
  return (function() {
    if (decay < Math.abs(v)) {
      return (function() {
        if (v > 0) {
          return decayPositive(x, y, v, decay);
        } else if (v < 0) {
          return decayNegative(x, y, v, decay);
        }
      }).call(this);
    } else {
      return 0;
    }
  }).call(this);
});
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
          return this.end = i;
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
var memoize = (function memoize$(f) {
  /* memoize eval.sibilant:123:0 */

  let cache = (new Array(f.length)).map(() => {
  	
    return (new Map());
  
  });
  return (...args) => {
  	
    return (function() {
      {
        return cache.every((cache, i) => {
        	
          return cache.has(args[i]);
        
        });
      }
    }).call(this);
  
  };
});
const Pheremones = { 
  symbol:Symbol("Pheremones"),
  init( color = this.color,decay = this.decay,layer = this.layer,decaying = (new Map()),weights = create(StateSpace)(sim.width, sim.width) ){ 
    
      this.color = color;this.decay = decay;this.layer = layer;this.decaying = decaying;this.weights = weights;
      addMixingLayer(this, weights, layer);
      world.coord.each((pos, x, y) => {
      	
        return decaying.set(pos, sim.ticks);
      
      });
      return this;
    
   },
  emit( pos = this.pos,weights = this.weights,rate = this.rate,r = 5,decaying = this.decaying ){ 
    
      return eachInArea(weights.state, pos, (w, i, j, x, y) => {
      	
        let coord = world.coord.get(x, y);
        let lastTimeVisited = this.decaying.get(coord);
        let now = sim.ticks;
        let debt = (now - lastTimeVisited);
        let t = 0;
        (function() {
          var while$5 = undefined;
          while ((t < debt && !(w === 0))) {
            while$5 = (function() {
              ++(t);
              return w = decay(coord, w, rate);
            }).call(this);
          };
          return while$5;
        }).call(this);
        return (function() {
          if (w < 1) {
            this.decaying.set(coord, now);
            let newWeight = (w + (rate / (1 + Math.pow(euclidianDistance(x, y, pos.x, pos.y), 2))));
            return weights.set(x, y, newWeight);
          }
        }).call(this);
      
      }, r);
    
   }
 };
exports.Pheremones = Pheremones;