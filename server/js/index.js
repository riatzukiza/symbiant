"use strict";
const port = (process.env.PORT || 8001);
const express = require("express");
const app = express();
const chokidar = require("chokidar");
const Path = require("path");
const Url = require("url");
const fs = require("fs");
const env = (process.env.NODE_ENV || "dev");
const exec = require("./exec.js");
var worker = (function worker$(p, f, done) {
  /* worker shell.sibilant:7:0 */

  return Promise.resolve(f()).then(done, done);
});
var thenAlways = (function thenAlways$(p, f) {
  /* then-always shell.sibilant:9:0 */

  return p.then((result) => {
  	
    return f(result);
  
  }, (err) => {
  	
    return f();
  
  });
});
// thenAlways(thenAlways(thenAlways(thenAlways(exec([ "git", "checkout", [ branchName ].join("") ].join(" ")), (result) => {
// 	
//   return exec([ "git", "branch", [ compileBranch ].join("") ].join(" "));
// 
// }), (result) => {
// 	
//   return exec([ "git", "checkout", [ compileBranch ].join("") ].join(" "));
// 
// }), (result) => {
// 	
//   return exec([ "git", "add", "." ].join(" "));
// 
// }), (result) => {
// 	
//   return exec([ "git", "commit", "-m", ("compiled " + path) ].join(" "));
// 
// });
const { 
  PathTree,
  Directory
 } = require("./lib/file-system");
const { 
  Sibilant
 } = require("./lib/sibilant");
const { 
  create,
  extend,
  mixin,
  curry
 } = require("./lib/util");
const http = require("http");
const server = http.Server(app);
const browserify = require("browserify");
const io = require("socket.io")(server);
server.listen(port);
var addRoutes = (function addRoutes$(game, bundle) {
  /* add-routes index.sibilant:51:0 */

  let htmlPath = Path.join(__dirname, "games/", game, "/html");
  app.get(Path.join("/games/", game, "/js/main.js"), (req, res) => {
  	
    let url = Url.parse(req.url);
    let { 
      path,
      query,
      hash,
      port,
      search,
      pathname,
      auth,
      slashes,
      href,
      protocol,
      host
     } = url;
    ;
    function write( v ){ 
      (new Promise((success, fail) => {
      	
        var resolve = success,
            reject = fail;
        return res.write(v, success);
      
      }))
     };
    return bundle.bundle().on("error", (...b) => {
    	
      return console.log("bundle err", ...b);
    
    }).pipe(res);
  
  });
  return app.use(Path.join("/games/", game, "/play"), express.static(htmlPath));
});
var comp = (function comp$(...args) {
  /* comp index.sibilant:57:0 */

  return (x) => {
  	
    return args.reduce((value, f) => {
    	
      return f(value);
    
    }, x);
  
  };
});
var translatePath = (function translatePath$(path) {
  /* translate-path index.sibilant:59:0 */

  return path.replace("/sibilant/", "/").replace(".sibilant", ".js");
});
var build = (function build$(path) {
  /* build index.sibilant:63:0 */

  console.log("building", path);
  let target = translatePath(path);
  return Sibilant.fromFile(path).transpile().saveFile(target);
});
var addToBundle = (function addToBundle$(bundle, game) {
  /* add-to-bundle index.sibilant:70:0 */

  return (file) => {
  	
    return bundle.add(Path.join(__dirname, "games/", game, "/js", file));
  
  };
});
Set.prototype.each = (function Set$prototype$each$(f) {
  /* Set.prototype.each index.sibilant:73:0 */

  this.forEach(f);
  return this;
});
var signalRefresh = (function signalRefresh$(game, connections) {
  /* signal-refresh index.sibilant:75:0 */

  return (promise) => {
  	
    return promise.then((string) => {
    	
      return connections.each((socket) => {
      	
        return socket.emit("change");
      
      });
    
    });
  
  };
});
const Project = { 
  symbol:Symbol("Project"),
  init( src = this.src,target = this.target ){ 
    
      this.src = src;this.target = target;
      return this;
    
   }
 };
