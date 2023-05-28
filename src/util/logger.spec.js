import * as Logger from './logger.js'

describe("Logger", function() {

    afterAll(function() {
        Logger.setMinLevel(3)
    });

    it("should log all", function() {
        Logger.setMinLevel(1)
        Logger.logVerbose('VERBOSE TEST', 'Log Verbose')
        Logger.logInfo('VERBOSE TEST', 'Log Info')
        Logger.logWarning('EVRBOSE TEST', 'Log Warning')
        Logger.logError('VERBOSE TEST', 'Log Error')
    })

    it("should log Info, Warning, Error", function() {
        Logger.setMinLevel(2)
        Logger.logVerbose('INFO TEST', 'Log Verbose')
        Logger.logInfo('INFO TEST', 'Log Info')
        Logger.logWarning('INFO TEST', 'Log Warning')
        Logger.logError('INFO TEST', 'Log Error')
    })

    it("should log Warning, Error", function() {
        Logger.setMinLevel(3)
        Logger.logVerbose('WARNING TEST', 'Log Verbose')
        Logger.logInfo('WARNING TEST', 'Log Info')
        Logger.logWarning('WARNING TEST', 'Log Warning')
        Logger.logError('WARNING TEST', 'Log Error')
    })

    it("should log only Error", function() {
        Logger.setMinLevel(4)
        Logger.logVerbose('ERROR TEST', 'Log Verbose')
        Logger.logInfo('ERROR TEST', 'Log Info')
        Logger.logWarning('ERROR TEST', 'Log Warning')
        Logger.logError('ERROR TEST', 'Log Error')
    })
})