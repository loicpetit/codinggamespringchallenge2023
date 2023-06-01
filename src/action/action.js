class Action {

    constructor(
        /** @type {'WAIT' | 'BEACON' | 'LINE' | 'WAIT' | 'MESSAGE'} */
        key = 'WAIT',
        /** @type {(number | string)[]} */
        parameters = []
    ) {
        this.key = key
        this.parameters = parameters
    }

    /**
     * @returns {string}
     */
    toString() {
        let result = this.key
        for (const parameter of this.parameters) {
            result += ' ' + String(parameter)
        }
        return result
    }
}

export default Action