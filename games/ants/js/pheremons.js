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
let colors = [];
function decayPositive( x,y,v,display,sim ){ 
  
    "brings a positive weight closer to zero, ";
    let color = display.get(x, y);
    let b = Math.round((255 * Math.pow(v, 0.5)));
    let r = color.red;
    let g = color.green;
    (function() {
      if (b > 255) {
        b = Math.round((b / 2));
        g = Math.round((b / 2));
        return (function() {
          if (b > 255) {
            b = Math.round((b / 2));
            g = Math.round((b / 2));
            return r = Math.round((b / 2));
          }
        }).call(this);
      }
    }).call(this);
    color.red = r;
    color.blue = b;
    color.green = g;
    display.set(x, y, color);
    return (v - sim.decay);
  
 };
function decayNegative( x,y,v,display,sim ){ 
  
    "brings a positive weight closer to zero, ";
    let color = display.get(x, y);
    let r = color.red;
    let b = Math.round((255 * v));
    let g = Math.round((255 * v));
    (function() {
      if (b > 255) {
        b = Math.round((b / 2));
        g = Math.round((b / 2));
        return (function() {
          if (b > 255) {
            b = Math.round((b / 2));
            g = Math.round((b / 2));
            return r = Math.round((b / 2));
          }
        }).call(this);
      }
    }).call(this);
    color.red = r;
    color.blue = b;
    color.green = g;
    display.set(x, y, color);
    return (v + sim.decay);
  
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
  update( weights = this.weights,display = this.display,sim = this.sim ){ 
    
      return weights.transit((v, x, y) => {
      	
        return (function() {
          if (Math.abs(v) > sim.decay) {
            return (function() {
              if (v > 0) {
                return decayPositive(x, y, v, display, sim);
              } else if (v < 0) {
                return decayNegative(x, y, v, display, sim);
              }
            }).call(this);
          } else {
            return 0;
          }
        }).call(this);
      
      });
    
   }
 };
exports.Pheremones = Pheremones;