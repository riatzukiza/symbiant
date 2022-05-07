var R = require("ramda");
var { 
  create,
  extend,
  mixin,
  conditional,
  cond,
  partiallyApplyAfter
 } = require("@kit-js/core/js/util");
var { 
  Interface
 } = require("@kit-js/interface");
var socket = io("/engine");
socket.on("change", (() => {
	
  console.log("change ");
  return location.reload();

})).once("error", ((err) => {
	
  console.log("error on", "change", "of", "socket", "given", "null");
  return console.log(err);

}));
global.mixin = mixin;
global.create = create;
var { 
  EventEmitter,
  emit,
  bubble
 } = require("kit-events");
var renderChildren = R.curry(((_parent, c, i, a) => {
	
  return (function() {
    if (typeof c === "undefined") {
      return null;
    } else if (c.render) {
      return c.render(_parent);
    } else if ((c && "object" === typeof c && "Array" === c.constructor.name)) {
      return c.each(renderChildren(_parent));
    } else if (typeof c === "string") {
      return _parent._node.appendChild(document.createTextNode(c));
    } else if (typeof c === "number") {
      return _parent._node.appendChild(document.createTextNode(("" + c)));
    } else if (typeof c === "function") {
      return renderChildren(_parent, c(_parent), i, a);
    } else if ((c instanceof Element)) {
      return (function(node) {
        /* node_modules/kit/inc/scope.sibilant:12:9 */
      
        a[i] = node;
        return renderChildren(_parent, node, i, a);
      })(DocumentNode.wrap(c, _parent._node));
    } else {
      return _parent._node.appendChild(c);
    }
  }).call(this);

}));
var DocumentNode = EventEmitter.define("DocumentNode", { 
  init( tagName = this.tagName,attributes = this.attributes,_children = [],_parent = this._parent,_node = document.createElement(tagName) ){ 
    
      this.tagName = tagName;this.attributes = attributes;this._children = _children;this._parent = _parent;this._node = _node;
      EventEmitter.init.call(this);
      return this;
    
   },
  get children(  ){ 
    
      return this._children;
    
   },
  get style(  ){ 
    
      return this._node.style;
    
   },
  clear( _node = this._node ){ 
    
      _node.innerHTML = "";
      return this;
    
   },
  render( _parent = this._parent,attributes = this.attributes,tagName = this.tagName,_node = this._node,children = this.children ){ 
    
      _node.innerHTML = "";
      this._parent = _parent;
      _parent._node.appendChild(_node);
      attributes.each(((a, k) => {
      	
        return _node[k] = a;
      
      }));
      children.each(renderChildren(this));
      this.emit("render");
      return this;
    
   },
  wrap( _node,_parent ){ 
    
      "create a Document-node from a native DOM Element";
      return create(DocumentNode)(_node.tagName, {  }, [], _parent, _node);
    
   },
  append( node = this.node,children = this.children ){ 
    
      "add a child to the bottom of this one";
      children.push(node);
      return this;
    
   },
  prepend( node = this.node,children = this.children ){ 
    
      "add a child to the top of this one";
      return this.children = [ node, children ];
    
   },
  remove( _node = this._node,_parent = this._parent ){ 
    
      "remove this element from the tree.";
      _node.remove();
      _parent.children.filter(((c) => {
      	
        return !(_node === c);
      
      }));
      _parent.emit("remove", _node);
      return this;
    
   }
 });
var DocumentRoot = DocumentNode.define("DocumentRoot", { 
  get _parent(  ){ 
    
      return this;
    
   },
  tagName:"html",
  _node:document.documentElement,
  _children:[]
 });
var DocumentBody = DocumentNode.define("DocumentBody", { 
  get _parent(  ){ 
    
      return this;
    
   },
  tagName:"body",
  _node:document.body,
  _children:[]
 });
var DocumentHead = DocumentNode.define("DocumentHead", { 
  get _parent(  ){ 
    
      return this;
    
   },
  tagName:"head",
  _node:document.head,
  _children:[]
 });
var createDocumentNode = create(DocumentNode);
console.log(document.appendChild);
var { 
  TreeMap
 } = require("tree-kit");
