const Handlebars = require('handlebars');

Handlebars.registerHelper('if_eq', function (a, b, opts) {
  return a === b ? opts.fn(this) : opts.inverse(this)
});


module.exports = function(files,opts,data,next){
    const filename = Object.keys(files);

    filename.forEach(name => {
        let template = Handlebars.compile(files[name].contents.toString());
        files[name].contents = new Buffer(template(opts))
    });

    next();
}
