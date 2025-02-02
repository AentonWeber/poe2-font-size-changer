const { program } = require('commander');
const lineReader = require('line-reader');
const fs = require('fs');

program
    .requiredOption('-f, --file <String>', 'Path to Lootfilter')
    .option('-n, --newFile <String>', 'Path where to save', false)
    .option('-v, --value <int>', 'increas or decrease font size number', 0)
    .action((async () => {
        const linesToWrite = [];

        lineReader.eachLine(program.opts().file, (line, last) => {
            line = line.trim();
            if (line.toLowerCase().startsWith('setfontsize')) {
                const value = line.split(/\s+/);
                const newSize = parseInt(value[1]) + parseInt(program.opts().value);

                line = `${value[0]} ${newSize}`;
            }
            linesToWrite.push(line);

            if (last) {
                const outputPath = program.opts().newFile || program.opts().file;
                fs.writeFile(outputPath, linesToWrite.join('\n'), (err) => {
                    if (err) {
                        console.error(err);
                    } else if (program.opts().newFile) {
                        console.log('New File successfully create!');
                    } else {
                        console.log('File successfully overwriten!')
                    }
                });
            }
        });
    }));

program.parse(process.argv);
