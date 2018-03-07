import { Mower } from './Mower'
import fs = require('fs');
var lawnsize: number;
var Xposition: number;
var Yposition: number;
var orientation: string;
var instructions: string;
var fileLines: string;

initializeLawn('resources/InputFile.txt');

export function initializeLawn(fileName: string) :any {
    fileLines = readInputFile(fileName);
    if (fileLines != null) {
        //first line
        var firstLine = fileLines[0].split(' ');
        if (firstLine.length != 2) {
            // too many or too few parameters in the first line
            throw new Error('Wrong parameter number');
        } else {

            if (firstLine[0] != firstLine[1]) {
                // parameters need to be equal for the lawn to be square
                throw new Error('Lawn not square');
            } else {
                lawnsize = parseInt(firstLine[0]);
                if (isNaN(lawnsize) || lawnsize < 0) {
                    // parseInt failed or negative number
                    throw new Error('Wrong parameter type');
                }
            }
            // call Mowers asynchronously
            return MowLawn();
        }
    }
}

export async function MowLawn() {
    if (fileLines != null) {
        //initialize result file
        fs.writeFile('resources/Result.txt', '', function (err) { });
        for (let i = 1; i < fileLines.length; i = i + 2) {
            //Mower coordinates
            var MowerCoordinates = fileLines[i].split(' ');
            if (MowerCoordinates.length != 3) {
                // too many or too few parameters
                return Promise.reject('Wrong parameter number');
            } else {
                Xposition = parseInt(MowerCoordinates[0]);
                Yposition = parseInt(MowerCoordinates[1]);
                if (isNaN(Xposition) || isNaN(Yposition)) {
                    // parseInt failed
                    return Promise.reject('Wrong parameter type');
                }
                if (Xposition > lawnsize || Yposition > lawnsize) {
                    // the Mower is out of the lawn
                    return Promise.reject('Mower out of Lawn');
                }
                orientation = MowerCoordinates[2]
                if (orientation.toString() !=='E' && orientation.toString() !== 'W' && orientation.toString() !== 'N' && orientation.toString() !== 'S') {
                    // orientation must be (E || W || N || S)
                    return Promise.reject('Wrong orientation');
                }
            }
            //instructions
            instructions = fileLines[i + 1];
            await new Promise(resolve => {
                setTimeout(() => {
                    //mow lawn
                    let mower: Mower = new Mower(Xposition, Yposition, orientation, lawnsize);
                    let result: string = mower.executeCommands(instructions);
                    fs.appendFile('resources/Result.txt', result, function (err) { });
                    resolve();
                }, 500);
            });
        }
    }
}

export function readInputFile(fileName: string): any {
    try {
        var file = fs.readFileSync(fileName).toString().match(/^.+$/gm);
        if (file == null) {
            throw new TypeError('Empty file');
        } else {
            return file;
        }
    }
    catch (error) {
        if (error instanceof TypeError) {
            //the file is empty
            throw new Error('Empty file');
        } else {
            //the file does not exist
            throw new Error('No such file');
        }
    }
}
