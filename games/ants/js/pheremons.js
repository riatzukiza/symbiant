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
  hexToComplimentary
 } = require("./complimentry");
let colors = [];
function decayPositive( x,y,v,decay,color ){ 
  
    "brings a positive weight closer to zero, ";
    return (v - decay);
  
 };
var combine = (function combine$(old, addi) {
  /* combine eval.sibilant:25:0 */

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
const Pheremones = { 
  symbol:Symbol("Pheremones"),
  init( rate = this.rate,decay = this.decay,weights = this.weights ){ 
    
      this.rate = rate;this.decay = decay;this.weights = weights;
      return this;
    
   },
  emit( pos = this.pos,weights = this.weights,rate = this.rate,r = 5 ){ 
    
      return eachInArea(weights, pos, (w, i, j, x, y) => {
      	
        return (function() {
          if (w < 1) {
            let newWeight = (w + (rate / (1 + Math.pow(euclidianDistance(x, y, pos.x, pos.y), 2))));
            return weights.set(x, y, newWeight);
          }
        }).call(this);
      
      }, r);
    
   },
  update( weights = this.weights,decay = this.decay ){ 
    
      weights.transit((v, x, y) => {
      	
        return (function() {
          if (v > 0) {
            return decayPositive(x, y, v, decay);
          } else if (v < 0) {
            return decayNegative(x, y, v, decay);
          }
        }).call(this);
      
      });
      return weights.update();
    
   }
 };
exports.Pheremones = Pheremones;