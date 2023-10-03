function normalizeURL(urlString){
    const urlObj = new URL(urlString)
    
    // I only want the hostname and pathname!!
    const hostPath =  `${urlObj.hostname}${urlObj.pathname}`
    // if the last character is ' / '
    if(hostPath.length > 0 && hostPath.slice(-1)){
        //return without the last character
        return hostPath.slice(0, -1)
    }
    //if not just retrun the original host path
    return hostPath
}

module.exports ={
    normalizeURL
}