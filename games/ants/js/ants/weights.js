const { 
  create,
  extend,
  mixin
 } = require("../util");
const { 
  StateSpace
 } = require("../state-space");
const { 
  euclidianDistance
 } = require("../math");
function decayPositive( x,y,v,decay,color ){ 
  
    "brings a positive weight closer to zero, ";
    return (v - decay);
  
 };
var combine = (function combine$(old, addi) {
  /* combine eval.sibilant:7:0 */

  return Math.round((old + addi));
});
function decayNegative( x,y,v,decay,color ){ 
  
    "brings a positive weight closer to zero, ";
    return (v + decay);
  
 };
function eachWeight( weights = this.weights,pos = this.pos,f = this.f,size = 3,rad = Math.floor((size / 2)) ){ 
  
    "apply a function to every element in a kernel of the weight matrix.\n" +
    "Values are not changed unless done so explicitly by the function as a side effect.";
    return weights.state.eachInSub((pos.x - rad), (pos.y - rad), size, size, (v, i, j, x, y) => {
    	
      return f(v, i, j, (x + i), (y + j));
    
    });
  
 };
var fallOff = (function fallOff$(w, rate, x, y, pos) {
  /* fall-off eval.sibilant:18:0 */

  return (w + (rate / (1 + Math.pow(euclidianDistance(x, y, pos.x, pos.y), 2))));
});
const WeightField = { 
  symbol:Symbol("WeightField"),
  init( sim = this.sim,decay = this.decay,weights = create(StateSpace)(sim.width, sim.width) ){ 
    
      this.sim = sim;this.decay = decay;this.weights = weights;
      return this;
    
   },
  emit( pos = this.pos,weights = this.weights,rate = this.rate,r = 5 ){ 
    
      return eachWeight(weights, pos, (w, i, j, x, y) => {
      	
        return (function() {
          if (w < 1) {
            let newWeight = fallOff(w, rate, x, y, pos);
            return weights.set(x, y, newWeight);
          }
        }).call(this);
      
      }, r);
    
   },
  count( ant = this.ant,weights = this.weights ){ 
    
      let count = 0;
      eachWeight(weights, ant, (w, i, j, x, y) => {
      	
        let ent = collision.get(x, y);
        return (function() {
          if ((!(ent) || ent === empty || ent === 0)) {
            return count += (w * sated__QUERY * ant.genetics.kernel.getCell(i, j) * ((Ant.life * ant.life) / ant.genetics.deviance));
          }
        }).call(this);
      
      }, 3);
      return count;
    
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
exports.WeightField = WeightField;