const dim=[ window.innerWidth, window.innerHeight ];
const size=10;
module.exports.size = size;
module.exports.angleZoom = 100;
module.exports.noiseZ = 100;
module.exports.fieldForce = 1000;
module.exports.dimensions = dim;
module.exports.columns = Math.ceil((dim[0] / size));
module.exports.rows = Math.ceil((dim[1] / size));
module.exports.decay = 0.01;
module.exports.friction = 4;