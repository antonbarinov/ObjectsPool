class ObjectsPool {
    constructor() {
        this.__pool = [];
        this.__queue = [];
    }

    put(object = {}) {
        const that = this;
        object.release = function () {
            that.__pool.push(this);
            if (that.__queue.length) {
                const obj = that.__pool.shift();
                that.__queue.shift()(obj);
            }
        };


        this.__pool.push(object);
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