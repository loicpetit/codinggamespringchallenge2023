const MIN_STRENGTH = 1
const MAX_STRENGTH = 10

class StrengthCalculator {
    computeForPathPriority(
        /** @type {number} */
        nbAnts,
        /** @type {number} */
        targetResources,
        /** @type {number} */
        nbPriorityCells,
        /** @type {number} */
        nbOtherCells
    ) {
        if (nbAnts <= 0 || targetResources <= 0 || nbPriorityCells <= 0 || nbOtherCells < 0) {
            return MIN_STRENGTH
        }
        /** @type {number[]} */
        const antsOnPriorityCellByStrength = []
        // compute how many ants it can be by cell depending of the chosen strength
        for (let strength=MIN_STRENGTH; strength<=MAX_STRENGTH; strength++) {
            const nbVirtualCells = (strength * nbPriorityCells) + nbOtherCells
            const antsByVirtualCell = nbAnts / nbVirtualCells
            antsOnPriorityCellByStrength[strength] = Math.floor(antsByVirtualCell * strength)
        }
        // then fine the best strength to collect the resource in the minimum turn with the minimal strength possible
        // in order to have a maximum of ants in the other cells
        /** @type {number | null} */
        for (let nbTurns = 1; nbTurns <= 100; nbTurns++) {
            const resourcesByTurn = Math.ceil(targetResources / nbTurns)
            for (let strength=MIN_STRENGTH; strength<=MAX_STRENGTH; strength++) {
                if (antsOnPriorityCellByStrength[strength] >= resourcesByTurn) {
                    return strength
                }
            }
        }
        // strength by default
        return MIN_STRENGTH
    }
}

export default StrengthCalculator