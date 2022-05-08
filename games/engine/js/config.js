const dim = [ window.innerWidth, window.innerHeight ];
const size = 25;
module.exports.size = size;
module.exports.angleZoom = 300;
module.exports.noiseZ = 700;
module.exports.fieldForce = 300;
module.exports.dimensions = dim;
module.exports.columns = Math.ceil((dim[0] / size));
module.exports.rows = Math.ceil((dim[1] / size));
module.exports.decay = 0.1;
module.exports.maxLength = 100;
module.exports.antLimit = 1000;
module.exports.maxInDecay = 400;
module.exports.maxTrail = 100;
module.exports.minTrail = 10;
module.exports.decayOnCollision = false;
module.exports.limitDecay = false;
module.exports.antInfluence = 10;
module.exports.friction = 2;
module.exports.collisionStatic = 100;
module.exports.spawnStatic = 1;
module.exports.spawnRate = 1000;
module.exports.homeLocation = [ 300, 200 ];
module.exports.targetLocation = [ 700, 900 ];
module.exports.gameSpeed = 1;