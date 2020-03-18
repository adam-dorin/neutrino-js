import { Component } from "../../core/component";

const data = () => ({
    test: 42,
    count:100
})
const onCreate = function() {
    
};

export const SecondComponent = () => Component('second-component',{
    data:{ ...data() },
    methods: {},
    hooks: {
        onCreate: onCreate
    }
}); 