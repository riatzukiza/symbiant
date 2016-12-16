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
function decayPositive( x,y,v,display,decay,color ){ 
  
    "brings a positive weight closer to zero, ";
    let pixel = display.get(x, y);
    blend(pixel, color, v);
    display.set(x, y, pixel);
    return (v - decay);
  
 };
var combine = (function combine$(old, addi) {
  /* combine eval.sibilant:35:0 */

  return Math.round(Math.abs((old / addi)));
});
var blend = (function blend$(color, pixel, v) {
  /* blend eval.sibilant:37:0 */

  let b = combine(pixel.red, color.red);
  let r = combine(pixel.blue, color.blue);
  let g = combine(pixel.green, color.green);
  let a = Math.round(Math.abs((pixel.alpha + v)));
  pixel.red = r;
  pixel.blue = b;
  pixel.green = g;
  return pixel.alpha = undefined;
});
function decayNegative( x,y,v,display,decay,color ){ 
  
    "brings a positive weight closer to zero, ";
    let pixel = hexToComplimentary(display.get(x, y));
    blend(pixel, color, v);
    display.set(x, y, pixel);
    return (v + decay);
  
 };
function eachWeight( weights = this.weights,pos = this.pos,f = this.f,size = 3,rad = Math.floor((size / 2)) ){ 
  
    "apply a function to every element in a kernel of the weight matrix.\n" +
    "Values are not changed unless done so explicitly by the function as a side effect.";
    return weights.state.eachInSub((pos.x - rad), (pos.y - rad), size, size, (v, i, j, x, y) => {
    	
      return f(v, i, j, (x + i), (y + j));
    
    });
  
 };
const Pheremones = { 
  symbol:Symbol("Pheremones"),
  init( rate = this.rate,decay = this.decay,color = this.color,display = this.display,weights = this.weights ){ 
    
      this.rate = rate;this.decay = decay;this.color = color;this.display = display;this.weights = weights;
      return this;
    
   },
  emit( pos = this.pos,weights = this.weights,rate = this.rate,r = 5 ){ 
    
      return eachWeight(weights, pos, (w, i, j, x, y) => {
      	
        return (function() {
          if (w < 1) {
            let newWeight = (w + (rate / (1 + Math.pow(euclidianDistance(x, y, pos.x, pos.y), 2))));
            return weights.set(x, y, newWeight);
          }
        }).call(this);
      
      }, r);
    
   },
  update( weights = this.weights,display = this.display,decay = this.decay,color = this.color ){ 
    
      console.log("arguments to pheremons update", arguments);
      return weights.transit((v, x, y) => {
      	
        let emission = (function() {
          if (v > 0) {
            return decayPositive(x, y, v, display, decay, color);
          } else if (v < 0) {
            return decayNegative(x, y, v, display, decay, color);
          }
        }).call(this);
        color = display.getTransition(x, y);
        color.red = (color.red / 4);
        color.green = (color.green / 4);
        color.blue = (color.blue / 4);
        return emission;
      
      });
    
   }
 };
exports.Pheremones = Pheremones;