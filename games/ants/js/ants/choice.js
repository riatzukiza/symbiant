const Choice = { 
  symbol:Symbol("Choice"),
  choose( system = this.system,ant = this ){ 
    
      let sum = 0;
      let done = false;
      let choice = {
        x: ant.x,
        y: ant.y
      };
      let sated__QUERY = (ant._sated()) ? -1 : 1;
      let count = system.weights.count(ant.pos);
      let rand = (count * Math.random());
      eachWeight(system.weights.weights, ant, (w, i, j, x, y) => {
      	
        let ent = collision.get(x, y);
        return (function() {
          if ((!(ent) || ent === empty || ent === 0)) {
            sum += (w * sated__QUERY * ant.genetics.kernel.getCell(i, j) * ant.genetics.deviance * ((Ant.life * ant.life) / ant.genetics.deviance));
            return (function() {
              if ((rand < sum && !(done))) {
                choice.x = x;
                choice.y = y;
                return done = true;
              }
            }).call(this);
          }
        }).call(this);
      
      }, 3);
      return choice;
    
   }
 }