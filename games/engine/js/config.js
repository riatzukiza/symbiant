const dim=[ window.innerWidth, window.innerHeight ];
const size=5;
module.exports.size = size;
module.exports.angleZoom = 1;
module.exports.noiseZ = 1;
module.exports.fieldForce = 100;
module.exports.dimensions = dim;
module.exports.columns = Math.ceil((dim[0] / size));
module.exports.rows = Math.ceil((dim[1] / size));
module.exports.decay = 0.4;
module.exports.maxLength = 10;
module.exports.antLimit = 200;
module.exports.maxInDecay = 50;
module.exports.maxTrail = 100;
module.exports.limitDecay = false;
module.exports.antInfluence = 3;
module.exports.friction = 2;
module.exports.spawnRate = 100;