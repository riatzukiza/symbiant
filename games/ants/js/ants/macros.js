function eachWeight( weights = this.weights,pos = this.pos,f = this.f,size = 3,rad = Math.floor((size / 2)) ){ 
  
    "apply a function to every element in a kernel of the weight matrix.\n" +
    "Values are not changed unless done so explicitly by the function as a side effect.";
    return weights.state.eachInSub((pos.x - rad), (pos.y - rad), size, size, (v, i, j, x, y) => {
    	
      return f(v, i, j, (x + i), (y + j));
    
    });
  
 };
exports.eachWeight = eachWeight;
function mapWeights( weights = this.weights,pos = this.pos,f = this.f,size = 3,rad = Math.floor((size / 2)) ){ 
  
    "apply a function to every element in a kernel of the weight matrix,\n" +
    "assigning the weight value to the value returned";
    return eachWeight(weights, pos, (w, i, j, x, y) => {
    	
      return weights.set((x + i), (y + j), f(w, i, j, x, y));
    
    }, size, rad);
  
 };
exports.mapWeights = mapWeights;