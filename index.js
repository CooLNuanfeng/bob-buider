#!/usr/bin/env node
const program = require('commander');
const execa = require('execa');

const package = require('./package.json');
const creater = require('./lib/creater.js');
const fetch = require('./lib/fetch.js');


var json = {
    story : '',
    module: [],
    name : '',
    version : '',
    author : '',
    description : ''
};

program.version(package.version, '-v, --version')
    .command('create <story> <name>')
    .option('-l, --less', 'install less')
    .option('-r, --router', 'install vue router')
    .option('-s, --store', 'install vuex store')
    .option('-a, --allin', 'install less router store')
    .action(function(story, name, cmd) {
        creater(Object.assign({},json,{story,name,version:'1.0.0'}),cmd);
    });

program.command('fetch <story> <name>')
    .action(function(story, name, cmd) {
        fetch(Object.assign({},json,{story,name}),cmd);
});

program.parse(process.argv);
