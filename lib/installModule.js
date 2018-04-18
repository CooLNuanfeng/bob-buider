const fs = require('fs');
const path = require('path');
const execa = require('execa');
const chalk = require('chalk');
const ora = require('ora');



module.exports = function(dir,story,name){
    const pkgpath = path.join(dir,'package.json');
    var content = fs.readFileSync(pkgpath);

    var pkg = JSON.parse(content);

    var dependPkg = pkg.dependencies;
    var devPkg = pkg.devDependencies;
    pkg.dependencies = {};
    pkg.devDependencies = {};


    fs.writeFile(pkgpath,JSON.stringify(pkg),function(err){
        if(err) console.log(err);
        console.log(`✨`,chalk.rgb(57, 235, 237)(' install package ......\n'));
        console.log(`🚀`, ' please wait patiently.\n');

        const spinner = ora('installing...\n').start();
        spinner.color = 'green';

        Promise.all([
            execa.shell('npm i '+devPkg.join(' ')+' --save-dev',{'cwd':dir}).then(()=>{
                console.log(chalk.gray(' devDependencies is ok \n'));
            }),
            execa.shell('npm i '+dependPkg.join(' ')+' --save',{'cwd':dir}).then(()=>{
                console.log(chalk.gray(' dependencies is ok \n'));
            })
        ]).then(()=>{
            spinner.succeed('All module install finished');

            console.log('\n', `✨`,chalk.green(' Great! success!\n'));
            console.log('👉  Get started with the following commands(通过以下命令开始):\n\n');
            console.log(chalk.cyan(`     ${chalk.gray('$')} cd ${story}/${name}\n`));
            console.log(chalk.cyan(`     ${chalk.gray('$')} npm run dev\n`));
            console.log('');
        }).catch(err=>{
            console.log(err);
            process.exit(1);
        })
    });
}
