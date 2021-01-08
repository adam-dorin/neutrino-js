
import * as Sqrl from 'squirrelly'; 
// https://github.com/squirrellyjs/squirrelly/

let Templates = {};
let TemplateElements = {};
let count = 0;
class TemplateElement {
    constructor(){

    }

    getElement(selector) {
        return document.querySelectorAll(`[comp-${selector}]`);
    }
    isCached(selector){
        return TemplateElements[selector].length>0;
    }
    cacheElement(selector,element){
        TemplateElements[selector] = element;
    }

    setHTML(selector, html) {

        if(this.getElement(selector).length){
            this.getElement(selector).forEach(element => {
               element.innerHTML = html;
            });
        }
    
    }
}

class _Template {
    
    constructor(){
        this.element = new TemplateElement();
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
            let x = this.parse(name,data);
            this.element.setHTML(name, x );
        })
    }


}

export const Template = _Template;

