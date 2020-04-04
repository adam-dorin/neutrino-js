import { Component } from "../../core/component";

const data = () => ({
    _test: 42
})
const onCreate = function() {
    console.log(this);
    // setTimeout(() => {
        this._test = 99;    
    // });    

    
};

export const NestedComponent = () => Component('nested-component',{
    data:{ ...data() },
    methods: {},
    hooks: {
        onCreate: onCreate
    }
}); 