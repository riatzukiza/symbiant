var config = require("./config");
var settings = QuickSettings.create();
settings.addRange("Angle Zoom", 1, 9999, config.angleZoom, 1, ((val) => {
	
  return config.angleZoom = val;

}));
settings.addRange("Noise Z", 1, 9999, config.noiseZ, 1, ((val) => {
	
  return config.noiseZ = val;

}));
settings.addRange("Noise Force", 1, 9999, config.fieldForce, 0.1, ((val) => {
	
  return config.fieldForce = val;

}));
settings.addRange("Signal Decay", 0, 99, config.decay, 0.1, ((val) => {
	
  return config.decay = val;

}));
settings.addRange("Max P Vector Length", 0, 99, config.maxLength, 0.1, ((val) => {
	
  return config.maxLength = val;

}));
settings.addRange("Max Trail", 10, 999, config.maxTrail, 1, ((val) => {
	
  return config.maxTrail = val;

}));
settings.addRange("Min Trail", 10, 99, config.minTrail, 1, ((val) => {
	
  return config.minTrail = val;

}));
settings.addBoolean("Decay on collision", config.decayOnCollision, ((val) => {
	
  return config.decayOnCollision = val;

}));
settings.addBoolean("Limit the number of decay blocks per cycle", config.limitDecay, ((val) => {
	
  return config.limitDecay = val;

}));
settings.addRange("Ant Influence", 0, 99, config.antInfluence, 1, ((val) => {
	
  return config.antInfluence = val;

}));
settings.addRange("friction", 2, 128, config.friction, 1, ((val) => {
	
  return config.friction = val;

}));
settings.addRange("Collision Static", 0, 99, config.collisionStatic, 1, ((val) => {
	
  return config.collisionStatic = val;

}));
settings.addRange("Spawn Static", 1, 99, config.spawnStatic, 1, ((val) => {
	
  return config.spawnStatic = val;

}));
settings.addRange("Spawn Rate", 1, 99999, config.spawnRate, 1, ((val) => {
	
  return config.spawnRate = val;

}));