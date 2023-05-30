import * as Logger from './util/logger.js'
import StateReader from './state/state-reader.js'
import Strategy from './strategy/fast-close-slow-far/strategy.js';

class Game {

    run() {
        const reader = new StateReader()
        const strategy = new Strategy()
        reader.readInitialeState()
        let turn = 0
        while(true) {
            const turnState = reader.readTurnState().getState();
            turn++;
            Logger.logWarning('GAME', `Turn ${turn}`);
            const actions = strategy.process(turnState);
            Logger.logWarning('Game', `Actions: ${actions}`)
            console.log(actions)
        }
    }

}

export default Game;