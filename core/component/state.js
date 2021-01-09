import { Template } from "../template";
import { DataProxy } from "./proxy";
import { ExecuteHook, HOOKS } from "./hook";

export class State {
    constructor(name, state, dataReceiver) {
        this.name = name
        Object.assign(this, state.methods);
        Object.assign(this, state.data);
        this.component = {
            sendMessageTo: (name, data) => dataReceiver.sendTo(name, data),
            emitter: dataReceiver
        }
    }
}

export class InternalState {
    constructor(name, state, dataReceiver) {
        this.name = name
        Object.assign(this, state.methods);
        Object.assign(this, state.data);
        this.component = {
            sendMessageTo: (name, data) => dataReceiver.sendTo(name, data),
            emitter: dataReceiver
        }
    }
}

export const setComponentDefaultState = (name, state, DataReceiver, renderer) => {

    let _state = ({
        state: new State(name, state, DataReceiver),
        template: {
            instance: new Template(),
            raw: document.querySelector(`#${name}`).innerHTML
        },
        hooks: state.hooks,
        renderer: {
            internal: renderer.internal,
            external: renderer.external
        },
        proxy: null,
        setTemplate: function () {
            this.template.instance.setTemplate(name, this.template.raw)
        },
        render: function () {
            this.template.instance.render(name, this.proxy);
        },
        setRendererSubscribers: function () {
            this.renderer.internal.subscribe(name, () => {
                this.template.instance.render(name, this.proxy)
            })
            this.renderer.external.subscribe(name, () => {
                this.template.instance.render(name, this.proxy)
            })
        },
        executeHook: function () {
            return {
                onCreate: () => ExecuteHook(HOOKS.ON_CREATE, this.hooks, this.proxy),
                onData: data => ExecuteHook(HOOKS.ON_DATA, this.hooks, this.proxy, data)
            }
        }
    })
    _state.proxy = DataProxy(_state.state, _state.renderer.internal)
    _state.setTemplate();
    _state.setRendererSubscribers();   
    return _state;
}

class ExternalState {
    constructor(name, state, DataReceiver, renderer) {
        this.name = name;
        this.internalState = new InternalState(name,state,DataReceiver)
        this.template = {
            instance: new Template(),
            raw: document.querySelector(`#${name}`).innerHTML
        }
        this.hooks =  state.hooks,
        this.renderer = {
            internal: renderer.internal,
            external: renderer.external
        }
        this.proxy =  DataProxy(this.internalState, this.renderer.internal);
        this.setTemplate();
        this.setRendererSubscribers();
    }
    setTemplate() {
        this.template.instance.setTemplate(this.name, this.template.raw)
    }
    render() {
        this.template.instance.render(this.name, this.proxy);
    }
    setRendererSubscribers() {
        this.renderer.internal.subscribe(this.name, () => {
            this.template.instance.render(this.name, this.proxy)
        })
        this.renderer.external.subscribe(this.name, () => {
            this.template.instance.render(this.name, this.proxy)
        })
    }
    executeHook() {
        return {
            onCreate: () => ExecuteHook(HOOKS.ON_CREATE, this.hooks, this.proxy),
            onData: data => ExecuteHook(HOOKS.ON_DATA, this.hooks, this.proxy, data)
        }
    }
}
