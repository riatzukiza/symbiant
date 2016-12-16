const { 
  create,
  extend,
  mixin
 } = require("./util");
const { 
  Matrix
 } = require("./matrix");
const StateSpace = { 
  symbol:Symbol("StateSpace"),
  init( width = this.width,height = this.height,state = create(Matrix)([], height, width).dmap((function() {
    /* eval.sibilant:16:57 */
  
    return 0;
  })),transition = create(Matrix)([], height, width).dmap((function() {
    /* eval.sibilant:16:57 */
  
    return 0;
  })) ){ 
    
      this.width = width;this.height = height;this.state = state;this.transition = transition;
      return this;
    
   },
  resize( w = this.w,h = this.h,c = this.c ){ 
    
      return this.init.call(this, w, h);
    
   },
  get( x = this.x,y = this.y,state = this.state ){ 
    
      return this.getState(x, y, state);
    
   },
  getState( x = this.x,y = this.y,state = this.state ){ 
    
      return state.getCell(x, y);
    
   },
  getTransition( x = this.x,y = this.y,transition = this.transition ){ 
    
      return transition.getCell(x, y);
    
   },
  set( x = this.x,y = this.y,value = this.value,transition = this.transition ){ 
    
      return this.setTransition(x, y, value, transition);
    
   },
  setState( x = this.x,y = this.y,value = this.value,state = this.state ){ 
    
      return state.setCell(x, y, value);
    
   },
  setTransition( x = this.x,y = this.y,value = this.value,transition = this.transition ){ 
    
      return transition.setCell(x, y, value);
    
   },
  eachState( f = this.f,state = this.state ){ 
    
      state.each(f);
      return this;
    
   },
  each( f = this.f,state = this.state ){ 
    
      state.each(f);
      return this;
    
   },
  transit( f = this.f,state = this.state,transition = this.transition ){ 
    
      return state.transit(transition, f);
    
   },
  eachTransition( f = this.f,transition = this.transition ){ 
    
      transition.each(f);
      return this;
    
   },
  clearTransitions( width = this.width,height = this.height ){ 
    
      var r = create(Matrix)([], width, height),
          setTransition = () => {
      	
        return 0;
      
      };
      return this.transition = r.dmap(setTransition);
    
   },
  clearStates( width = this.width,height = this.height ){ 
    
      var r = create(Matrix)([], width, height),
          setState = () => {
      	
        return 0;
      
      };
      return this.state = r.dmap(setState);
    
   },
  update( f = this.f,state = this.state,transition = this.transition ){ 
    
      this.state = transition;
      this.transition = state;
      return this;
    
   }
 };
exports.StateSpace = StateSpace;