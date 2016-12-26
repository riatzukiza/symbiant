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
  /* combine eval.sibilant:24:0 */

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
  /* add-mixing-layer eval.sibilant:44:0 */

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
  /* decay eval.sibilant:62:0 */

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
const RunIndexPoint = { 
  symbol:Symbol("RunIndexPoint"),
  init( array = this.array,start = this.start,end = this.end ){ 
    
      this.array = array;this.start = start;this.end = end;
      return this;
    
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
      return this;
    
   }
 };
const Pheremones = { 
  symbol:Symbol("Pheremones"),
  init( color = this.color,decay = this.decay,weights = this.weights,layer = this.layer,decaying = (new Map()),cache = (new Map()) ){ 
    
      this.color = color;this.decay = decay;this.weights = weights;this.layer = layer;this.decaying = decaying;this.cache = cache;
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
          var while$21 = undefined;
          while ((t < debt && !(w === 0))) {
            while$21 = (function() {
              ++(t);
              return w = decay(coord, w, rate);
            }).call(this);
          };
          return while$21;
        }).call(this);
        return (function() {
          if (w < 1) {
            this.decaying.set(coord, now);
            let k = ("" + w + i + j + rate);
            let newWeight = 0;
            (function() {
              if (this.cache.has(k)) {
                return newWeight = this.cache.get(k);
              } else {
                newWeight = (w + (rate / (1 + Math.pow(euclidianDistance(x, y, pos.x, pos.y), 2))));
                return this.cache.set(k, newWeight);
              }
            }).call(this);
            return weights.set(x, y, newWeight);
          }
        }).call(this);
      
      }, r);
    
   }
 };
exports.Pheremones = Pheremones;