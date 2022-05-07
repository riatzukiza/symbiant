const dim = [ window.innerWidth, window.innerHeight ];
const size = 1;
module.exports.size = size;
module.exports.angleZoom = 30;
module.exports.noiseZ = 70;
module.exports.fieldForce = 10;
module.exports.dimensions = dim;
module.exports.columns = Math.ceil((dim[0] / size));
module.exports.rows = Math.ceil((dim[1] / size));
module.exports.decay = 0.1;
module.exports.maxLength = 1;
module.exports.antLimit = 200;
module.exports.maxInDecay = 400;
module.exports.maxTrail = 400;
module.exports.minTrail = 100;
module.exports.decayOnCollision = false;
module.exports.limitDecay = false;
module.exports.antInfluence = 0.08;
module.exports.friction = 2.5;
module.exports.collisionStatic = 0.1;
module.exports.spawnStatic = 0.1;
module.exports.spawnRate = 1000;