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
  /* add-mixing-layer eval.sibilant:43:0 */

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
const Pheremones = { 
  symbol:Symbol("Pheremones"),
  init( color = this.color,decay = this.decay,weights = this.weights,layer = this.layer,decaying = (new Set()) ){ 
    
      this.color = color;this.decay = decay;this.weights = weights;this.layer = layer;this.decaying = decaying;
      addMixingLayer(this, weights, layer);
      return this;
    
   },
  emit( pos = this.pos,weights = this.weights,rate = this.rate,r = 5 ){ 
    
      return eachInArea(weights.state, pos, (w, i, j, x, y) => {
      	
        return (function() {
          if (w < 1) {
            this.decaying.add(world.coord.get(x, y));
            let newWeight = (w + (rate / (1 + Math.pow(euclidianDistance(x, y, pos.x, pos.y), 2))));
            return weights.set(x, y, newWeight);
          }
        }).call(this);
      
      }, r);
    
   },
  update( weights = this.weights,decay = this.decay,decaying = this.decaying ){ 
    
      decaying.each((pos) => {
      	
        let v = weights.get(pos.x, pos.y);
        let { 
          x,
          y
         } = pos;
        return weights.set(pos.x, pos.y, (function() {
          if (decay < Math.abs(v)) {
            return (function() {
              if (v > 0) {
                return decayPositive(x, y, v, decay);
              } else if (v < 0) {
                return decayNegative(x, y, v, decay);
              }
            }).call(this);
          } else {
            decaying.delete(pos);
            return 0;
          }
        }).call(this));
      
      });
      return weights.update();
    
   }
 };
exports.Pheremones = Pheremones;