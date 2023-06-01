import ActionBuilder from '../../action/action-builder.js'
import * as Logger from '../../util/logger.js'
import PathsToCrystals from '../../path/path-to-crystals.js'
import Path from '../../path/path.js'
import State from '../../state/state.js'

function updateNbAnts(
    /** @type {State} */
    state,
    /** @type {BaseInfo[]} */
    bases
) {
    if (!bases) {
        return []
    }
    if (!state) {
        return bases
    }
    return bases.map(base => {
        const baseCell = state.getCell(base.index)
        return new BaseInfo(
            base.index,
            base.closePath,
            base.closeStrength,
            base.farPath,
            base.farStrength,
            baseCell && baseCell.myAnts > base.nbAnts ? baseCell.myAnts : base.nbAnts
        )
    })
}

/**
 * @returns {boolean}
 */
function isPathValid(
    /** @type {State} */
    state,
    /** @type {Path} */
    path
) {
    if (!state || !path) {
        return false
    }
    const target = state.getCell(path.getTargetIndex())
    return target !== undefined && target.resources > 0
}

function getClosePath(
    /** @type {BaseInfo} */
    base,
    /** @type {Path[]} */
    paths
) {
    if (base.closePath) {
        return base.closePath
    }
    for (const path of paths) {
        if (path.getSourceIndex() === base.index) {
            return path
        }
    }
    return
}

function getFarPath(
    /** @type {BaseInfo} */
    base,
    /** @type {Path[]} */
    paths
) {
    if (base.farPath) {
        return base.farPath
    }
    for (let i=paths.length-1; i>= 0; i--) {
        const path = paths[i]
        if (path.getSourceIndex() === base.index) {
            return new Path(path.indexes.slice(1)) // remove the source index which is the base because used in the close path
        }
    }
    return
}

function removeInvalidPaths(
    /** @type {State} */
    state,
    /** @type {BaseInfo[]} */
    bases
) {
    return bases.map(base => {
        return new BaseInfo(
            base.index,
            isPathValid(state, base.closePath) ? base.closePath : undefined,
            base.closeStrength,
            isPathValid(state, base.farPath) ? base.farPath : undefined,
            base.farStrength,
            base.nbAnts
        )
    })
}

function updatePaths(
    /** @type {State} */
    state,
    /** @type {BaseInfo[]} */
    bases
) {
    const pathsToCrystals = new PathsToCrystals()
    const baseIndexes = bases.map(base => base.index)
    let paths = pathsToCrystals.getFrom(state, ...baseIndexes)
    return bases.map(base => {
        const closePath = getClosePath(base, paths)
        paths = paths.filter(path => path.getTargetIndex() !== closePath?.getTargetIndex())
        const farPath = getFarPath(base, paths)
        paths = paths.filter(path => path.getSourceIndex() !== base.index && path.getTargetIndex() !== farPath?.getTargetIndex())
        const closeStrength = computeClosePathStrength(state, base.nbAnts, closePath, farPath)
        return new BaseInfo(base.index, closePath, closeStrength, farPath, 1, base.nbAnts)
    })
}

function computeClosePathStrength(
    /** @type {State} */
    state,
    /** @type {number} */
    nbAnts,
    /** @type {Path} */
    closePath,
    /** @type {Path} */
    farPath
) {
    if (!nbAnts
        || !closePath || closePath.isEmpty()
        || !farPath || farPath.isEmpty()) {
        return 1
    }
    const targetCell = state.getCell(closePath.getTargetIndex())
    if (!targetCell || !targetCell.resources) {
        return 1
    }
    /** @type {number[]} */
    const antsByCellSimulation = []
    const minStrength = 1
    const maxStrength = 10
    const closeLength = closePath.length
    const farLength = farPath.length
    const commonLength = closePath.intersectWith(farPath).length
    // compute how many ants it can be by cell depending of the chosen strength
    for (let strength=minStrength; strength<=maxStrength; strength++) {
        const virtualLength = (strength * closeLength) + farLength - commonLength
        const antsByUnit = nbAnts / virtualLength
        antsByCellSimulation[strength] = Math.floor(antsByUnit * strength)
    }
    // then fine the best strength to collect the resource in the minimum turn with the minimal strength possible
    // in order to have a maximum of ants in the far path
    /** @type {number | null} */
    let chosenStrength = null
    for (let nbTurns = 1; nbTurns <= 100 && chosenStrength === null; nbTurns++) {
        const resourcesByTurn = Math.ceil(targetCell.resources / nbTurns)
        for (let strength=minStrength; strength<=maxStrength; strength++) {
            if (antsByCellSimulation[strength] >= resourcesByTurn) {
                chosenStrength = strength
                break
            }
        }
    }
    if (chosenStrength === null) {
        return 1
    }
    return chosenStrength
}

function getActions(
    /** @type {BaseInfo[]} */
    bases
) {
    const builder = new ActionBuilder()
    for (const base of bases) {
        builder.addBeacons(base.closePath, base.closeStrength)
        builder.addBeacons(base.farPath, base.farStrength)
    }
    return builder.build()
}

class BaseInfo {
    constructor(            
        /** @type {number} */
        index,
        /** @type {Path | undefined} */
        closePath,
        /** @type {number} */
        closeStrenght,
        /** @type {Path | undefined} */
        farPath,
        /** @type {number} */
        farStrength,
        /** @type {number} */
        nbAnts
    ) {
        this.index = index
        this.closePath = closePath
        this.closeStrength = closeStrenght ?? 1
        this.farPath = farPath
        this.farStrength = farStrength ?? 1
        this.nbAnts = nbAnts ?? 0
    }
}

class Strategy {
    /** @type {BaseInfo[]} */
    bases = []

    constructor(
        /** @type {State} */
        state
    ) {
        this.bases = (state?.myBases ?? []).map(function(base) {
            Logger.logVerbose('STRATEGY', 'Init bases, index: ' + base.index)
            return new BaseInfo(
                base.index
            )
        })
    }

    process(
        /** @type {State} */
        state
    ){
        // update nb ants by base
        this.bases = updateNbAnts(state, this.bases)
        // keep the initial targets between rounds until resources are empty
        this.bases = removeInvalidPaths(state, this.bases)
        // find paths to collect resources
        this.bases = updatePaths(state, this.bases)
        return getActions(this.bases)
    }
}

export default Strategy