var { 
  Game
 } = require("sibilant-game-engine/client/game"),
    { 
  Rendering
 } = require("sibilant-game-engine/client/systems/rendering/rendering"),
    { 
  Dot
 } = require("sibilant-game-engine/client/systems/rendering/dot"),
    { 
  Position
 } = require("sibilant-game-engine/client/systems/position"),
    { 
  Velocity
 } = require("sibilant-game-engine/client/systems/velocity"),
    { 
  Physics
 } = require("sibilant-game-engine/client/systems/physics"),
    { 
  Scalar
 } = require("sibilant-game-engine/client/math/scalar"),
    { 
  Component,
  System
 } = require("sibilant-game-engine/client/ecs/component"),
    noise = require("./noise"),
    Vector = require("./vector"),
    { 
  createVectorField,
  updateParticle
 } = require("./field"),
    { 
  List
 } = require("sibilant-game-engine/client/data-structures/list"),
    { 
  Collision
 } = require("sibilant-game-engine/client/systems/collision"),
    { 
  TreeMap
 } = require("tree-kit");
List.rotateUntil = (function List$rotateUntil$(predicate = this.predicate, t = 0) {
  /* List.rotate-until node_modules/kit/inc/core/function-expressions.sibilant:29:8 */

  console.log("LIST ROTATING", t, predicate, this);
  return (function() {
    if (predicate(this.head.item)) {
      return this.head.item;
    } else if (!(t > (this.size - 1))) {
      return this.rotate().rotateUntil(predicate, ++(t));
    } else {
      return false;
    }
  }).call(this);
});
var Friction = Physics.Force.define("Friction", { 
  apply( c ){ 
    
      var v = c.velocity;
      var collision = c.system.process.systems.get(Collision, c.entity);
      return (function() {
        if (!(collision.colliding)) {
          v.xd += (-1 * (1 + (v.xd / config.friction)));
          return v.yd += (-1 * (1 + (v.yd / config.friction)));
        }
      }).call(this);
    
   }
 });
global.size = window.size;
console.log(window.size);
var config = require("./config");
console.log(window.size());
console.log(config);
const rendering=Rendering.load({ 
  size:config.dimensions,
  limit:100,
  blend:true
 });
