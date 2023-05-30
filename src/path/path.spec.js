import Path from './path.js'

describe('Path', function() {
    /** @type {Path} */
    let path

    describe('with no indexes', function() {
        beforeEach(function() {
            path = new Path()
        })
        it('it should not have a source', function() {
            expect(path.getSourceIndex()).toBeUndefined()
        })
        it('it should not have a target', function() {
            expect(path.getTargetIndex()).toBeUndefined()
        })
        it('it should be empty', function() {
            expect(path.isEmpty()).toBeTrue()
        })
    })

    describe('with one index', function() {
        beforeEach(function() {
            path = new Path([12])
        })
        it('it should have a source', function() {
            expect(path.getSourceIndex()).toEqual(12)
        })
        it('it should have a target', function() {
            expect(path.getTargetIndex()).toEqual(12)
        })
        it('it should not be empty', function() {
            expect(path.isEmpty()).toBeFalse()
        })
    })

    describe('with several indexes', function() {
        beforeEach(function() {
            path = new Path([10, 20, 15])
        })
        it('it should have a source', function() {
            expect(path.getSourceIndex()).toEqual(10)
        })
        it('it should have a target', function() {
            expect(path.getTargetIndex()).toEqual(15)
        })
        it('it should not be empty', function() {
            expect(path.isEmpty()).toBeFalse()
        })
    })
})