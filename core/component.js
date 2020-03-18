import * as Sqrl from 'squirrelly'; 
// https://github.com/squirrellyjs/squirrelly/

/**
 * 
 * @param {string} selector 
 * @param {string} html 
 */
const Render  = (selector, html) => {
    document.querySelector(`[${selector}]`).innerHTML = html;
};
/**
 * 
 * @param {string} name 
 * @param {Object} hooks 
 * @param {Object} thisArg 
 */
const ExecuteHook = (name, hooks, thisArg ) => hooks[name] ? hooks[name].apply(thisArg, []) : null;
/**
 * 
 * @param {string} template 
 * @param {Object} data 
 */
const Parse = (template, data) => Sqrl.Render(template, data);
/**
 * 
 * @param {Object} data 
 * @param {function} set 
 */
const DataProxy = (data, set) => new Proxy(data, {
    get: (target, key)=>{
        return target[key];
    },
    set: (target, key, value) => {         
        if (!target.hasOwnProperty(key)) { return false; }
        target[key] = value;
        set(target,key,value)   
        return true;
    },
});
/**
 * 
 * @param {string} name 
 * @param {Object} state 
 */
export const Component = (name, state) => {
    
    let State = {
        name: name,
        ...state.data,
        ...state.methods,
        
    };
    let Hooks = state.hooks;
    let raw_template = document.querySelector(`#${name}`).innerHTML; 
    let proxy = DataProxy(State,()=>{
        Render(State.name, Parse(raw_template, proxy) );
    });
    let parsed = Parse(raw_template, proxy);
    
    
    ExecuteHook('onCreate',Hooks, proxy);
    Render(State.name, parsed );
    return proxy;
};