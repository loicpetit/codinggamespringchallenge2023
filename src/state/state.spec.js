import Cell from './cell.js'
import State from './state.js'

function createCellWithIndex(/** @type {number} */ index, /** @type {number} */ right, /** @type {number} */ left) {
    return new Cell(index, 0, 0, 0, 0, right, -1, -1, left, -1, -1)
}

describe('State', function() {
    /** @type {State} */
    let state

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
                0,
                4,
                []
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
        it('should thorw error if index value does not math array index', function() {
            expect(function() {
                state.hasIndex(2)
            }).toThrowError('Unexpected index value 3, expected 2')
        })
    })
})