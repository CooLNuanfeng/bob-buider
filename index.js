#!/usr/bin/env node
const program = require('commander');
// const chalk = require('chalk');
// const rp = require('request-promise');
// const simpleGit = require('simple-git')();
const package = require('./package.json');
const creater = require('./lib/craeter.js');


program.version(package.version, '-v, --version')
    .command('create <story> <name>')
    .option('-l, --less', 'install less')
    .option('-r, --router', 'install vue router')
    .option('-s, --store', 'install vuex store')
    .option('-a, --allin', 'install less router store')
    .action(function(story, name, cmd) {
        // console.log('create story:' + story + ' proName:' + name + (cmd.less ? ' less' : ''));

        let json = {
            story : story,
            module: [],
            name : name,
            version : '1.0.0',
            author : '',
            description : ''
        };

        creater(json,cmd);
    // rp(package.template.url).then(function(str) {
    //     console.log('success\n');
    //     console.log(str);
    // }).catch(function(err) {
    //     console.log(chalk.red('network is error(网络错误，请检测重试)'));
    //     process.exit(1);
    // });
    });

program.command('fetch <story> <name>').action(function(story, name, cmd) {
    console.log('fetch:' + story + ' proName:' + name);
});

program.parse(process.argv);
