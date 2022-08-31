defGeneric(getById, id(el(document)), el.getElementById(id));
defGeneric(getByTagname, tagname(el(document)), el.getElementsByTagName(tagname));
var glEl = getById("gl"),
    htmlTag = getByTagname("html")[0],
    container = getById("container");
var createEntitySelector = (function createEntitySelector$(entType) {
  /* create-entity-selector app/sib/interface.sibilant:11:0 */

  var name = entType.symbol.toString();
  return dom(id.span(name, ("spawn" + name), type.input("radio", name, "entity", onclick, (function(e) {
    /* app/sib/interface.sibilant:17:31 */
  
    return activeEntityType = entType;
  }))));
});
var checkBoxes = Entity.types.map(createEntitySelector);
var entityMenu = dom(id.div("entity-menu", checkBoxes));
entityMenu.render(container);
var getSideSize = (function getSideSize$(el, side) {
  /* get-side-size app/sib/interface.sibilant:29:0 */

  return el.getBoundingClientRect()[side];
});
var getSideOffset = (function getSideOffset$(el, side) {
  /* get-side-offset app/sib/interface.sibilant:33:0 */

  return (getSideSize(glEl, side) - getSideSize(htmlTag, side));
});
var getElementOffset = (function getElementOffset$(el) {
  /* get-element-offset app/sib/interface.sibilant:37:0 */

  return lit(x(getSideSize(el, "left")), y(getSideOffset(el, "top")));
});
var getRelativePointerLocation = (function getRelativePointerLocation$(el, e) {
  /* get-relative-pointer-location app/sib/interface.sibilant:41:0 */

  return let(offset(getElementOffset(el))(), lit(x(((e.clientX + window.pageXOffset) - offset.x)), y(((e.clientY + window.pageYOffset) - offset.y))));
});
var getCellCoord = (function getCellCoord$(loc) {
  /* get-cell-coord app/sib/interface.sibilant:45:0 */

  return lit(x(Math.floor(((loc.x - 16) / sim.scale))), y(Math.floor(((loc.y - 16) / sim.scale))));
});
glEl.onmousedown = (function glEl$onmousedown$(e) {
  /* gl-el.onmousedown app/sib/interface.sibilant:51:0 */

  e.preventDefault();
  glEl.onmousemove = (function glEl$onmousemove$(e) {
    /* gl-el.onmousemove app/sib/interface.sibilant:54:2 */
  
    e.preventDefault();
    return let_(pointerLocation(getRelativePointerLocation(glEl, e))(selectedCell(getCellCoord(pointerLocation))), createInstanceOf(activeEntityType, selectedCell.x, selectedCell.y));
  });
  return glEl.onmousemove;
});
glEl.onclick = (function glEl$onclick$(e) {
  /* gl-el.onclick app/sib/interface.sibilant:62:0 */

  e.preventDefault();
  return let_(pointerLocation(getRelativePointerLocation(glEl, e))(selectedCell(getCellCoord(pointerLocation))), createInstanceOf(activeEntityType, selectedCell.x, selectedCell.y));
});
glEl.onmouseup = (function glEl$onmouseup$(e) {
  /* gl-el.onmouseup app/sib/interface.sibilant:71:0 */

  e.preventDefault();
  return glEl.onmousemove = null;
});
glEl.onclick = null;