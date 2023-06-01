const VERBOSE_LEVEL = 1
const INFO_LEVEL = 2
const WARNING_LEVEL = 3
const ERROR_LEVEL = 4

var minLevel = WARNING_LEVEL

function setMinLevel(level){
    minLevel = level;
}

function log(level, type, category, msg){
    if(level >= minLevel) {
        var time = new Date()
        console.error(`[${time.getHours()}h${time.getMinutes()}m${time.getSeconds()}.${time.getMilliseconds()}s] [${type}] [${category}] ${msg}`)
    }
}

function logVerbose(category, msg){
    log(VERBOSE_LEVEL, 'VERBOSE', category, msg)
}

function logInfo(category, msg){
    log(INFO_LEVEL, 'INFO', category, msg)
}

function logWarning(category, msg){
    log(WARNING_LEVEL, 'WARNING', category, msg)
}

function logError(category, msg){
    log(ERROR_LEVEL, 'ERROR', category, msg)
}

export { VERBOSE_LEVEL, INFO_LEVEL, WARNING_LEVEL, ERROR_LEVEL, setMinLevel, logVerbose, logInfo, logWarning, logError }
