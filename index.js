class ObjectsPool {
    constructor() {
        this.__pool = [];
        this.__queue = [];
    }

    put(object = {}) {
        this.__pool.push(object);
        if (this.__queue.length) {
            const obj = this.__pool.shift();
            this.__queue.shift()(obj);
        }
    }

    async get() {
        if (this.__pool.length) {
            return this.__pool.shift();
        } else {
            let promise = new Promise((resolve => {
                this.__queue.push(resolve);
            }));

            return await promise;
        }
    }
}

module.exports = ObjectsPool;