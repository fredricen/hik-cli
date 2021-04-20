#!/usr/bin/env node
const program = require('commander') //这个库用来做命令行工具
program.version(require('../package').version)
program
    .command('create <name>')
    .description('create project')
    .action(
        require('../lib/create')
    )
program
    .command('refresh')
    .description('refresh routers...')
    .action(require('../lib/refresh'))
program
    .command('serve')
    .description('serve')
    .action(require('../lib/serve'))
program.parse(process.argv)