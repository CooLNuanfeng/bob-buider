const mkdirp = require('mkdirp');
const execa = require('execa');
const chalk = require('chalk');
const path = require('path');
const inquirer = require('inquirer');
const ora = require('ora');

module.exports = function(opts,cmd){
    let pathdir = path.resolve(opts.story);

    inquirer.prompt([
        {
            type: 'input',
            name: 'username',
            message: "What's your svn username"
        },
        {
            type: 'password',
            name: 'password',
            mask: '*',
            message: "What's your svn password"
        },
    ]).then(answers => {
        mkdirp.sync(pathdir);
        console.log(chalk.rgb(57, 235, 237)(`✨`,' fetching svn '+opts.story+'/'+opts.name+' branch code ......\n'));
        console.log(`🚀`, ' please wait patiently.\n');

        const spinner = ora('fetching...').start();
        spinner.color = 'green';

        execa.shell('svn checkout svn://192.168.0.178/static/branches/'+opts.story+'/'+opts.name+' --username '+answers.username+' --password '+answers.password,{'cwd':path.resolve('./',opts.story)})
             .then(()=>{
                 spinner.succeed('from svn fetch code finish');
                 console.log('\n', `✨`,chalk.green(' Great! success!\n'));
                 console.log('👉  Get started with the following commands(通过以下命令开始):\n\n');
                 console.log(chalk.cyan(`     ${chalk.gray('$')} cd ${opts.story}/${opts.name}\n`));
                 console.log(chalk.cyan(`     ${chalk.gray('$')} npm run dev\n`));
                 console.log('');
             })
             .catch(function(err){
                 console.log(err);
             })


        // execa.shell('svn checkout svn://192.168.0.178/static/trunk/huodong --username '+answers.username+' --password '+answers.password,{'cwd':path.resolve('./',opts.story)})
        //      .then(()=>{
        //          console.log('\n', `✨`,chalk.green(' Great! success!\n'));
        //          console.log('👉  Get started with the following commands(通过以下命令开始):\n\n');
        //          console.log(chalk.cyan(`     ${chalk.gray('$')} cd ${opts.story}/${opts.name}\n`));
        //          console.log(chalk.cyan(`     ${chalk.gray('$')} npm run start\n`));
        //          console.log('');
        //      })
        //      .catch(function(err){
        //          console.log(err);
        //      })
    });

}