var stage = createDocumentNode("div", { 'id': "stage" }, []);
var container = createDocumentNode("div", { 'id': "container" }, [ rendering.context.canvas ]);
createDocumentNode("div", { 'id': "frame" }, [ container ]).render(DocumentRoot);
var activeGameSystems = [ Dot, Position, Physics, Velocity, Collision ];
var game = create(Game)(rendering, activeGameSystems);
var entity = (function entity$(aspects) {
  /* entity eval.sibilant:99:0 */

  return game.ent.spawn(aspects);
});
var vector2d = (function vector2d$(x, y) {
  /* vector2d eval.sibilant:100:0 */

  return [ x, y ];
});
TreeMap.get = (function TreeMap$get$(...args) {
  /* Tree-map.get eval.sibilant:102:0 */

  return this.find(...args).value;
});
var memoize = (function memoize$(f) {
  /* memoize eval.sibilant:104:0 */

  var cache = create(TreeMap)();
  return ((...args) => {
  	
    return (function() {
      if (cache.has(args)) {
        return cache.get(args);
      } else {
        return (function(value) {
          /* node_modules/kit/inc/scope.sibilant:12:9 */
        
          cache.set(args, value);
          return value;
        })((function() {
          /* node_modules/kit/inc/macros.sibilant:30:25 */
        
          return f(...args);
        }).call(this));
      }
    }).call(this);
  
  });
});
var rgba = memoize(((r, g, b, a) => {
	
  return { 
    r,
    g,
    b,
    a
   };

}));
game.events.on("collision", (([ c, c_, d ]) => {
	
  var cv = game.systems.get(Velocity, c.entity);
  var c_v = game.systems.get(Velocity, c_.entity);
  var cp = game.systems.get(Physics, c.entity);
  var c_p = game.systems.get(Physics, c_.entity);
  return (function() {
    if (((c.entity === home && c_.entity === target) || (c_.entity === home && c.entity === target))) {
      return console.log("target colliding with spawn");
    } else if (c.entity === target) {
      c.colliding = false;
      c_.colliding = false;
      var hpos = game.systems.get(Position, home);
      c_v.pos.x = hpos.x;
      c_v.pos.y = hpos.y;
      updateParticle(c_v, c_v.pos, SignalField.field, SignalField.layer, game.ticker.ticks, true, true, homePos);
      return c_v.accelerate([ (function() {
        /* eval.sibilant:29:8 */
      
        var rand = ((Math.random() * (config.collisionStatic - 0)) + 0);
        return (config.collisionStatic - (rand * 2));
      }).call(this), (function() {
        /* eval.sibilant:29:8 */
      
        var rand = ((Math.random() * (config.collisionStatic - 0)) + 0);
        return (config.collisionStatic - (rand * 2));
      }).call(this) ]);
    } else if (c_.entity === target) {
      c.colliding = false;
      c_.colliding = false;
      var hpos = game.systems.get(Position, home);
      cv.pos.x = hpos.x;
      cv.pos.y = hpos.y;
      updateParticle(cv, cv.pos, SignalField.field, SignalField.layer, game.ticker.ticks, true, true, homePos);
      return cv.accelerate([ (function() {
        /* eval.sibilant:29:8 */
      
        var rand = ((Math.random() * (config.collisionStatic - 0)) + 0);
        return (config.collisionStatic - (rand * 2));
      }).call(this), (function() {
        /* eval.sibilant:29:8 */
      
        var rand = ((Math.random() * (config.collisionStatic - 0)) + 0);
        return (config.collisionStatic - (rand * 2));
      }).call(this) ]);
    } else if (!((c.entity === home || c_.entity === home || c.entity === target || c_.entity === target))) {
      c.colliding = false;
      c_.colliding = false;
      cv.accelerate([ (function() {
        /* eval.sibilant:29:8 */
      
        var rand = ((Math.random() * (config.collisionStatic - 0)) + 0);
        return (config.collisionStatic - (rand * 2));
      }).call(this), (function() {
        /* eval.sibilant:29:8 */
      
        var rand = ((Math.random() * (config.collisionStatic - 0)) + 0);
        return (config.collisionStatic - (rand * 2));
      }).call(this) ]);
      return c_v.accelerate([ (function() {
        /* eval.sibilant:29:8 */
      
        var rand = ((Math.random() * (config.collisionStatic - 0)) + 0);
        return (config.collisionStatic - (rand * 2));
      }).call(this), (function() {
        /* eval.sibilant:29:8 */
      
        var rand = ((Math.random() * (config.collisionStatic - 0)) + 0);
        return (config.collisionStatic - (rand * 2));
      }).call(this) ]);
    }
  }).call(this);

})).once("error", ((err) => {
	
  console.log("error on", "collision", "of", "game.events", "given", "[ c, c_, d ]()");
  return console.log(err);

}));
var SignalField = Physics.Force.define("SignalField", { 
  field:createVectorField(config.columns, config.rows),
  layer:createVectorField(config.columns, config.rows),
  apply( c = this.c,field = this.field,layer = this.layer ){ 
    
      var v = c.velocity;
      var collision = c.system.process.systems.get(Collision, c.entity);
      return (function() {
        if (!(collision.colliding)) {
          updateParticle(v, v.pos, field, layer, game.ticker.ticks, false, false, homePos);
          var winRate = (v.winCount / ((1 + v.looseCount) || 1));
          return c.scale = (function() {
            if (winRate > 1) {
              return winRate;
            } else {
              return 1;
            }
          }).call(this);
        }
      }).call(this);
    
   }
 });
