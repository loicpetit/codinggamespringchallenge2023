import StrengthCalculator from './strength-calculator.js'

describe('Strength calculator', function() {
    /** @type {StrengthCalculator} */
    let calculator

    beforeEach(function() {
        calculator = new StrengthCalculator()
    })

    it('should return min strength by default', function() {
        expect(calculator.computeForPathPriority()).toEqual(1)
    })

    it('should compute the correct strength', function() {
        expect(calculator.computeForPathPriority(60, 13, 3, 6)).toEqual(4)
        expect(calculator.computeForPathPriority(60, 9, 5, 6)).toEqual(4)
        expect(calculator.computeForPathPriority(60, 21, 5, 6)).toEqual(2)
    })
})