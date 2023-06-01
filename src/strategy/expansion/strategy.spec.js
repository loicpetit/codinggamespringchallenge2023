import Base from '../../state/base.js'
import Cell from '../../state/cell.js'
import Path from '../../path/path.js'
import State from '../../state/state.js'
import Strategy from './strategy.js'

describe('Expansion strategy', function() {
    /** @type {State} */
    let state
    /** @type {Strategy} */
    let strategy

    beforeEach(function() {
        /** create state from ![map1](file:///C:/Users/Moi/Documents/Dev/Codingame/codinggamespringchallenge2023/src/strategy/expansion/map1.png) */
        const cells = [
            new Cell(0,  0,   0, 0,  0,  -1, 1,  3,  -1, 2,  4),
            new Cell(1,  0,   0, 0,  0,  7,  -1, 9,  3,  0,  -1),
            new Cell(2,  0,   0, 0,  0,  4,  0,  -1, 8,  -1, 10),
            new Cell(3,  0,   0, 0,  0,  1,  9,  -1, 11, -1, 0),
            new Cell(4,  0,   0, 0,  0,  12, -1, 0,  2,  10, -1),
            new Cell(5,  0,   0, 0,  10, 13, 15, 7,  -1, 12, 22),
            new Cell(6,  0,   0, 10, 0,  -1, 11, 21, 14, 16, 8),
            new Cell(7,  0,   0, 0,  0,  15, 17, -1, 1,  -1, 5),
            new Cell(8,  0,   0, 0,  0,  2,  -1, 6,  16, 18, -1),
            new Cell(9,  280, 2, 0,  0,  -1, -1, -1, -1, 3,  1),
            new Cell(10, 280, 2, 0,  0,  -1, 4,  2,  -1, -1, -1),
            new Cell(11, 38,  1, 0,  0,  3, -1,  19, 21, 6,  -1),
            new Cell(12, 38,  1, 0,  0,  22, 5,  -1, 4,  -1, 20),
            new Cell(13, 80,  2, 0,  0,  23, 25, 15, 5,  22, 32),
            new Cell(14, 80,  2, 0,  0,  6,  21, 31, 24, 26, 16),
            new Cell(15, 24,  1, 0,  0,  25, 27, 17, 7,  5,  13),
            new Cell(16, 24,  1, 0,  0,  8,  6,  14, 26, 28, 18),
            new Cell(17, 0,   0, 0,  0,  27, -1, -1, -1, 7,  15),
            new Cell(18, 0,   0, 0,  0,  -1, 8,  16, 28, -1, -1),
            new Cell(19, 0,   0, 0,  0,  -1, -1, -1, 29, 21, 11),
            new Cell(20, 0,   0, 0,  0,  30, 22, 12, -1, -1, -1),
            new Cell(21, 245, 2, 0,  0,  11, 19, 29, 31, 14, 6),
            new Cell(22, 245, 2, 0,  0,  32, 13, 5,  12, 20, 30),
            new Cell(23, 10,  1, 0,  0,  33, 35, 25, 13, 32, 40),
            new Cell(24, 10,  1, 0,  0,  14, 31, 39, 34, 36, 26),
            new Cell(25, 0,   0, 0,  0,  35, -1, 27, 15, 13, 23),
            new Cell(26, 0,   0, 0,  0,  16, 14, 24, 36, -1, 28),
            new Cell(27, 0,   0, 0,  0,  -1, -1, -1, 17, 15, 25),
            new Cell(28, 0,   0, 0,  0,  18, 16, 26, -1, -1, -1),
            new Cell(29, 0,   0, 0,  0,  19, -1, -1, 37, 31, 21),
            new Cell(30, 0,   0, 0,  0,  38, 32, 22, 20, -1, -1),
            new Cell(31, 40,  2, 0,  0,  21, 29, 37, 39, 24, 14),
            new Cell(32, 40,  2, 0,  0,  40, 23, 13, 22, 30, 38),
            new Cell(33, 0,   0, 0,  0,  -1, -1, 35, 23, 40, -1),
            new Cell(34, 0,   0, 0,  0,  24, 39, -1, -1, -1, 36),
            new Cell(35, 0,   0, 0,  0,  -1, -1, -1, 25, 23, 33),
            new Cell(36, 0,   0, 0,  0,  26, 24, 34, -1, -1, -1),
            new Cell(37, 0,   0, 0,  0,  29, -1, -1, -1, 39, 31),
            new Cell(38, 0,   0, 0,  0,  -1, 40, 32, 30, -1, -1),
            new Cell(39, 0,   0, 0,  0,  31, 37, -1, -1, 34, 24),
            new Cell(40, 0,   0, 0,  0,  -1, 33, 23, 32, 38, -1)
        ]
        const crystals = [9, 10, 13, 14, 21, 22, 31, 32]
        const eggs = [11, 12, 15, 16, 23, 24]
        const myBases = [
            new Base(6)
        ]
        const opponentBases = [
            new Base(5)
        ]
        state = new State(
            cells,
            crystals,
            eggs,
            myBases,
            10,
            myBases.length,
            cells.length,
            opponentBases,
            10
        )
        /** create strategy */
        strategy = new Strategy()
    })

    describe('Empty state', function() {
        beforeEach(function() {
            state = new State(
                [],
                [],
                [],
                [],
                0,
                0,
                0,
                [],
                0
            )
        })
        it('should wait', function() {
            const actions = strategy.process(state)
            expect(actions).withContext('Strategy actions').toEqual('WAIT')
        })
    })

    describe('No bases state', function() {
        beforeEach(function() {
            state.nbBases = 0
            state.myBases = []
            state.opponentBases = []
        })
        it('should wait', function() {
            const actions = strategy.process(state)
            expect(actions).withContext('Strategy actions').toEqual('WAIT')
        })
    })

    describe('No resources', function() {
        beforeEach(function() {
            state.cells[9].resources = 0
            state.cells[10].resources = 0
            state.cells[11].resources = 0
            state.cells[12].resources = 0
            state.cells[13].resources = 0
            state.cells[14].resources = 0
            state.cells[15].resources = 0
            state.cells[16].resources = 0
            state.cells[21].resources = 0
            state.cells[22].resources = 0
            state.cells[23].resources = 0
            state.cells[24].resources = 0
            state.cells[31].resources = 0
            state.cells[32].resources = 0
        })
        it('should wait', function() {
            const actions = strategy.process(state)
            expect(actions).withContext('Strategy actions').toEqual('WAIT')
        })
    })

    describe('1st turn', function() {
        it('should set the correct beacons', function() {
            const actions = strategy.process(state)
            const expectedActions =
                'BEACON 6 1;' +
                'BEACON 11 1'
            expect(actions).withContext('Strategy actions').toEqual(expectedActions)
        })
    })

    describe('2nd turn', function() {
        beforeEach(function() {
            state.cells[6].myAnts = 10
            state.cells[11].myAnts = 5
            state.cells[11].resources = 33
            state.myNbAnts = 15
            strategy.paths.push(new Path([6, 11]))
        })
        it('should set the correct beacons', function() {
            const actions = strategy.process(state)
            const expectedActions =
                'BEACON 6 7;' +
                'BEACON 11 7;' +
                'BEACON 16 1'
            expect(actions).withContext('Strategy actions').toEqual(expectedActions)
        })
    })
})