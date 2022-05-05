const noise = require("./noise")
const config = require("./config.js")
function calculateField(medium,layer) {
  for(let x = 0; x < columns; x++) {
    for(let y = 0; y < rows; y++) {
      let angle = noise.simplex3(x/config.angleZoom/5, y/config.angleZoom/5, config.noiseZ) * Math.PI * 2;
      let length = noise.simplex3(x/50 + 40000, y/50 + 40000, config.noiseZ) * config.fieldForce / 20;
      field[x][y].setLength(length);
      field[x][y].setAngle(angle);

      field[x][y].addTo(pheremones[x][y]);

    }
  }
}

function createVectorField(columns,rows) {
  let field = new Array(columns);
  for(let x = 0; x < columns; x++) {
    field[x] = new Array(columns);
    for(let y = 0; y < rows; y++) {
      field[x][y] = new Vector(0, 0);
    }
  }
  return field
}
const noiseField = createVectorField(config.columns,config.rows)
const signalField = createVectorField(config.columns,config.rows)

particles.forEach(p => {
  if(config.lineMode) {
    p.drawLine();
  } else {
    p.draw();
  }
  pos.x = p.pos.x / size;
  pos.y = p.pos.y / size;
  let v;
  if(pos.x >= 0 && pos.x < columns && pos.y >= 0 && pos.y < rows) {
    v = field[Math.floor(pos.x)][Math.floor(pos.y)];
    if(v.getLength() < 1) {
      pheremones[Math.floor(pos.x)][Math.floor(pos.y)].addTo(v)

      v = pheremones[Math.floor(pos.x)][Math.floor(pos.y)];
    }
  }

  p.move(v);
  p.wrap();
});
