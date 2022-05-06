const dim=[ window.innerWidth, window.innerHeight ];
const size=5;
module.exports.size = size;
module.exports.angleZoom = 80;
module.exports.noiseZ = 10;
module.exports.fieldForce = 100;
module.exports.dimensions = dim;
module.exports.columns = Math.ceil((dim[0] / size));
module.exports.rows = Math.ceil((dim[1] / size));
module.exports.decay = 0.2;
module.exports.maxLength = 2000;
module.exports.antLimit = 200;
module.exports.maxInDecay = 100;
module.exports.maxTrail = 400;
module.exports.minTrail = 100;
module.exports.limitDecay = false;
module.exports.antInfluence = 10;
module.exports.friction = 1.3;
module.exports.spawnRate = 100;