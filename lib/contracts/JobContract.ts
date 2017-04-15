import JobResponse from './JobResponse';

interface JobContract {
    id: number
    startTime: Date
    endTime: Date
    handle(): Promise<JobResponse>
}

export default JobContract;
