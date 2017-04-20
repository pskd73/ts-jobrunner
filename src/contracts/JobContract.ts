import JobResponse from "./JobResponse";

interface IJobContract {
    id: number;
    startTime: Date;
    endTime: Date;
    handle(): Promise<JobResponse>;
}

export default IJobContract;
