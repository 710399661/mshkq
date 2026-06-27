import {Machine} from 'xstate';
import {states} from './states'

const stateMachine = Machine({
        id: 'login',
        initial: 'inactive',
        states
    }
);
