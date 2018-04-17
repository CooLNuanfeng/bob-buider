const download = require('download-git-repo');
const chalk = require('chalk');
const fs = require('fs');
const mkdirp = require('mkdirp');
const path = require('path');

const package = require('../package.json');
const install = require('./installModule.js');
const modifyMd = require('./modifyMd.js');

module.exports = {
    fetchTemplate : function(opts,cb){
        let pathdir = path.resolve(opts.story,opts.name);
        mkdirp.sync(pathdir);

        download(package.template.url, pathdir, function (err) {
            if(err){
                console.log(err);
                console.log(chalk.red('fetch template fail, try again'));
                process.exit(1);
            }else{
                install(fs.readFileSync(path.resolve(pathdir,'package.json')).toString(),opts);
                // modifyMd(fs.readFileSync(path.resolve(pathdir,'README.md')).toString(),opts);
            }
        });
    }

}
