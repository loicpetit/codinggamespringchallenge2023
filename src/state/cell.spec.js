import Cell from './cell.js'

function createCellWithType(
    /** @type {number} */
    type
) {
    return new Cell(0, 0, type, 0, 0, 1, 2, 3, 4, 5, 6)
}

function createCellWithNeighbours(
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
    return new Cell(0, 0, 0, 0, 0, right, topRight, topLeft, left, bottomLeft, bottomRight)
}

describe('Cell', function() {
    describe('type', function() {
        it('should have crystals', function() {
            const cell = createCellWithType(2)
            expect(cell.type).withContext('cell type').toEqual(2)
            expect(cell.hasCrystals()).withContext('cell has crystals').toBeTrue()
            expect(cell.hasEggs()).withContext('cell has eggs').toBeFalse()
            expect(cell.isEmpty()).withContext('cell isEmpty').toBeFalse()
        })
        it('should have eggs', function() {
            const cell = createCellWithType(1)
            expect(cell.type).withContext('cell type').toEqual(1)
            expect(cell.hasCrystals()).withContext('cell has crystals').toBeFalse()
            expect(cell.hasEggs()).withContext('cell has eggs').toBeTrue()
            expect(cell.isEmpty()).withContext('cell isEmpty').toBeFalse()
        })
        it('should be empty', function() {
            const cell = createCellWithType(10)
            expect(cell.type).withContext('cell type').toEqual(10)
            expect(cell.hasCrystals()).withContext('cell has crystals').toBeFalse()
            expect(cell.hasEggs()).withContext('cell has eggs').toBeFalse()
            expect(cell.isEmpty()).withContext('cell isEmpty').toBeTrue()
        })
    })
    describe('neighbours', function() {
        it('should have 6 neighbours', function() {
            const cell = createCellWithNeighbours(1, 2, 3, 4, 5, 6)
            expect(cell.right).withContext('cell right neighbour').toEqual(1)
            expect(cell.topRight).withContext('cell topRight neighbour').toEqual(2)
            expect(cell.topLeft).withContext('cell topLeft neighbour').toEqual(3)
            expect(cell.left).withContext('cell left neighbour').toEqual(4)
            expect(cell.bottomLeft).withContext('cell bottomLeft neighbour').toEqual(5)
            expect(cell.bottomRight).withContext('cell bottomRight neighbour').toEqual(6)
        })
        it('should have 3 neighbours', function() {
            const cell = createCellWithNeighbours(1, -1, 2, -1, 3, -1)
            expect(cell.right).withContext('cell right neighbour').toEqual(1)
            expect(cell.topRight).withContext('cell topRight neighbour').toBeUndefined()
            expect(cell.topLeft).withContext('cell topLeft neighbour').toEqual(2)
            expect(cell.left).withContext('cell left neighbour').toBeUndefined()
            expect(cell.bottomLeft).withContext('cell bottomLeft neighbour').toEqual(3)
            expect(cell.bottomRight).withContext('cell bottomRight neighbour').toBeUndefined()
        })
    })
})