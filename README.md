# ts-jobrunner
A Job Runner library for javascript/typescript

This library comes handy when you want to run jobs concurrently, with having buffer limit. This library is written on TypeScript but it can be used on plain javascript too. It comes with type defination out of the box.

## Installation
```npm install --save ts-jobrunner```

## Core API
```
CoreJob (abstract class)
    - priority: number
    - abstract run(): Promise<JobResponse>
JobRunner
    - add(list: CoreJob[] | CoreJob): void
    - start(): void
    - next(): void
    - getPipe(): CoreJob[]
```
For more details, check source code and contracts section

## Examples
Import modules
```
import { CoreJob, JobRunner } from 'ts-jobrunner';
```

Extend CoreJob and create your own job
```
class MyJob extends CoreJob {
    public async run() {
        return await this.wait().then(() => {
            return {
                response: "success",
                status: true,
            };
        });
    }
    private wait(): Promise<null> {
        return new Promise((resolve, reject) => {
            setTimeout(() => {
                resolve(null);
            }, 200);
        });
    }
}
```

Create jobrunner and add the job, and start it
```
const job = new MyJob();
const jobrunner = new JobRunner(5);

jobrunner.add(job);
jobrunner.start();

// Add as many jobs as you want
jobrunner.add(new MyJob());
// ...
// ...
```

Suggestions and contributions are open. Happy coding :)
