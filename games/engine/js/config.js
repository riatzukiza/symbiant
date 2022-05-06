const dim=[ window.innerWidth, window.innerHeight ];
const size=1;
module.exports.size = size;
module.exports.angleZoom = 80;
module.exports.noiseZ = 70;
module.exports.fieldForce = 140;
module.exports.dimensions = dim;
module.exports.columns = Math.ceil((dim[0] / size));
module.exports.rows = Math.ceil((dim[1] / size));
module.exports.decay = 0.1;
module.exports.maxLength = 20;
module.exports.antLimit = 200;
module.exports.maxInDecay = 50;
module.exports.maxTrail = 300;
module.exports.minTrail = 100;
module.exports.limitDecay = true;
module.exports.antInfluence = 1;
module.exports.friction = 12;
module.exports.spawnRate = 100;