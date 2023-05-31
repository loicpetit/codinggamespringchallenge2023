import * as Logger from '../../util/logger.js'
import PathsToCrystals from '../../path/path-to-crystals.js'
import Path from '../../path/path.js'
import State from '../../state/state.js'

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
            isPathValid(state, base.farPath) ? base.farPath : undefined
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
        return new BaseInfo(base.index, closePath, farPath)
    })
}

function addBeaconActions(
    /** @type {Path} */
    path,
    /** @type {string} */
    initialActions
) {
    let actions = initialActions
    const strength = 1
    if (!path || path.isEmpty()) {
        return actions
    }
    for (const index of path.indexes) {
        if (actions.length > 0) {
            actions += ';'
        }
        actions += 'BEACON ' + index + ' ' + strength
    }
    return actions
}

function getActions(
    /** @type {BaseInfo[]} */
    bases
) {
    let actions = ''
    for (const base of bases) {
        actions = addBeaconActions(base.closePath, actions)
        actions = addBeaconActions(base.farPath, actions)
    }
    if (actions.length === 0) {
        actions = 'WAIT'
    }
    return actions
}

class BaseInfo {
    constructor(            
        /** @type {number} */
        index,
        /** @type {Path | undefined} */
        closePath,
        /** @type {Path | undefined} */
        farPath
    ) {
        this.index = index
        this.closePath = closePath
        this.farPath = farPath
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
        // keep the initial targets between rounds until resources are empty
        this.bases = removeInvalidPaths(state, this.bases)
        // find paths to collect resources
        this.bases = updatePaths(state, this.bases)
        return getActions(this.bases)
    }
}

export default Strategy