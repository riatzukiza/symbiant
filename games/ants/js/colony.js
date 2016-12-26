import(Pheremones(), "./pheremons");
import(Entity(), "./entity");
import(Ant(eachWeight, mapWeights), "./ant");
import(create(extend, mixin), "./util");
import(StateSpace(), "./state-space");
let(yellow, {
  red: 255,
  green: 255,
  blue: 0
});
type(Colony, property(id, 1), property(colonies, (new Set())), init(name(nest, color, goals((new Set())), ants((new Set())), stats, collision, weights(create(StateSpace)(120, 120)), display, decay(0.1), colonies), colonies.add(this)), generic(serialize, mth(), ants(), map(ants.toArray(), ant(), ant.serialize())), generic(save, mth(), null, create(File)()), generic(load, mth(), null), generic(spawn, fluent(mth), count(nest, collision), print("spawning ants at nest", nest), eachInArea(collision, nest, =>(spot(i, j, x, y), Ant.spawn.call(this, x, y)), count)), generic(move, mth(), ants(weights, display, color, nest), "Process the movement of ever ant in a set of ants, updating weights along the way.", ants.each(=>(ant(), ant.move())), display.set(nest.x, nest.y, yellow)));
exports.Colony = Colony;