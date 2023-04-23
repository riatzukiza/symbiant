var fields = [];
const FieldSystem = extend(Matrix, { 
  symbol:Symbol("FieldSystem")
 });
var stateSpace = create(StateSpace);
const Component = { 
  symbol:Symbol("Component")
 };
defDescription(Component, x(y, neiborhood(moore(x, y, this.field))), get influences(  ){ 
  
    return this.system.influences.map((s) => {
    	
      return s.field.get(this.x, this.y);
    
    });
  
 }, get value(  ){ 
  
    return this.field.get(this.x, this.y);
  
 }, set value( v ){ 
  
    return this.field.set(this.x, this.y, v);
  
 }, var update = (function update$(ticks = this.ticks, x = this.x, y = this.y, value = this.value, field = this.field) {
  /* update deps.sibilant:61:8 */

  return field.set(x, y, value);
}););
defDescription(FieldSystem, name(render__QUERY(false), height, width, symbol(Symbol(name)), field(stateSpace(width, height)), components([]), layer((function() {
  if (render__QUERY) {
    return sim.layers.get();
  } else {
    return (new Set());
  }
}).call(this)), system(this), _Component(extend(this, Component))), init( push = this[push],systems = this.systems,this = this.this ){ 
  
    this[push] = push;this.systems = systems;this.this = this;
    return this;
  
 }, get Component(  ){ 
  
    return this._Component;
  
 }, doc("A quantity which has a value over every point of a global space for all locations in space and time."), height(sim._width), width(sim._width), get array(  ){ 
  
    return this.components;
  
 });
FieldSystem.populate = (function FieldSystem$populate$(field = this.field) {
  /* Field-system.populate deps.sibilant:61:8 */

  "for every value influenced by the field, create a point object to represent that value";
  return field.each((v, x, y) => {
  	
    return this.addComponent(x, y, v);
  
  });
});
FieldSystem.clear = (function FieldSystem$clear$(field = this.field, components = this.components) {
  /* Field-system.clear deps.sibilant:61:8 */

  field.transit((x) => {
  	
    return 0;
  
  });
  field.update();
  field.transit((x) => {
  	
    return x;
  
  });
  return field.update();
});
FieldSystem.addComponent = (function FieldSystem$addComponent$(x = this.x, y = this.y, value = this.value, _Component = this._Component, layer = this.layer, components = this.components) {
  /* Field-system.add-component deps.sibilant:61:8 */

  var component = create(_Component)(x, y);
  components.push(component);
  layer.add(component);
  return component;
});
FieldSystem.removeComponent = (function FieldSystem$removeComponent$(x = this.x, y = this.y, layer = this.layer, components = this.components) {
  /* Field-system.remove-component deps.sibilant:61:8 */

  return components.filter((c) => {
  	
    return (function() {
      if (!(c.x === x)) {
        layer.delete(c);
        return false;
      } else {
        return true;
      }
    }).call(this);
  
  });
});
FieldSystem.update = (function FieldSystem$update$(ticks = this.ticks, components = this.components, field = this.field) {
  /* Field-system.update deps.sibilant:61:8 */

  "update every component of the field.";
  return components.each((c) => {
  	
    return c.update(ticks);
  
  });
});
var randomizeField = (function randomizeField$(field = this.field, system = this) {
  /* randomize-field deps.sibilant:61:8 */

  field.transit((x) => {
  	
    return Math.random();
  
  });
  field.update();
  field.transit((x) => {
  	
    return x;
  
  });
  field.update();
  return system.max = 0;
});
FieldSystem.randomize = randomizeField;
var fieldSystem = create(FieldSystem);