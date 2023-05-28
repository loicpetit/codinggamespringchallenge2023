class Cell {
    constructor(
        /** @type {number} */
        index,
        /** @type {number} */
        resources,
        /** @type {number} */
        type,
        /** @type {number} */
        myAnts,
        /** @type {number} */
        opponentAnts,
        /** @type {number} */
        right,
        /** @type {number} */
        topRight,
        /** @type {number} */
        topLeft,
        /** @type {number} */
        left,
        /** @type {number} */
        bottomLeft,
        /** @type {number} */
        bottomRight
    ) {
        this.index = index
        this.resources = resources
        this.type = type
        this.myAnts = myAnts
        this.opponentAnts = opponentAnts
        this.right = right > 0 ? right : undefined
        this.topRight = topRight > 0 ? topRight : undefined
        this.topLeft = topLeft > 0 ? topLeft : undefined
        this.left = left > 0 ? left : undefined
        this.bottomLeft = bottomLeft > 0 ? bottomLeft : undefined
        this.bottomRight = bottomRight > 0 ? bottomRight : undefined
    }

    hasCrystals() {
        return this.type === 2
    }

    hasEggs() {
        return this.type === 1
    }

    isEmpty() {
        return !this.hasCrystals() && !this.hasEggs()
    }
}

export default Cell