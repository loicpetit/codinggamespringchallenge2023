import Base from '../../state/base.js'
import Cell from '../../state/cell.js'
import State from '../../state/state.js'
import Strategy from './strategy.js'

describe('Fast close slow far strategy', function() {
    /** @type {State} */
    let state
    /** @type {Strategy} */
    let strategy

    beforeEach(function() {
        /** create state from ![map1](file:///c:/Users/Moi/Documents/Dev/Codingame/codinggamespringchallenge2023/src/strategy/fast-close-slow-far/map1.png) */
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
        /** create strategy */
        strategy = new Strategy()
    })

    describe('Empty state', function() {
        beforeEach(function() {
            state = new State(
                [],
                [],
                0,
                0,
                []
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

    describe('No crystal state', function() {
        beforeEach(function() {
        })
        it('should wait', function() {
            const actions = strategy.process(state)
            expect(actions).withContext('Strategy actions').toEqual('WAIT')
        })
    })

    describe('Initial state', function() {
        beforeEach(function() {
        })
        it('should set the correct beacons', function() {
            const actions = strategy.process(state)
            const expectedActions =
                'BEACON 1 4;' +
                'BEACON 12 4;' +
                'BEACON 18 4;' +
                'BEACON 0 1;' +
                'BEACON 3 1;' +
                'BEACON 11 1;' +
                'BEACON 19 1;' +
                'BEACON 29 1;' +
                'BEACON 22 1';
            expect(actions).withContext('Strategy actions').toEqual(expectedActions)
        })
    })

    describe('Closest crystal cell resource at 0 state', function() {
        beforeEach(function() {
            state.cells[17].resources = 2 // supposed opponent has recolted its closest resource as well
            state.cells[18].resources = 0
            // so we should focus now on 21 and 22 because 21 has more resources than 17 for the same distance
        })
        it('should set the correct beacons', function() {
            const actions = strategy.process(state)
            const expectedActions =
                'BEACON 1 4;' +
                'BEACON 5 4;' +
                'BEACON 13 4;' +
                'BEACON 23 4;' +
                'BEACON 21 4;' +
                'BEACON 0 1;' +
                'BEACON 3 1;' +
                'BEACON 11 1;' +
                'BEACON 19 1;' +
                'BEACON 29 1;' +
                'BEACON 22 1';
            expect(actions).withContext('Strategy actions').toEqual(expectedActions)
        })
    })

    describe('Closest crystal cell resource at 0 state and more crystals', function() {
        beforeEach(function() {
            state.cells[17].resources = 2 // supposed opponent has recolted its closest resource as well
            state.cells[18].resources = 0
            state.cells[21].resources = 21
            // so we should focus now on 21 and 22 because 21 has more resources than 17 for the same distance
            // cannot get 21 or 11 (21 / 2) crystals at once so the number of ants should be optimized to be near 7 (21 / 3)
        })
        it('should set the correct beacons', function() {
            const actions = strategy.process(state)
            const expectedActions =
                'BEACON 1 2;' +
                'BEACON 5 2;' +
                'BEACON 13 2;' +
                'BEACON 23 2;' +
                'BEACON 21 2;' +
                'BEACON 0 1;' +
                'BEACON 3 1;' +
                'BEACON 11 1;' +
                'BEACON 19 1;' +
                'BEACON 29 1;' +
                'BEACON 22 1';
            expect(actions).withContext('Strategy actions').toEqual(expectedActions)
        })
    })

    describe('One crystal cell left', function() {
        beforeEach(function() {
            state.cells[17].resources = 0
            state.cells[18].resources = 0
            state.cells[21].resources = 0
        })
        it('should set the correct beacons', function() {
            const actions = strategy.process(state)
            const expectedActions =
                'BEACON 1 1;' +
                'BEACON 0 1;' +
                'BEACON 3 1;' +
                'BEACON 11 1;' +
                'BEACON 19 1;' +
                'BEACON 29 1;' +
                'BEACON 22 1';
                expect(actions).withContext('Strategy actions').toEqual(expectedActions)
        })
    })
})