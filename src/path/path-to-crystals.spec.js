import Base from '../state/base.js'
import Cell from '../state/cell.js'
import PathsToCrystals from './path-to-crystals.js'
import State from '../state/state.js'

describe('Path to crystals', function() {
    /** @type {PathsToCrystals} */
    let pathsToCrystals
    /** @type {State} */
    let state
    
    beforeEach(function() {
        pathsToCrystals = new PathsToCrystals()
    })
    describe('with empty state', function() {
        beforeEach(function() {
            state = new State(
                [],
                [],
                [],
                0,
                0,
                []
            )
        })
        it('should return no paths', function() {
            const paths = pathsToCrystals.getFrom(state, 0)
            expect(paths).toBeDefined()
            expect(paths).toHaveSize(0)
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
            const crystals = [17, 18, 21, 22]
            const myBases = [
                new Base(1)
            ]
            const opponentBases = [
                new Base(2)
            ]
            state = new State(
                cells,
                crystals,
                myBases,
                myBases.length,
                cells.length,
                opponentBases
            )
        })
        it('should return paths', function() {
            const paths = pathsToCrystals.getFrom(state, 1)
            expect(paths).toBeDefined()
            expect(paths).toHaveSize(4)
            expect(paths[0].length).withContext('first path length').toEqual(3)
            expect(state.getCell(paths[0].getTargetIndex()).resources).withContext('first path resources').toEqual(13)
            expect(paths[1].length).withContext('second path length').toEqual(5)
            expect(state.getCell(paths[1].getTargetIndex()).resources).withContext('second path resources').toEqual(13)
            expect(paths[2].length).withContext('third path length').toEqual(5)
            expect(state.getCell(paths[2].getTargetIndex()).resources).withContext('third path resources').toEqual(9)
            expect(paths[3].length).withContext('fourth path length').toEqual(7)
            expect(state.getCell(paths[3].getTargetIndex()).resources).withContext('fourth path resources').toEqual(9)
        })
        it('should return paths from several indexes', function() {
            const paths = pathsToCrystals.getFrom(state, 1, 2)
            expect(paths).toBeDefined()
            expect(paths).toHaveSize(8)
            expect(paths[0].length).withContext('first path length').toEqual(3)
            expect(state.getCell(paths[0].getTargetIndex()).resources).withContext('first path resources').toEqual(13)
            expect(paths[0].getSourceIndex()).withContext('first path source index').toEqual(1)
            expect(paths[1].length).withContext('second path length').toEqual(3)
            expect(state.getCell(paths[1].getTargetIndex()).resources).withContext('second path resources').toEqual(13)
            expect(paths[1].getSourceIndex()).withContext('first path source index').toEqual(2)
            expect(paths[2].length).withContext('third path length').toEqual(5)
            expect(state.getCell(paths[2].getTargetIndex()).resources).withContext('third path resources').toEqual(13)
            expect(paths[2].getSourceIndex()).withContext('first path source index').toEqual(1)
            expect(paths[3].length).withContext('fourth path length').toEqual(5)
            expect(state.getCell(paths[3].getTargetIndex()).resources).withContext('fourth path resources').toEqual(13)
            expect(paths[3].getSourceIndex()).withContext('first path source index').toEqual(2)
            expect(paths[4].length).withContext('fifth path length').toEqual(5)
            expect(state.getCell(paths[4].getTargetIndex()).resources).withContext('fifth path resources').toEqual(9)
            expect(paths[4].getSourceIndex()).withContext('first path source index').toEqual(1)
            expect(paths[5].length).withContext('sixth path length').toEqual(5)
            expect(state.getCell(paths[5].getTargetIndex()).resources).withContext('sixth path resources').toEqual(9)
            expect(paths[5].getSourceIndex()).withContext('first path source index').toEqual(2)
            expect(paths[6].length).withContext('seventh path length').toEqual(7)
            expect(state.getCell(paths[6].getTargetIndex()).resources).withContext('seventh path resources').toEqual(9)
            expect(paths[6].getSourceIndex()).withContext('first path source index').toEqual(1)
            expect(paths[7].length).withContext('eighth path length').toEqual(7)
            expect(state.getCell(paths[7].getTargetIndex()).resources).withContext('eighth path resources').toEqual(9)
            expect(paths[7].getSourceIndex()).withContext('first path source index').toEqual(2)
        })
        it('should not return paths if from index does not exist', function() {
            const paths = pathsToCrystals.getFrom(state, 40)
            expect(paths).toBeDefined()
            expect(paths).toHaveSize(0)
        })
        it('should not return paths if there is no more available crystals', function() {
            state.cells[17].resources = 0
            state.cells[18].resources = 0
            state.cells[21].resources = 0
            state.cells[22].resources = 0
            const paths = pathsToCrystals.getFrom(state, 1)
            expect(paths).toBeDefined()
            expect(paths).toHaveSize(0)
        })
    })
})