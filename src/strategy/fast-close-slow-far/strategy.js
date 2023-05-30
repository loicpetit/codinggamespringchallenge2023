import State from '../../state/state.js'

class Strategy {
    process(
        /** @type {State} */
        state
    ){
        return 'WAIT'
    }
}

export default Strategy