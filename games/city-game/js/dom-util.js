var getById = (function getById$(id = this.id, el = document) {
  /* get-by-id deps.sibilant:61:8 */

  return el.getElementById(id);
});
var getByTagname = (function getByTagname$(tagname = this.tagname, el = document) {
  /* get-by-tagname deps.sibilant:61:8 */

  return el.getElementsByTagName(tagname);
});
var getSideSize = (function getSideSize$(el, side) {
  /* get-side-size eval.sibilant:8:0 */

  return el.getBoundingClientRect()[side];
});
var getSideOffset = (function getSideOffset$(el, side) {
  /* get-side-offset eval.sibilant:12:0 */

  return (getSideSize(glEl, side) - getSideSize(htmlTag, side));
});
var getElementOffset = (function getElementOffset$(el) {
  /* get-element-offset eval.sibilant:16:0 */

  return { 
    x:getSideSize(el, "left"),
    y:getSideOffset(el, "top")
   };
});
var getRelativePointerLocation = (function getRelativePointerLocation$(el, e) {
  /* get-relative-pointer-location eval.sibilant:20:0 */

  return let offset(getElementOffset(el))() = { 
    x:((e.clientX + window.pageXOffset) - offset.x),
    y:((e.clientY + window.pageYOffset) - offset.y)
   };
});
var getCellCoord = (function getCellCoord$(loc) {
  /* get-cell-coord eval.sibilant:24:0 */

  return { 
    x:Math.floor(((loc.x - 16) / sim.scale)),
    y:Math.floor(((loc.y - 16) / sim.scale))
   };
});