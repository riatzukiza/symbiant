
var R = require("ramda");
var registerDescription = (function registerDescription$(name, obj) {
  /* register-description app/sib/meta/describe.sibilant:1:0 */

  return (function(description) {
    /* app/sib/meta/macros.sibilant:124:9 */
  
    return (function() {
      if (description) {
        return mixin(obj, description);
      } else {
        return Descriptions[name] = mixin(obj, { 
          symbol:Symbol(name)
         });
      }
    }).call(this);
  })(Descriptions.name);
});
;
var lit(create, extend, mixin, cond) = require("kit/src/util"),
    lit(EventEmitter) = require("events"),
    lit(Layers) = require("../js/webgl-layer.js");
Array.prototype.each = (function Array$prototype$each$(f) {
  /* Array.prototype.each app/sib/lib/natives/array.sibilant:1:0 */

  this.forEach(f);
  return this;
});
Array.prototype.bind = (function Array$prototype$bind$(f) {
  /* Array.prototype.bind app/sib/lib/natives/array.sibilant:4:0 */

  return (function(r) {
    /* app/sib/meta/macros.sibilant:124:9 */
  
    this.each((a) => {
    	
      return r.push(f(a));
    
    });
    return r;
  })([]);
});
// [ [ 1, 2, 3 ], [ 4, 5, 6 ] ].bind((a) => {
// 	
//   return a;
// 
// });
Map.prototype.each = (function Map$prototype$each$(f) {
  /* Map.prototype.each app/sib/lib/natives/map.sibilant:1:0 */

  this.forEach(f);
  return this;
});
const PromiseWriter={ 
  symbol:Symbol("PromiseWriter"),
  init( stream = this.stream,promise = Promise.resolve() ){ 
    
      this.stream = stream;this.promise = promise;
      return this;
    
   }
 };
PromiseWriter.write = (function PromiseWriter$write$(message = this.message, promise = this.promise, stream = this.stream) {
  /* Promise-writer.write node_modules/kit/inc/core/function-expressions.sibilant:32:8 */

  console.log("writing", message);
  return (function() {
    if (message) {
      return this.promise = promise.then((nil) => {
      	
        return Promise.resolve(message).then((value) => {
        	
          return (new Promise((success, fail) => {
          	
            var resolve = success,
                reject = fail;
            console.log("wrote to stream with promise");
            return stream.write(value, success);
          
          }));
        
        });
      
      });
    }
  }).call(this);
});
var euclidianDistance = (function euclidianDistance$(x, y, a, b) {
  /* euclidian-distance app/sib/lib/math/geometry.sibilant:1:0 */

  return Math.sqrt((Math.pow((x - a), 2) + Math.pow((y - b), 2)));
});
exports.euclidianDistance = euclidianDistance;
var square = (function square$(dim, f) {
  /* square app/sib/lib/math/geometry.sibilant:6:0 */

  var lim = Math.round((dim / 2));
  (function() {
    /* app/sib/meta/macros.sibilant:32:8 */
  
    var $for = null;
    for (var i = (0 - lim);i <= lim;++(i))
    {
    $for = (function() {
      /* app/sib/meta/macros.sibilant:34:35 */
    
      return (function() {
        /* app/sib/meta/macros.sibilant:32:8 */
      
        var $for = null;
        for (var j = (0 - lim);j <= lim;++(j))
        {
        $for = (function() {
          /* app/sib/meta/macros.sibilant:34:35 */
        
          return f(i, j);
        }).call(this);
        }
        ;
        return $for;
      }).call(this);
    }).call(this);
    }
    ;
    return $for;
  }).call(this);
  return null;
});
;
var add = (function add$(a, b) {
  /* add app/sib/lib/math.sibilant:7:0 */

  return (a + b);
});
var summate = (function summate$(a) {
  /* summate app/sib/lib/math.sibilant:8:0 */

  return a.reduce(add, 0);
});
var http = require("http"),
    R = require("ramda");
var writeElementAttribute = (function writeElementAttribute$(value, key) {
  /* write-element-attribute app/sib/lib/html/element.sibilant:16:0 */

  return Promise.resolve(value).then((value) => {
  	
    return stream.write((key + "=" + "'" + value + "' "));
  
  });
});
const HtmlElement={ 
  symbol:Symbol("HtmlElement"),
  get body(  ){ 
    
      return this._body;
    
   },
  get stream(  ){ 
    
      return create(PromiseWriter)(this._stream);
    
   },
  get promise(  ){ 
    
      return this._promise;
    
   },
  init( name = "",attributes = {  },_body = [],_stream = this._stream,_promise = Promise.resolve() ){ 
    
      this.name = name;this.attributes = attributes;this._body = _body;this._stream = _stream;this._promise = _promise;
      return this;
    
   }
 };
