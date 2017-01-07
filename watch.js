let chokidar = require ("chokidar");
let watcher = chokidar.watch();
watcher.add("**/src/**");
watcher.on("change",console.log.bind());
