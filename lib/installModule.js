const Handlebars = require('handlebars');
const fs = require('fs');
const path = require('path');
const execa = require('execa');
const chalk = require('chalk');


module.exports = function(source,opts){
    var template = Handlebars.compile(source);

    var options = {
        "name" : opts.name,
        "version" : opts.version,
        "description" : opts.description,
        "author" : opts.author,
        "less" : opts.module.includes('less'),
        "router" : opts.module.includes('router'),
        "store" : opts.module.includes('store')
    }

    var content = template(options);

    var pkg = JSON.parse(content);

    var dependPkg = pkg.dependencies;
    var devPkg = pkg.devDependencies;
    pkg.dependencies = {};
    pkg.devDependencies = {};


    fs.writeFile(path.resolve('./'+opts.story,'package.json'),JSON.stringify(pkg),function(err){
        if(err) console.log(err);
        console.log(`✨`,chalk.rgb(57, 235, 237)(' install package ......\n'));
        console.log(`🚀`, ' please wait patiently.\n');

        // execa.shell('npm i '+devPkg.join(' ')+' -D')
        // execa.shell('npm i '+dependPkg.join(' ')+' --save').then(()=>{
        //     console.log('success');
        // });
        Promise.all([
            execa.shell('npm i '+devPkg.join(' ')+' --save-dev',{'cwd':path.resolve('./'+opts.story)}).then(()=>console.log(chalk.gray('devDependencies is ok'))),
            execa.shell('npm i '+dependPkg.join(' ')+' --save',{'cwd':path.resolve('./'+opts.story)}).then(()=>console.log(chalk.gray('dependencies is ok')))
        ]).then(()=>{
            console.log('\n', `✨`,chalk.green(' Great! success!\n'));
            console.log('👉  Get started with the following commands(通过以下命令开始):\n\n');
            console.log(chalk.cyan(`     ${chalk.gray('$')} cd ${opts.story}\n`));
            console.log(chalk.cyan(`     ${chalk.gray('$')} npm run start\n`));
            console.log('');
        }).catch(err=>{
            console.log(err);
            process.exit(1);
        })
    });
}
