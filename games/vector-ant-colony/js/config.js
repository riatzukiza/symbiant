const dim = [ window.innerWidth, window.innerHeight ];
const size = 1;
module.exports.size = size;
module.exports.angleZoom = (Math.floor((Math.random() * ( - 100))) + 100);
module.exports.noiseZ = (Math.floor((Math.random() * ( - 100))) + 100);
module.exports.fieldForce = (Math.floor((Math.random() * ( - 100))) + 100);
module.exports.dimensions = dim;
module.exports.columns = Math.ceil((dim[0] / size));
module.exports.rows = Math.ceil((dim[1] / size));
module.exports.decay = ((Math.random() * ( - 10)) + 10);
module.exports.maxLength = (Math.floor((Math.random() * ( - 100))) + 100);
module.exports.growthRate = 0.001;
module.exports.startingPlants = 100;
module.exports.maxVelocity = 10;
module.exports.plantMassLimit = 100;
module.exports.antLimit = 1000;
module.exports.maxInDecay = 20;
module.exports.maxTrail = 999;
module.exports.minTrail = 10;
module.exports.decayOnCollision = false;
module.exports.optionsAmplitude = (Math.floor((Math.random() * ( - 100))) + 100);
module.exports.limitDecay = false;
module.exports.antInfluence = (Math.floor((Math.random() * ( - 100))) + 100);
module.exports.friction = (Math.floor((Math.random() * ( - 10))) + 10);
module.exports.collisionStatic = (Math.floor((Math.random() * ( - 10))) + 10);
module.exports.spawnStatic = (Math.floor((Math.random() * ( - 10))) + 10);
module.exports.spawnRate = (Math.floor((Math.random() * ( - 10))) + 10);
module.exports.homeLocation = [ 300, 200 ];
module.exports.targetLocation = [ 700, 900 ];
module.exports.rocks = 200;
module.exports.stationaryResistanceCoefficiant = 0.1;
module.exports.trackTrail = true;
module.exports.varyNoiseWithTime = true;
module.exports.rewardWinners = true;
module.exports.winYield = ((Math.random() * ( - 100)) + 100);
module.exports.lossFactor = ((Math.random() * ( - 100)) + 100);
module.exports.punishLoosers = true;
module.exports.stepWiseUpdate = true;
module.exports.gameSpeed = 1;