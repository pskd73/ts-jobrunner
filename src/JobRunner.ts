import * as Lodash from "lodash";
import JobDescription from "./contracts/JobDescription";
import JobRunnerContracts from "./contracts/JobRunnerContracts";
import PriorityElement from "./contracts/PriorityElement";
import PriorityQue from "./contracts/PriorityQue";
import CoreJob from "./CoreJob";

class JobRunner implements JobRunnerContracts {

    private que: PriorityQue[] = [];
    private pipe: CoreJob[] = [];
    private concurrentJobs: number;
    private queCompletedPointer: number = -1;
    private isStarted: boolean = false;

    constructor(concurrentJobs: number) {
        this.concurrentJobs = concurrentJobs;
        for (let i = 0; i < this.concurrentJobs; i++) {
            this.pipe[i] = null;
        }
    }

    public getPipe() {
        return this.pipe;
    }

    public getPendingJobs() {
        return this.que.length - this.queCompletedPointer;
    }

    public getQue() {
        return this.que;
    }

    public add(list: CoreJob[]|CoreJob) {
        if (!Array.isArray(list)) {
            list = [list];
        }
        for (const job of list) {
            const priority = job.priority;
            let queSet = this.getQueByPriority(priority);
            if (!queSet) {
                queSet = {
                    index: -1,
                    priority,
                    que: [],
                };
                this.que.push(queSet);
            }
            queSet.que.push(job);
        }
        if (this.isStarted) {
            this.appendJobs();
        }
    }

    public start() {
        this.isStarted = true;
        this.appendJobs();
    }

    public next() {
        this.appendSingleJob();
    }

    private getPriorites(): number[] {
        return Lodash.map(this.que, (priorityQ) => priorityQ.priority);
    }

    private getQueByPriority(priority: number): PriorityQue {
        for (const currentQueSet of this.que) {
            if (currentQueSet.priority === priority) {
                return currentQueSet;
            }
        }
        return null;
    }

    private executePipeJob(pipeIndex): void {
        const job = this.pipe[pipeIndex];
        ((index) => {
            job.handle()
                .then(() => {
                    this.pipe[index] = null;
                    if (this.isStarted) {
                        this.appendJobs();
                    }
                });
        })(pipeIndex);
    }

    private getSortedPriorities(): PriorityQue[] {
        return Lodash.sortBy(this.que, [(qs) => qs.priority]).reverse();
    }

    private getNextJob(): CoreJob {
        const priorities = this.getSortedPriorities();
        for (const prioritySet of priorities) {
            const nextIndex = prioritySet.index + 1;
            if (nextIndex < prioritySet.que.length) {
                prioritySet.index = nextIndex;
                return prioritySet.que[prioritySet.index];
            }
        }
        return null;
    }

    private fetchNextQueElement(pipeIndex): boolean {
        const nextJob = this.getNextJob();
        let executed = false;
        if (nextJob) {
            this.pipe[pipeIndex] = nextJob;
            this.executePipeJob(pipeIndex);
            executed = true;
        } else {
            this.pipe[pipeIndex] = null;
        }
        return executed;
    }

    private appendJobs() {
        for (let i = 0; i < this.concurrentJobs; i++) {
            if (this.pipe[i] === null) {
                this.fetchNextQueElement(i);
            }
        }
    }

    private appendSingleJob() {
        for (let i = 0; i < this.concurrentJobs; i++) {
            if (this.pipe[i] === null) {
                this.fetchNextQueElement(i);
                break;
            }
        }
    }

    private isPipeDone() {
        return Lodash.every(this.pipe, (job) => job === null);
    }

}

export default JobRunner;
