const Handlebars = require('handlebars');
const fs = require('fs');
const path = require('path');
const chalk = require('chalk');

module.exports = function(source,opts){
    var template = Handlebars.compile(source);

    var options = {
        "name" : opts.name,
        "version" : opts.version,
        "description" : opts.description
    }

    var content = template(options);
    fs.writeFile(path.resolve(opts.story,opts.name,'README.md'),content,function(err){
        if(err){
            console.log(chalk.red('README.md modify err, please check'));
        }
    });
};
