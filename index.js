const { gray, bold, white } = require('colorette');
const ansiEscapes = require('ansi-escapes');
const readline = require('readline');

const generateSingleOption = (option) => {
    const { key, description } = option;
    const optionString = gray('> Press') + ` ${bold(white(key))} ` + gray(`${description}\n`);
    return optionString;
};
const generateConfigDescription = (config) => {
    let configDescString = '\n';
    const headerString = bold(white('Interactive Usage'));
    configDescString += headerString;
    configDescString += '\n';
    Object.keys(config).forEach((option) => {
        configDescString += generateSingleOption(config[option]);
    });
    configDescString += '\n';
    return configDescString;
};

const setupInteractive = () => {
    const usagePrompt = generateConfigDescription(interactiveConfig);
    console.clear();
    console.log(usagePrompt);
};

modules.exports = async function run(config) {
    const stdin = process.stdin;
    stdin.setEncoding('utf-8');
    stdin.setRawMode(true);
    readline.emitKeypressEvents(stdin);


    
    setupInteractive();

    const isExitCtrl = (key) => key.ctrl && key.name === 'c';

    stdin.on('keypress', (str, key) => {
        stdin.setRawMode(true);
        if (isExitCtrl(key)) {
            console.clear();
            process.exit();
        }
        switch (key.name) {
            case 'down':
                process.stdout.write(ansiEscapes.cursorNextLine);
                break;
            case 'up':
                process.stdout.write(ansiEscapes.cursorPrevLine);
                break;
            case 'return':
                break;
            default:
                break;
        }
    });

    stdin.on('data', async function (data) {
        interactiveConfig.forEach( prop => {
            if(prop.key === data) {
                console.clear()
                prop.onShowMore.action();
                //   console.clear();
                // stdin.setEncoding('utf-8');
            }
        })
    });
};