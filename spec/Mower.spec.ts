import {Mower} from '../src/Mower';
import { assert } from 'chai';
var chai = require('chai');

describe('Mower tests',()=>{
    var mower:Mower = new Mower(0,0,'N',5);
    it("should raise 'Wrong command' exception",()=>{
        chai.expect(()=>mower.executeCommands('AF')).to.throw("wrong command");
    });
    it("should raise 'Undefined orientation' exception",()=>{
        mower.orientation='B';
        chai.expect(()=>mower.turnRight()).to.throw("Undefined orientation");
    });
    it("should raise 'Undefined orientation' exception",()=>{
        mower.orientation='B';
        chai.expect(()=>mower.turnLeft()).to.throw("Undefined orientation");
    });
    it("orientation should be 'E' after turning right",()=>{
        mower.orientation='N';
        mower.turnRight();
        assert.equal(mower.orientation,'E');
    });
    it("orientation should be 'S' after turning right",()=>{
        mower.turnRight();
        assert.equal(mower.orientation,'S');
    });
    it("orientation should be 'W' after turning right",()=>{
        mower.turnRight();
        assert.equal(mower.orientation,'W');
    });
    it("orientation should be 'N' after turning right",()=>{
        mower.turnRight();
        assert.equal(mower.orientation,'N');
    });
    it("orientation should be 'W' after turning left",()=>{
        mower.turnLeft();
        assert.equal(mower.orientation,'W');
    });
    it("orientation should be 'S' after turning left",()=>{
        mower.turnLeft();
        assert.equal(mower.orientation,'S');
    });
    it("orientation should be 'E' after turning left",()=>{
        mower.turnLeft();
        assert.equal(mower.orientation,'E');
    });
    it("orientation should be 'N' after turning left",()=>{
        mower.turnLeft();
        assert.equal(mower.orientation,'N');
    });

    it("should raise 'Undefined orientation' exception",()=>{
        mower.orientation='B';
        chai.expect(()=>mower.goForward()).to.throw("Undefined orientation");
    });

    it("Xposition should increment by 1 after going forward",()=>{
        mower.orientation='E'
        let oldXposition = mower.Xposition;
        mower.goForward();
        assert.equal(oldXposition+1,mower.Xposition);
    });
    it("Yposition should increment by 1 after going forward",()=>{
        mower.orientation='N'
        let oldYposition = mower.Yposition;
        mower.goForward();
        assert.equal(oldYposition+1,mower.Yposition);
    });
    it("Xposition should dencrement by 1 after going forward",()=>{
        mower.orientation='W'
        let oldXposition = mower.Xposition;
        mower.goForward();
        assert.equal(oldXposition-1,mower.Xposition);
    });
    it("Yposition should dencrement by 1 after going forward",()=>{
        mower.orientation='S'
        let oldYposition = mower.Yposition;
        mower.goForward();
        assert.equal(oldYposition-1,mower.Yposition);
    });

    it("Xposition should not change after going forward becose thi lawn limit is reached",()=>{
        mower.orientation='E'
        mower.Xposition=5;
        let oldXposition = mower.Xposition;
        mower.goForward();
        assert.equal(oldXposition,mower.Xposition);
    });
    it("Yposition should not change after going forward becose thi lawn limit is reached",()=>{
        mower.orientation='N'
        mower.Yposition=5;
        let oldYposition = mower.Yposition;
        mower.goForward();
        assert.equal(oldYposition,mower.Yposition);
    });
    it("Xposition should not change after going forward becose thi lawn limit is reached",()=>{
        mower.orientation='W'
        mower.Xposition=0;
        let oldXposition = mower.Xposition;
        mower.goForward();
        assert.equal(oldXposition,mower.Xposition);
    });
    it("Yposition should not change after going forward becose thi lawn limit is reached",()=>{
        mower.orientation='S'
        mower.Yposition=0;
        let oldYposition = mower.Yposition;
        mower.goForward();
        assert.equal(oldYposition,mower.Yposition);
    });
});