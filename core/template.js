
import * as Sqrl from 'squirrelly'; 
// https://github.com/squirrellyjs/squirrelly/

let Templates = {};
let TemplateElements = {};

/**
 * 
 * TODO: One thing that should be considered is concurency of operations, dependencies and components with children.   
 * TODO: In that case a Virtual dom should be implemented where all yhe components het redered first, 
 * TODO: then afterwards in order of dependency they get pushed to the DOM.
 * 
 */

 /**
  * 
  * C=>B
  * A => uses D
  * B => uses C
  * D=>A
  * 
  * if component has dependecies => go to deps que 
  *                          else setTree component
  * for each dep in component.dependecies 
  *     => find dep and setTree dep component
  * 
  */
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

export const getTemplate = (name) => Templates[ name ];

export const setTemplate = (name, template) => {

    Templates[ name ] = template;
    
    
    if(!VD.querySelector(`${name}-template`)){
        const template_el = document.createElement('div')
        template_el.setAttribute('id',`${name}-template`)
        template_el.innerHTML = template;
        VD.appendChild(template_el);
    }
    console.log(VD,Templates);
    
}
