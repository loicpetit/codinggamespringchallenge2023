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
        /** @type {number[]} */
        const crystals = []
        for (const cell of this.cells) {
            if (cell && cell.isCrystals()) {
                crystals.push(cell.index)
            }
        }
        return new State(
            this.cells,
            crystals,
            this.myBases,
            this.nbBases,
            this.nbCells,
            this.opponentBases
        )
    }
}

export default StateBuilder