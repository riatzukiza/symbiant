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
var interface = (function interface$(sim) {
  /* interface eval.sibilant:48:0 */

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
        Colony.colonies.each((c) => {
        	
          var row = $("<tr>");
          let numbers = (function() {
            /* eval.sibilant:30:34 */
          
            let colData = $("<td> ").text(c.entities.size);
            row.append(colData);
            return colData;
          }).call(this);
          table.append(row);
          name.css("color", ("rgb(" + [ c.color.red, c.color.green, c.color.blue ].join(",") + ")"));
          return sim.on("tick", () => {
          	
            return numbers.text(c.ants.size);
          
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