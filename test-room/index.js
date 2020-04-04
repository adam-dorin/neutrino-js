import { Neutrino } from '../core/neutrino';
import { FirstComponent } from './components/MyComponent';
import { SecondComponent } from './components/SecondComponent';
import { NestedComponent } from './components/NestedComponent';



const app = new Neutrino({
    components:[
        FirstComponent,
        SecondComponent,
        NestedComponent
    ],
    services: []
})