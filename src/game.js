import * as Logger from './util/logger.js'
import StateReader from './state/state-reader.js'
import Strategy from './strategy/expansion/strategy.js';

class Game {

    run() {
        const reader = new StateReader()
        reader.readInitialeState()
        const strategy = new Strategy()
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