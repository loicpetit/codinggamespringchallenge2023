import Base from './base.js'
import Cell from './cell.js'

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

    hasIndex(
        /** @type {number | undefined} */ index
    ) {
        if (index === undefined
            || index < 0
            || index >= this.cells.length) {
            return false
        }
        const cellIndex = this.cells[index].index
        if (cellIndex !== index) {
            throw new Error('Unexpected index value ' + cellIndex + ', expected ' + index)
        }
        return true
    }
}

export default State