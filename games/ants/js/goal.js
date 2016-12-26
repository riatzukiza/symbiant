import(Matrix(), "./matrix");
import(create(extend, mixin), "./util");
import(Entity(), "./entity");
let(empty, Entity.empty);
var makePool = (function makePool$(width, entType) {
  /* make-pool eval.sibilant:5:0 */

  return create(Matrix)([], width, width).dmap((function(nil, x, y) {
    /* eval.sibilant:7:9 */
  
    return create(entType)(x, y, 0, 0, 0, 0);
  }));
});
type(Plant, init(pos(system)), generic(spawn, mth(), x(y, system, plant(this)), let(ent, system.sim.coord.get(x, y)), (function() {
  if (!(system.entities.has(ent))) {
    print("spawning plant");
    let(data, {
      x: x,
      y: y,
      r: system.color.red,
      g: system.color.green,
      b: system.color.blue,
      a: 255
    });
    this.pos = ent;
    system.layer.add(data);
    return system.entities.add(ent);
  }
}).call(this)), gmth(grow, x(y, system), (function() {
  if (randomBit() === 1) {
    return requestAnimationFrame(->(Plant.spawn((goal.x + (Math.floor((Math.random() * (2 - -2))) + -2)), (goal.y + (Math.floor((Math.random() * (2 - -2))) + -2)), system)), 0);
  }
}).call(this)));
type(System, property(pool, Matrix), init(pMap(red(entityType), green(sim), blue(pool(makePool(entityType, sim.coord.width))))), generic(build, mth(), entityType(color, methods)), generic(random, mth(), entityType(sim), entityType.spawn((Math.floor((Math.random() * (sim.coord.width - 0))) + 0), (Math.floor((Math.random() * (sim.coord.width - 0))) + 0), this)), generic(update, mth(), null));
exports.System = System;