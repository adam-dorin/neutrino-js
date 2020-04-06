
const addToTree = (the, tree) =>{
    tree.names.unshift(the.item.name);
    tree.components.unshift(the.item);
    the.items.splice(the.index,1); 
};

const orderByDependencyLevel = (compiled, tree, names, callback) =>{
    
    if(names.length) {
        // determine children 
        compiled.forEach(comp=>{
            comp.children = names.filter(name=>comp.raw_template.includes(name))
        })
        // sort desc by number of children 
        compiled.sort((current,next)=>
            next.children.length-current.children.length
        );
    }
    
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
        orderByDependencyLevel(components, tree, [], callback);
    } else {
        return callback();
    }   
}

export class Span {
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
   
        if( configuration.services && configuration.services.length) {
            configuration.services.forEach( service => new service() );
        }
        if( configuration.components &&  configuration.components.length) {
            
            let componentNames = [];
            let compiledComponents = configuration.components
            .map( component => {
                let compiled = component();
                componentNames.push(compiled.name);

                return compiled; 
            });

            orderByDependencyLevel(compiledComponents, this.tree, componentNames, () => {
                this.tree.components.map(compiled=>compiled.ready() );
            });
        }
        //TODO: Implement router
    }
}
