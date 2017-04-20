import CoreJob from "../CoreJob";

interface IJobRunnerContracts {
    add(list: CoreJob[]|CoreJob): void;
    getPendingJobs(): number;
    start(): void;
}

export default IJobRunnerContracts;
