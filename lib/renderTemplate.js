const Handlebars = require('handlebars');

Handlebars.registerHelper('if_eq', function (a, b, opts) {
  return a === b ? opts.fn(this) : opts.inverse(this)
});


module.exports = function(files,opts,data,next){
    let filename = Object.keys(files);
    let reg = /(.*)\.(jpg|bmp|gif|ico|pcx|jpeg|tif|png|raw|tga)$/;
    filename.forEach(name => {
        if(!reg.test(name)){
            let template = Handlebars.compile(files[name].contents.toString());
            files[name].contents = new Buffer(template(opts))
        }
    });

    next();
}
