export class Neutrino {
    /**
     * 
     * @param {Object} configuration : { components:Component[], services:?Service[], router: Router } 
     */
    constructor(configuration){
        this.__config = configuration;
        this.run(configuration);
    }

    run(configuration) {
        // console.log('run', configuration);
        if( configuration.services && configuration.services.length) {
            configuration.services.forEach( service => new service() );
        }
        if( configuration.components &&  configuration.components.length) {
            configuration.components.forEach( component => component() );
        }
        //TODO: Implement router
    }
}