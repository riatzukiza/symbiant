const dim=[ window.innerWidth, window.innerHeight ];
const size=5;
module.exports.size = size;
module.exports.angleZoom = 10;
module.exports.noiseZ = 10;
module.exports.fieldForce = 100;
module.exports.dimensions = dim;
module.exports.columns = Math.round((dim[0] / size));
module.exports.rows = Math.round((dim[1] / size));