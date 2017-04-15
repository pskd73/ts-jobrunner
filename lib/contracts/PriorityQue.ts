import CoreJob from '../CoreJob';

interface PriorityQue {
    priority: number
    que: Array<CoreJob>
    index: number
}

export default PriorityQue;
