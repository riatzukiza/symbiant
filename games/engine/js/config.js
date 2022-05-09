const dim=[ window.innerWidth, window.innerHeight ];
const size=2;
module.exports.size = size;
module.exports.angleZoom = 2;
module.exports.noiseZ = 1;
module.exports.fieldForce = 1;
module.exports.dimensions = dim;
module.exports.columns = Math.ceil((dim[0] / size));
module.exports.rows = Math.ceil((dim[1] / size));
module.exports.decay = 6.9;
module.exports.maxLength = 9;
module.exports.antLimit = 10000;
module.exports.maxInDecay = 20;
module.exports.maxTrail = 400;
module.exports.minTrail = 10;
module.exports.decayOnCollision = false;
module.exports.optionsAmplitude = 1;
module.exports.limitDecay = false;
module.exports.antInfluence = 99;
module.exports.friction = 2;
module.exports.collisionStatic = 0;
module.exports.spawnStatic = 0;
module.exports.spawnRate = 0;
module.exports.homeLocation = [ 300, 200 ];
module.exports.targetLocation = [ 700, 900 ];
module.exports.trackTrail = true;
module.exports.varyNoiseWithTime = true;
module.exports.rewardWinners = true;
module.exports.punishLoosers = true;
module.exports.gameSpeed = 1;