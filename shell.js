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
// thenAlways(thenAlways(thenAlways(thenAlways(exec([ "git", "checkout", [ branchName ].join("") ].join(" ")), result(exec([ "git", "branch", [ compileBranch ].join("") ].join(" ")))), result(exec([ "git", "checkout", [ compileBranch ].join("") ].join(" ")))), result(exec([ "git", "add", "." ].join(" ")))), result(exec([ "git", "commit", "-m", ("compiled " + path) ].join(" "))));