let toroidial = (a, lim) => {
	
  return ((a + lim) % lim);

};
const System = { 
  symbol:Symbol("System"),
  init( entities = this.entities,weights = this.weights,stats = this.stats,display = this.display,goals = this.goals,sim = this.sim,nest = this.nest ){ 
    
      this.entities = entities;this.weights = weights;this.stats = stats;this.display = display;this.goals = goals;this.sim = sim;this.nest = nest;
      return this;
    
   },
  save( members = this.members ){ 
    
      return ants.each((ant) => {
      	
        delete ant.members;
        delete ant.sim;
        delete ant.ant;
        delete ant.weights;
        delete ant.collision;
        return storage.ants.push(ant);
      
      });
    
   },
  load( path = this.path ){ 
    
      this.entities = (new Set(json.entities.map((ent) => {
      	
        ent.system = this;
        return create(extend(this.entityType, ant))();
      
      })));
      this.stats = (json.stats || this.stats);
      return this.weights = create(StateSpace)(120, 120, create(Matrix)(json.weights.state.array, json.weights.width, json.weights.height), create(Matrix)(json.weights.transition.array, json.weights.width, json.weights.height));
    
   },
  move( entities = this.entities ){ 
    
      "Process the movement of ever ant in a set of ants, updating weights along the way.";
      return entities.each((ant) => {
      	
        return ant.move();
      
      });
    
   }
 };
const Entity = { 
  symbol:Symbol("Entity"),
  init( x = this.x,y = this.y,members = this.members,sim = this.sim,id = this.id,system = this.system,color = { 
    red:255,
    green:0,
    blue:0
   },ent = this ){ 
    
      this.x = x;this.y = y;this.members = members;this.sim = sim;this.id = id;this.system = system;this.color = color;this.ent = ent;
      return this;
    
   },
  load(  ){ 
    
   },
  move( x = this.x,y = this.y,collision = this.collision,display = this.display,ent = this ){ 
    
      collision.set(ent.x, ent.y, Entity.empty);
      ent.x = toroidial(x, collision.width);
      ent.y = toroidial(y, collision.height);
      collision.set(x, y, ent);
      return display.set(x, y, ent.color);
    
   }
 };
exports.Entity = Entity;