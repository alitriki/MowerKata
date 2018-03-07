import {readInputFile, initializeLawn, MowLawn} from '../src/index';
import { assert } from 'chai';
var chai = require('chai');

describe('main controller (index)',()=>{
    it("should raise a 'No such file' exception",()=>{
        chai.expect(()=>readInputFile('Non existing file')).to.throw("No such file");
    });
    it("should raise a 'Empty file' exception",()=>{
        chai.expect(()=>readInputFile('resources/EmptyFile.txt')).to.throw("Empty file");
    });
    it("should raise a 'Wrong parameter number' exception",()=>{
        chai.expect(()=>initializeLawn('resources/WrongParameterNumberFile.txt')).to.throw("Wrong parameter number");
    });
    it("should raise a 'Wrong parameter type' exception",()=>{
        chai.expect(()=>initializeLawn('resources/WrongParameterTypeFile.txt')).to.throw("Wrong parameter type");
    });    
    it("should raise a 'Lawn not square' exception",()=>{
        chai.expect(()=>initializeLawn('resources/LawnNotSquareFile.txt')).to.throw("Lawn not square");
    });
    it("should reject promise with error 'Mower out of Lawn'",()=>{
        initializeLawn('resources/MowerOutOfLawnFile.txt').catch((error: any)=>{
            assert.equal(error,'Mower out of Lawn')
        });
    });
    it("should reject promise with error'Wrong orientation'",()=>{
        initializeLawn('resources/WrongOrientationFile.txt').catch((error: any)=>{
            assert.equal(error,'Wrong orientation')
        });
    });
});