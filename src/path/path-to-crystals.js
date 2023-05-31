import Path from './path.js'
import ShortestPath from './shortest-path.js'
import State from '../state/state.js'

function comparePathFrom(
    /** @type {State} */
    state
) {
    return function (
        /** @type {Path} */
        path1,
        /** @type {Path} */
        path2
    ) {
        // both undefined
        if ((path1 === undefined || path1 === null) && (path2 === undefined || path2 === null)) {
            return 0
        }
        // one of them undefiend
        if (path1 === undefined || path1 === null) {
            return -1
        }
        if (path2 === undefined || path2 === null) {
            return 1
        }
        // both exist
        // compare length
        if (path1.length < path2.length) {
            return -1
        }
        if (path1.length > path2.length) {
            return 1
        }
        // same length
        // compare resources
        const target1 = state.getCell(path1.getTargetIndex())
        const target2 = state.getCell(path2.getTargetIndex())
        if ((target1 === undefined || target1 === null) && (target2 === undefined || target2 === null)) {
            return 0
        }
        if (target1 === undefined || target1 === null) {
            return -1
        }
        if (target2 === undefined || target2 === null) {
            return 1
        }
        return target2.resources - target1.resources
    }
}


class PathsToCrystals {
    /**
     * @returns {Path[]}
     */
    getFrom(
        /** @type {State} */ state,
        /** @type {number[]} */ ...fromIndexes
    ) {
        /** @type {Path[]} */
        const paths = []
        for (const fromIndex of fromIndexes) {
            if (!state
                || !state.hasIndex(fromIndex)) {
                break
            }
            const shortestPath = new ShortestPath()
            const crystalCells = state.getAvailableCrystalCells()
            for (const cell of crystalCells) {
                paths.push(shortestPath.find(state, fromIndex, cell.index))
            }
        }
        return paths.sort(comparePathFrom(state))
    }
}

export default PathsToCrystals