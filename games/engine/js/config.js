const dim=[ window.innerWidth, window.innerHeight ];
const size=25;
module.exports.size = size;
module.exports.angleZoom = 10;
module.exports.noiseZ = 10;
module.exports.fieldForce = 100;
module.exports.dimensions = dim;
module.exports.columns = Math.ceil((dim[0] / size));
module.exports.rows = Math.ceil((dim[1] / size));
module.exports.decay = 0.04;
module.exports.maxLength = 40;
module.exports.antLimit = 200;
module.exports.maxInDecay = 50;
module.exports.antInfluence = 0.3;
module.exports.friction = 2;
module.exports.spawnRate = 100;