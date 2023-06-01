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
        /** @type {number[]} */
        const eggs = []
        let myNbAnts = 0
        let opponentNbAnts = 0
        for (const cell of this.cells) {
            if (!cell) {
                continue
            }
            if (cell.isCrystals()) {
                crystals.push(cell.index)
            }
            if (cell.isEggs()) {
                eggs.push(cell.index)
            }
            myNbAnts += cell.myAnts
            opponentNbAnts += cell.opponentAnts
        }
        return new State(
            this.cells,
            crystals,
            eggs,
            this.myBases,
            myNbAnts,
            this.nbBases,
            this.nbCells,
            this.opponentBases,
            opponentNbAnts
        )
    }
}

export default StateBuilder