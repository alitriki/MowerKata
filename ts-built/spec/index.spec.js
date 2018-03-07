"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const index_1 = require("../src/index");
const chai_1 = require("chai");
var chai = require('chai');
describe('main controller (index)', () => {
    it("should raise a 'No such file' exception", () => {
        chai.expect(() => index_1.readInputFile('Non existing file')).to.throw("No such file");
    });
    it("should raise a 'Empty file' exception", () => {
        chai.expect(() => index_1.readInputFile('resources/EmptyFile.txt')).to.throw("Empty file");
    });
    it("should raise a 'Wrong parameter number' exception", () => {
        chai.expect(() => index_1.initializeLawn('resources/WrongParameterNumberFile.txt')).to.throw("Wrong parameter number");
    });
    it("should raise a 'Wrong parameter type' exception", () => {
        chai.expect(() => index_1.initializeLawn('resources/WrongParameterTypeFile.txt')).to.throw("Wrong parameter type");
    });
    it("should raise a 'Lawn not square' exception", () => {
        chai.expect(() => index_1.initializeLawn('resources/LawnNotSquareFile.txt')).to.throw("Lawn not square");
    });
    it("should reject promise with error 'Mower out of Lawn'", () => {
        index_1.initializeLawn('resources/MowerOutOfLawnFile.txt').catch((error) => {
            chai_1.assert.equal(error, 'Mower out of Lawn');
        });
    });
    it("should reject promise with error'Wrong orientation'", () => {
        index_1.initializeLawn('resources/WrongOrientationFile.txt').catch((error) => {
            chai_1.assert.equal(error, 'Wrong orientation');
        });
    });
});
