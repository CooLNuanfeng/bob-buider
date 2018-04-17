const inquirer = require('inquirer');
const template = require('./template.js');


module.exports = function(json,cmd){
    if(cmd.less || cmd.router || cmd.store || cmd.allin) {
        if (cmd.allin) {
            json.module.push('less');
            json.module.push('router');
            json.module.push('store');
        } else {
            cmd.less && json.module.push('less');
            cmd.router && json.module.push('router');
            cmd.store && json.module.push('store');
        }
        inquirer.prompt([
            {
                type: 'input',
                name: 'description',
                message: "What's your app description(项目描述)"
            },
            {
                type: 'input',
                name: 'author',
                message: "author(项目开发者)"
            },
        ]).then(answers => {
            json.author = answers.author;
            json.description = answers.description;
            template.fetchTemplate(json);
        });
    }else {
        inquirer.prompt([
            {
                type: 'input',
                name: 'description',
                message: "What's your app description(项目描述)"
            },
            {
                type: 'input',
                name: 'author',
                message: "author(项目开发者)"
            },
            {
                type: 'checkbox',
                message: 'Select import module(选择安装模块)',
                name: 'module',
                choices: [
                    new inquirer.Separator(' = The dependencies = '),{
                        name: 'less'
                    }, {
                        name: 'router'
                    }, {
                        name: 'store'
                    }
                ],
                validate: function(answer) {
                    // if (answer.length < 1) {
                    //     return 'You must choose at least one topping.';
                    // }
                    return true;
                }
            }
        ]).then(answers => {
            json.module = answers.module;
            json.author = answers.author;
            json.description = answers.description;

            template.fetchTemplate(json);

        });
    }
}
