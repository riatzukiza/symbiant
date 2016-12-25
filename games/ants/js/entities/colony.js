const { 
  EntityGroup
 } = require("../group");
const { 
  Ant
 } = require("./ant");
const { 
  StateSpace
 } = require("../state-space");
const Colony = extend(EntityGroup, { 
  symbol:Symbol("Colony"),
  colonies:(new Set()),
  entityType:Ant,
  init( nest = this.nest,color = this.color,goals = this.goals,decay = 0.1,colonies = this.colonies,weights = create(StateSpace)(sim.width, sim.width) ){ 
    
      this.nest = nest;this.color = color;this.goals = goals;this.decay = decay;this.colonies = colonies;this.weights = weights;
      EntityGroup.init.call(this);
      weights.layer = sim.layers.get();
      weights.each((w, x, y) => {
      	
        return weights.layer.add({ 
          x,
          y,
          get weight(  ){ 
            
              return weights.get(x, y);
            
           },
          get color(  ){ 
            
              return (function() {
                if (this.weight >= 0) {
                  return color;
                } else {
                  return complement(color);
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
      weights.layer.moveUp();
      colonies.add(this);
      return this;
    
   },
  spawn( color = this.color,entityType = this.entityType ){ 
    
      let rx = (Math.round(Math.random()) === 1) ? 1 : -1;
      let ry = (Math.round(Math.random()) === 1) ? 1 : -1;
      let ent = entityType.spawn((this.nest.x + Math.floor((Math.random() * ((30 - 0) + 0))) + rx), (this.nest.y + Math.floor((Math.random() * ((30 - 0) + 0))) + rx), color);
      (function() {
        if (ent) {
          ent.group = this;
          this.add(ent);
          ent.nest = this.nest;
          return ent;
        }
      }).call(this);
      return this;
    
   },
  serialize( ants = this.ants ){ 
    
      return ants.toArray().map((ant) => {
      	
        return ant.serialize();
      
      });
    
   },
  update( entities = this.entities,weights = this.weights,decay = this.decay ){ 
    
      "Process the movement of ever ant in a set of ants, updating weights along the way.";
      this.each((ant) => {
      	
        return ant.update();
      
      });
      return (function() {
        if (this.entities.size === 0) {
          return this.colonies.delete(this);
        } else {
          return Pheremones.update(this.weights, 0.1);
        }
      }).call(this);
    
   }
 });
exports.Colony = Colony;