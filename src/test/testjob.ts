import CoreJob from "../CoreJob";

class TestJob extends CoreJob {
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

export default TestJob;
