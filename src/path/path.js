class Path {
    constructor(
        /** @type {number[]} */
        indexes
    ) {
        this.indexes = indexes ?? []
    }

    /**
     * @returns {number | undefined}
     */
    getSourceIndex() {
        if (!this.isEmpty()) {
            return this.indexes[0]
        }
        return undefined
    }

    /**
     * @returns {number | undefined}
     */
    getTargetIndex() {
        if (!this.isEmpty()) {
            return this.indexes[this.indexes.length - 1]
        }
        return undefined
    }

    isEmpty() {
        return !this.indexes || this.indexes.length === 0
    }
}

export default Path