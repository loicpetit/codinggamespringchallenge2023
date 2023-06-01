import Action from './action.js'
import * as Logger from '../util/logger.js'

class ActionBuilder {
    /** @type {Action[]} */
    actions = []

    addBeacon(
        /** @type {number} */
        index,
        /** @type {number} */
        strength
    ) {
        for (const action of this.actions) {
            if (action.key === 'BEACON') {
                const actionIndex = action.parameters[0]
                const actionStrength = action.parameters[1]
                if (typeof actionIndex === 'number' && actionIndex === index
                    && typeof actionStrength === 'number' && actionStrength > strength) {
                        Logger.logWarning('ACTION BUILDER', 'Already a beacon on index ' + index + ' with greater strength ' + actionStrength)
                        return
                    }
            }
        }
        this.actions.push(new Action('BEACON', [index, strength]))
    }

    addBeacons(
        /** @type {Path} */
        path,
        /** @type {number} */
        strength
    ) {
        if (!path || path.isEmpty()) {
            return
        }
        for (const index of path.indexes) {
            this.addBeacon(index, strength)
        }
    }

    build() {
        if (this.actions.length === 0) {
            return 'WAIT'
        }
        let result = ''
        for (const action of this.actions) {
            if (result.length > 0) {
                result += ';'
            }
            result += action.toString()
        }
        return result
    }
}

export default ActionBuilder