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

    describe('for intersection', function() {
        /** @type {Path} */
        let anotherPath

        beforeEach(function() {
            path = new Path([10, 20, 15, 35, 50])
            anotherPath = new Path([11, 20, 16, 35, 40])
        })
        it('it should find indexes', function() {
            const intersection = path.intersectWith(anotherPath)
            expect(intersection).toBeDefined()
            expect(intersection).toHaveSize(2)
            expect(intersection[0]).toEqual(20)
            expect(intersection[1]).toEqual(35)        })
        it('it should not find if undefined', function() {
            expect(path.intersectWith()).toHaveSize(0)
        })
        it('it should not find if empty', function() {
            expect(path.intersectWith(new Path())).toHaveSize(0)
        })
    })
})