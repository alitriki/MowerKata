import fs = require('fs');

export class Mower {
    Xposition: number;
    Yposition: number;
    orientation: string;
    lawnSize: number;

    constructor(Xposition: number, Yposition: number, orientation: string, lawnSize: number) {
        this.Xposition = Xposition;
        this.Yposition = Yposition;
        this.orientation = orientation;
        this.lawnSize = lawnSize;
    }

    public turnRight() {
        switch (this.orientation) {
            case 'N':
                this.orientation = 'E'
                break;
            case 'E':
                this.orientation = 'S'
                break;
            case 'S':
                this.orientation = 'W'
                break;
            case 'W':
                this.orientation = 'N'
                break;
            default: throw new Error("Undefined orientation");
        }
    }
    public turnLeft() {
        switch (this.orientation) {
            case 'N':
                this.orientation = 'W'
                break;
            case 'E':
                this.orientation = 'N'
                break;
            case 'S':
                this.orientation = 'E'
                break;
            case 'W':
                this.orientation = 'S'
                break;
            default: throw new Error("Undefined orientation");
        }
    }
    public goForward() {
        switch (this.orientation) {
            case 'N':
                if (this.Yposition < this.lawnSize) {
                    this.Yposition++;
                }
                break;
            case 'E':
                if (this.Xposition < this.lawnSize) {
                    this.Xposition++;
                }
                break;
            case 'S':
                if (this.Yposition > 0) {
                    this.Yposition--;
                }
                break;
            case 'W':
                if (this.Xposition > 0) {
                    this.Xposition--;
                }
                break;
            default: throw new Error("Undefined orientation");
        }
    }

    public executeCommands(commandLine: string) {
        commandLine.split('');
        for (let i = 0; i < commandLine.length; i++) {
            switch (commandLine[i]) {
                case 'R':
                    this.turnRight();
                    break;
                case 'L':
                    this.turnLeft();
                    break;
                case 'F':
                    this.goForward();
                    break;
                default:
                    throw new Error("wrong command");
            }
        }

        let result: string = this.Xposition.toString() +' '+ this.Yposition.toString() +' '+ this.orientation+'\n'
        // fs.appendFile('resources/Result.txt', result , function (err) {});
        return result;
    }

}