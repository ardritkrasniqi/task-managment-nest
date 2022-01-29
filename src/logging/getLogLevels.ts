
function getLogLevels(isProduction: boolean){
    if(isProduction){
        return ['log', 'warn', 'error'];
    }
    return['log', 'warn', 'error', 'verbose', 'debug']
}

export default getLogLevels;