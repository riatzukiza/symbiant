const dim=[ window.innerWidth, window.innerHeight ];
const size=1;
module.exports.size = size;
module.exports.angleZoom = 30;
module.exports.noiseZ = 70;
module.exports.fieldForce = 10000;
module.exports.dimensions = dim;
module.exports.columns = Math.ceil((dim[0] / size));
module.exports.rows = Math.ceil((dim[1] / size));
module.exports.decay = 1.1;
module.exports.maxLength = 30.5;
module.exports.antLimit = 200;
module.exports.maxInDecay = 400;
module.exports.maxTrail = 400;
module.exports.minTrail = 100;
module.exports.decayOnCollision = true;
module.exports.limitDecay = true;
module.exports.antInfluence = 10.8;
module.exports.friction = 20.5;
module.exports.collisionStatic = 1;
module.exports.spawnStatic = 1;
module.exports.spawnRate = 100;