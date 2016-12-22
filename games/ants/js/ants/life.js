const Life = { 
  symbol:Symbol("Life"),
  _hasDiscoveredFood( goals = this.goals,collision = this.collision,ant = this.ant ){ 
    
      let true__QUERY = false;
      eachWeight(collision, ant, (spot, i, j, x, y) => {
      	
        return (function() {
          if ((goals.has(spot) && this.life < 1000)) {
            goals.delete(spot);
            collision.set(x, y, empty);
            return true__QUERY = true;
          }
        }).call(this);
      
      }, 5);
      return true__QUERY;
    
   },
  _eat( weights = this.weights,ant = this.ant ){ 
    
      ant.life = (ant.life + Ant.life);
      let emission = (ant.genetics.rate * ant.genetics.findRate * (ant.life / Ant.life));
      return WeightField.emit(ant, weights, emission, 120);
    
   },
  _reproduce( nest = this.nest,ant = this.ant,weights = this.weights ){ 
    
      console.log("ant is making babies");
      ant.life = (ant.life / 2);
      ant.mutate();
      ant.spawn(ant.x, ant.y);
      ant.spawn((1 + ant.x), (1 + ant.y));
      return WeightField.emit(ant, weights, (ant.genetics.rate * (ant.life / Ant.life)), 120);
    
   },
  _die( weights = this.weights,ant = this.ant,ants = this.ants,collision = this.collision ){ 
    
      ants.delete(ant);
      collision.set(ant.x, ant.y, empty);
      return WeightField.emit(ant, weights, (-1 * ant.genetics.rate * (ant.life / Ant.life)), 120);
    
   },
  _sated( nest = this.nest,ant = this ){ 
    
      return ant.life > Ant.life;
    
   },
  _nearNest( nest = this.nest,ant = this.ant,collision = this.collision ){ 
    
      return (function() {
        /* eval.sibilant:14:8 */
      
        let true__QUERY = false;
        eachWeight(collision, ant, (spot, i, j, x, y) => {
        	
          return (function() {
            if ((nest.x === x && nest.y === y)) {
              return true__QUERY = true;
            }
          }).call(this);
        
        }, 10);
        return true__QUERY;
      }).call(this);
    
   }
 }