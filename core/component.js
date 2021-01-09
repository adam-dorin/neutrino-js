
import { DictionaryObserver, SimpleObserver } from './observer';

import { setComponentDefaultState } from './component/state';

// const DataReceiver = new DictionaryObserver(false);
/**
 * TODO: Consider classes when using multiple instances of the same components
 * @param {string} name 
 * @param {Object} state 
 */
export const Component = (name, state) => {

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

/**
 * https://flaviocopes.com/how-to-list-object-methods-javascript/
 * 
 */


class _Component {
    constructor(name) {
        this.name = name;

        this.__state = {
            name: name,
            children: [],
            raw_template: document.querySelector(`#${name}`).innerHTML,
            renderer: new SimpleObserver(true),
            ready: function ( DataReceiver ) {
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
    }

    prender() {
        return {
            name: this.name,
            children: [],
            raw_template: document.querySelector(`#${this.name}`).innerHTML,
            renderer: new SimpleObserver(true),
            ready: ( DataReceiver ) => {
                let component = setComponentDefaultState(
                    this.name,
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
    }
}

class MyCompo extends _Component {
    constructor(){
        super('my-component')
        this.data = {
            test:34,
            lol:'LUL'
        }
    }
}


/*

class A {
    constructor(){
        this.template = null;
        this.y = null;
    }
    init(){
        console.log(this.t,this.y)
    }
}

class B extends A {

    constructor(){
        super();
        this.t = 1;
        this.y = 0;
    }
}

let b = new B();
b.init() // logs: y = 0, t = 1



*/