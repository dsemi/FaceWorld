var fs = require('fs'),
    less = require('less'),
    requirejs = require('requirejs'),
    mkdirp = require('mkdirp'),
    compile = require('../compile.json');

var outDir = process.argv[2];

// Compile all of the LESS files
var parser = new(less.Parser);
compile.less.forEach(function(path) {
  var rawLess = fs.readFileSync('../' + path, { encoding: 'utf8' } );
  
  parser.parse(rawLess, function (e, tree) {
    var out = outDir + '/' + path.replace('.less', '.css');
    mkdirp.sync(out.replace(/\/[^\/]*$/, ''));
    fs.writeFileSync(out, tree.toCSS({ compress: true }));
  });
});
