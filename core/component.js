import * as Sqrl from 'squirrelly'; 
// https://github.com/squirrellyjs/squirrelly/

export class Component {
    constructor(name){

        this.name = name;
        this.__template = {
            raw: null,
            parsed:null
        }
        this.__component = {};
        this.__template.raw = document.querySelector(`#${name}`).innerHTML;
    }
    __dataProxy( data ) {
        
        return new Proxy(data, {
            get: (target, key)=>{
                return target[key];
            },
            set: (target, key, value) => {         
                if (!target.hasOwnProperty(key)) { return false; }
                target[key] = value;
                this.__parse();   
                return true;
            },
        });
    }
    __parse() {
        this.__template.parsed = Sqrl.Render(this.__template.raw, this.__component.data);
        document.querySelector(`[${this.name}]`).innerHTML = this.__template.parsed; 
    }
    render( component ) {
        
        this.__component.data = this.__dataProxy(component.data);
        this.__parse()
        if(component.create) component.create.apply(this.__component.data,[]); 
        
    }
}