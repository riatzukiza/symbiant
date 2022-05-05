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
  Collision
 } = require("sibilant-game-engine/client/systems/collision"),
    { 
  TreeMap
 } = require("tree-kit");
var Friction = Physics.Force.define("Friction", { 
  apply( c ){ 
    
      var v = c.velocity;
      var collision = c.system.process.systems.get(Collision, c.entity);
      return (function() {
        if (!(collision.colliding)) {
          v.xd += (-1 * (v.xd / 8));
          return v.yd += (-1 * (v.yd / 8));
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
  /* entity eval.sibilant:115:0 */

  return game.ent.spawn(aspects);
});
var vector2d = (function vector2d$(x, y) {
  /* vector2d eval.sibilant:116:0 */

  return [ x, y ];
});
TreeMap.get = (function TreeMap$get$(...args) {
  /* Tree-map.get eval.sibilant:118:0 */

  return this.find(...args).value;
});
var memoize = (function memoize$(f) {
  /* memoize eval.sibilant:120:0 */

  var cache = create(TreeMap)();
  return ((...args) => {
  	
    return (function() {
      if (cache.has(args)) {
        return cache.get(args);
      } else {
        var r = (function() {
          /* eval.sibilant:37:23 */
        
          return f(...args);
        }).call(this);
        cache.set(args, r);
        return r;
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
  var m = ((2 * cp.mass) / (c_p.mass + cp.mass));
  var m_ = ((2 * c_p.mass) / (c_p.mass + cp.mass));
  return (function() {
    if (c.entity === target) {
      var hpos = game.systems.get(Position, home);
      c_v.pos.x = (30 + hpos.x);
      return c_v.pos.y = (30 + hpos.y);
    } else if (c_.entity === target) {
      var hpos = game.systems.get(Position, home);
      cv.pos.x = (30 + hpos.x);
      return cv.pos.y = (30 + hpos.y);
    } else if (!((c.entity === home || c_.entity === home))) {
      cv.xd = (m_ * c_v.xd);
      cv.yd = (m_ * c_v.yd);
      c_v.xd = (m * cv.xd);
      return c_v.yd = (m * cv.yd);
    }
  }).call(this);

})).once("error", ((err) => {
	
  console.log("error on", "collision", "of", "game.events", "given", "[ c, c_, d ]()");
  return console.log(err);

}));
var ant = (function ant$() {
  /* ant eval.sibilant:203:0 */

  
});
var plant = (function plant$() {
  /* plant eval.sibilant:204:0 */

  
});
var nest = (function nest$() {
  /* nest eval.sibilant:205:0 */

  
});
var colony = (function colony$() {
  /* colony eval.sibilant:206:0 */

  
});
var SignalField = Physics.Force.define("SignalField", { 
  field:createVectorField(config.columns, config.rows),
  layer:createVectorField(config.columns, config.rows),
  apply( c = this.c,field = this.field,layer = this.layer ){ 
    
      var v = c.velocity;
      var collision = c.system.process.systems.get(Collision, c.entity);
      return (function() {
        if (!(collision.colliding)) {
          return updateParticle(v, v.pos, field, layer, game.ticker.ticks);
        }
      }).call(this);
    
   }
 });
var home = entity([ Dot, Position, Physics, Collision ]);
game.systems.get(Dot, home).color = rgba(0, 255, 0, 255);
game.systems.get(Position, home).x = (Math.floor((Math.random() * (config.dimensions[0] - 1))) + 1);
game.systems.get(Position, home).y = (Math.floor((Math.random() * (config.dimensions[1] - 1))) + 1);
game.systems.get(Position, home).z = 1;
game.systems.get(Physics, home).scale = 30;
game.systems.get(Physics, home).mass = 1;
game.systems.get(Physics, home).forces = [];
game.systems.get(Collision, home).type = "static";
var target = entity([ Dot, Position, Physics, Collision ]);
game.systems.get(Dot, target).color = rgba(0, 0, 255, 255);
game.systems.get(Position, target).x = (Math.floor((Math.random() * (config.dimensions[0] - 1))) + 1);
game.systems.get(Position, target).y = (Math.floor((Math.random() * (config.dimensions[1] - 1))) + 1);
game.systems.get(Position, target).z = 1;
game.systems.get(Physics, target).scale = 30;
game.systems.get(Physics, target).mass = 1;
game.systems.get(Physics, target).forces = [];
game.systems.get(Collision, target).type = "static";
(function() {
  /* node_modules/kit/inc/loops.sibilant:26:8 */

  var $for = null;
  for (var i = 0;i < 80;++(i))
  {
  $for = (function() {
    /* node_modules/kit/inc/loops.sibilant:28:35 */
  
    var dot = entity(activeGameSystems);
    game.systems.get(Dot, dot).color = rgba(255, 0, 0, 255);
    var homePos = game.systems.get(Position, home);
    game.systems.get(Position, dot).x = (homePos.x + (Math.floor((Math.random() * (500 - 1))) + 1));
    game.systems.get(Position, dot).y = (homePos.y + (Math.floor((Math.random() * (500 - 1))) + 1));
    game.systems.get(Position, dot).z = 1;
    game.systems.get(Physics, dot).scale = 10;
    game.systems.get(Physics, dot).mass = 1;
    game.systems.get(Physics, dot).forces = [ SignalField, Friction ];
    var dot = entity(activeGameSystems);
    game.systems.get(Dot, dot).color = rgba(255, 0, 0, 255);
    game.systems.get(Position, dot).x = (homePos.x + (Math.floor((Math.random() * (500 - 1))) + 1));
    game.systems.get(Position, dot).y = (homePos.y + (Math.floor((Math.random() * (500 - 1))) + 1));
    game.systems.get(Position, dot).z = 1;
    game.systems.get(Physics, dot).scale = 10;
    game.systems.get(Physics, dot).mass = 1;
    game.systems.get(Physics, dot).forces = [ SignalField, Friction ];
    var dot = entity(activeGameSystems);
    game.systems.get(Dot, dot).color = rgba(0, 0, 0, 255);
    game.systems.get(Position, dot).x = (200 + (Math.floor((Math.random() * ((config.dimensions[0] / 1) - 1))) + 1));
    game.systems.get(Position, dot).y = (200 + (Math.floor((Math.random() * ((config.dimensions[1] / 1) - 1))) + 1));
    game.systems.get(Position, dot).z = 1;
    game.systems.get(Physics, dot).scale = 10;
    game.systems.get(Physics, dot).mass = 1;
    return game.systems.get(Physics, dot).forces = [ Friction ];
  }).call(this);
  }
  ;
  return $for;
}).call(this);
game.start();