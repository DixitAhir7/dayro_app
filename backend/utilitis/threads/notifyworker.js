const { Worker, isMainThread, parentPort } = require('worker_threads');


// check if the node is in worker thread or not
const notifyworker = (...data) => {
    if (isMainThread) {
        return new Promise((resolve, reject) => {
            const worker = new Worker(__filename, {
                workerData: data,
            });

            worker.on('message', resolve);
            worker.on('error', reject);
        })
    } else {
        parentPort.postMessage()
    };
};

module.exports = {
    notifyworker
};