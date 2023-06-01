import Cell from './cell.js'
import State from './state.js'

function createCellWithIndex(/** @type {number} */ index, /** @type {number} */ right, /** @type {number} */ left) {
    return new Cell(index, 0, 0, 0, 0, right, -1, -1, left, -1, -1)
}

describe('State', function() {
    /** @type {State} */
    let state

    describe('get available crystal cells', function() {
        beforeEach(function() {
            state = new State(
                [
                    new Cell(0, 0, 0, 0, 0, 1, 2, -1, -1, -1, -1),
                    new Cell(1, 10, 2, 0, 0, -1, 3, -1, 0, -1, -1),
                    new Cell(2, 10, 2, 0, 0, 3, -1, -1, -1, 0, -1),
                    new Cell(3, 0, 0, 0, 0, -1, -1, -1, 2, 1, -1)
                ],
                [1,2],
                [],
                [],
                0,
                0,
                4,
                [],
                0
            )
        })
        it('should get the cells', function() {
            const cells = state.getAvailableCrystalCells()
            expect(cells).toBeDefined()
            expect(cells).toHaveSize(2)
            expect(cells[0].index).toEqual(1)
            expect(cells[1].index).toEqual(2)
        })
        it('should get the cells with resources', function() {
            state.cells[1].resources = 0
            const cells = state.getAvailableCrystalCells()
            expect(cells).toBeDefined()
            expect(cells).toHaveSize(1)
            expect(cells[0].index).toEqual(2)
        })
        it('should throw error if the crystal cell does not exist', function() {
            state.crystals.push(10)
            expect(function() {
                state.getAvailableCrystalCells()
            }).toThrowError('Crystals index 10 does not exist')
        })
        it('should throw error if the crystal cell doesnt have the good type', function() {
            state.cells[1].type = 1
            expect(function() {
                state.getAvailableCrystalCells()
            }).toThrowError('Crystals are expected at index 1')
        })
    })

    describe('get cell', function() {
        beforeEach(function() {
            state = new State(
                [
                    createCellWithIndex(0, 1, -1),
                    createCellWithIndex(1, 3, 0),
                    createCellWithIndex(3, 4, 1),
                    createCellWithIndex(4, -1, 3)
                ],
                [],
                [],
                [],
                0,
                0,
                4,
                [],
                0
            )
        })
        it('should get cell', function() {
            expect(state.getCell(1)).withContext('get cell').toBeDefined()
            expect(state.getCell(1).index).withContext('get cell index').toEqual(1)
            expect(state.getCell(1).right).withContext('get cell right').toEqual(3)
            expect(state.getCell(1).left).withContext('get cell left').toEqual(0)
        })
        it('should not get cell for undefined', function() {
            expect(state.getCell(undefined)).toBeUndefined()
        })
        it('should not get cell for negative number', function() {
            expect(state.getCell(-2)).toBeUndefined()
        })
        it('should not get cell for too big number', function() {
            expect(state.getCell(6)).toBeUndefined()
        })
        it('should throw error if index value does not math array index', function() {
            expect(function() {
                state.getCell(2)
            }).toThrowError('Unexpected index value 3, expected 2')
        })
    })

    describe('get neighbours', function() {
        beforeEach(function() {
            state = new State(
                [
                    createCellWithIndex(0, 1, -1),
                    createCellWithIndex(1, 2, 0),
                    createCellWithIndex(2, 4, 1),
                    createCellWithIndex(4, -1, 2),
                    createCellWithIndex(5, -1, -1)
                ],
                [],
                [],
                [],
                0,
                0,
                5,
                [],
                0
            )
        })
        it('should get neighbours with one neighbour', function() {
            const neighbours = state.getNeighboursOf(0)
            expect(neighbours).toBeDefined()
            expect(neighbours).toHaveSize(1)
            expect(neighbours[0].index).toEqual(1)
        })
        it('should get neighbours with several neighbours', function() {
            const neighbours = state.getNeighboursOf(1)
            expect(neighbours).toBeDefined()
            expect(neighbours).toHaveSize(2)
            expect(neighbours[0].index).toEqual(2)
            expect(neighbours[1].index).toEqual(0)
        })
        it('should not get neighbours for undefined', function() {
            expect(state.getNeighboursOf(undefined)).toHaveSize(0)
        })
        it('should not get neighbours for negative number', function() {
            expect(state.getNeighboursOf(-2)).toHaveSize(0)
        })
        it('should not get neighbours for too big number', function() {
            expect(state.getNeighboursOf(6)).toHaveSize(0)
        })
        it('should throw error if index value does not math array index', function() {
            expect(function() {
                state.getNeighboursOf(3)
            }).toThrowError('Unexpected index value 4, expected 3')
        })
        it('should throw error if index value does not math array index in a neighbour', function() {
            expect(function() {
                state.getNeighboursOf(2)
            }).toThrowError('Unexpected index value 5, expected 4')
        })
    })

    describe('has index', function() {
        beforeEach(function() {
            state = new State(
                [
                    createCellWithIndex(0, 1, -1),
                    createCellWithIndex(1, 3, 0),
                    createCellWithIndex(3, 4, 1),
                    createCellWithIndex(4, -1, 3)
                ],
                [],
                [],
                [],
                0,
                0,
                4,
                [],
                0
            )
        })
        it('should find index', function() {
            expect(state.hasIndex(1)).toBeTrue()
        })
        it('should not find index for undefined', function() {
            expect(state.hasIndex(undefined)).toBeFalse()
        })
        it('should not find index for negative number', function() {
            expect(state.hasIndex(-2)).toBeFalse()
        })
        it('should not find index for too big number', function() {
            expect(state.hasIndex(6)).toBeFalse()
        })
        it('should throw error if index value does not math array index', function() {
            expect(function() {
                state.hasIndex(2)
            }).toThrowError('Unexpected index value 3, expected 2')
        })
    })
})