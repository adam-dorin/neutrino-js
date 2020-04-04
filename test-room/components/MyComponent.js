import { Component } from "../../core/component";

const data = () => ({
    test: 42,
    count:100
})
const onCreate = function() {
    console.log(this);
    let iii = setInterval( ()=>{
        this.test += 42;
        if(!this.count){
            clearInterval(iii)
        } else {
            this.count--;
        }
    },10);
    this.component.emitter.sendTo('nested-component',{test:'trolololo'})
};

export const FirstComponent = () => Component('my-component',{
    data:{ ...data() },
    methods: {},
    hooks: {
        onCreate: onCreate
    }
}); 