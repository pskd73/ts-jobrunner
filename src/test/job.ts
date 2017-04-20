import 'mocha';
import { expect } from 'chai';
import CoreJob from '../CoreJob';
import JobStates from '../contracts/JobStates';
import TestJob from './testjob';

describe("CoreJob", function(){
    const job = new TestJob();

    it("should create a job", function(){
        expect(job).to.be.ok;
    });

    it("should have pending state", function(){
        expect(job.state).to.equal(JobStates.PENDING);
    });

    it("should run job", function(done){
        job.handle()
            .then(response => {
                expect(response.status).to.be.ok;
                done();
            });
    });

    it("should have completed state", function(){
        expect(job.state).to.equal(JobStates.COMPLETED);
    });

    it("should give time difference", function(){
        expect(job.endTime - job.startTime).to.greaterThan(200).lessThan(210);
    });
});
