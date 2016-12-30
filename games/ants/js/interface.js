const { 
  create,
  extend,
  mixin
 } = require("./util");
const $ = require("jquery/dist/jquery.min.js");
let context = $("#container");
const { 
  emitPheremones,
  Ant
 } = require("./ant");
const { 
  Colony
 } = require("./colony");
const View = { 
  symbol:Symbol("View"),
  init(  ){ 
    
      
      return this;
    
   }
 };
var interface = (function interface$(sim, C) {
  /* interface eval.sibilant:50:0 */

  let interfaceContainer = (function(context) {
    /* macros/jquery.sibilant:14:9 */
  
    var here = $("<div>", {  });
    context.append(here);
    context = here;
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
      (function() {
        /* eval.sibilant:10:8 */
      
        var table = $("<table>");
        let headerRow = $("<tr>");
        headerRow.append($("<th>").text("numbers"));
        table.append(headerRow);
        C.colonies.each((c) => {
        	
          var row = $("<tr>");
          let numbers = (function() {
            /* eval.sibilant:30:34 */
          
            let colData = $("<td> ").text(c.entities.size);
            row.append(colData);
            return colData;
          }).call(this);
          table.append(row);
          console.log("ants", c);
          return sim.on("tick", () => {
          	
            return numbers.text(c.entities.size);
          
          });
        
        });
        return here.append(table);
      }).call(this);
      return here;
    })(context);
    ;
    return here;
  })(context);
  ;
  return context;
});
exports.interface = interface;