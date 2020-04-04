
import { Observer } from './observer';
import { Template } from './template';


/**
 * @description
 */
const HOOKS = {
    ON_CREATE: 'onCreate'
}
/**
 * 
 * @param {string} name 
 * @param {Object} hooks 
 * @param {Object} thisArg 
 */
const ExecuteHook = (name, hooks, thisArg ) => hooks[name] ? hooks[name].apply(thisArg, []) : null;

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
        setTimeout(()=>{
            set(target,key,value);   
        });
        return true;
    },
});
/**
 * TODO: Consider classes when using multiple instances of the same components
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

    let renderer = new Observer(false); 

    let proxy = DataProxy( State, () => {
        renderer.send(proxy);
    });
    // onData HOOK //TODO: define onData Hook
    renderer.subscribe(State.name, ()=>{
        // onBeforeChange HOOK
        Template.render(State.name, proxy);
        // onAfterChange HOOK
    });
    
    Template.render(State.name, proxy);
    ExecuteHook(HOOKS.ON_CREATE, Hooks, proxy);
    return { 
        name: name, 
        raw_template: raw_template,
        renderer: renderer.send
    };
};