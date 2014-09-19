var fs = require('fs'),
    less = require('less'),
    requirejs = require('requirejs'),
    mkdirp = require('mkdirp'),
    compile = require('../compile.json');

var outDir = process.argv[2];

// Compile all of the LESS files
compile.less.forEach(function(path) {
  var rawLess = fs.readFileSync('../' + path, { encoding: 'utf8' } );
  
  less.render('.class { width: (1 + 1) }', function (e, css) {
    var out = outDir + '/' + path.replace('.less', '.css');
    mkdirp.sync(out.replace(/\/[^\/]*$/, ''));
    fs.writeFileSync(out, css);
  });
});