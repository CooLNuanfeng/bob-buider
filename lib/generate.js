const path = require('path');
const Metalsmith = require('metalsmith');

const filter = require('./filter.js');
const renderTemplate = require('./renderTemplate.js');


function filterFiles(opts) {
  return (files, metalsmith, next) => {
    filter(files, opts, next)
  }
}

function renderFiles(opts){
    return (files, metalsmith, next) =>{
        renderTemplate(files,opts,metalsmith.metadata(),next)
    }
}


module.exports = function(src, dest, opts, done) {
    // delete options.js  meta.js
    // var options = Object.assign({},opts,getOptions(src));

    Metalsmith(path.join(src, 'template'))
        .clean(false)
        // .metadata({
        //     'metadata' : 'test'
        // })
        .source('.')
        .use(filterFiles(opts))
        .use(renderFiles(opts))
        .destination(dest)
        .build(function(err,files) {
            if (err){
                throw err;
                process.exit(1);
            }
            done();
        });
}
