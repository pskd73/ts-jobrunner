import { expect } from "chai";
import "mocha";
import JobStates from "../contracts/JobStates";
import CoreJob from "../CoreJob";
import TestJob from "./testjob";

describe ("CoreJob", () => {
    const job = new TestJob();

    it ("should create a job", () => {
        return expect(job).to.be.ok;
    });

    it ("should have pending state", () => {
        expect(job.state).to.equal(JobStates.PENDING);
    });

    it ("should run job", (done) => {
        job.handle()
            .then((response) => {
                const status = expect(response.status).to.be.ok;
                done();
            });
    });

    it ("should have completed state", () => {
        expect(job.state).to.equal(JobStates.COMPLETED);
    });

    it ("should give time difference", () => {
        expect(job.endTime - job.startTime).to.greaterThan(200).lessThan(210);
    });
});
