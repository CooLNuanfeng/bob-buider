const download = require('download-git-repo');
const chalk = require('chalk');
const fs = require('fs');
const mkdirp = require('mkdirp');
const rm = require('rimraf').sync;
const path = require('path');

const package = require('../package.json');
const generate = require('./generate.js');
const installModule = require('./installModule.js');

module.exports = {
    fetchTemplate : function(opts){
        let pathdir = path.resolve(opts.story,opts.name);
        mkdirp.sync(pathdir);

        let tmpdir = path.join(pathdir, 'tmp');

        download(package.template.url, tmpdir, function (err) {
            if(err){
                console.log(err);
                console.log(chalk.red('fetch template fail, try again'));
                process.exit(1);
            }else{
                opts = Object.assign(opts,{
                    "less" : opts.module.includes('less'),
                    "router" : opts.module.includes('router'),
                    "store" : opts.module.includes('store')
                });
                //生成模板
                generate(tmpdir,pathdir,opts,function(){
                    rm(tmpdir);
                    installModule(pathdir,opts.story,opts.name);
                });
            }
        });
    }

}
