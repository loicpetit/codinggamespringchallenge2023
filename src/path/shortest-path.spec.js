import Base from '../state/base.js'
import Cell from '../state/cell.js'
import ShortestPath from './shortest-path.js'
import State from '../state/state.js'

describe('ShortestPath', function() {
    /** @type {ShortestPath} */
    let shortestPath
    /** @type {State} */
    let state

    beforeEach(function() {
        shortestPath = new ShortestPath()
    })

    describe('with empty state', function() {
        beforeEach(function() {
            state = new State(
                [],
                [],
                0,
                0,
                []
            )
        })
        it('should not return any path', function() {
            const result = shortestPath.find(state, 0, 3)
            expect(result).toBeUndefined()
        })
    })

    describe('with state', function() {
        beforeEach(function() {
            /** create state from ![map1](file:///c:/Users/Moi/Documents/Dev/Codingame/codinggamespringchallenge2023/src/strategy/fast-close-slow-far/map1.png)
             *  in strategy module
             */
            const cells = [
                new Cell(0,  0,  0, 0,  0,  1,  -1, 3,  2,  -1, 4),
                new Cell(1,  0,  0, 60, 0,  5,  -1, -1, 0,  4,  12),
                new Cell(2,  0,  0, 0,  60, 0,  3,  11, 6,  -1, -1),
                new Cell(3,  0,  0, 0,  0,  -1, 9,  -1, 11, 2,  0),
                new Cell(4,  0,  0, 0,  0,  12, 1,  0,  -1, 10, -1),
                new Cell(5,  0,  0, 0,  0,  -1, 13, -1, 1,  12, 20),
                new Cell(6,  0,  0, 0,  0,  2,  11, 19, -1, 14, -1),
                new Cell(7,  0,  0, 0,  0,  15, -1, -1, 9,  -1, -1),
                new Cell(8,  0,  0, 0,  0,  10, -1, -1, 16, -1, -1),
                new Cell(9,  0,  0, 0,  0,  7,  -1, -1, -1, 3,  -1),
                new Cell(10, 0,  0, 0,  0,  -1,  4, -1, 8,  -1, -1),
                new Cell(11, 0,  0, 0,  0,  3,  -1, 17, 19, 6,  2),
                new Cell(12, 0,  0, 0,  0,  20, 5,  1,  4,  -1, 18),
                new Cell(13, 0,  0, 0,  0,  23, 25, 15, -1, 5,  -1),
                new Cell(14, 0,  0, 0,  0,  -1, 6,  -1, 24, 26, 16),
                new Cell(15, 0,  0, 0,  0,  25, -1, -1, 7,  -1, 13),
                new Cell(16, 0,  0, 0,  0,  8,  -1, 14, 26, -1, -1),
                new Cell(17, 13, 2, 0,  0,  -1, -1, -1, 27, 19, 11),
                new Cell(18, 13, 2, 0,  0,  28, 20, 12, -1, -1, -1),
                new Cell(19, 0,  0, 0,  0,  11, 17, 27, 29, -1, 6),
                new Cell(20, 0,  0, 0,  0,  30, -1, 5,  12, 18, 28),
                new Cell(21, 9,  2, 0,  0,  -1, -1, 23, -1, 30, -1),
                new Cell(22, 9,  2, 0,  0,  -1, 29, -1, -1, -1, 24),
                new Cell(23, 0,  0, 0,  0,  -1, -1, 25, 13, -1, 21),
                new Cell(24, 0,  0, 0,  0,  14, -1, 22, -1, -1, 26),
                new Cell(25, 0,  0, 0,  0,  -1, -1, -1, 15, 13, 23),
                new Cell(26, 0,  0, 0,  0,  16, 14, 24, -1, -1, -1),
                new Cell(27, 0,  0, 0,  0,  17, -1, -1, -1, 29, 19),
                new Cell(28, 0,  0, 0,  0,  -1, 30, 20, 18, -1, -1),
                new Cell(29, 0,  0, 0,  0,  19, 27, -1, -1, 22, -1),
                new Cell(30, 0,  0, 0,  0,  -1, 21, -1, 20, 28, -1)
            ]
            const myBases = [
                new Base(1)
            ]
            const opponentBases = [
                new Base(2)
            ]
            state = new State(
                cells,
                myBases,
                myBases.length,
                cells.length,
                opponentBases
            )
        })
        it('should get the shortest path', function() {
            const result = shortestPath.find(state, 1, 22)
            expect(result).toBeDefined()
            expect(result.indexes).withContext('nb indexes').toHaveSize(7)
            expect(result.indexes[0]).withContext('index 0').toEqual(1)
            expect(result.indexes[1]).withContext('index 1').toEqual(0)
            expect(result.indexes[2]).withContext('index 2').toEqual(3)
            expect(result.indexes[3]).withContext('index 3').toEqual(11)
            expect(result.indexes[4]).withContext('index 4').toEqual(19)
            expect(result.indexes[5]).withContext('index 5').toEqual(29)
            expect(result.indexes[6]).withContext('index 6').toEqual(22)
        })
        it('should get the shortest path if the same index', function() {
            const result = shortestPath.find(state, 1, 1)
            expect(result).toBeDefined()
            expect(result.indexes).withContext('nb indexes').toHaveSize(1)
            expect(result.indexes[0]).withContext('index 0').toEqual(1)
        })
        it('should not get the shortest path if the index does not exist', function() {
            const result = shortestPath.find(state, 1, 33)
            expect(result).toBeUndefined()
        })
        it('should not get the shortest path if there is no path', function() {
            state.cells[21].bottomLeft = undefined
            state.cells[21].topLeft = undefined
            state.cells[23].bottomRight = undefined
            state.cells[30].topRight = undefined
            const result = shortestPath.find(state, 0, 21)
            expect(result).toBeUndefined()
        })
    })
})