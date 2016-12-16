let socket = io("/random-color-field");
socket.on("change", () => {
	
  console.log("change ");
  return location.reload();

});
const { 
  create,
  extend,
  mixin
 } = require("./util");
const { 
  Display
 } = require("./display");
const $ = require("jquery/dist/jquery.min.js");
let canvas = document.getElementById("game");
console.log("hi");
let ctx = canvas.getContext("2d");
const display = create(Display)(60, 60, 10, ctx);
console.log("RANDOMIZING");
$("#toggle").click((function(e) {
  /* eval.sibilant:11:22 */

  console.log("clicked", "#toggle");
  return loop.toggle();
}));
$("#randomize").click((function(e) {
  /* eval.sibilant:11:22 */

  console.log("clicked", "#randomize");
  return display.randomize();
}));
$("#empty").click((function(e) {
  /* eval.sibilant:11:22 */

  console.log("clicked", "#empty");
  return display.empty();
}));
$("#resize").click((function(e) {
  /* eval.sibilant:11:22 */

  console.log("clicked", "#resize");
  display.resize($("#width").val(), $("#height").val(), $("#cell-size").val());
  return display.randomize();
}));
var draw = (function draw$() {
  /* draw eval.sibilant:62:0 */

  console.log("drawing", display);
  display.randomize();
  display.update();
  display.render();
  return window.requestAnimationFrame(draw);
});
window.requestAnimationFrame(draw);