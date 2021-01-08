/**
 * 
 * @param {Object} data 
 * @param {function} set 
 */
export const DataProxy = (data, renderer) => {
    let proxy = new Proxy(data, {
        get: (target, key) => {
            console.log(key, typeof target[key]);    
            return target[key];
        },
        set: (target, key, value) => {
            if (!target.hasOwnProperty(key)) { return false; }
            target[key] = value;
            setTimeout(() => {
                renderer.send(proxy);
            });
            return true;
        },
    });
    return proxy;
}