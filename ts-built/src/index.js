"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : new P(function (resolve) { resolve(result.value); }).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
const Mower_1 = require("./Mower");
const fs = require("fs");
var lawnsize;
var Xposition;
var Yposition;
var orientation;
var instructions;
var fileLines;
initializeLawn('resources/InputFile.txt');
function initializeLawn(fileName) {
    fileLines = readInputFile(fileName);
    if (fileLines != null) {
        //first line
        var firstLine = fileLines[0].split(' ');
        if (firstLine.length != 2) {
            // too many or too few parameters in the first line
            throw new Error('Wrong parameter number');
        }
        else {
            if (firstLine[0] != firstLine[1]) {
                // parameters need to be equal for the lawn to be square
                throw new Error('Lawn not square');
            }
            else {
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
exports.initializeLawn = initializeLawn;
function MowLawn() {
    return __awaiter(this, void 0, void 0, function* () {
        if (fileLines != null) {
            //initialize result file
            fs.writeFile('resources/Result.txt', '', function (err) { });
            for (let i = 1; i < fileLines.length; i = i + 2) {
                //Mower coordinates
                var MowerCoordinates = fileLines[i].split(' ');
                if (MowerCoordinates.length != 3) {
                    // too many or too few parameters
                    return Promise.reject('Wrong parameter number');
                }
                else {
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
                    orientation = MowerCoordinates[2];
                    if (orientation.toString() !== 'E' && orientation.toString() !== 'W' && orientation.toString() !== 'N' && orientation.toString() !== 'S') {
                        // orientation must be (E || W || N || S)
                        return Promise.reject('Wrong orientation');
                    }
                }
                //instructions
                instructions = fileLines[i + 1];
                yield new Promise(resolve => {
                    setTimeout(() => {
                        //mow lawn
                        let mower = new Mower_1.Mower(Xposition, Yposition, orientation, lawnsize);
                        let result = mower.executeCommands(instructions);
                        fs.appendFile('resources/Result.txt', result, function (err) { });
                        resolve();
                    }, 500);
                });
            }
        }
    });
}
exports.MowLawn = MowLawn;
function readInputFile(fileName) {
    try {
        var file = fs.readFileSync(fileName).toString().match(/^.+$/gm);
        if (file == null) {
            throw new TypeError('Empty file');
        }
        else {
            return file;
        }
    }
    catch (error) {
        if (error instanceof TypeError) {
            //the file is empty
            throw new Error('Empty file');
        }
        else {
            //the file does not exist
            throw new Error('No such file');
        }
    }
}
exports.readInputFile = readInputFile;
