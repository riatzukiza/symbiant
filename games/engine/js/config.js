const dim=[ window.innerWidth, window.innerHeight ];
const size=25;
module.exports.size = size;
module.exports.angleZoom = 1;
module.exports.noiseZ = 1;
module.exports.fieldForce = 1;
module.exports.dimensions = dim;
module.exports.columns = Math.ceil((dim[0] / size));
module.exports.rows = Math.ceil((dim[1] / size));
module.exports.decay = 0.04;
module.exports.maxLength = 4;
module.exports.antLimit = 200;
module.exports.maxInDecay = 10;
module.exports.limitDecay = false;
module.exports.antInfluence = 0.03;
module.exports.friction = 4;
module.exports.spawnRate = 100;