var htmlElement = create(HtmlElement);
var renderElementAttribute = R.curry((value, key, stream) => {
	
  "given a key and a value, render the attribute string fragment";
  return stream.write((" " + (key + "=" + "'" + value + "' ")));

});
HtmlElement.render = (function HtmlElement$render$(stream = this.stream, name = this.name, attributes = this.attributes, body = this.body) {
  /* Html-element.render node_modules/kit/inc/core/function-expressions.sibilant:32:8 */

  "Write an html document fragment to a stream, and its content. Content can be a string, promise, or a renderable. ";
  return (function(renderElementAttribute, renderChildSegment, endOpeningTag, renderOpeningTag, renderClosingTag) {
    /* app/sib/meta/macros.sibilant:124:9 */
  
    return (function(renderAttributes, renderChildren) {
      /* app/sib/meta/macros.sibilant:124:9 */
    
      renderOpeningTag();
      renderAttributes();
      endOpeningTag();
      renderChildren();
      return renderClosingTag();
    })(() => {
    	
      return Object.keys(attributes).map((k) => {
      	
        return renderElementAttribute(attributes[k], k);
      
      });
    
    }, () => {
    	
      return body.map((element) => {
      	
        return renderChildSegment(element);
      
      });
    
    });
  })((value, key) => {
  	
    "given a key and a value, render the attribute string fragment associated to the given stream";
    return stream.write((" " + key + "=" + "'" + value + "' "));
  
  }, (segment) => {
  	
    "Function that is to be called for each segment of the stream, calls the render method of the segment\n"+"if it has one, otherwise its just written to the stream";
    return (function() {
      if (segment.render) {
        return segment.render(stream);
      } else {
        return stream.write(("" + segment));
      }
    }).call(this);
  
  }, () => {
  	
    "insert the end of an opening html tag.";
    return stream.write(">");
  
  }, () => {
  	
    return stream.write(("<" + name));
  
  }, () => {
  	
    return stream.write(("</" + name + ">"));
  
  });
});
Array.prototype.each = (function Array$prototype$each$(f) {
  /* Array.prototype.each app/sib/lib/html/element.sibilant:82:0 */

  this.forEach(f);
  return this;
});
var renderTestDocument = (function renderTestDocument$(res) {
  /* render-test-document app/sib/lib/html/element.sibilant:121:0 */

  return "html"({  }, create(HtmlElement)("head"({  }, create(HtmlElement)()), "body"({  }, create(HtmlElement)("h1"({  }, create(HtmlElement)("this is a shitty website!")), "div"({ id: "main-container" }, create(HtmlElement)("div"({  }, create(HtmlElement)("yes, yes it is.")), "div"({  }, create(HtmlElement)(Date.now())), "div"({  }, create(HtmlElement)("and that was the time.")))))))).render(res);
});
var DOMNode = extend(EventEmitter.prototype, { 
  symbol:Symbol("DOMNode")
 });
mixin({ 
  init( tagName = this.tagName,attributes = this.attributes,children = this.children,_parent = document.body ){ 
    
      this.tagName = tagName;this.attributes = attributes;this.children = children;this._parent = _parent;
      EventEmitter.call(this);
      return this;
    
   }
 }, DOMNode);
console.log(document.appendChild);
DOMNode.remove = (function DOMNode$remove$(_node = this._node) {
  /* DOM-node.remove node_modules/kit/inc/core/function-expressions.sibilant:32:8 */

  return _node.remove();
});
DOMNode.render = (function DOMNode$render$(_parent = this._parent, attributes = this.attributes, tagName = this.tagName, _node = this._node, children = this.children) {
  /* DOM-node.render node_modules/kit/inc/core/function-expressions.sibilant:32:8 */

  (function() {
    if (_node) {
      console.log("clearing an old node", _node, _parent);
      return _node.remove();
    }
  }).call(this);
  parent = (function() {
    if (parent.symbol === DOMNode.symbol) {
      return parent._parent;
    } else {
      return parent;
    }
  }).call(this);
  this._node = document.createElement(tagName);
  _parent.appendChild(this._node);
  attributes.each((a, k) => {
  	
    return this._node[k] = a;
  
  });
  var renderChildren = (function renderChildren$(_node) {
    /* render-children app/sib/lib/html/dom.sibilant:39:2 */
  
    return (c) => {
    	
      return (function() {
        if (c.render) {
          console.log("encountered renderable child", c, _node, _parent);
          return c.render(_node);
        } else if ((c && "object" === typeof c && "Array" === c.constructor.name)) {
          return c.each(renderChildren);
        } else {
          return _node.appendChild(document.createTextNode(c));
        }
      }).call(this);
    
    };
  });
  children.each(renderChildren(this._node));
  return this;
});
var { 
  Matrix,
  matrix,
  MatrixView,
  matrixView,
  Kernel,
  kernel
 } = require("kit/js/matrix");