var initialBuild = (function initialBuild$(p, src, path) {
  /* initial-build index.sibilant:81:0 */

  console.log("initial build of", src, path);
  return Promise.resolve(p).then((nil) => {
  	
    return src.each((name) => {
    	
      return build(Path.join(path, name));
    
    });
  
  }).then((nil) => {
  	
    return src.each((name) => {
    	
      return build(Path.join(path, name));
    
    });
  
  });
});
const AutoCompiler = { 
  symbol:Symbol("AutoCompiler"),
  init( name = this.name,bundle = this.bundle,namespace = io.of(name),connections = (new Set()),sibilantPath = Path.join(__dirname, "games/", name, "/sibilant/js"),sourceWatcher = chokidar.watch(sibilantPath),src = create(Directory)(sibilantPath) ){ 
    
      this.name = name;this.bundle = bundle;this.namespace = namespace;this.connections = connections;this.sibilantPath = sibilantPath;this.sourceWatcher = sourceWatcher;this.src = src;
      initialBuild(null, src, sibilantPath);
      return this;
    
   },
  change( path = this.path,name = this.name,connections = this.connections ){ 
    
      return signalRefresh(name, connections)(build(path));
    
   },
  connect( namespace = this.namespace,connections = this.connections,sourceWatcher = this.sourceWatcher,bundle = this.bundle,name = this.name ){ 
    
      sourceWatcher.on("change", (path) => {
      	
        return (function() {
          if (!(this._compiling)) {
            this._compiling = true;
            return this.change(path).then((nil) => {
            	
              return exec([ "git", "branch", "|", "grep \\*", "|", "cut", "-d", "' '", "-f2" ].join(" "));
            
            }).then((branchName) => {
            	
              console.log("gitting", branchName);
              let compileBranch = ("compiled-" + branchName);
              return thenAlways(thenAlways(exec([ "git", "push", "origin", [ branchName ].join("") ].join(" ")), (result) => {
              	
                return exec([ "git", "add", "-A", "." ].join(" "));
              
              }), (result) => {
              	
                return exec([ "git", "commit", "-m", ("'" + "compiled " + path + "'") ].join(" "));
              
              });
            
            }).then((nil) => {
            	
              return this._compiling = false;
            
            });
          }
        }).call(this);
      
      });
      return namespace.on("connection", (socket) => {
      	
        connections.add(socket);
        return socket.on("disconnect", () => {
        	
          return connections.delete(socket);
        
        });
      
      });
    
   }
 };
const Bundler = { 
  symbol:Symbol("Bundler"),
  init( bundle = browserify(),jsPath = Path.join(__dirname, "games/", game, "/js"),dir = create(Directory)(jsPath) ){ 
    
      this.bundle = bundle;this.jsPath = jsPath;this.dir = dir;
      return this;
    
   }
 };
var autoCompile = (function autoCompile$(game, bundle) {
  /* auto-compile index.sibilant:119:0 */

  return (function() {
    if (env === "dev") {
      let compiler = create(AutoCompiler)(game, bundle);
      return compiler.connect();
    }
  }).call(this);
});
var bulkBundle = (function bulkBundle$(dir, bundle) {
  /* bulk-bundle index.sibilant:123:0 */

  console.log("bulk add on", dir.path);
  return dir.each((name) => {
  	
    return dir.find(name).then((node) => {
    	
      return (function() {
        if (!(name === "includes")) {
          return (function() {
            if (node.symbol === Directory.symbol) {
              return bulkBundle(node, bundle);
            } else {
              console.log("adding", node.path, "to bundle");
              return bundle.add(node.path);
            }
          }).call(this);
        }
      }).call(this);
    
    });
  
  });
});
var addGame = (function addGame$(game) {
  /* add-game index.sibilant:134:0 */

  "sets up the middleware and build tools for a game's directory";
  var bundle = browserify(),
      jsPath = Path.join(__dirname, "games/", game, "/js");
  var dir = create(Directory)(jsPath);
  addRoutes(game, bundle);
  return Promise.resolve(autoCompile(game, bundle)).then((nil) => {
  	
    return bulkBundle(dir, bundle);
  
  });
});
let games = create(Directory)("./games");
games.each(addGame).then((...b) => {
	
  return console.log("all games loaded", ...b);

}).catch((...b) => {
	
  return console.log("failed to set up all the games", ...b);

});