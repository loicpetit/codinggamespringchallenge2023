class Path {
    constructor(
        /** @type {number[]} */
        indexes
    ) {
        this.indexes = indexes ?? []
    }

    get length() { return this.indexes?.length ?? 0 }

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

    intersectWith(
        /** @type {Path} */
        anotherPath
    ) {
        /** @type {number[]} */
        const indexes = []
        if (!anotherPath || anotherPath.isEmpty() || this.isEmpty()) {
            return indexes
        }
        for (const myIndex of this.indexes) {
            for (const anotherIndex of anotherPath.indexes) {
                if (myIndex === anotherIndex) {
                    indexes.push(myIndex)
                }
            }
        }
        return indexes
    }

    isEmpty() {
        return !this.indexes || this.indexes.length === 0
    }
}

export default Path