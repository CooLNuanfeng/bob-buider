const download = require('download-git-repo');
const chalk = require('chalk');
const fs = require('fs');
const mkdirp = require('mkdirp');
const path = require('path');

const package = require('../package.json');
const cmd = require('./installModule.js');

module.exports = {
    fetchTemplate : function(opts,cb){
        mkdirp.sync(opts.story);

        download(package.template.url, './'+opts.story, function (err) {
            // console.log(opts,'opts');
            if(err){
                console.log(err);
                console.log(chalk.red('fetch template fail, try again'));
                process.exit(1);
            }else{
                // let pkg = JSON.parse(fs.readFileSync('./package.json'));
                // console.log(pkg);
                // let dep = pkg.dependencies || {};  //依赖
                // let dev = pkg.devDependencies || {}; //开发依赖
                //
                //
                // console.log(dep,dev);



                cmd(fs.readFileSync(path.resolve('./'+opts.story,'package.json')).toString(),opts)




                // return;
                // shell.exec('npm i '+modules+' --save',function(code){
                //     if(code > 0) process.exit(1);
                //     cb && cb();
                // })

            }
        });
    }

}
