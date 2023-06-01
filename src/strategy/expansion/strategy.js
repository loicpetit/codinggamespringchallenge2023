import ActionBuilder from '../../action/action-builder.js'
import Cell from '../../state/cell.js'
import * as Logger from '../../util/logger.js'
import Path from '../../path/path.js'
import ShortestPath from '../../path/shortest-path.js'
import State from '../../state/state.js'
import StrengthCalculator from '../../strength/strength-calculator.js'

/**
 * @returns {Path[]} 
 */
function clearPaths(
    /** @type {State} */
    state,
    /** @type {Path[]} */
    paths
) {
    if (!paths) {
        return []
    }
    if (!state) {
        return paths
    }
    // remove useless targets

    // extract orphan paths

    // compute new paths for orphan path targets
    return paths.filter(path => {
        if (!path) {
            return false
        }
        const target = state.getCell(path.getTargetIndex())
        return target && (target.hasCrystals() || target.hasEggs())
    })
}

function arePathsReached(
    /** @type {State} */
    state,
    /** @type {Path[]} */
    paths
) {
    if (!paths || paths.length === 0) {
        return true
    }
    if (!state) {
        return false
    }
    const maxNbPaths = Math.min(3, state.getAvailableCrystalCells().length)
    return paths.every(path => {
        const target = state.getCell(path?.getTargetIndex())
        return target === undefined || target.myAnts > 0
    }) && paths.length < maxNbPaths
}

function compare(
    /** @type {{byPathLength: boolean, byResourceRatio: boolean, byType: boolean}} */
    options
) {
    return function(
        /** @type {{path: Path, resources: number, type: number}} */
        object1,
        /** @type {{path: Path, resources: number, type: number}} */
        object2,
    ) {
        if (!object1 && !object2) {
            return 0
        }
        if (!object1) {
            return 1
        }
        if (!object2) {
            return -1
        }
        if (options.byPathLength) {
            if (object1.path.length > object2.path.length) {
                return 1
            }
            if (object1.path.length < object2.path.length) {
                return -1
            }
        }
        if (options.byType) {
            if (object1.type !== 1 && object2.type === 1) {
                return 1
            }
            if (object1.type === 1 && object2.type !== 1) {
                return -1
            }
        }
        if (options.byResourceRatio) {
            const ratio1 = object1.resources / object1.path.length
            const ratio2 = object2.resources / object2.path.length
            return ratio2 - ratio1
        }        
        return 0
    }
}

/**
 * @returns {Path | undefined} 
 */
function findNewtarget(
    /** @type {State} */
    state,
    /** @type {Path[]} */
    paths
) {
    /** @type {Set<number>} */
    const possibleSources = new Set()
    const existingTargets = new Set()
    for(const base of state.myBases) {
        possibleSources.add(base.index)
    }
    if (possibleSources.size === 0) {
        return undefined
    }
    for(const path of paths) {
        existingTargets.add(path.getTargetIndex())
    }
    const shortestPath = new ShortestPath()
    const availableTargets = state.getAvailableCrystalCells()
        .concat(state.getAvailableEggsCells())
        .filter(cell => !possibleSources.has(cell.index) && !existingTargets.has(cell.index))
        .map(cell => ({
            resources: cell.resources,
            type: cell.type,
            path: shortestPath.findFromSources(state, possibleSources, cell.index)
        }))
        .sort(compare({ byPathLength: true, byResourceRatio: true, byType: true }))
    if (availableTargets.length === 0) {
        return undefined
    }
    return availableTargets[0].path
}

function getIndexesWithDefaultStrength(
    /** @type {Path[]} */
    paths
) {
    /** @type {Map<number,number>} */
    const indexes = new Map()
    if (!paths || paths.length === 0) {
        return indexes
    }
    for (const path of paths) {
        if (!path || path.isEmpty()) {
            continue
        }
        for (const index of path.indexes) {
            indexes.set(index, 1)
        }
    }
    return indexes
}

/**
 * @returns {Path | undefined} 
 */
function findPriorityPath(
    /** @type {State} */
    state,
    /** @type {Path[]} */
    paths,
    /** @type {Path | undefined} */
    priorityPath    
) {
    if (!state || !paths || paths.length === 0) {
        return
    }
    if (priorityPath && paths.some(path => path.equals(priorityPath))) {
        return priorityPath
    }
    const targets = paths.map(path => {
        const targetCell = state.getCell(path.getTargetIndex())
        return {
            path: path,
            type: targetCell?.type ?? 0,
            resources: targetCell?.resources ?? 0
        }
    }).sort(compare({ byPathLength: false, byResourceRatio: true, byType: true }))
    if (targets.length === 0) {
        return undefined
    }
    return targets[0].path
}

function updateIndexesStrength(
    /** @type {Map<number,number>} */
    indexesWithStrength,
    /** @type {Path | undefined} */
    path,
    /** @type {number} */
    targetResources,
    /** @type {number} */
    nbAnts
) {
    const calculator = new StrengthCalculator()
    const strength = calculator.computeForPathPriority(nbAnts, targetResources, path.length, indexesWithStrength.size - path.length)
    for (const index of path.indexes) {
        indexesWithStrength.set(index, strength)
    }
}

function getActions(
    /** @type {Map<number,number>} */
    indexesWithStrength
) {
    const actionsBuilder = new ActionBuilder()
    if (!indexesWithStrength || indexesWithStrength.size === 0) {
        return actionsBuilder.build()
    }
    let actions = ''
    // @ts-ignore
    for (const index of indexesWithStrength.keys()) {
        const strength = indexesWithStrength.get(index)
        actionsBuilder.addBeacon(index, strength)
    }
    return actionsBuilder.build()
}

class Strategy {
    /** @type {Path[]} */
    paths = []
    /** @type {Path | undefined} */
    priorityPath

    process(
        /** @type {State} */
        state
    ){
        // the goal is to reach a new target each time one is reach in order to expand progressively
        // check all path targets, remove paths with consumed resources
        this.paths = clearPaths(state, this.paths)
        // if all path targets are reached, find a new target and its path to the paths pool
        if (arePathsReached(state, this.paths)) {
            const target = findNewtarget(state, this.paths)
            if (target) {
                this.paths.push(target)
            }
        }
        // combine all paths indexes and remove duplicates
        const indexesWithStrength = getIndexesWithDefaultStrength(this.paths)
        // define the more interesting target and compute its path strengh (others are at 1)
        this.priorityPath = findPriorityPath(state, this.paths, this.priorityPath)
        if (this.priorityPath) {
            const targetCell = state.getCell(this.priorityPath.getTargetIndex())
            if (targetCell.isEggs()) { // only prioritize eggs
                updateIndexesStrength(indexesWithStrength, this.priorityPath, targetCell.resources, state.myNbAnts)
            }
        }
        // generate the actions
        return getActions(indexesWithStrength)
    }
}

export default Strategy