const StateSpace={ 
  symbol:Symbol("StateSpace"),
  init( width = this.width,height = this.height,state = create(Matrix)(height, width, (new Float32Array((height * width)))).dmap((function() {
    /* app/sib/meta/macros.sibilant:74:62 */
  
    return 0;
  })),transition = create(Matrix)(height, width, (new Float32Array((height * width)))).dmap((function() {
    /* app/sib/meta/macros.sibilant:74:62 */
  
    return 0;
  })) ){ 
    
      this.width = width;this.height = height;this.state = state;this.transition = transition;
      return this;
    
   }
 };
StateSpace.resize = (function StateSpace$resize$(w = this.w, h = this.h, c = this.c) {
  /* State-space.resize node_modules/kit/inc/core/function-expressions.sibilant:32:8 */

  return this.init.call(this, w, h);
});
StateSpace.get = (function StateSpace$get$(x = this.x, y = this.y, state = this.state) {
  /* State-space.get node_modules/kit/inc/core/function-expressions.sibilant:32:8 */

  return this.getState(x, y, state);
});
StateSpace.getState = (function StateSpace$getState$(x = this.x, y = this.y, state = this.state) {
  /* State-space.get-state node_modules/kit/inc/core/function-expressions.sibilant:32:8 */

  return state.get(x, y);
});
StateSpace.getTransition = (function StateSpace$getTransition$(x = this.x, y = this.y, transition = this.transition) {
  /* State-space.get-transition node_modules/kit/inc/core/function-expressions.sibilant:32:8 */

  return transition.get(x, y);
});
StateSpace.set = (function StateSpace$set$(x = this.x, y = this.y, value = this.value, state = this.state) {
  /* State-space.set node_modules/kit/inc/core/function-expressions.sibilant:32:8 */

  return this.setTransition(x, y, value);
});
StateSpace.setState = (function StateSpace$setState$(x = this.x, y = this.y, value = this.value, state = this.state) {
  /* State-space.set-state node_modules/kit/inc/core/function-expressions.sibilant:32:8 */

  return state.set(x, y, value);
});
StateSpace.setTransition = (function StateSpace$setTransition$(x = this.x, y = this.y, value = this.value, transition = this.transition) {
  /* State-space.set-transition node_modules/kit/inc/core/function-expressions.sibilant:32:8 */

  return transition.set(x, y, value);
});
StateSpace.eachState = (function StateSpace$eachState$(f = this.f, state = this.state) {
  /* State-space.each-state node_modules/kit/inc/core/function-expressions.sibilant:32:8 */

  state.each(f);
  return this;
});
StateSpace.each = (function StateSpace$each$(f = this.f, state = this.state) {
  /* State-space.each node_modules/kit/inc/core/function-expressions.sibilant:32:8 */

  state.each(f);
  return this;
});
StateSpace.transit = (function StateSpace$transit$(f = this.f, state = this.state, transition = this.transition) {
  /* State-space.transit node_modules/kit/inc/core/defs.sibilant:222:8 */

  state.transit(transition, f);
  return this;
});
StateSpace.eachTransition = (function StateSpace$eachTransition$(f = this.f, transition = this.transition) {
  /* State-space.each-transition node_modules/kit/inc/core/function-expressions.sibilant:32:8 */

  transition.each(f);
  return this;
});
StateSpace.clear = (function StateSpace$clear$(width = this.width, height = this.height) {
  /* State-space.clear node_modules/kit/inc/core/function-expressions.sibilant:32:8 */

  this.clearTransitions();
  return this.clearStates();
});
StateSpace.clearTransitions = (function StateSpace$clearTransitions$(width = this.width, height = this.height) {
  /* State-space.clear-transitions node_modules/kit/inc/core/function-expressions.sibilant:32:8 */

  var r = create(Matrix)([], width, height),
      setTransition = () => {
  	
    return 0;
  
  };
  return this.transition = r.dmap(setTransition);
});
StateSpace.clearStates = (function StateSpace$clearStates$(width = this.width, height = this.height) {
  /* State-space.clear-states node_modules/kit/inc/core/function-expressions.sibilant:32:8 */

  var r = create(Matrix)([], width, height),
      setState = () => {
  	
    return 0;
  
  };
  return this.state = r.dmap(setState);
});
StateSpace.update = (function StateSpace$update$(f = this.f, state = this.state, transition = this.transition) {
  /* State-space.update node_modules/kit/inc/core/defs.sibilant:222:8 */

  this.state = transition;
  this.transition = state;
  return this;
});
exports.StateSpace = StateSpace;
var setValue = R.curry((value, entity) => {
	
  return entity.value = value;

});
var curry = R.curry;
var { 
  not:fnot,
  pipe:fpipe,
  equals
 } = R;
