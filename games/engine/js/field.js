const noise = require("./noise")
const config = require("./config.js")
const Vector = require("./vector")
module.exports.updateParticle = function updateParticle(vel,p,field,pheremones,tick) {
  const pos = new Vector(0,0)
  pos.x = Math.round(p.x / config.size);
  pos.y = Math.round(p.y / config.size);
  if(pos.x >= 0 && pos.x < config.columns && pos.y >= 0 && pos.y < config.rows) {

    let angle = noise.simplex3(pos.x/config.angleZoom/5, pos.y/config.angleZoom/5, config.noiseZ) * Math.PI * 2;
    let length = noise.simplex3(pos.x/50 + 40000, pos.y/50 + 40000, config.noiseZ) * config.fieldForce / 20;

    field[pos.x][pos.y].setLength(length);
    field[pos.x][pos.y].setAngle(angle);

    field[pos.x][pos.y].addTo(pheremones[pos.x][pos.y]);

    let vec = field[pos.x][pos.y];

    if(vec.getLength() < 1) {

      pheremones[pos.x][pos.y].addTo(vec)

      vec = pheremones[pos.x][pos.y];
      vel.accelerate([vec.x/tick,vec.y/tick]);
    }

  }
}

module.exports.createVectorField = function createVectorField(columns,rows) {
  let field = new Array(columns);
  for(let x = 0; x < columns; x++) {
    field[x] = new Array(columns);
    for(let y = 0; y < rows; y++) {
      field[x][y] = new Vector(0, 0);
    }
  }
  return field
}

