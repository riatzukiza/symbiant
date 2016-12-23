const { 
  create,
  extend,
  mixin
 } = require("./util");
const $ = require("jquery/dist/jquery.min.js");
const { 
  emitPheremones,
  Ant
 } = require("./ant");
const { 
  Colony
 } = require("./colony");
// var interface = (function interface$(sim) {
//   /* interface eval.sibilant:51:9 */
// 
//   canvasa.onselectstart = () => {
//   	
//     return false;
//   
//   };
//   canvasb.onselectstart = () => {
//   	
//     return false;
//   
//   };
//   $(canvasa).css("transform", "scale(5)").css("top", "1200px").css("left", "1200px").css("position", "absolute");
//   $(canvasb).css("transform", "scale(5)").css("top", "1200px").css("left", "1200px").css("position", "absolute").hide();
//   let interfaceContainer = (function(context) {
//     /* macros/jquery.sibilant:14:9 */
//   
//     var here = $("<div>", {  });
//     context.append(here);
//     context = here;
//     let colonies = (function(context) {
//       /* macros/jquery.sibilant:14:9 */
//     
//       var here = $("<div>", {
//         class: "panel",
//         id: "colonies"
//       });
//       context.append(here);
//       context = here;
//       let heading = (function(context) {
//         /* macros/jquery.sibilant:14:9 */
//       
//         var here = $("<b>", {
//           text: "colonies",
//           class: "bordered"
//         });
//         context.append(here);
//         context = here;
//         return here;
//       })(context);
//       ;
//       (function() {
//         /* eval.sibilant:377:24 */
//       
//         var table = $("<table>");
//         let headerRow = $("<tr>");
//         headerRow.append($("<th>").text("name"));
//         headerRow.append($("<th>").text("numbers"));
//         table.append(headerRow);
//         Colony.colonies.each((c) => {
//         	
//           var row = $("<tr>");
//           let name = (function() {
//             /* eval.sibilant:397:50 */
//           
//             let colData = $("<td> ").text(c.name);
//             row.append(colData);
//             return colData;
//           }).call(this);
//           let numbers = (function() {
//             /* eval.sibilant:397:50 */
//           
//             let colData = $("<td> ").text(c.ants.size);
//             row.append(colData);
//             return colData;
//           }).call(this);
//           table.append(row);
//           name.css("color", ("rgb(" + [ c.color.red, c.color.green, c.color.blue ].join(",") + ")"));
//           return sim.on("tick", () => {
//           	
//             return numbers.text(c.ants.size);
//           
//           });
//         
//         });
//         return here.append(table);
//       }).call(this);
//       return here;
//     })(context);
//     ;
//     here.css("margin-top", "600px").css("z-index", "9999");
//     return here;
//   })(context);
//   ;
//   return context;
// });