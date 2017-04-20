import { expect } from "chai";
import "mocha";
import JobStates from "../contracts/JobStates";
import JobRunner from "../JobRunner";
import TestJob from "./testjob";

const runner = new JobRunner(3);

describe("JobRunner", () => {

    it("pipe should be of 3 length", () => {
        expect(runner.getPipe().length).to.equal(3);
    });

    it("que should be empty", () => {
        expect(runner.getQue().length).to.equal(0);
    });

    it("should add one job", () => {
        const job = new TestJob();
        runner.add(job);
        expect(runner.getQue().length).to.equal(1);
    });

    it("should run the que", () => {
        runner.next();
    });

    it("job should be running", () => {
        const job = runner.getQue()[0];
        expect(job.que[0].state).to.equal(JobStates.RUNNING);
    });

    it("should complete the job", (done) => {
        setTimeout(() => {
            const job = runner.getQue()[0];
            expect(job.que[0].state).to.equal(JobStates.COMPLETED);
            done();
        }, 300);
    });

    it("pipe should be of 3 length", () => {
        const status = expect(runner.getPipe()[0]).to.be.null;
    });

});
