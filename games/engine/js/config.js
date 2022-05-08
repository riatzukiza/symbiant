const dim=[ window.innerWidth, window.innerHeight ];
const size=2;
module.exports.size = size;
module.exports.angleZoom = 2334;
module.exports.noiseZ = 940;
module.exports.fieldForce = 300;
module.exports.dimensions = dim;
module.exports.columns = Math.ceil((dim[0] / size));
module.exports.rows = Math.ceil((dim[1] / size));
module.exports.decay = 0.1;
module.exports.maxLength = 98.1;
module.exports.antLimit = 1000;
module.exports.maxInDecay = 400;
module.exports.maxTrail = 400;
module.exports.minTrail = 10;
module.exports.decayOnCollision = true;
module.exports.optionsAmplitude = 1;
module.exports.limitDecay = false;
module.exports.antInfluence = 10;
module.exports.friction = 64;
module.exports.collisionStatic = 0;
module.exports.spawnStatic = 0;
module.exports.spawnRate = 2000;
module.exports.homeLocation = [ 300, 200 ];
module.exports.targetLocation = [ 700, 900 ];
module.exports.gameSpeed = 1;