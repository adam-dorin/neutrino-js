
import * as Sqrl from 'squirrelly'; 
// https://github.com/squirrellyjs/squirrelly/

let Templates = {};
let TemplateElements = {};

class TemplateElement {
    constructor(){

    }
    getElement(selector) {
        return TemplateElements[selector] ||document.querySelector(`[${selector}]`);
    }
    isCached(selector){
        return TemplateElements[selector];
    }
    cacheElement(selector,element){
        TemplateElements[selector] = element;
    }

    setHTML(selector, html) {


        if(!this.isCached(selector)){
            this.cacheElement(selector, this.getElement(selector) );
        }
        this.getElement(selector).innerHTML = html;
    
    }
}

class _Template {
    
    constructor(){
        this.element = new TemplateElement()
    }
    getTemplate(name) {
        return !!Templates[ name ] ? Templates[ name ] : null; 
    }
    
    setTemplate(name, template) {
        this.element.cacheElement(name,this.element.getElement(name))
        Templates[ name ] = template;
    }

    parse(name, data ){
        return Sqrl.Render(this.getTemplate(name), data);
    }
    render(name, data) {
        setTimeout(()=>{
            this.element.setHTML(name, this.parse(name,data) );
        })
    }


}

export const Template = new _Template();

