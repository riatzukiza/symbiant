Set.prototype.union = function union( setB ){ 
  
    let union = (new Set(this));
    for( let elem of setB ) {
     
      union.add(elem)
    
    };
    return union;
  
 };
Set.prototype.intersection = function intersection( setB ){ 
  
    let intersection = (new Set());
    for( let elem of setB ) {
     
      (function() {
      if (this.has(elem)) {
        return intersection.add(elem);
      }
    }).call(this)
    
    };
    return intersection;
  
 };
Set.prototype.difference = function difference( setB ){ 
  
    let difference = (new Set(this));
    for( let elem of setB ) {
     
      difference.delete(elem)
    
    };
    return difference;
  
 };
Set.prototype.toArray = function toArray(  ){ 
  [ ...this ]
 };ce = (new Set(this));
    for( let elem of setB ) {
     
      difference.delete(elem)
    
    };
    return difference;
  }).call(this)
 };
Set.prototype.toArray = function toArray(  ){ 
  [ ...this ]
 };