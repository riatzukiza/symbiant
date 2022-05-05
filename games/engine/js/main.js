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
          v.xd += (-1 * (v.xd / config.friction));
          return v.yd += (-1 * (v.yd / config.friction));
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
  /* entity eval.sibilant:158:0 */

  return game.ent.spawn(aspects);
});
var vector2d = (function vector2d$(x, y) {
  /* vector2d eval.sibilant:159:0 */

  return [ x, y ];
});
TreeMap.get = (function TreeMap$get$(...args) {
  /* Tree-map.get eval.sibilant:161:0 */

  return this.find(...args).value;
});
var memoize = (function memoize$(f) {
  /* memoize eval.sibilant:163:0 */

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
  return (function() {
    if (c.entity === target) {
      var hpos = game.systems.get(Position, home);
      c_v.pos.x = (3 + hpos.x);
      c_v.pos.y = (3 + hpos.y);
      c_v.xd = 0;
      return c_v.yd = 0;
    } else if (c_.entity === target) {
      var hpos = game.systems.get(Position, home);
      cv.pos.x = (3 + hpos.x);
      cv.pos.y = (3 + hpos.y);
      cv.xd = 0;
      return cv.yd = 0;
    } else if (!((c.entity === home || c_.entity === home))) {
      cv.accelerate([ (function() {
        /* eval.sibilant:96:8 */
      
        (function() {
          /* node_modules/kit/inc/scope.sibilant:12:9 */
        
          return ((Math.random() * (10 - 0)) + 0);
        })();
        return (10 - (rand / 2));
      }).call(this) ]);
      return c_v.accelerate([ (function() {
        /* eval.sibilant:96:8 */
      
        (function() {
          /* node_modules/kit/inc/scope.sibilant:12:9 */
        
          return ((Math.random() * (10 - 0)) + 0);
        })();
        return (10 - (rand / 2));
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
const ants=[];
var spawnAnt = (function spawnAnt$(x_y$4, home, startingLife) {
  /* spawn-ant eval.sibilant:317:0 */

  var x = x_y$4[0],
      y = x_y$4[1];

  var ant = entity(activeGameSystems);
  ants.push(ant);
  game.systems.get(Dot, ant).color = rgba(255, 0, 0, 255);
  var homePos = game.systems.get(Position, home);
  game.systems.get(Position, ant).x = x;
  game.systems.get(Position, ant).y = y;
  game.systems.get(Position, ant).z = 1;
  game.systems.get(Physics, ant).scale = 10;
  game.systems.get(Physics, ant).mass = 1;
  game.systems.get(Physics, ant).forces = [ SignalField, Friction ];
  return ant;
});
(function() {
  /* node_modules/kit/inc/loops.sibilant:26:8 */

  var $for = null;
  for (var let = time;time < 100;++(time))
  {
  $for = (function() {
    /* node_modules/kit/inc/loops.sibilant:28:35 */
  
    var homePos = game.systems.get(Position, home);
    return spawnAnt([ homePos.x, homePos.y ], home);
  }).call(this);
  }
  ;
  return $for;
}).call(this);
game.start();