import Path from "./path.js"
import State from "../state/state.js"

class ShortestPath {
    /**
     * @returns {Path | undefined}
     */
    find(
        /** @type {State} */ state,
        /** @type {number} */ sourceIndex,
        /** @type {number} */ targetIndex,
    ) {
        if (!state
            || !state.hasIndex(sourceIndex)
            || !state.hasIndex(targetIndex)
        ) {
            return
        }
        if (sourceIndex === targetIndex) {
            return new Path([targetIndex])
        }
        /** @type {number[]} */
        const queue = [sourceIndex]
        /** @type {Map<number,number|null>} */
        const parents = new Map()
        parents.set(sourceIndex, null)
        while (queue.length > 0) {
            const currentIndex = queue.shift()
            if (currentIndex === undefined || currentIndex === targetIndex) {
                break
            }
            const neighbours = state.getNeighboursOf(currentIndex)
            for (const neighbour of neighbours) {
                if (!parents.has(neighbour.index)) {
                    parents.set(neighbour.index, currentIndex)
                    queue.push(neighbour.index)
                }
            }
        }
        if (!parents.has(targetIndex)) {
            return
        }
        /** @type {number[]} */
        const indexes = [targetIndex]
        let parent = parents.get(targetIndex)
        while (parent !== undefined && parent !== null) {
            indexes.unshift(parent)
            parent = parents.get(parent)
        }
        return new Path(indexes)
    }

    /**
     * @returns {Path|undefined}
     */
    findFromSources(        
        /** @type {State} */ state,
        /** @type {Set<number>} */ sources,
        /** @type {number} */ targetIndex,
    ) {
        if (!sources
            || sources.size === 0
        ) {
            return
        }
        /** @type {Path|undefined} */
        let path = undefined
        // @ts-ignore
        for (const sourceIndex of sources) {
            const pathFromSource = this.find(state, sourceIndex, targetIndex)
            if (pathFromSource && (path === undefined || path.length > pathFromSource.length)) {
                path = pathFromSource
            }
        }
        return path
    }
}

export default ShortestPath