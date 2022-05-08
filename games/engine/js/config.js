const dim=[ window.innerWidth, window.innerHeight ];
const size=25;
module.exports.size = size;
module.exports.angleZoom = 30;
module.exports.noiseZ = 70;
module.exports.fieldForce = 100;
module.exports.dimensions = dim;
module.exports.columns = Math.ceil((dim[0] / size));
module.exports.rows = Math.ceil((dim[1] / size));
module.exports.decay = 0.1;
module.exports.maxLength = 10;
module.exports.antLimit = 200;
module.exports.maxInDecay = 400;
module.exports.maxTrail = 400;
module.exports.minTrail = 10;
module.exports.decayOnCollision = false;
module.exports.limitDecay = false;
module.exports.antInfluence = 10;
module.exports.friction = 2;
module.exports.collisionStatic = 100;
module.exports.spawnStatic = 100;
module.exports.spawnRate = 1000;
module.exports.gameSpeed = 1;