var systems = [];
var System = {  };
var e = Math.E;
var createInstanceOf = (function createInstanceOf$(type, args) {
  /* create-instance-of app/sib/game/systems.sibilant:6:0 */

  return create(type)(args);
});
var moore = (function moore$(x, y, field) {
  /* moore app/sib/game/systems.sibilant:27:0 */

  return create(MatrixView)(field, 3, 3, [ (x - 1), (y - 1) ]);
});
var countKernel = kernel(3, 3, [ [ 1, 1, 1 ], [ 1, 1, 1 ], [ 1, 1, 1 ] ]);
var averageKernel = countKernel.mult((1 / 9));
var identity = (function identity$() {
  /* identity app/sib/game/systems.sibilant:38:0 */

  return matrix(3, 3, [ 1, 1, 1, 1, 1, 1, 1, 1, 1 ]);
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
var inverseSquare = (function inverseSquare$(rate, c, pos, lit(x, y)) {
  /* inverse-square app/sib/game/systems.sibilant:62:0 */

  return (rate / (c + Math.pow(euclidianDistance(x, y, pos.x, pos.y), 2)));
});
specify(BitField, extend(FieldSystem));
defDescription(BitField, null, init(FieldSystem.init.apply(this, arguments)), var has = (function has$(x_y$1) {
  /* has app/sib/game/systems/collision.sibilant:7:2 */

  var x = x_y$1[0],
      y = x_y$1[1];

  return (function() {
    if (this.field.get(x, y) === 1) {
      return true;
    } else {
      return false;
    }
  }).call(this);
});, var add = (function add$(x_y$2) {
  /* add app/sib/game/systems/collision.sibilant:12:2 */

  var x = x_y$2[0],
      y = x_y$2[1];

  return (function() {
    if (!(this.has([ x, y ]))) {
      return this.field.set(x, y, 1);
    }
  }).call(this);
});, var delete = (function delete$(x_y$3) {
  /* delete app/sib/game/systems/collision.sibilant:19:2 */

  var x = x_y$3[0],
      y = x_y$3[1];

  return this.field.set(x, y, 0);
});, var move = (function move$(x_y$4, entity) {
  /* move app/sib/game/systems/collision.sibilant:25:2 */

  var x = x_y$4[0],
      y = x_y$4[1];

  return (function() {
    if (!(this.has([ x, y ]))) {
      this.field.set(entity.x, entity.y, 0);
      this.field.set(x, y, 1);
      entity.x = x;
      entity.y = y;
      return true;
    } else {
      return false;
    }
  }).call(this);
}););
var CollisionField = createInstanceOf(BitField, "CollisionField", false);
describe(CollisionField.Component, defGeneric(update, ticks(x, y, value, field), field.set(x, y, value)));
var background = createInstanceOf(FieldSystem, "background", true);
describe(background.Component, init(x(y, neiborhood(moore(x, y, this.field)))), r(0), g(0), b(0), a(255), defGeneric(update, null));
s().forEach((function(systems) {
  /* app/sib/game.sibilant:4:0 */

  return s.populate();
}));
var entities = [];
var lastOf = (function lastOf$(arr) {
  /* last-of app/sib/game/components.sibilant:12:0 */

  return arr.slice(-1)[0];
});
specify(Entity, extend(EventEmitter.prototype));
var registerEntityType = (function registerEntityType$(obj) {
  /* register-entity-type app/sib/game/entities.sibilant:4:0 */

  var t = extend(Entity, obj);
  Entity.types.push(t);
  return t;
});
describe(Entity, types([]), layer(sim.layers.get()), gett(pos, [ this.x, this.y ]), sett(pos, [ x, y ], setFor(this, x, y)), render(true), init(x(y, components, render__QUERY), (function() {
  if (!(this.spawned__QUERY)) {
    (function() {
      if (render__QUERY) {
        return this.layer.add(this);
      }
    }).call(this);
    entities.push(this);
    this.components = components.map(=>(T(), this[T.symbol] = createInstanceOf(T, this);));
    return this.spawned__QUERY = true;
  }
}).call(this)), var move = (function move$(x_y$5) {
  /* move app/sib/game/entities.sibilant:39:10 */

  var x = x_y$5[0],
      y = x_y$5[1];

  return Collision.move([ x, y ], this);
});, defGeneric(remove, entity(this)(layer), entities = R.without([ entity ], entities);, layer.delete(entity)), defGeneric(update, components(), comp().forEach((function(components) {
  /* app/sib/game/entities.sibilant:46:12 */

  return comp.update();
}))));
type(Movement);
type(Inertia);
defComponent(Inertia, value(), requireComponents(entity, Movement(Direction), Movement.value = [ (entity.x + Direction.value[0]), (entity.y + Direction.value[1]) ];));
type(Direction);
describe(Direction, value([ 1, 1 ]));
defComponent(Direction, value(direction(this)), "A vector, determined from speed and movement components.", requireComponents(entity, Movement(), this.value = [ (entity.x - Movement.value[0]), (entity.y - Movement.value[1]) ];));
type(Collision);
defDescription(Collision, entity(fieldElement(CollisionField.add(entity.pos))), defGeneric(update, entity(), CollisionField.move(entity.pos, entity)));
specify(Boundry, registerEntityType());
defDescription(Boundry, x(y, components), components([ Collision ]), init(Entity.init.call(this, x, y, components, true), print("Makin boundry at ", this.x, this.y, this.pos)), r(255), g(128), b(0), a(255));
var buildBoundries = (function buildBoundries$() {
  /* build-boundries app/sib/game/entities.sibilant:128:0 */

  forUpTo(x, 100, createInstanceOf(Boundry, x, 0), createInstanceOf(Boundry, x, 99));
  forUpTo(y, 100, createInstanceOf(Boundry, 0, y), createInstanceOf(Boundry, 99, y));
  return null;
});
specify(Agent, registerEntityType());
var probProd = (function probProd$(arr) {
  /* prob-prod app/sib/game/entities/probs.sibilant:2:0 */

  return arr.reduce(=>(v(comp), (v * (comp.value / comp.max))), 1);
});
var reduceUntil = (function reduceUntil$(matrix, cond, f, value) {
  /* reduce-until app/sib/game/entities/probs.sibilant:6:0 */

  var break__QUERY = false;
  loop(forUpTo(x, matrix.width, if__BANG(break__QUERY, break)), forUpTo(y, matrix.height, var cell = matrix.get(x, y);, value = f(value, cell, x, y, matrix);, if__BANG(cond(value, cell, x, y, matrix), break__QUERY = true;, break)));
  return value;
});
var decide = (function decide$(random) {
  /* decide app/sib/game/entities/probs.sibilant:22:0 */

  return =>([ counter ](), counter >= random);
});
var incrementCounter = (function incrementCounter$(counter$1, p, x, y) {
  /* increment-counter app/sib/game/entities/probs.sibilant:24:0 */

  var counter = counter$1[0];

  return [ (counter + p), x, y ];
});
var selectRandomLocation = (function selectRandomLocation$(matrix) {
  /* select-random-location app/sib/game/entities/probs.sibilant:26:0 */

  var total = countKernel.convolve(matrix),
      prob = matrix.map(=>(v(), (v / total)));
  return reduceUntil(prob, decide(Math.random()), incrementCounter, [ 0, 0, 0 ]).slice(1);
});
var conditionalProbability = probProd;
type(ProbabilitySpace);
describe(ProbabilitySpace, init(matrix()), gett(total, countKernel.convolve(this.matrix)), gett(prob, this.matrix.map(=>(v(), (v / this.total)))), defGeneric(getTotal, matrix(), countKernel.convolve(matrix)), defGeneric(getProbabilityMatrix, matrix(total(ProbabilitySpace.getTotal(matrix))), matrix.map(=>(v(), (v / total)))), var joint = (function joint$(probs) {
  /* joint app/sib/game/entities/probs.sibilant:50:10 */

  return probs.reduce(mult, identity());
});, defGeneric(randomLocation, prob(), reduceUntil(prob, decide(Math.random()), incrementCounter, [ 0, 0, 0 ]).slice(1)));
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
defCurried(localJointProbability, entity(prob, field), let_(na(field.get(entity.x, entity.y).neiborhood)(location(na)), prob.mult(location)));
var mult = (function mult$(a, b) {
  /* mult app/sib/game/entities/probs.sibilant:69:0 */

  return a.mult(b);
});
defCurried(localJointOf, arr(entity), arr.reduce(localJointProbability(entity), identity()));
var randomNeighbor = (function randomNeighbor$(entity, kernels, probabilitySpace) {
  /* random-neighbor app/sib/game/entities/probs.sibilant:74:0 */

  return ProbabilitySpace.randomLocation(ProbabilitySpace.getProbabilityMatrix(localJointOf(kernels, entity)));
});
describe(Movement, sett(value, value, this._value = value;), gett(value, (function() {
  if (this._value) {
    return this._value;
  } else {
    return [ this.entity.x, this.entity.y ];
  }
}).call(this)));
defComponent(Movement, Movement(this)(), "A container for future movement positions.", CollisionField.move(Movement.value, entity));
defComponent(Direction, value(direction(this)), "A vector, determined from speed and movement components.", requireComponents(entity, Movement()));
type(MapView);
defComponent(MapView, null);
type(Pathing);
var countKernel = kernel(3, 3, [ [ 1, 1, 1 ], [ 1, 1, 1 ], [ 1, 1, 1 ] ]);
defComponent(Pathing, null, requireComponents(entity, RoadMapView(Direction), Direction.value = let_(viewMatrix(RoadMapView._viewMatrix)(count(0), r([ 0, 0 ]), locs([]), sum(0)), v(x, y).forEach((function(viewMatrix) {
  /* app/sib/game/entities/random-walk.sibilant:53:13 */

  return count += v;
})), v(x, y).forEach((function(viewMatrix) {
  /* app/sib/game/entities/random-walk.sibilant:55:13 */

  return (function() {
    if (!(v === 0)) {
      return locs.push([ v, (x - 1), (y - 1) ]);
    }
  }).call(this);
})), var rand = randomInt(locs.length);, forUpTo(i, locs.length, var l = locs[i];, sum += l[0], r = locs[i].slice(1);, if__BANG(sum > rand, break)), r);));
type(RoadMapView);
defComponent(RoadMapView, _viewMatrix(moore(entity.pos, RoadMap.field))(), this._viewMatrix.offset = [ (entity.x - 1), (entity.y - 1) ];);
describe(Agent, render__QUERY(true), r(255), g(255), b(255), a(255), components([ Inertia, RoadMapView, Movement, Direction, Collision, Pathing ]));
var goals = (new Set());
specify(Goal, registerEntityType());
defDescription(Goal, x(y, components), render__QUERY(true), init(goals.add(this), Entity.init.apply(this, arguments)), components([ Collision ]), r(0), g(255), b(10), a(255));
specify(Home, registerEntityType());
describe(Home, r(0), g(20), b(255));
var RoadMap = createInstanceOf(BitField, "RoadMap", false);
specify(RoadEntity, registerEntityType());
type(RoadFieldElement);
defComponent(RoadFieldElement, fieldComponent(RoadMap.add(entity.pos))());
describe(RoadEntity, render__QUERY(true), r(80), g(80), b(80), a(255), components([ RoadFieldElement ]));
var ConjestionField = createInstanceOf(FieldSystem, "ConjestionField", true);
defDescription(ConjestionField, null, r(255), g(0), b(0), a(255), decay(0.1));
defComponent(ConjestionField.Component, ticks(x, y, value, field, decay), field.set(x, y, (function() {
  if (value > decay) {
    return (value - decay);
  } else {
    return 0;
  }
}).call(this)));