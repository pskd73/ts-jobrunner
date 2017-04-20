import * as uniqid from "uniqid";
import JobContract from "./contracts/JobContract";
import JobResponse from "./contracts/JobResponse";
import JobStates from "./contracts/JobStates";

abstract class CoreJob implements JobContract {

    public id;
    public startTime;
    public endTime;
    public state: JobStates;
    public response: JobResponse;
    public priority: number = 10;

    constructor() {
        this.id = uniqid();
        this.state = JobStates.PENDING;
    }

    public async handle() {
        this.state = JobStates.RUNNING;
        this.startTime = new Date();
        this.response = await this.run();
        this.endTime = new Date();
        this.state = JobStates.COMPLETED;
        return this.response;
    }

    public abstract async run(): Promise<JobResponse>;
}

export default CoreJob;
