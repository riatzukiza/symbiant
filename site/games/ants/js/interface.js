const Table = { 
  symbol:Symbol("Table"),
  init( collection = this.collection,paths = this.paths ){ 
    
      this.collection = collection;this.paths = paths;
      return this;
    
   },
  add(  ){ 
    
   },
  remove(  ){ 
    
   },
  update(  ){ 
    
   }
 };
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
const ColonyDisplay = { 
  symbol:Symbol("ColonyDisplay"),
  init( C = this.C,table = here ){ 
    
      this.C = C;this.table = table;
      console.log("C", C);
      return this;
    
   },
  render( C = this.C,here = this.here ){ 
    
      return (function() {
        /* eval.sibilant:17:8 */
      
        var table = $("<table>");
        let headerRow = $("<tr>");
        headerRow.append($("<th>").text("id"));
        headerRow.append($("<th>").text("numbers"));
        table.append(headerRow);
        C.colonies.each((c) => {
        	
          var row = $("<tr>");
          let id = (function() {
            /* eval.sibilant:37:34 */
          
            let colData = $("<td> ").text(c.id);
            row.append(colData);
            return colData;
          }).call(this);
          let numbers = (function() {
            /* eval.sibilant:37:34 */
          
            let colData = $("<td> ").text(c.entities.size);
            row.append(colData);
            return colData;
          }).call(this);
          table.append(row);
          console.log("ants", c);
          id.css("color", ("rgb(" + [ c.color.red, c.color.green, c.color.blue ].join(",") + ")"));
          c.event.on("new species", () => {
          	
            return this.update();
          
          });
          return sim.on("tick", () => {
          	
            return numbers.text(c.entities.size);
          
          });
        
        });
        here.append(table);
        return table;
      }).call(this);
    
   },
  update( table = this.table ){ 
    
      table.remove();
      return this.render();
    
   }
 };
var interface = (function interface$(sim, C) {
  /* interface eval.sibilant:73:0 */

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
      create(ColonyDisplay)(C, here);
      return here;
    })(context);
    ;
    return here;
  })(context);
  ;
  return context;
});
exports.interface = interface;