var home = entity([ Dot, Position, Physics, Collision ]);
var homePos = game.systems.get(Position, home);
game.systems.get(Dot, home).color = rgba(0, 255, 0, 255);
game.systems.get(Position, home).x = (Math.floor((Math.random() * (config.dimensions[0] - 1))) + 1);
game.systems.get(Position, home).y = (Math.floor((Math.random() * (config.dimensions[1] - 1))) + 1);
game.systems.get(Position, home).z = 1;
game.systems.get(Physics, home).scale = 30;
game.systems.get(Physics, home).mass = 1;
game.systems.get(Physics, home).forces = [];
var target = entity([ Dot, Position, Physics, Collision, Velocity ]);
game.systems.get(Dot, target).color = rgba(0, 0, 255, 255);
game.systems.get(Position, target).x = (Math.floor((Math.random() * (config.dimensions[0] - 1))) + 1);
game.systems.get(Position, target).y = (Math.floor((Math.random() * (config.dimensions[1] - 1))) + 1);
game.systems.get(Position, target).z = 1;
game.systems.get(Physics, target).scale = 40;
game.systems.get(Physics, target).mass = 10000;
game.systems.get(Physics, target).forces = [ Friction ];
const ants=[];
var spawnAnt = (function spawnAnt$(x_y$36, home, startingLife) {
  /* spawn-ant eval.sibilant:274:0 */

  var x = x_y$36[0],
      y = x_y$36[1];

  var ant = entity(activeGameSystems);
  ants.push(ant);
  console.log(ant);
  game.systems.get(Dot, ant).color = rgba(255, 0, 0, 255);
  game.systems.get(Position, ant).x = x;
  game.systems.get(Position, ant).y = y;
  game.systems.get(Position, ant).z = 1;
  game.systems.get(Physics, ant).scale = 10;
  game.systems.get(Physics, ant).mass = 1;
  game.systems.get(Physics, ant).forces = [ SignalField, Friction ];
  var v = game.systems.get(Velocity, ant);
  v.accelerate([ (function() {
    /* eval.sibilant:29:8 */
  
    var rand = ((Math.random() * (config.spawnStatic - 0)) + 0);
    return (config.spawnStatic - (rand * 2));
  }).call(this), (function() {
    /* eval.sibilant:29:8 */
  
    var rand = ((Math.random() * (config.spawnStatic - 0)) + 0);
    return (config.spawnStatic - (rand * 2));
  }).call(this) ]);
  return ant;
});
var homePos = game.systems.get(Position, home);
var number = 1;
setInterval((() => {
	
  return (function() {
    if (!(ants.length >= config.antLimit)) {
      return spawnAnt([ homePos.x, homePos.y ], home);
    }
  }).call(this);

}), config.spawnRate);
game.start();
var settings = QuickSettings.create();
settings.addRange("Angle Zoom", 1, 99, config.angleZoom, 1, ((val) => {
	
  return config.angleZoom = val;

}));
settings.addRange("Noise Z", 1, 99, config.noiseZ, 1, ((val) => {
	
  return config.noiseZ = val;

}));
settings.addRange("Noise Force", 1, 999, config.fieldForce, 1, ((val) => {
	
  return config.fieldForce = val;

}));
settings.addRange("Signal Decay", 0, 99, config.decay, 1, ((val) => {
	
  return config.decay = val;

}));
settings.addRange("Max P Vector Length", 0, 99, config.maxLength, 1, ((val) => {
	
  return config.maxLength = val;

}));
settings.addRange("Max Trail", 10, 999, config.maxTrail, 1, ((val) => {
	
  return config.maxTrail = val;

}));
settings.addRange("Min Trail", 10, 99, config.minTrail, 1, ((val) => {
	
  return config.minTrail = val;

}));
settings.addBoolean("Decay on collision", config.decayOnCollision, ((val) => {
	
  return config.decayOnCollision = val;

}));
settings.addBoolean("Limit the number of decay blocks per cycle", config.limitDecay, ((val) => {
	
  return config.limitDecay = val;

}));
settings.addRange("Ant Influence", 0, 99, config.antInfluence, 1, ((val) => {
	
  return config.antInfluence = val;

}));
settings.addRange("friction", 2, 128, config.friction, 1, ((val) => {
	
  return config.friction = val;

}));
settings.addRange("Collision Static", 0, 99, config.collisionStatic, 1, ((val) => {
	
  return config.collisionStatic = val;

}));
settings.addRange("Spawn Static", 1, 99, config.spawnStatic, 1, ((val) => {
	
  return config.spawnStatic = val;

}));
settings.addRange("Spawn Rate", 1, 5000, config.spawnRate, 1, ((val) => {
	
  return config.spawnRate = val;

}));