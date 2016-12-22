const { 
  WeightField
 } = require("./weights");
const { 
  create,
  extend,
  mixin
 } = require("../util");
const { 
  EntityGroup
 } = require("../ecs/entity-group");
const { 
  Ant
 } = require("./ant");
const Colony = extend(EntityGroup, { 
  symbol:Symbol("Colony"),
  colonies:(new Set()),
  entityType:Ant,
  init( sim = this.sim,nest = this.nest,color = this.color,goals = (new Set()),decay = 0.1,weights = create(WeightField)(sim, decay),colonies = this.colonies ){ 
    
      this.sim = sim;this.nest = nest;this.color = color;this.goals = goals;this.decay = decay;this.weights = weights;this.colonies = colonies;
      System.init.call(this);
      this.ants = this.entities;
      colonies.add(this);
      return this;
    
   },
  update( ants = this.ants,weights = this.weights ){ 
    
      System.update.call(this, ants);
      return weights.update();
    
   }
 });
exports.Colony = Colony;