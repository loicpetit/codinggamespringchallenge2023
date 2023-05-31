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
        this.cells = cells ?? []
        this.myBases = myBases ?? []
        this.nbBases = nbBases ?? 0
        this.nbCells = nbCells ?? 0
        this.opponentBases = opponentBases ?? []
    }

    /**
     * @returns {Cell | undefined} 
     */
    getCell(
        /** @type {number} */ index
    ) {
        if (this.hasIndex(index)) {
            return this.cells[index]
        }
        return
    }

    getNeighboursOf(
        /** @type {number} */ index
    ) {
        /** @type {Cell[]} */
        const neighbours = []
        const cell = this.getCell(index)
        if (!cell) {
            return neighbours
        }
        const right = this.getCell(cell.right)
        if (right) {
            neighbours.push(right)
        }
        const topRight = this.getCell(cell.topRight)
        if (topRight) {
            neighbours.push(topRight)
        }
        const topLeft = this.getCell(cell.topLeft)
        if (topLeft) {
            neighbours.push(topLeft)
        }
        const left = this.getCell(cell.left)
        if (left) {
            neighbours.push(left)
        }
        const bottomLeft = this.getCell(cell.bottomLeft)
        if (bottomLeft) {
            neighbours.push(bottomLeft)
        }
        const bottomRight = this.getCell(cell.bottomRight)
        if (bottomRight) {
            neighbours.push(bottomRight)
        }

        return neighbours
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