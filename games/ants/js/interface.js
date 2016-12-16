const { 
  create,
  extend,
  mixin
 } = require("./util");
const $ = require("jquery/dist/jquery.min.js");
let canvasa = document.getElementById("game");
let canvasb = document.getElementById("gameb");
let context = $("#container");
const { 
  emitPheremones,
  Ant
 } = require("./ant");
var interface = (function interface$(sim) {
  /* interface eval.sibilant:15:0 */

  canvasa.onselectstart = () => {
  	
    return false;
  
  };
  canvasb.onselectstart = () => {
  	
    return false;
  
  };
  $(canvasa).css("transform", "scale(5)").css("top", "1200px").css("left", "1200px").css("position", "absolute");
  $(canvasb).css("transform", "scale(5)").css("top", "1200px").css("left", "1200px").css("position", "absolute").hide();
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
    let colonies = (function(context) {
      /* macros/jquery.sibilant:14:9 */
    
      var here = $("<div>", {
        class: "panel",
        id: "colonies"
      });
      context.append(here);
      context = here;
      let heading = (function(context) {
        /* macros/jquery.sibilant:14:9 */
      
        var here = $("<b>", {
          text: "colonies",
          class: "bordered"
        });
        context.append(here);
        context = here;
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