import { Component } from "../../core/component";


export class FirstComponent extends Component {
    constructor(){
        super('my-component')
        this.render( this.data() );
    }

    data() {
        return {
            data: {
                test: 42 ,
                count: 100
            },
            create: function() {
                console.log('create',this.data);
                let iii = setInterval( ()=>{
                    this.test += 42;
                    if(!this.count){
                        clearInterval(iii)
                    } else {

                        this.count--;
                    }
                },10);
            }
        }
    }
}