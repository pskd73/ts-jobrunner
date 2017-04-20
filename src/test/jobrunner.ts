import 'mocha';
import { expect } from 'chai';
import JobRunner from '../JobRunner';
import TestJob from './testjob';
import JobStates from '../contracts/JobStates';

const runner = new JobRunner(3);

describe("JobRunner", function(){

    it("pipe should be of 3 length", function(){
        expect(runner.getPipe().length).to.equal(3);
    });

    it("que should be empty", function(){
        expect(runner.getQue().length).to.equal(0);
    });

    it("should add one job", function(){
        const job = new TestJob();
        runner.add(job);
        expect(runner.getQue().length).to.equal(1);
    });

    it("should run the que", function(){
        runner.next();
    });

    it("job should be running", function(){
        const job = runner.getQue()[0];
        expect(job.que[0].state).to.equal(JobStates.RUNNING);
    });

    it("should complete the job", function(done){
        setTimeout(a => {
            const job = runner.getQue()[0];
            expect(job.que[0].state).to.equal(JobStates.COMPLETED);
            done();
        }, 300)
    });

    it("pipe should be of 3 length", function(){
        expect(runner.getPipe()[0]).to.be.null;
    });

});
