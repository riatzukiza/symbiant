const List = require("./list");
const Run = { 
  symbol:Symbol("Run"),
  init( array = this.array,value = this.value,start = this.start,end = this.end,prev = this.prev ){ 
    
      this.array = array;this.value = value;this.start = start;this.end = end;this.prev = prev;
      (function() {
        if (prev) {
          return prev.next = this;
        }
      }).call(this);
      return this;
    
   },
  has( n = this.n ){ 
    
      return this.value === n === 0;
    
   },
  before__QUERY( i = this.i,start = this.start ){ 
    
      return i <= start;
    
   },
  after__QUERY( i = this.i,end = this.end ){ 
    
      return i >= end;
    
   },
  between__QUERY( i = this.i,start = this.start,end = this.end ){ 
    
      return (i >= start && i <= end);
    
   },
  each( callback = this.callback,start = this.start,end = this.end,array = this.array ){ 
    (function() {
      /* macros/js/index.sibilant:82:8 */
    
      let r = this;
      for (let i = start;start < end;++(i)){
      callback(array[i], i)};
      return r;
    }).call(this)
   }
 };
const RunIndexedArray = { 
  symbol:Symbol("RunIndexedArray"),
  init( array = this.array,indexes = [] ){ 
    
      this.array = array;this.indexes = indexes;
      let run = create(Run)(array, false, 0, 0, null, null);
      array.each((el, i) => {
      	
        return (function() {
          if (run.has(el)) {
            return run.end = i;
          } else {
            run = create(Run)(array, !(run.value), i, i, run);
            return indexes.push(run);
          }
        }).call(this);
      
      });
      return this;
    
   },
  push( v = this.v ){ 
    
   },
  pop( v = this.v ){ 
    
   },
  search( i = this.i,left = 0,right = (indexes.length - 1),m = Math.floor(((left + right) / 2)) ){ 
    
      let t = indexes[m];
      return (function() {
        if (t.after__QUERY(i)) {
          return this.search(i, left, right = (m - 1));
        } else if (t.before__QUERY(i)) {
          return this.search(i, left = (m + 1), right);
        } else if (t.between__QUERY(i)) {
          return t;
        } else {
          throw (new Error("this is not supose to happen, binary search failed fataly"))
        }
      }).call(this);
    
   },
  set( i = this.i,v = this.v,array = this.array ){ 
    
      let t = search(this, i);
      array[i] = v;
      return (function() {
        if (t.has(v)) {
          return (function() {
            if (i === t.prev.end) {
              --(t.prev.end);
              return --(t.start);
            } else if (i === t.next.start) {
              ++(t.next.start);
              return ++(t.start);
            }
          }).call(this);
        } else {
          let run = create(Run)(array, v === 0, i, i, this);
          return prev.end = (i - 1);
        }
      }).call(this);
    
   },
  get( i = this.i ){ 
    
   },
  each( f = this.f,indexes = this.indexes ){ 
    
      indexes.each((run) => {
      	
        return (function() {
          if (run.value) {
            return run.each(f);
          }
        }).call(this);
      
      });
      return this;
    
   },
  map( f = this.f,indexes = this.indexes ){ 
    
   }
 };