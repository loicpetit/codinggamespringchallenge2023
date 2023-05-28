import Base from './base'
import Cell from './cell'
import State from './state'

class StateBuilder {
    /** @type Cell[] */
    cells = []
    /** @type Base[] */
    myBases = []
    nbBases = 0
    nbCells = 0
    /** @type Base[] */
    opponentBases = []
    
    build() {
        return new State(
            this.cells,
            this.myBases,
            this.nbBases,
            this.nbCells,
            this.opponentBases
        )
    }
}

export default StateBuilder