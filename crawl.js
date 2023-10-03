const {JSDOM} = require('jsdom')
//gives us a way in node to access to the DOM ("Document Model") API 

function getURLsFromHTML(htmlBody, baseURL){
    const urls = []
    const dom = new JSDOM(htmlBody)
    //this is tagging all the <a> </a> elements in the document body
    const linkElements = dom.window.document.querySelectorAll('a')
    for(const linkElement of linkElements){
        // the link Element is an object that includes the HTML body text
        if(linkElement.href.slice(0, 1)=== '/'){
            //relative URL
            try{
            const urlObj = new URL(`${baseURL}${linkElement.href}`)
            urls.push(urlObj.href)
            } catch (err){
                //the err inside the param is an object that holds
                //A key called message, that is why we can err.message
                console.log(`error with relative url: ${err.message}`)
            }
        }else {
            //absolute URL
            try{
                const urlObj = new URL(`${linkElement.href}`)
                urls.push(urlObj.href)
                } catch (err){
                    console.log(`error with absolute url: ${err.message}`)
                }
        }
    }
    return urls
} 

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
    normalizeURL,
    getURLsFromHTML
}