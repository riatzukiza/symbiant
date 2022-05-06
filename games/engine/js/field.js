const noise = require("./noise")
const config = require("./config.js")
const Vector = require("./vector")
const waitingDecay = new Set()
module.exports.updateParticle = function updateParticle(vel,p,field,pheremones,tick, decay=false) {
  const pos = new Vector(0,0)
  pos.x = Math.round(p.x / config.size);
  pos.y = Math.round(p.y / config.size);
  if(pos.x >= 0 && pos.x < config.columns && pos.y >= 0 && pos.y < config.rows) {

    let angle = noise.simplex3(pos.x/config.angleZoom/5, pos.y/config.angleZoom/5, config.noiseZ) * Math.PI * 2;
    let length = noise.simplex3(pos.x/50 + 40000, pos.y/50 + 40000, config.noiseZ) * config.fieldForce / 20;
    let pH = pheremones[pos.x][pos.y]
    field[pos.x][pos.y].setLength(length);
    field[pos.x][pos.y].setAngle(angle);

    let vec = field[pos.x][pos.y];

    if(!pH.lastCheck) {
      pH.lastCheck = tick
      waitingDecay.add(pH)
    }
    if(decay || waitingDecay.size > config.maxInDecay) {
      if(pH.lastCheck < tick) {
        for(let cell of waitingDecay) {
          
          // console.log("decaying",pH,tick)
          cell.subFrom({
            x:cell.x * (config.decay * (tick - cell.lastCheck )),
            y:cell.y * (config.decay * (tick - cell.lastCheck )),
          })
          cell.lastCheck = tick
          waitingDecay.delete(cell)
        }
      }
    }




    pH.addTo(vec)

    pH.addTo({
      x:vel.xd/config.antInfluence,
      y:vel.yd/config.antInfluence

    })
    if(pH.getLength() > config.maxLength) pH.setLength(config.maxLength)
    // vel.xd = pH.x
    // vel.xy = pH.y
    vel.accelerate([pH.x,pH.y]);
    // console.log({tick,vec,vel})

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

