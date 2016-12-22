const { 
  Entity
 } = require("../ecs/entity");
const { 
  WeightField
 } = require("./weights");
const { 
  create,
  extend,
  mixin
 } = require("../util");
const { 
  Matrix
 } = require("../matrix");
let yellow = {
  red: 255,
  green: 255,
  blue: 0
};
let empty = { id: 0 };
Entity.empty = empty;
let choice = {
  x: 60,
  y: 60
};
var mooreNeighborhood = (function mooreNeighborhood$(w = this.w, h = this.h, weight = 1, c = 0) {
  /* moore-neighborhood deps.sibilant:61:8 */

  let m = create(Matrix)([], w, h).dmap((function() {
    /* eval.sibilant:36:57 */
  
    return weight;
  }));
  m.array[matrixCenter(w, h)] = c;
  return m;
});
var matrixCenter = (function matrixCenter$(width, height) {
  /* matrix-center eval.sibilant:47:0 */

  return Math.round((((width * height) - 1) / 2));
});
function eachWeight( weights = this.weights,pos = this.pos,f = this.f,size = 3,rad = Math.floor((size / 2)) ){ 
  
    "apply a function to every element in a kernel of the weight matrix.\n" +
    "Values are not changed unless done so explicitly by the function as a side effect.";
    return weights.state.eachInSub((pos.x - rad), (pos.y - rad), size, size, (v, i, j, x, y) => {
    	
      return f(v, i, j, (x + i), (y + j));
    
    });
  
 };
function mapWeights( weights = this.weights,pos = this.pos,f = this.f,size = 3,rad = Math.floor((size / 2)) ){ 
  
    "apply a function to every element in a kernel of the weight matrix,\n" +
    "assigning the weight value to the value returned";
    return eachWeight(weights, pos, (w, i, j, x, y) => {
    	
      return weights.set((x + i), (y + j), f(w, i, j, x, y));
    
    }, size, rad);
  
 };
const Ant = extend(Entity, { 
  symbol:Symbol("Ant"),
  life:1000,
  init( pos = this.pos,system = this.system,life = this.life ){ 
    
      this.pos = pos;this.system = system;this.life = life;
      console.log("system", system);
      Entity.init.call(this, pos, system);
      this.genetics = { 
        deviance:(function() {
          /* eval.sibilant:43:8 */
        
          let rand = ((Math.random() * (0.1 - 0)) + 0);
          return (0.1 - (rand / 2));
        }).call(this),
        rate:((Math.random() * (0.5 - 0)) + 0),
        mutationFactor:((Math.random() * (0.5 - 0)) + 0),
        findRate:(function() {
          /* eval.sibilant:43:8 */
        
          let rand = ((Math.random() * (1 - 0)) + 0);
          return (1 - (rand / 2));
        }).call(this),
        returnRate:(function() {
          /* eval.sibilant:43:8 */
        
          let rand = ((Math.random() * (1 - 0)) + 0);
          return (1 - (rand / 2));
        }).call(this),
        kernel:mooreNeighborhood(3, 3).dmap(() => {
        	
          return (function() {
            /* eval.sibilant:43:8 */
          
            let rand = ((Math.random() * (1 - 0)) + 0);
            return (1 - (rand / 2));
          }).call(this);
        
        })
       };
      return this;
    
   },
  serialize( genetics = this.genetics,life = this.life ){ 
    
      return { 
        genetics,
        life,
        x,
        y
       };
    
   },
  save( path = this.path,genetics = this.genetics,life = this.life ){ 
    
      return fs.writeFile("./sim.json", JSON.stringify(this.serialize()), (err) => {
      	
        (function() {
          if (err) {
            return this.emit("error", err);
          }
        }).call(this);
        return this.emit("save");
      
      });
    
   },
  load(  ){ 
    
   },
  update( ants = this.ants,nest = this.nest,life = this.life,ant = this ){ 
    
      let x = 0;
      let y = 0;
      --(ant.life);
      let random = Math.floor((Math.random() * (((Ant.life / 2) - 0) + 0)));
      let sated__QUERY = ant._sated();
      (function() {
        if ((2 * ant.life) > random) {
          let choice = ant.choose();
          Entity.move.call(ant, choice.x, choice.y);
          return (function() {
            if (ant._hasDiscoveredFood()) {
              return ant._eat();
            } else if (sated__QUERY) {
              return (function() {
                if (ant._nearNest()) {
                  return ant._reproduce();
                }
              }).call(this);
            }
          }).call(this);
        } else {
          return ant._die();
        }
      }).call(this);
      return WeightField.emit(ant, weights, (ant.genetics.rate * (0.1 * (ant.life / Ant.life))), 7);
    
   }
 });
exports.Ant = Ant;