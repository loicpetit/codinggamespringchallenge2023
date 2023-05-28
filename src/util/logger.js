var minLevel = 3

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
    log(1, 'VERBOSE', category, msg)
}

function logInfo(category, msg){
    log(2, 'INFO', category, msg)
}

function logWarning(category, msg){
    log(3, 'WARNING', category, msg)
}

function logError(category, msg){
    log(4, 'ERROR', category, msg)
}

export { setMinLevel, logVerbose, logInfo, logWarning, logError }
