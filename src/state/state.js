import Base from './base'
import Cell from './cell'

class State {
    constructor(
        /** @type {Cell[]} */
        cells,
        /** @type {Base[]} */
        myBases,
        /** @type {number} */
        nbBases,
        /** @type {number} */
        nbCells,
        /** @type {Base[]} */
        opponentBases
    ) {
        this.cells = cells
        this.myBases = myBases
        this.nbBases = nbBases
        this.nbCells = nbCells
        this.opponentBases = opponentBases
    }
}

export default State