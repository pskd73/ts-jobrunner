import CoreJob from '../CoreJob';

class TestJob extends CoreJob{
    private wait(): Promise<null>{
        return new Promise((resolve, reject) => {
            setTimeout(a => {
                resolve(null);
            }, 200);
        });
    }
    async run(){
        await this.wait();
        return {
            status: true,
            response: "success"
        }
    }
}

export default TestJob;
