/**
 * @description
 */
export const HOOKS = {
    ON_CREATE: 'onCreate',
    ON_DATA:'onData'
}
/**
 * 
 * @param {string} name 
 * @param {Object} hooks 
 * @param {Object} thisArg 
 */
export const ExecuteHook = (name, hooks, thisArg, data ) => {
    return hooks[name] ? (data ? hooks[name].apply(thisArg, [data]) : hooks[name].apply(thisArg, []) ) : null;
}