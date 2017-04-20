import CoreJob from "../CoreJob";

interface IPriorityQue {
    priority: number;
    que: CoreJob[];
    index: number;
}

export default IPriorityQue;
