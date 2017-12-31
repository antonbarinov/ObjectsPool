# ObjectsPool
Pool for any objects. Prefer use this for connection pools (MySQL, PostresSQL, etc.)

## Install
```
npm i objects-pool
```

## Exmaple

```
const pool = new ObjectsPool();

async function sleep(seconds = 1) {
    return new Promise(resolve => {
        setTimeout(() => {
            resolve(true);
        }, seconds * 1000);
    });
}

pool.put({a: 1}); // put some object in our pool
pool.put({a: 2}); // put some object in our pool
pool.put({a: 3}); // put some object in our pool

async function work(time) {
    const obj = await pool.get(); // get from pool
    await sleep(time);
    console.log(obj);
    obj.release(); // put it back to our pool
}

for (let i = 1; i <= 10; i++) {
    if (i <= 2) {
        work(i);
    } else {
        work(0);
    }
}
```

Output:
```
{ a: 3, release: [Function] }
{ a: 3, release: [Function] }
{ a: 3, release: [Function] }
{ a: 3, release: [Function] }
{ a: 3, release: [Function] }
{ a: 3, release: [Function] }
{ a: 3, release: [Function] }
{ a: 3, release: [Function] }
{ a: 1, release: [Function] }
{ a: 2, release: [Function] }
```

## API
- .put(object) - Put `object` to pool.
- .get() - Get object that not busy right now. If all objects busy it will be wait until some one has been released (putted back to the pool).

