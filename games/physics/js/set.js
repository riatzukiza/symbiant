Set.prototype.union = function union( setB ){ 
  (function() {
    /* macros/js/index.sibilant:82:8 */
  
    let union = (new Set(this));
    for( let elem of setB ) {
     
      union.add(elem)
    
    };
    return union;
  }).call(this)
 };
Set.prototype.intersection = function intersection( setB ){ 
  (function() {
    /* macros/js/index.sibilant:82:8 */
  
    let intersection = (new Set());
    for( let elem of setB ) {
     
      (function() {
      if (this.has(elem)) {
        return intersection.add(elem);
      }
    }).call(this)
    
    };
    return intersection;
  }).call(this)
 };
Set.prototype.difference = function difference( setB ){ 
  (function() {
    /* macros/js/index.sibilant:82:8 */
  
    let difference = (new Set(this));
    for( let elem of setB ) {
     
      difference.delete(elem)
    
    };
    return difference;
  }).call(this)
 };
Set.prototype.toArray = function toArray(  ){ 
  [ ...this ]
 };