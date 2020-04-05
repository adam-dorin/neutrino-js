
const addToTree = (the, tree) =>{
    tree.names.unshift(the.item.name);
    tree.components.unshift(the.item);
    the.items.splice(the.index,1); 
};

const orderByDependencyLevel = (compiled, tree, callback) =>{
    let components = [...compiled];
    
    components.forEach((component, index )=>{
        let the = { item: component, index: index, items:components}
        if(!component.children.length){
           addToTree(the, tree);
        } else {
            let indexes = component.children.map(name=> tree.names.indexOf(name));
            if(indexes.every(value=>value!==-1)){
                addToTree(the, tree);
            }
        }
    });
    if(components.length){
        orderByDependencyLevel(components, tree, callback);
    } else {
        return callback();
    }   
}

export class Neutrino {
    /**
     * 
     * @param {Object} configuration : { components:Component[], services:?Service[], router: Router } 
     */
    constructor(configuration){
        this.tree = {
            names:[],
            components:[]
        }
        this.run(configuration);
    }

    run(configuration) {
        // console.log('run', configuration);
        if( configuration.services && configuration.services.length) {
            configuration.services.forEach( service => new service() );
        }
        if( configuration.components &&  configuration.components.length) {
            let compiledComponents = configuration.components
            .map( component => component() );
            
            compiledComponents.sort((current,next)=>
                next.children.length-current.children.length
            );
           
            orderByDependencyLevel(compiledComponents, this.tree, ()=>{
                this.tree.components.map(compiled=>compiled.ready() );    
            });
        }
        //TODO: Implement router
    }
}