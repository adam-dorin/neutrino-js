
import { DictionaryObserver, SimpleObserver } from './observer';

import { setComponentDefaultState } from './component/state';

// const DataReceiver = new DictionaryObserver(false);
/**
 * TODO: Consider classes when using multiple instances of the same components
 * @param {string} name 
 * @param {Object} state 
 */
export const Component = (name, state) => {

    let dr = null;

    return {
        name: name,
        children: [],
        raw_template: document.querySelector(`#${name}`).innerHTML,
        renderer: new SimpleObserver(true),
        ready: function (DataReceiver) {
            let component = setComponentDefaultState(
                name,
                state,
                DataReceiver,
                { internal: new SimpleObserver(false), external: this.renderer }
            )

            DataReceiver.subscribe(name, (data) => {
                component.executeHook().onData(data)
            });
            component.render();
            component.executeHook().onCreate()
        }
    };
};