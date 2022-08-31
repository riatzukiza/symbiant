(function(a, b, c) {
    /* ../../../../../../node_modules/kit/inc/core/defs.sibilant:53:9 */

    return foo(this);
}).bind(this);


;
var R = require("ramda");


var fmap = R.curry((f, a) => {

    return a.map(f);

});
var is = {
    string(v) {

        return typeof v === "string";

    }
};
is.empty__QUERY = (function is$empty__QUERY$(value) {
    /* is.empty? ../../../../../../node_modules/kit/inc/core/fp.sibilant:12:0 */

    return 0 === value.length;
});
var athrow = (function athrow$(errType, message) {
    /* athrow ../../../../../../node_modules/kit/inc/core/fp.sibilant:14:0 */

    return () => {

        return (new errType(message));

    };
});
var getValueOf = (function getValueOf$(o) {
    /* get-value-of ../../../../../../node_modules/kit/inc/core/fp.sibilant:17:0 */

    return o.getValue();
});

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
                    symbol: Symbol(name)
                });
            }
        }).call(this);
    })(Descriptions.name);
});;
var {
    create,
    extend,
    mixin,
    cond
} = require("kit/src/util"), {
    EventEmitter
} = require("events"), {
    Layers
} = require("../js/webgl-layer.js");
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
const PromiseWriter = {
    symbol: Symbol("PromiseWriter"),
    init(stream = this.stream, promise = Promise.resolve()) {

        this.stream = stream;
        this.promise = promise;
        return this;

    }
};
PromiseWriter.write = (function PromiseWriter$write$(message = this.message, promise = this.promise, stream = this.stream) {
    /* Promise-writer.write ../../../../../../node_modules/kit/inc/core/function-expressions.sibilant:32:8 */

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
        for (var i = (0 - lim); i <= lim; ++(i)) {
            $for = (function() {
                /* app/sib/meta/macros.sibilant:34:35 */

                return (function() {
                    /* app/sib/meta/macros.sibilant:32:8 */

                    var $for = null;
                    for (var j = (0 - lim); j <= lim; ++(j)) {
                        $for = (function() {
                            /* app/sib/meta/macros.sibilant:34:35 */

                            return f(i, j);
                        }).call(this);
                    };
                    return $for;
                }).call(this);
            }).call(this);
        };
        return $for;
    }).call(this);
    return null;
});;
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
const HtmlElement = {
    symbol: Symbol("HtmlElement"),
    get body() {

        return this._body;

    },
    get stream() {

        return create(PromiseWriter)(this._stream);

    },
    get promise() {

        return this._promise;

    },
    init(name = "", attributes = {}, _body = [], _stream = this._stream, _promise = Promise.resolve()) {

        this.name = name;
        this.attributes = attributes;
        this._body = _body;
        this._stream = _stream;
        this._promise = _promise;
        return this;

    }
};
var htmlElement = create(HtmlElement);
var renderElementAttribute = R.curry((value, key, stream) => {

    "given a key and a value, render the attribute string fragment";
    return stream.write((" " + (key + "=" + "'" + value + "' ")));

});
HtmlElement.render = (function HtmlElement$render$(stream = this.stream, name = this.name, attributes = this.attributes, body = this.body) {
    /* Html-element.render ../../../../../../node_modules/kit/inc/core/function-expressions.sibilant:32:8 */

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

        "Function that is to be called for each segment of the stream, calls the render method of the segment\n" + "if it has one, otherwise its just written to the stream";
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

    return "html" ({}, create(HtmlElement)("head" ({}, create(HtmlElement)()), "body" ({}, create(HtmlElement)("h1" ({}, create(HtmlElement)("this is a shitty website!")), "div" ({
        id: "main-container"
    }, create(HtmlElement)("div" ({}, create(HtmlElement)("yes, yes it is.")), "div" ({}, create(HtmlElement)(Date.now())), "div" ({}, create(HtmlElement)("and that was the time.")))))))).render(res);
});
var DOMNode = extend(EventEmitter.prototype, {
    symbol: Symbol("DOMNode")
});
mixin({
    init(tagName = this.tagName, attributes = this.attributes, children = this.children, _parent = document.body) {

        this.tagName = tagName;
        this.attributes = attributes;
        this.children = children;
        this._parent = _parent;
        EventEmitter.call(this);
        return this;

    }
}, DOMNode);
console.log(document.appendChild);
DOMNode.remove = (function DOMNode$remove$(_node = this._node) {
    /* DOM-node.remove ../../../../../../node_modules/kit/inc/core/function-expressions.sibilant:32:8 */

    return _node.remove();
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
DOMNode.render = (function DOMNode$render$
                  (_parent = this._parent,
                   attributes = this.attributes,
                   tagName = this.tagName,
                   _node = this._node,
                   children = this.children) {
                      /* DOM-node.render ../../../../../../node_modules/kit/inc/core/function-expressions.sibilant:32:8 */

                      if (_node) {
                          console.log("clearing an old node", _node, _parent);
                          _node.remove();
                      }

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
const StateSpace = {
    symbol: Symbol("StateSpace"),
    init(width = this.width, height = this.height, state = create(Matrix)(height, width, (new Float32Array((height * width)))).dmap((function() {
        /* app/sib/meta/macros.sibilant:74:62 */

        return 0;
    })), transition = create(Matrix)(height, width, (new Float32Array((height * width)))).dmap((function() {
        /* app/sib/meta/macros.sibilant:74:62 */

        return 0;
    }))) {

        this.width = width;
        this.height = height;
        this.state = state;
        this.transition = transition;
        return this;

    }
};
StateSpace.resize = (function StateSpace$resize$(w = this.w, h = this.h, c = this.c) {
    /* State-space.resize ../../../../../../node_modules/kit/inc/core/function-expressions.sibilant:32:8 */

    return this.init.call(this, w, h);
});
StateSpace.get = (function StateSpace$get$(x = this.x, y = this.y, state = this.state) {
    /* State-space.get ../../../../../../node_modules/kit/inc/core/function-expressions.sibilant:32:8 */

    return this.getState(x, y, state);
});
StateSpace.getState = (function StateSpace$getState$(x = this.x, y = this.y, state = this.state) {
    /* State-space.get-state ../../../../../../node_modules/kit/inc/core/function-expressions.sibilant:32:8 */

    return state.get(x, y);
});
StateSpace.getTransition = (function StateSpace$getTransition$(x = this.x, y = this.y, transition = this.transition) {
    /* State-space.get-transition ../../../../../../node_modules/kit/inc/core/function-expressions.sibilant:32:8 */

    return transition.get(x, y);
});
StateSpace.set = (function StateSpace$set$(x = this.x, y = this.y, value = this.value, state = this.state) {
    /* State-space.set ../../../../../../node_modules/kit/inc/core/function-expressions.sibilant:32:8 */

    return this.setTransition(x, y, value);
});
StateSpace.setState = (function StateSpace$setState$(x = this.x, y = this.y, value = this.value, state = this.state) {
    /* State-space.set-state ../../../../../../node_modules/kit/inc/core/function-expressions.sibilant:32:8 */

    return state.set(x, y, value);
});
StateSpace.setTransition = (function StateSpace$setTransition$(x = this.x, y = this.y, value = this.value, transition = this.transition) {
    /* State-space.set-transition ../../../../../../node_modules/kit/inc/core/function-expressions.sibilant:32:8 */

    return transition.set(x, y, value);
});
StateSpace.eachState = (function StateSpace$eachState$(f = this.f, state = this.state) {
    /* State-space.each-state ../../../../../../node_modules/kit/inc/core/function-expressions.sibilant:32:8 */

    state.each(f);
    return this;
});
StateSpace.each = (function StateSpace$each$(f = this.f, state = this.state) {
    /* State-space.each ../../../../../../node_modules/kit/inc/core/function-expressions.sibilant:32:8 */

    state.each(f);
    return this;
});
StateSpace.transit = (function StateSpace$transit$(f = this.f, state = this.state, transition = this.transition) {
    /* State-space.transit ../../../../../../node_modules/kit/inc/core/defs.sibilant:222:8 */

    state.transit(transition, f);
    return this;
});
StateSpace.eachTransition = (function StateSpace$eachTransition$(f = this.f, transition = this.transition) {
    /* State-space.each-transition ../../../../../../node_modules/kit/inc/core/function-expressions.sibilant:32:8 */

    transition.each(f);
    return this;
});
StateSpace.clear = (function StateSpace$clear$(width = this.width, height = this.height) {
    /* State-space.clear ../../../../../../node_modules/kit/inc/core/function-expressions.sibilant:32:8 */

    this.clearTransitions();
    return this.clearStates();
});
StateSpace.clearTransitions = (function StateSpace$clearTransitions$(width = this.width, height = this.height) {
    /* State-space.clear-transitions ../../../../../../node_modules/kit/inc/core/function-expressions.sibilant:32:8 */

    var r = create(Matrix)([], width, height),
        setTransition = () => {

            return 0;

        };
    return this.transition = r.dmap(setTransition);
});
StateSpace.clearStates = (function StateSpace$clearStates$(width = this.width, height = this.height) {
    /* State-space.clear-states ../../../../../../node_modules/kit/inc/core/function-expressions.sibilant:32:8 */

    var r = create(Matrix)([], width, height),
        setState = () => {

            return 0;

        };
    return this.state = r.dmap(setState);
});
StateSpace.update = (function StateSpace$update$(f = this.f, state = this.state, transition = this.transition) {
    /* State-space.update ../../../../../../node_modules/kit/inc/core/defs.sibilant:222:8 */

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
    not: fnot,
    pipe: fpipe,
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
        red: 0,
        green: 255,
        blue: 0
    },
    yellow = {
        red: 255,
        green: 255,
        blue: 0
    };
var memoize = (function memoize$(f) {
    /* memoize app/sib/lib/lib.sibilant:34:0 */

    "create a memoized version of any function. A memoized function will return\n" + "previously calculated results from a cache if the arguments given to it are the same";
    var m = {};
    return cond(R.has, R.prop, (...args) => {

        return f.apply(this, args);

    });
});
var domNode = create(DOMNode);
var {
    EventEmitter
} = require("events");
const Location = {
    symbol: Symbol("Location"),
    init(x = this.x, y = this.y, layers = []) {

        this.x = x;
        this.y = y;
        this.layers = layers;
        return this;

    }
};
var Simulation = extend(EventEmitter.prototype, {
    symbol: Symbol("Simulation")
});
mixin({
    init(fps = this.fps, _width = this._width, _scale = this._scale, state = false, layers = (new Layers(document.getElementById("stage"), "gl", _width, _scale)).setBGColor(), coord = matrix(_width, _width).dmap((nil, x, y) => {

        return create(Location)(x, y);

    }), systems = (new Set()), ticks = 0, sim = this) {

        this.fps = fps;
        this._width = _width;
        this._scale = _scale;
        this.state = state;
        this.layers = layers;
        this.coord = coord;
        this.systems = systems;
        this.ticks = ticks;
        this.sim = sim;
        EventEmitter.call(this);
        return this;

    },
    get rate() {

        return (1000 / this.fps);

    },
    get width() {

        return this._width;

    },
    get scale() {

        return this._scale;

    },
    set width(value) {

        return this._width = value;

    }
}, Simulation);
Simulation.start = (function Simulation$start$() {
    /* Simulation.start ../../../../../../node_modules/kit/inc/core/defs.sibilant:222:8 */

    "start the simulation";
    this.state = true;
    this.previous = Date.now();
    this.tick();
    return this;
});
Simulation.toggle = (function Simulation$toggle$() {
    /* Simulation.toggle ../../../../../../node_modules/kit/inc/core/defs.sibilant:222:8 */

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
    /* Simulation.stop ../../../../../../node_modules/kit/inc/core/defs.sibilant:222:8 */

    "stop the simulation";
    this.state = false;
    return this;
});
Simulation.tick = (function Simulation$tick$(previous = this.previous, rate = this.rate) {
    /* Simulation.tick ../../../../../../node_modules/kit/inc/core/defs.sibilant:222:8 */

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
var domTreeRoot = domNode("div", {
    id: "container"
}, [domNode("h1", {}, ["Random Colors"]), domNode("div", {
    id: "stage"
}, [])]).render(document.body);
domTreeRoot.render();
var sim = create(Simulation)(30, 100, 8);
global.sim = sim;
var fields = [];
var FieldSystem = extend(Matrix, {
    symbol: Symbol("FieldSystem")
});
var Descriptions = {};
var stateSpace = create(StateSpace);
const Component = {
    symbol: Symbol("Component")
};
Descriptions.Component = mixin({
    init(x = this.x, y = this.y, neiborhood = moore(x, y, this.field)) {

        this.x = x;
        this.y = y;
        this.neiborhood = neiborhood;
        return this;

    },
    get influences() {

        return this.system.influences.map((s) => {

            return s.field.get(this.x, this.y);

        });

    },
    get value() {

        return this.field.get(this.x, this.y);

    },
    set value(v) {

        return this.field.set(this.x, this.y, v);

    },
    update(ticks = this.ticks, x = this.x, y = this.y, value = this.value, field = this.field) {

        return field.set(x, y, value);

    }
}, Component);
Descriptions.FieldSystem = mixin({
    init(name = this.name, render__QUERY = false, height = this.height, width = this.width, symbol = Symbol(name), field = stateSpace(width, height), components = [], layer = (function() {
        if (render__QUERY) {
            return sim.layers.get();
        } else {
            return (new Set());
        }
    }).call(this), system = this, _Component = extend(this, Component)) {

        this.name = name;
        this.render__QUERY = render__QUERY;
        this.height = height;
        this.width = width;
        this.symbol = symbol;
        this.field = field;
        this.components = components;
        this.layer = layer;
        this.system = system;
        this._Component = _Component;
        systems.push(this);
        return this;

    },
    get Component() {

        return this._Component;

    },
    doc: "A quantity which has a value over every point of a global space for all locations in space and time.",
    height: sim._width,
    width: sim._width,
    get array() {

        return this.components;

    }
}, FieldSystem);
FieldSystem.populate = (function FieldSystem$populate$(field = this.field) {
    /* Field-system.populate ../../../../../../node_modules/kit/inc/core/function-expressions.sibilant:32:8 */

    "for every value influenced by the field, create a point object to represent that value";
    return field.each((v, x, y) => {

        return this.addComponent(x, y, v);

    });
});
FieldSystem.clear = (function FieldSystem$clear$(field = this.field, components = this.components) {
    /* Field-system.clear ../../../../../../node_modules/kit/inc/core/function-expressions.sibilant:32:8 */

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
    /* Field-system.add-component ../../../../../../node_modules/kit/inc/core/function-expressions.sibilant:32:8 */

    var component = create(_Component)(x, y);
    components.push(component);
    layer.add(component);
    return component;
});
FieldSystem.removeComponent = (function FieldSystem$removeComponent$(x = this.x, y = this.y, layer = this.layer, components = this.components) {
    /* Field-system.remove-component ../../../../../../node_modules/kit/inc/core/function-expressions.sibilant:32:8 */

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
    /* Field-system.update ../../../../../../node_modules/kit/inc/core/function-expressions.sibilant:32:8 */

    "update every component of the field.";
    return components.each((c) => {

        return c.update(ticks);

    });
});
var randomizeField = (function randomizeField$(field = this.field, system = this) {
    /* randomize-field ../../../../../../node_modules/kit/inc/core/function-expressions.sibilant:32:8 */

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
var maybeNum = (function maybeNum$(n) {
    /* maybe-num app/sib/main.sibilant:30:0 */

    return (n || 0);
});
var flip = (function flip$(d) {
    /* flip app/sib/main.sibilant:35:0 */

    return d.map((v) => {

        return -v;

    });
});
var total = (function total$(arr) {
    /* total app/sib/main.sibilant:37:0 */

    "calculate the total sum of all values in an eachable.";
    var sum = 0;
    arr.each((v) => {

        return sum += v;

    });
    return sum;
});
var displayStats = (function displayStats$(fieldSystem) {
    /* display-stats app/sib/main.sibilant:46:0 */

    "calculate and log the average and total values for all cells in a system.";
    return (function(b, ...others) {
        /* ../../../../../../node_modules/kit/inc/console.sibilant:10:8 */

        console.log("average", fieldSystem.name, b, ...others);
        return b;
    })(((function(b, ...others) {
        /* ../../../../../../node_modules/kit/inc/console.sibilant:10:8 */

        console.log("total", fieldSystem.name, b, ...others);
        return b;
    })(total(fieldSystem.field)) / (100 * 100)));
});
var updateEntities = (function updateEntities$() {
    /* update-entities app/sib/main.sibilant:56:0 */

    "update the state of every entity. Entity updates may affect fields and other systems.";
    return entities.each((ent) => {

        return ent.update();

    });
});
var updateOnBeatField = (function updateOnBeatField$(currentSystem, ticks) {
    /* update-on-beat-field app/sib/main.sibilant:67:0 */

    "calculate the values for the system that is said to currently be active. Systems are updated one\n" + "at a time, one per tick,so that updates to each can make changes to each. Values of each system will\n" + "be integrated for the time missing between each of their updates.";
    currentSystem.update(ticks);
    return currentSystem.field.update();
});
var getOnbeat = (function getOnbeat$(ticks) {
    /* get-onbeat app/sib/main.sibilant:77:0 */

    "return the id of the *onbeat* or major system of the current tick";
    return systems[(ticks % systems.length)].symbol;
});
var refreshFields = (function refreshFields$() {
    /* refresh-fields app/sib/main.sibilant:81:0 */

    "update the state matricies of every existing field.";
    return systems.each((system) => {

        return system.field.update();

    });
});
var updateDisplay = (function updateDisplay$() {
    /* update-display app/sib/main.sibilant:85:0 */

    return sim.layers.update().render();
});
var systems = [];
var System = {};
var e = Math.E;
var createInstanceOf = (function createInstanceOf$(type, ...args) {
    /* create-instance-of app/sib/game/systems.sibilant:6:0 */

    return create(type)(...args);
});
var moore = (function moore$(x, y, field) {
    /* moore app/sib/game/systems.sibilant:27:0 */

    return create(MatrixView)(field, 3, 3, [(x - 1), (y - 1)]);
});
var countKernel = kernel(3, 3, [
    [1, 1, 1],
    [1, 1, 1],
    [1, 1, 1]
]);
var averageKernel = countKernel.mult((1 / 9));
var identity = (function identity$() {
    /* identity app/sib/game/systems.sibilant:38:0 */

    return matrix(3, 3, [1, 1, 1, 1, 1, 1, 1, 1, 1]);
});
var additiveSmooth = memoize((function(s, a, b) {
    /* app/sib/game/systems.sibilant:51:30 */

    return ((s + a) / (s + b));
}));
var additiveSmooth = (function additiveSmooth$(s, a, b) {
    /* additive-smooth app/sib/game/systems.sibilant:53:0 */

    return ((s + a) / (s + b));
});
var _convolve = (function _convolve$(A, B) {
    /* *convolve app/sib/game/systems.sibilant:56:0 */

    return A.convolve(B);
});
var percentToColor = (function percentToColor$(percentage) {
    /* percent-to-color app/sib/game/systems.sibilant:59:0 */

    return (percentage * 255);
});
var inverseSquare = (function inverseSquare$(rate, c, pos, {
    x,
    y
}) {
    /* inverse-square app/sib/game/systems.sibilant:62:0 */

    return (rate / (c + Math.pow(euclidianDistance(x, y, pos.x, pos.y), 2)));
});
var BitField = extend(FieldSystem, {
    symbol: Symbol("BitField")
});
Descriptions.BitField = mixin({
    init() {


        FieldSystem.init.apply(this, arguments);
        return this;

    },
    has([x, y]) {

        return (function() {
            if (this.field.get(x, y) === 1) {
                return true;
            } else {
                return false;
            }
        }).call(this);

    },
    add([x, y]) {

        return (function() {
            if (!(this.has([x, y]))) {
                return this.field.set(x, y, 1);
            }
        }).call(this);

    },
    delete([x, y]) {

        return this.field.set(x, y, 0);

    },
    move([x, y], entity) {

        return (function() {
            if (!(this.has([x, y]))) {
                this.field.set(entity.x, entity.y, 0);
                this.field.set(x, y, 1);
                entity.x = x;
                entity.y = y;
                return true;
            } else {
                return false;
            }
        }).call(this);

    }
}, BitField);
var CollisionField = createInstanceOf(BitField, "CollisionField", false);
mixin({
    update(ticks = this.ticks, x = this.x, y = this.y, value = this.value, field = this.field) {

        return field.set(x, y, value);

    }
}, CollisionField.Component);
var background = createInstanceOf(FieldSystem, "background", true);
mixin({
    init(x = this.x, y = this.y, neiborhood = moore(x, y, this.field)) {

        this.x = x;
        this.y = y;
        this.neiborhood = neiborhood;
        return this;

    },
    r: 0,
    g: 0,
    b: 0,
    a: 255,
    update() {

    }
}, background.Component);
systems.each((s) => {

    return s.populate();

});
var entities = [];
var lastOf = (function lastOf$(arr) {
    /* last-of app/sib/game/components.sibilant:12:0 */

    return arr.slice(-1)[0];
});
var Entity = extend(EventEmitter.prototype, {
    symbol: Symbol("Entity")
});
var registerEntityType = (function registerEntityType$(obj) {
    /* register-entity-type app/sib/game/entities.sibilant:4:0 */

    var t = extend(Entity, obj);
    Entity.types.push(t);
    return t;
});
mixin({
    types: [],
    layer: sim.layers.get(),
    get pos() {

        return [this.x, this.y];

    },
    set pos([x, y]) {

        return this.x = x;
        this.y = y;

    },
    render: true,
    init(x = this.x, y = this.y, components = this.components, render__QUERY = this.render__QUERY) {

        this.x = x;
        this.y = y;
        this.components = components;
        this.render__QUERY = render__QUERY;
        (function() {
            if (!(this.spawned__QUERY)) {
                (function() {
                    if (render__QUERY) {
                        return this.layer.add(this);
                    }
                }).call(this);
                entities.push(this);
                this.components = components.map((T) => {

                    return this[T.symbol] = createInstanceOf(T, this);

                });
                return this.spawned__QUERY = true;
            }
        }).call(this);
        return this;

    },
    move([x, y]) {

        return Collision.move([x, y], this);

    },
    remove(entity = this, layer = this.layer) {

        entities = R.without([entity], entities);
        return layer.delete(entity);

    },
    update(components = this.components) {

        return components.each((comp) => {

            return comp.update();

        });

    }
}, Entity);
const Movement = {
    symbol: Symbol("Movement")
};
const Inertia = {
    symbol: Symbol("Inertia")
};
Descriptions.Inertia = mixin({
    init(entity = this.entity, value = this.value) {

        this.entity = entity;
        this.value = value;
        return this;

    },
    update(entity = this.entity, value = this.value) {

        return (function(Movement, Direction) {
            /* app/sib/meta/macros.sibilant:124:9 */

            return Movement.value = [(entity.x + Direction.value[0]), (entity.y + Direction.value[1])];
        })(entity[Movement.symbol], entity[Direction.symbol]);

    }
}, Inertia);
const Direction = {
    symbol: Symbol("Direction")
};
mixin({
    value: [1, 1]
}, Direction);
Descriptions.Direction = mixin({
    init(entity = this.entity, value = this.value, direction = this) {

        this.entity = entity;
        this.value = value;
        this.direction = direction;
        return this;

    },
    update(entity = this.entity, value = this.value, direction = this) {

        "A vector, determined from speed and movement components.";
        return (function(Movement) {
            /* app/sib/meta/macros.sibilant:124:9 */

            return this.value = [(entity.x - Movement.value[0]), (entity.y - Movement.value[1])];
        })(entity[Movement.symbol]);

    }
}, Direction);
const Collision = {
    symbol: Symbol("Collision")
};
Descriptions.Collision = mixin({
    init(entity = this.entity, fieldElement = CollisionField.add(entity.pos)) {

        this.entity = entity;
        this.fieldElement = fieldElement;
        return this;

    },
    update(entity = this.entity) {

        return CollisionField.move(entity.pos, entity);

    }
}, Collision);
var Boundry = registerEntityType({
    symbol: Symbol("Boundry")
});
Descriptions.Boundry = mixin({
    init(x = this.x, y = this.y, components = this.components) {

        this.x = x;
        this.y = y;
        this.components = components;

        Entity.init.call(this, x, y, components, true);

        return this;

    },
    components: [Collision],
    r: 255,
    g: 128,
    b: 0,
    a: 255
}, Boundry);
var buildBoundries = (function buildBoundries$() {
    /* build-boundries app/sib/game/entities.sibilant:128:0 */

    for (var x = 0; x < 100; ++(x)) {
        createInstanceOf(Boundry, x, 0);
        createInstanceOf(Boundry, x, 99)
    };
    for (var y = 0; y < 100; ++(y)) {
        createInstanceOf(Boundry, 0, y);
        createInstanceOf(Boundry, 99, y)
    };
    return null;
});
var Agent = registerEntityType({
    symbol: Symbol("Agent")
});
var probProd = (function probProd$(arr) {
    /* prob-prod app/sib/game/entities/probs.sibilant:2:0 */

    return arr.reduce((v, comp) => {

        return (v * (comp.value / comp.max));

    }, 1);
});
var reduceUntil = (function reduceUntil$(matrix, cond, f, value) {
    /* reduce-until app/sib/game/entities/probs.sibilant:6:0 */

    var break__QUERY = false;
    for (var x = 0; x < matrix.width; ++(x)) {
        if (break__QUERY) {
            break
        };
        for (var y = 0; y < matrix.height; ++(y)) {
            var cell = matrix.get(x, y);;
            value = f(value, cell, x, y, matrix);;
            if (cond(value, cell, x, y, matrix)) {
                break__QUERY = true;;
                break
            }
        }

    };
    return value;
});
var decide = (function decide$(random) {
    /* decide app/sib/game/entities/probs.sibilant:22:0 */

    return ([counter]) => {

        return counter >= random;

    };
});
var incrementCounter = (function incrementCounter$(counter$1, p, x, y) {
    /* increment-counter app/sib/game/entities/probs.sibilant:24:0 */

    var counter = counter$1[0];

    return [(counter + p), x, y];
});
var selectRandomLocation = (function selectRandomLocation$(matrix) {
    /* select-random-location app/sib/game/entities/probs.sibilant:26:0 */

    var total = countKernel.convolve(matrix),
        prob = matrix.map((v) => {

            return (v / total);

        });
    return reduceUntil(prob, decide(Math.random()), incrementCounter, [0, 0, 0]).slice(1);
});
var conditionalProbability = probProd;
const ProbabilitySpace = {
    symbol: Symbol("ProbabilitySpace")
};
mixin({
    init(matrix = this.matrix) {

        this.matrix = matrix;
        return this;

    },
    get total() {

        return countKernel.convolve(this.matrix);

    },
    get prob() {

        return this.matrix.map((v) => {

            return (v / this.total);

        });

    },
    getTotal(matrix = this.matrix) {

        return countKernel.convolve(matrix);

    },
    getProbabilityMatrix(matrix = this.matrix, total = ProbabilitySpace.getTotal(matrix)) {

        return matrix.map((v) => {

            return (v / total);

        });

    },
    joint(probs) {

        return probs.reduce(mult, identity());

    },
    randomLocation(prob = this.prob) {

        return reduceUntil(prob, decide(Math.random()), incrementCounter, [0, 0, 0]).slice(1);

    }
}, ProbabilitySpace);
var find = (function find$(entCoordPart, c) {
    /* find app/sib/game/entities/probs.sibilant:58:0 */

    return ((entCoordPart + -1 + (function() {
        if (c <= 0) {
            return (c + 100);
        } else {
            return c;
        }
    }).call(this)) % 100);
});
var localJointProbability = R.curry((entity, prob, field) => {

    return (function(na) {
        /* app/sib/meta/macros.sibilant:124:9 */

        return (function(location) {
            /* app/sib/meta/macros.sibilant:124:9 */

            return prob.mult(location);
        })(na);
    })(field.get(entity.x, entity.y).neiborhood);

});
var mult = (function mult$(a, b) {
    /* mult app/sib/game/entities/probs.sibilant:69:0 */

    return a.mult(b);
});
var localJointOf = R.curry((arr, entity) => {

    return arr.reduce(localJointProbability(entity), identity());

});
var randomNeighbor = (function randomNeighbor$(entity, kernels, probabilitySpace) {
    /* random-neighbor app/sib/game/entities/probs.sibilant:74:0 */

    return ProbabilitySpace.randomLocation(ProbabilitySpace.getProbabilityMatrix(localJointOf(kernels, entity)));
});
mixin({
    set value(value) {

        return this._value = value;

    },
    get value() {

        return (function() {
            if (this._value) {
                return this._value;
            } else {
                return [this.entity.x, this.entity.y];
            }
        }).call(this);

    }
}, Movement);
Descriptions.Movement = mixin({
    init(entity = this.entity, Movement = this) {

        this.entity = entity;
        this.Movement = Movement;
        return this;

    },
    update(entity = this.entity, Movement = this) {

        "A container for future movement positions.";
        return CollisionField.move(Movement.value, entity);

    }
}, Movement);
Descriptions.Direction = mixin({
    init(entity = this.entity, value = this.value, direction = this) {

        this.entity = entity;
        this.value = value;
        this.direction = direction;
        return this;

    },
    update(entity = this.entity, value = this.value, direction = this) {

        "A vector, determined from speed and movement components.";
        return (function(Movement) {
            /* app/sib/meta/macros.sibilant:124:9 */


        })(entity[Movement.symbol]);

    }
}, Direction);
const MapView = {
    symbol: Symbol("MapView")
};
Descriptions.MapView = mixin({
    init(entity = this.entity) {

        this.entity = entity;
        return this;

    },
    update(entity = this.entity) {

    }
}, MapView);
const Pathing = {
    symbol: Symbol("Pathing")
};
var countKernel = kernel(3, 3, [
    [1, 1, 1],
    [1, 1, 1],
    [1, 1, 1]
]);
Descriptions.Pathing = mixin({
    init(entity = this.entity) {

        this.entity = entity;
        return this;

    },
    update(entity = this.entity) {

        return (function(RoadMapView, Direction) {
            /* app/sib/meta/macros.sibilant:124:9 */

            return Direction.value = (function(viewMatrix) {
                /* app/sib/meta/macros.sibilant:124:9 */

                return (function(count) {
                    /* app/sib/meta/macros.sibilant:124:9 */

                    return (function(r) {
                        /* app/sib/meta/macros.sibilant:124:9 */

                        return (function(locs) {
                            /* app/sib/meta/macros.sibilant:124:9 */

                            return (function(sum) {
                                /* app/sib/meta/macros.sibilant:124:9 */

                                viewMatrix.each((v, x, y) => {

                                    return count += v;

                                });
                                viewMatrix.each((v, x, y) => {

                                    return (function() {
                                        if (!(v === 0)) {
                                            return locs.push([v, (x - 1), (y - 1)]);
                                        }
                                    }).call(this);

                                });
                                var rand = (Math.floor((Math.random() * (-locs.length))) + locs.length);
                                for (var i = 0; i < locs.length; ++(i)) {
                                    var l = locs[i];;
                                    sum += l[0];
                                    r = locs[i].slice(1);;
                                    if (sum > rand) {
                                        break
                                    }
                                };
                                return r;
                            })(0);
                        })([]);
                    })([0, 0]);
                })(0);
            })(RoadMapView._viewMatrix);
        })(entity[RoadMapView.symbol], entity[Direction.symbol]);

    }
}, Pathing);
const RoadMapView = {
    symbol: Symbol("RoadMapView")
};
Descriptions.RoadMapView = mixin({
    init(entity = this.entity, _viewMatrix = moore(...entity.pos, RoadMap.field)) {

        this.entity = entity;
        this._viewMatrix = _viewMatrix;
        return this;

    },
    update(entity = this.entity, _viewMatrix = moore(...entity.pos, RoadMap.field)) {

        return this._viewMatrix.offset = [(entity.x - 1), (entity.y - 1)];

    }
}, RoadMapView);
mixin({
    render__QUERY: true,
    r: 255,
    g: 255,
    b: 255,
    a: 255,
    components: [Inertia, RoadMapView, Movement, Direction, Collision, Pathing]
}, Agent);
var goals = (new Set());
var Goal = registerEntityType({
    symbol: Symbol("Goal")
});
Descriptions.Goal = mixin({
    init(x = this.x, y = this.y, components = this.components) {

        this.x = x;
        this.y = y;
        this.components = components;
        goals.add(this);
        Entity.init.apply(this, arguments);
        return this;

    },
    render__QUERY: true,
    components: [Collision],
    r: 0,
    g: 255,
    b: 10,
    a: 255
}, Goal);
var Home = registerEntityType({
    symbol: Symbol("Home")
});
mixin({
    r: 0,
    g: 20,
    b: 255
}, Home);
var RoadMap = createInstanceOf(BitField, "RoadMap", false);
var RoadEntity = registerEntityType({
    symbol: Symbol("RoadEntity")
});
const RoadFieldElement = {
    symbol: Symbol("RoadFieldElement")
};
Descriptions.RoadFieldElement = mixin({
    init(entity = this.entity, fieldComponent = RoadMap.add(entity.pos)) {

        this.entity = entity;
        this.fieldComponent = fieldComponent;
        return this;

    },
    update(entity = this.entity, fieldComponent = RoadMap.add(entity.pos)) {

    }
}, RoadFieldElement);
mixin({
    render__QUERY: true,
    r: 80,
    g: 80,
    b: 80,
    a: 255,
    components: [RoadFieldElement]
}, RoadEntity);
var ConjestionField = createInstanceOf(FieldSystem, "ConjestionField", true);
Descriptions.ConjestionField = mixin({
    init() {


        return this;

    },
    r: 255,
    g: 0,
    b: 0,
    a: 255,
    decay: 0.1
}, ConjestionField);
Descriptions["ConjestionField.Component"] = mixin({
    init(entity = this.entity, ticks = this.ticks, x = this.x, y = this.y, value = this.value, field = this.field, decay = this.decay) {

        this.entity = entity;
        this.ticks = ticks;
        this.x = x;
        this.y = y;
        this.value = value;
        this.field = field;
        this.decay = decay;
        return this;

    },
    update(entity = this.entity, ticks = this.ticks, x = this.x, y = this.y, value = this.value, field = this.field, decay = this.decay) {

        return field.set(x, y, (function() {
            if (value > decay) {
                return (value - decay);
            } else {
                return 0;
            }
        }).call(this));

    }
}, ConjestionField.Component);
var bulkSpawnEntity = (function bulkSpawnEntity$(T, args) {
    /* bulk-spawn-entity app/sib/game/starting-entities.sibilant:1:0 */

    return args.each((a) => {

        return createInstanceOf(T, ...a);

    });
});
var clearEntities = (function clearEntities$() {
    /* clear-entities app/sib/game/starting-entities.sibilant:4:0 */

    return entities.each((e) => {

        return e.remove();

    });
});

var queue = []
var lastTickTime = null;
var frameDelay = (1000 * (1 / 30));
var isLooping = false
var ticks = 0;

function beginTick(update) {
    /* begin-timed-animation-frame-tick examples.sibilant:89:0 */

    return () => {

        var now = Date.now();
        var timeElapsed = (now - lastTickTime);

        ticks++;

        if ((isLooping && timeElapsed > frameDelay)) {

            lastTickTime = now;
            update(ticks);
            requestAnimationFrame(beginTick(update));

        } else if (isLooping) {

            requestAnimationFrame(beginTick(update));
        }
    }
};

function startLoop(update) {
    /* start-timed-animation-frame-loop examples.sibilant:103:0 */

    lastTickTime = Date.now();
    isLooping = true;
    requestAnimationFrame(beginTick(update));

};

function stopLoop() {
    /* stop-timed-animation-frame-loop examples.sibilant:110:0 */

    lastTickTime = null;
    return isLooping = false;
};

var updateGame = (function updateGame$(ticks) {
    /* update-game app/sib/game/starting-entities.sibilant:7:0 */

    "Gets called every tick of the game, and for every system of the process,\n" + "we update its state, and recaculate the values of the current major field.";
    if (entities.some((e) => {

            (e.x > 100 || e.y > 100);

        })) {
        initializeGame();
    }
    var currentSystem = systems[(ticks % systems.length)];
    updateOnBeatField(currentSystem, ticks);
    refreshFields();
    updateEntities();
    refreshFields();
    return updateDisplay();
});
var initializeGame = (function initializeGame$() {
    /* initialize-game app/sib/game/starting-entities.sibilant:53:0 */
    console.log("initializing game");

    clearEntities();
    buildBoundries();
    refreshFields();
    systems.each((s) => s.clear());

    startLoop(updateGame);
});
initializeGame();

var getById = (function getById$(id = this.id, el = document) {
    /* get-by-id ../../../../../../node_modules/kit/inc/core/function-expressions.sibilant:32:8 */

    return el.getElementById(id);
});
var getByTagname = (function getByTagname$(tagname = this.tagname, el = document) {
    /* get-by-tagname ../../../../../../node_modules/kit/inc/core/function-expressions.sibilant:32:8 */

    return el.getElementsByTagName(tagname);
});
var glEl = getById("gl"),
    htmlTag = getByTagname("html")[0],
    container = getById("container");
var createEntitySelector = (function createEntitySelector$(entType) {
    /* create-entity-selector app/sib/interface.sibilant:11:0 */

    var name = entType.symbol.toString();
    return domNode("span", {
        id: name
    }, [
        ("spawn" + name),
        domNode("input", {
            type: "radio",
            name: "entity",
            onclick: (function(e) {
                /* app/sib/interface.sibilant:17:31 */

                return activeEntityType = entType;
            })
        }, [])
    ]);
});
var checkBoxes = Entity.types.map(createEntitySelector);
var entityMenu = domNode("div", {
    id: "entity-menu"
}, [...checkBoxes]);
entityMenu.render(container);
var getSideSize = (function getSideSize$(el, side) {
    /* get-side-size app/sib/interface.sibilant:29:0 */

    return el.getBoundingClientRect()[side];
});
var getSideOffset = (function getSideOffset$(el, side) {
    /* get-side-offset app/sib/interface.sibilant:33:0 */

    return (getSideSize(glEl, side) - getSideSize(htmlTag, side));
});
var getElementOffset = (function getElementOffset$(el) {
    /* get-element-offset app/sib/interface.sibilant:37:0 */

    return {
        x: getSideSize(el, "left"),
        y: getSideOffset(el, "top")
    };
});
var getRelativePointerLocation = (function getRelativePointerLocation$(el, e) {
    /* get-relative-pointer-location app/sib/interface.sibilant:41:0 */

    return (function(offset) {
        /* app/sib/meta/macros.sibilant:124:9 */

        return {
            x: ((e.clientX + window.pageXOffset) - offset.x),
            y: ((e.clientY + window.pageYOffset) - offset.y)
        };
    })(getElementOffset(el));
});
var getCellCoord = (function getCellCoord$(loc) {
    /* get-cell-coord app/sib/interface.sibilant:45:0 */

    return {
        x: Math.floor(((loc.x - 16) / sim.scale)),
        y: Math.floor(((loc.y - 16) / sim.scale))
    };
});
glEl.onmousedown = (function glEl$onmousedown$(e) {
    /* gl-el.onmousedown app/sib/interface.sibilant:51:0 */

    e.preventDefault();
    glEl.onmousemove = (function glEl$onmousemove$(e) {
        /* gl-el.onmousemove app/sib/interface.sibilant:54:2 */

        e.preventDefault();
        return (function(pointerLocation) {
            /* app/sib/meta/macros.sibilant:124:9 */

            return (function(selectedCell) {
                /* app/sib/meta/macros.sibilant:124:9 */

                return createInstanceOf(activeEntityType, selectedCell.x, selectedCell.y);
            })(getCellCoord(pointerLocation));
        })(getRelativePointerLocation(glEl, e));
    });
    return glEl.onmousemove;
});
glEl.onclick = (function glEl$onclick$(e) {
    /* gl-el.onclick app/sib/interface.sibilant:62:0 */

    e.preventDefault();
    return (function(pointerLocation) {
        /* app/sib/meta/macros.sibilant:124:9 */

        return (function(selectedCell) {
            /* app/sib/meta/macros.sibilant:124:9 */

            return createInstanceOf(activeEntityType, selectedCell.x, selectedCell.y);
        })(getCellCoord(pointerLocation));
    })(getRelativePointerLocation(glEl, e));
});
glEl.onmouseup = (function glEl$onmouseup$(e) {
    /* gl-el.onmouseup app/sib/interface.sibilant:71:0 */

    e.preventDefault();
    return glEl.onmousemove = null;
});
glEl.onclick = null;
