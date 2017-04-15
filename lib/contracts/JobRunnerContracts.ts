import CoreJob from '../CoreJob';

interface JobRunnerContracts {
    add(list: Array<CoreJob>|CoreJob): void
    getPendingJobs(): number
    start(): void
}

export default JobRunnerContracts;
