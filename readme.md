# Symbiants

Symbiants is a Probabalistic (Stoastic) Cellular automata, initially started as a visualization of Ant Colony Optimization algorithims,
it has become a bit more than that. Symbiants is currently under active development, and its true nature is not yet known.
Currently, a 120 by 120 grid is spawned with 1000 random plants, and one colony of 100 red ants, whos objective is to
eat as many of the plants as possible. Ants can be sated, meaning they have eaten enough food to reproduce upon 
successfully returning to their nest (which is currently not visualized). An ant can also split off to become a new colony, this
is the newest feature of the simulation. This happens when an ant has become very large with out ever reproducing. A new colony
will choose from the list of entity groups (plants and ants currently) a food group. This decision is probabalistic, based on the sum total life of all entities in the group. Entity groups with a large total life, are more likely to be chosen as food groups for new colonies of ants. The automatic speciation of ants is highly unstable right now, it is currently under going optimizations, because as soon as it happens, the game begins to slow down. This is because the weights that the ants use to make decisions are itterated through one by one to be updated.

Keep posted, highly wip.
