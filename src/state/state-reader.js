import Base from './base'
import Cell from './cell'
import StateBuilder from './state-builder'

function readBases(
    /** @type {number} */
    nbBases
) {
    /** @type {Base[]} */
    const bases = []
    // @ts-ignore
    var inputs = readline().split(' ');
    for(let i = 0; i < nbBases; i++) {
        const baseIndex = parseInt(inputs[i]);
        bases.push(new Base(
            baseIndex
        ))
    }
    return bases
}

function readNbBases() {
    // @ts-ignore
    return parseInt(readline())
}

function readNbCells() {
    // @ts-ignore
    return parseInt(readline())
}

function readInitialCells(
    /** @type {number} */
    nbCells
) {
    /** @type {Cell[]} */
    const cells = []
    for(let i = 0; i < nbCells; i++) {
        // @ts-ignore
        var inputs = readline().split(' ')
        const type = parseInt(inputs[0])
        const resources = parseInt(inputs[1])
        const myAnts = 0
        const opponentAnts = 0
        const right = parseInt(inputs[2]) // the index of the neighbouring cell for each direction
        const topRight = parseInt(inputs[3])
        const topLeft = parseInt(inputs[4])
        const left = parseInt(inputs[5])
        const bottomLeft = parseInt(inputs[6])
        const bottomRight = parseInt(inputs[7])
        cells.push(new Cell(
            i,
            resources,
            type,
            myAnts,
            opponentAnts,
            right,
            topRight,
            topLeft,
            left,
            bottomLeft,
            bottomRight
        ))
    }
    return cells
}

function readTurnCells(
    /** @type {Cell[]} */
    currentCells
) {
    /** @type {Cell[]} */
    const cells = []
    for(let i = 0; i < currentCells.length; i++) {
        const currentCell = currentCells[i]
        // @ts-ignore
        var inputs = readline().split(' ')
        const resources = parseInt(inputs[0])
        const myAnts = parseInt(inputs[1]);
        const opponentAnts = parseInt(inputs[2]);
        cells.push(new Cell(
            currentCell.index,
            resources,
            currentCell.type,
            myAnts,
            opponentAnts,
            currentCell.right,
            currentCell.topRight,
            currentCell.topLeft,
            currentCell.left,
            currentCell.bottomLeft,
            currentCell.bottomRight
        ))
    }
    return cells
}

class StateReader {
    builder = new StateBuilder()

    /**
     */
    readInitialeState() {
        this.builder.nbCells = readNbCells()
        this.builder.cells = readInitialCells(this.builder.nbCells)
        this.builder.nbBases = readNbBases()
        this.builder.myBases = readBases(this.builder.nbBases)
        this.builder.opponentBases = readBases(this.builder.nbBases)
        return this
    }

    readTurnState() {        
        this.builder.cells = readTurnCells(this.builder.cells)
        return this
    }

    getState() {
        return this.builder.build()
    }
}

export default StateReader