Object.prototype.each = (function Object$prototype$each$(f) {
  /* Object.prototype.each app/sib/lib/lib.sibilant:24:0 */

  return Object.keys(this).each((k) => {
  	
    return f(this[k], k);
  
  });
});
global.create = create;
global.extend = extend;
global.mixin = mixin;
var green = { 
  red:0,
  green:255,
  blue:0
 },
    yellow = { 
  red:255,
  green:255,
  blue:0
 };
var memoize = (function memoize$(f) {
  /* memoize app/sib/lib/lib.sibilant:34:0 */

  "create a memoized version of any function. A memoized function will return\n"+"previously calculated results from a cache if the arguments given to it are the same";
  var m = {  };
  return cond(R.has, R.prop, (...args) => {
  	
    return f.apply(this, args);
  
  });
});
var domNode = create(DOMNode);
var { 
  EventEmitter
 } = require("events");
const Location={ 
  symbol:Symbol("Location"),
  init( x = this.x,y = this.y,layers = [] ){ 
    
      this.x = x;this.y = y;this.layers = layers;
      return this;
    
   }
 };
var Simulation = extend(EventEmitter.prototype, { 
  symbol:Symbol("Simulation")
 });
mixin({ 
  init( fps = this.fps,_width = this._width,_scale = this._scale,state = false,layers = (new Layers(document.getElementById("stage"), "gl", _width, _scale)).setBGColor(),coord = matrix(_width, _width).dmap((nil, x, y) => {
  	
    return create(Location)(x, y);
  
  }),systems = (new Set()),ticks = 0,sim = this ){ 
    
      this.fps = fps;this._width = _width;this._scale = _scale;this.state = state;this.layers = layers;this.coord = coord;this.systems = systems;this.ticks = ticks;this.sim = sim;
      EventEmitter.call(this);
      return this;
    
   },
  get rate(  ){ 
    
      return (1000 / this.fps);
    
   },
  get width(  ){ 
    
      return this._width;
    
   },
  get scale(  ){ 
    
      return this._scale;
    
   },
  set width( value ){ 
    
      return this._width = value;
    
   }
 }, Simulation);
Simulation.start = (function Simulation$start$() {
  /* Simulation.start node_modules/kit/inc/core/defs.sibilant:222:8 */

  "start the simulation";
  this.state = true;
  this.previous = Date.now();
  this.tick();
  return this;
});
Simulation.toggle = (function Simulation$toggle$() {
  /* Simulation.toggle node_modules/kit/inc/core/defs.sibilant:222:8 */

  "switches the state of the simulation, if its on, turn it off, if its off, turn it on.";
  this.state = !(this.state);
  (function() {
    if (this.state) {
      return this.start();
    }
  }).call(this);
  return this;
});
Simulation.stop = (function Simulation$stop$() {
  /* Simulation.stop node_modules/kit/inc/core/defs.sibilant:222:8 */

  "stop the simulation";
  this.state = false;
  return this;
});
Simulation.tick = (function Simulation$tick$(previous = this.previous, rate = this.rate) {
  /* Simulation.tick node_modules/kit/inc/core/defs.sibilant:222:8 */

  "Decides when to tick based on specified framerate, and turns the simulation off if it was previously on and the state has since changed.";
  (function() {
    if (this.state) {
      var now = Date.now();
      this.elapsed = (now - previous);
      window.requestAnimationFrame(() => {
      	
        return this.tick();
      
      });
      return (function() {
        if (this.elapsed > rate) {
          ++(this.ticks);
          this.previous = (now - (this.elapsed % rate));
          return this.emit("tick", now, this.ticks);
        }
      }).call(this);
    }
  }).call(this);
  return this;
});
exports.Simulation = Simulation;