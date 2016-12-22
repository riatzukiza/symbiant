const Genetics = { 
  symbol:Symbol("Genetics"),
  mutate( ant = this.ant,weights = this.weights,nest = this.nest ){ 
    
      WeightField.emit(ant, weights, (ant.genetics.rate));
      ant.genetics.kernel.dmap((x) => {
      	
        return (x * (function() {
          /* eval.sibilant:43:8 */
        
          let rand = ((Math.random() * (0.2 - 0)) + 0);
          return (0.2 - (rand / 2));
        }).call(this));
      
      });
      ant.genetics.returnRate = (ant.genetics.returnRate + (function() {
        /* eval.sibilant:43:8 */
      
        let rand = ((Math.random() * (ant.genetics.mutationFactor - 0)) + 0);
        return (ant.genetics.mutationFactor - (rand / 2));
      }).call(this));ant.genetics.findRate = (ant.genetics.findRate + (function() {
        /* eval.sibilant:43:8 */
      
        let rand = ((Math.random() * (ant.genetics.mutationFactor - 0)) + 0);
        return (ant.genetics.mutationFactor - (rand / 2));
      }).call(this));ant.genetics.deviance = (ant.genetics.deviance + (function() {
        /* eval.sibilant:43:8 */
      
        let rand = ((Math.random() * (ant.genetics.mutationFactor - 0)) + 0);
        return (ant.genetics.mutationFactor - (rand / 2));
      }).call(this));ant.genetics.rate = (ant.genetics.rate + (function() {
        /* eval.sibilant:43:8 */
      
        let rand = ((Math.random() * (ant.genetics.mutationFactor - 0)) + 0);
        return (ant.genetics.mutationFactor - (rand / 2));
      }).call(this));
      return ant.life = Ant.life;
    
   }
 }