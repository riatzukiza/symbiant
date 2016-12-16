const { 
  create,
  extend,
  mixin
 } = require("./util");
const $ = require("jquery/dist/jquery.min.js");
let canvas = document.getElementById("game");
let context = $("#container");
const { 
  emitPheremones,
  Ant
 } = require("./ant");
var interface = (function interface$(sim) {
  /* interface eval.sibilant:14:0 */

  canvas.onselectstart = () => {
  	
    return false;
  
  };
  $(canvas).css("transform", "scale(5)").css("top", "1200px").css("left", "1200px").css("position", "absolute");
  let Controls = (function(context) {
    /* macros/jquery.sibilant:14:9 */
  
    var here = $("<div>", {
      class: "panel",
      id: "Controls"
    });
    context.append(here);
    context = here;
    let heading = (function(context) {
      /* macros/jquery.sibilant:14:9 */
    
      var here = $("<b>", {
        text: "Controls",
        class: "bordered"
      });
      context.append(here);
      context = here;
      return here;
    })(context);
    ;
    here.css("margin-top", "600px").css("z-index", "9999");
    let draw = (function(context) {
      /* macros/jquery.sibilant:14:9 */
    
      var here = $("<div>", {
        class: "panel",
        id: "draw"
      });
      context.append(here);
      context = here;
      let heading = (function(context) {
        /* macros/jquery.sibilant:14:9 */
      
        var here = $("<b>", {
          text: "draw",
          class: "bordered"
        });
        context.append(here);
        context = here;
        return here;
      })(context);
      ;
      let draw__QUERY = (function(context) {
        /* macros/jquery.sibilant:14:9 */
      
        var here = $("<div>", { text: "draw__QUERY" });
        context.append(here);
        context = here;
        let input = (function(context) {
          /* macros/jquery.sibilant:14:9 */
        
          var here = $("<input>", {
            type: "checkBox",
            width: 20,
            value: false
          });
          context.append(here);
          context = here;
          return here;
        })(context);
        ;
        here = input;
        return here;
      })(context);
      ;
      let ant = (function(context) {
        /* macros/jquery.sibilant:14:9 */
      
        var here = $("<div>", { text: "ant" });
        context.append(here);
        context = here;
        let input = (function(context) {
          /* macros/jquery.sibilant:14:9 */
        
          var here = $("<input>", {
            type: "radio",
            width: 20,
            value: "ant"
          });
          context.append(here);
          context = here;
          return here;
        })(context);
        ;
        here = input;
        return here;
      })(context);
      ;
      let pheremones = (function(context) {
        /* macros/jquery.sibilant:14:9 */
      
        var here = $("<div>", { text: "pheremones" });
        context.append(here);
        context = here;
        let input = (function(context) {
          /* macros/jquery.sibilant:14:9 */
        
          var here = $("<input>", {
            type: "radio",
            width: 20,
            value: "pheremones"
          });
          context.append(here);
          context = here;
          return here;
        })(context);
        ;
        here = input;
        return here;
      })(context);
      ;
      let xDiff = 0;
      let yDiff = 0;
      // mouseDown(canvas, xDiff = x;
      // yDiff = y;);
      // (function() {
      //   /* macros/jquery.sibilant:42:8 */
      // 
      //   let dragging__QUERY = false;
      //   return $(canvas).mousedown(() => {
      //   	
      //     return dragging__QUERY = true;
      //   
      //   }).mouseup(() => {
      //   	
      //     return dragging__QUERY = false;
      //   
      //   }).mousemove((e) => {
      //   	
      //     let x = Math.floor(((e.pageX - canvas.offsetLeft) / sim.display.cellSize));
      //     let y = Math.floor(((e.pageY - canvas.offsetTop) / sim.display.cellSize));
      //     ;
      //     return (function() {
      //       if (dragging__QUERY) {
      //         return (function() {
      //           if (ant.is(":checked")) {
      //             return Ant.spawn(x, y, sim.ants, sim);
      //           } else if (pheremones.is(":checked")) {
      //             return emitPheremones({ 
      //               x,
      //               y
      //              }, sim.weights, sim.emissionRate);
      //           }
      //         }).call(this);
      //       }
      //     }).call(this);
      //   
      //   });
      // }).call(this);
      return here;
    })(context);
    ;
    let simulationControls = (function(context) {
      /* macros/jquery.sibilant:14:9 */
    
      var here = $("<div>", {
        class: "panel",
        id: "simulationControls"
      });
      context.append(here);
      context = here;
      let heading = (function(context) {
        /* macros/jquery.sibilant:14:9 */
      
        var here = $("<b>", {
          text: "simulationControls",
          class: "bordered"
        });
        context.append(here);
        context = here;
        return here;
      })(context);
      ;
      let weightConstant = (function(context) {
        /* macros/jquery.sibilant:14:9 */
      
        var here = $("<div>", { text: "weightConstant" });
        context.append(here);
        context = here;
        let input = (function(context) {
          /* macros/jquery.sibilant:14:9 */
        
          var here = $("<input>", {
            width: 20,
            value: sim.weightConstant
          });
          context.append(here);
          context = here;
          return here;
        })(context);
        ;
        here = input;
        return here;
      })(context);
      ;
      let emissionRate = (function(context) {
        /* macros/jquery.sibilant:14:9 */
      
        var here = $("<div>", { text: "emissionRate" });
        context.append(here);
        context = here;
        let input = (function(context) {
          /* macros/jquery.sibilant:14:9 */
        
          var here = $("<input>", {
            width: 20,
            value: sim.emissionRate
          });
          context.append(here);
          context = here;
          return here;
        })(context);
        ;
        here = input;
        return here;
      })(context);
      ;
      let decay = (function(context) {
        /* macros/jquery.sibilant:14:9 */
      
        var here = $("<div>", { text: "decay" });
        context.append(here);
        context = here;
        let input = (function(context) {
          /* macros/jquery.sibilant:14:9 */
        
          var here = $("<input>", {
            width: 20,
            value: sim.decay
          });
          context.append(here);
          context = here;
          return here;
        })(context);
        ;
        here = input;
        return here;
      })(context);
      ;
      let killAll = (function(context) {
        /* macros/jquery.sibilant:14:9 */
      
        var here = $("<button>", {  });
        context.append(here);
        context = here;
        here.text("killAll");
        $(here).click((function(e) {
          /* eval.sibilant:11:22 */
        
          console.log("clicked", here);
          sim.ants = (new Set());
          return sim.stats = { 
            returningAnts:0,
            emittingAnts:0,
            successfulReturns:0
           };
        }));
        return here;
      })(context);
      ;
      let clearWeights = (function(context) {
        /* macros/jquery.sibilant:14:9 */
      
        var here = $("<button>", {  });
        context.append(here);
        context = here;
        here.text("clearWeights");
        $(here).click((function(e) {
          /* eval.sibilant:11:22 */
        
          console.log("clicked", here);
          return sim.weights.clear();
        }));
        return here;
      })(context);
      ;
      let spawn = (function(context) {
        /* macros/jquery.sibilant:14:9 */
      
        var here = $("<button>", {  });
        context.append(here);
        context = here;
        here.text("spawn");
        $(here).click((function(e) {
          /* eval.sibilant:11:22 */
        
          console.log("clicked", here);
          console.log("spawning to ", sim.display);
          return Ant.spawn(sim.nest.x, sim.nest.y, sim.ants, sim.nest, 1, sim.weightConstant, sim.emissionRate, {
            red: 255,
            green: 0,
            blue: 0
          }, false);
        }));
        return here;
      })(context);
      ;
      let change = (function(context) {
        /* macros/jquery.sibilant:14:9 */
      
        var here = $("<button>", {  });
        context.append(here);
        context = here;
        here.text("change");
        $(here).click((function(e) {
          /* eval.sibilant:11:22 */
        
          console.log("clicked", here);
          console.log("changing simvars from", sim);
          return sim.once("tick", () => {
          	
            sim.decay = parseFloat(decay.val(), 10);
            sim.emissionRate = parseFloat(emissionRate.val(), 10);
            return sim.weightConstant = parseFloat(weightConstant.val(), 10);
          
          });
        }));
        return here;
      })(context);
      ;
      return here;
    })(context);
    ;
    let displayControls = (function(context) {
      /* macros/jquery.sibilant:14:9 */
    
      var here = $("<div>", {
        class: "panel",
        id: "displayControls"
      });
      context.append(here);
      context = here;
      let heading = (function(context) {
        /* macros/jquery.sibilant:14:9 */
      
        var here = $("<b>", {
          text: "displayControls",
          class: "bordered"
        });
        context.append(here);
        context = here;
        return here;
      })(context);
      ;
      let height = (function(context) {
        /* macros/jquery.sibilant:14:9 */
      
        var here = $("<div>", { text: "height" });
        context.append(here);
        context = here;
        let input = (function(context) {
          /* macros/jquery.sibilant:14:9 */
        
          var here = $("<input>", {
            width: 20,
            value: 120
          });
          context.append(here);
          context = here;
          return here;
        })(context);
        ;
        here = input;
        return here;
      })(context);
      ;
      let width = (function(context) {
        /* macros/jquery.sibilant:14:9 */
      
        var here = $("<div>", { text: "width" });
        context.append(here);
        context = here;
        let input = (function(context) {
          /* macros/jquery.sibilant:14:9 */
        
          var here = $("<input>", {
            width: 20,
            value: 120
          });
          context.append(here);
          context = here;
          return here;
        })(context);
        ;
        here = input;
        return here;
      })(context);
      ;
      let cellSize = (function(context) {
        /* macros/jquery.sibilant:14:9 */
      
        var here = $("<div>", { text: "cellSize" });
        context.append(here);
        context = here;
        let input = (function(context) {
          /* macros/jquery.sibilant:14:9 */
        
          var here = $("<input>", {
            width: 20,
            value: 5
          });
          context.append(here);
          context = here;
          return here;
        })(context);
        ;
        here = input;
        return here;
      })(context);
      ;
      let toggle = (function(context) {
        /* macros/jquery.sibilant:14:9 */
      
        var here = $("<button>", {  });
        context.append(here);
        context = here;
        here.text("toggle");
        $(here).click((function(e) {
          /* eval.sibilant:11:22 */
        
          console.log("clicked", here);
          return sim.toggle();
        }));
        return here;
      })(context);
      ;
      let randomize = (function(context) {
        /* macros/jquery.sibilant:14:9 */
      
        var here = $("<button>", {  });
        context.append(here);
        context = here;
        here.text("randomize");
        $(here).click((function(e) {
          /* eval.sibilant:11:22 */
        
          console.log("clicked", here);
          return display.randomize().update().render();
        }));
        return here;
      })(context);
      ;
      let empty = (function(context) {
        /* macros/jquery.sibilant:14:9 */
      
        var here = $("<button>", {  });
        context.append(here);
        context = here;
        here.text("empty");
        $(here).click((function(e) {
          /* eval.sibilant:11:22 */
        
          console.log("clicked", here);
          return display.empty().update().empty().render();
        }));
        return here;
      })(context);
      ;
      let resize = (function(context) {
        /* macros/jquery.sibilant:14:9 */
      
        var here = $("<button>", {  });
        context.append(here);
        context = here;
        here.text("resize");
        $(here).click((function(e) {
          /* eval.sibilant:11:22 */
        
          console.log("clicked", here);
          console.log(width, height, cellSize);
          var w = width.val(),
              h = height.val(),
              c = cellSize.val();
          console.log(w, h, c);
          return sim.once("tick", () => {
          	
            weights.resize().update();
            return display.resize(w, h, c).update();
          
          });
        }));
        return here;
      })(context);
      ;
      return here;
    })(context);
    ;
    let stats = (function(context) {
      /* macros/jquery.sibilant:14:9 */
    
      var here = $("<div>", {
        class: "panel",
        id: "stats"
      });
      context.append(here);
      context = here;
      let heading = (function(context) {
        /* macros/jquery.sibilant:14:9 */
      
        var here = $("<b>", {
          text: "stats",
          class: "bordered"
        });
        context.append(here);
        context = here;
        return here;
      })(context);
      ;
      let weightAtMouse = (function(context) {
        /* macros/jquery.sibilant:14:9 */
      
        var here = $("<div>", { text: "weightAtMouse" });
        context.append(here);
        context = here;
        let counter = (function(context) {
          /* macros/jquery.sibilant:14:9 */
        
          var here = $("<span>", {  });
          context.append(here);
          context = here;
          return here;
        })(context);
        ;
        here = counter;
        let mx = 0;
        let my = 0;
        $(canvas).mousemove((function(e) {
          /* macros/jquery.sibilant:57:14 */
        
          let cursor = {
            x: (e.pageX - canvas.offsetLeft),
            y: (e.pageY - canvas.offsetTop)
          };
          let x = Math.floor(((e.pageX - canvas.offsetLeft) / sim.display.cellSize));
          let y = Math.floor(((e.pageY - canvas.offsetTop) / sim.display.cellSize));
          ;
          here.text(sim.weights.get(mx, my));
          mx = x;
          return my = y;
        }));
        sim.on("tick", () => {
        	
          return here.text(sim.weights.get(mx, my));
        
        });
        return here;
      })(context);
      ;
      let antsCount = (function(context) {
        /* macros/jquery.sibilant:14:9 */
      
        var here = $("<div>", { text: "antsCount" });
        context.append(here);
        context = here;
        let counter = (function(context) {
          /* macros/jquery.sibilant:14:9 */
        
          var here = $("<span>", {  });
          context.append(here);
          context = here;
          return here;
        })(context);
        ;
        here = counter;
        sim.on("tick", () => {
        	
          return here.text(sim.ants.size);
        
        });
        return here;
      })(context);
      ;
      let successfulReturnsCount = (function(context) {
        /* macros/jquery.sibilant:14:9 */
      
        var here = $("<div>", { text: "successfulReturnsCount" });
        context.append(here);
        context = here;
        let counter = (function(context) {
          /* macros/jquery.sibilant:14:9 */
        
          var here = $("<span>", {  });
          context.append(here);
          context = here;
          return here;
        })(context);
        ;
        here = counter;
        sim.on("tick", () => {
        	
          return here.text(sim.stats.successfulReturns);
        
        });
        return here;
      })(context);
      ;
      let huntingAntsCount = (function(context) {
        /* macros/jquery.sibilant:14:9 */
      
        var here = $("<div>", { text: "huntingAntsCount" });
        context.append(here);
        context = here;
        let counter = (function(context) {
          /* macros/jquery.sibilant:14:9 */
        
          var here = $("<span>", {  });
          context.append(here);
          context = here;
          return here;
        })(context);
        ;
        here = counter;
        sim.on("tick", () => {
        	
          return here.text((sim.ants.size - sim.stats.returningAnts));
        
        });
        return here;
      })(context);
      ;
      let returningAntsCount = (function(context) {
        /* macros/jquery.sibilant:14:9 */
      
        var here = $("<div>", { text: "returningAntsCount" });
        context.append(here);
        context = here;
        let counter = (function(context) {
          /* macros/jquery.sibilant:14:9 */
        
          var here = $("<span>", {  });
          context.append(here);
          context = here;
          return here;
        })(context);
        ;
        here = counter;
        sim.on("tick", () => {
        	
          return here.text(sim.stats.returningAnts);
        
        });
        return here;
      })(context);
      ;
      let tick = (function(context) {
        /* macros/jquery.sibilant:14:9 */
      
        var here = $("<div>", { text: "tick" });
        context.append(here);
        context = here;
        let counter = (function(context) {
          /* macros/jquery.sibilant:14:9 */
        
          var here = $("<span>", {  });
          context.append(here);
          context = here;
          return here;
        })(context);
        ;
        here = counter;
        sim.on("tick", (now, tick) => {
        	
          return here.text(tick);
        
        });
        return here;
      })(context);
      ;
      let frameDelay = (function(context) {
        /* macros/jquery.sibilant:14:9 */
      
        var here = $("<div>", { text: "frameDelay" });
        context.append(here);
        context = here;
        let counter = (function(context) {
          /* macros/jquery.sibilant:14:9 */
        
          var here = $("<span>", {  });
          context.append(here);
          context = here;
          return here;
        })(context);
        ;
        here = counter;
        sim.on("tick", (now, tick) => {
        	
          return here.text(parseInt(sim.elapsed, 10));
        
        });
        return here;
      })(context);
      ;
      return here;
    })(context);
    ;
    return here;
  })(context);
  ;
  return context;
});
exports.interface = interface;