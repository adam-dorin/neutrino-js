import { Template } from './template';

export class Neutrino {
    /**
     * 
     * @param {Object} configuration : { components:Component[], services:?Service[], router: Router } 
     */
    constructor(configuration){
        this.__templates = {};//document.createElement('div');
        this.run(configuration);
    }

    run(configuration) {
        // console.log('run', configuration);
        if( configuration.services && configuration.services.length) {
            configuration.services.forEach( service => new service() );
        }
        if( configuration.components &&  configuration.components.length) {
            configuration.components
            .map( component =>{ 
                const compiled = component();
                Template.setTemplate( compiled.name, compiled.raw_template);
            });
        }
        //TODO: Implement router
    }
}