 
const {JSDOM} = require('jsdom')
//gives us a way in node to access to the DOM ("Document Model") API 

async function crawlPage(baseURL, currentURL, pages){
   
    //base === homepage, current === current page, pageOBJ === keep track of all the pages
    // currentURL has to be the same as baseURL
    const baseURLObj = new URL (baseURL)
    const currentURLObj = new URL (currentURL)
    if(baseURLObj.hostname !== currentURLObj.hostname){
        return pages
    }// need to know if we already crawled this page
    // it is a map of URLs that we went into

    const normalizedCurrentURL = normalizeURL(currentURL)
    if(pages[normalizedCurrentURL] > 0){
        pages[normalizedCurrentURL]++
        return pages
    }

    pages[normalizedCurrentURL] = 1

    console.log(`actively crwaling: ${currentURL}`);

    try {
        const resp = await fetch(currentURL)
        if(resp.status > 399){
            console.log(`error in fetch with status code ${resp.status} on page ${currentURL}`)
            return pages
        }

        const contentType = resp.headers.get("content-type")
        if (!contentType.includes("text/html")){
            console.log(`non html response, content type ${resp.status} on page ${currentURL}`)
            return pages
        }

        const htmlBody = await resp.text()

        const nextURLs = getURLsFromHTML(htmlBody, baseURL)

        for(const nextURL of nextURLs){
            pages = await crawlPage(baseURL, nextURL, pages)
        }

     // .text() gets body from HTML becasue HTML body is TEXT
    } catch (err){
        console.log(`error in fetch : ${err.message}, on page ${currentURL}`)
    }
    // the WHOLE POINT OF ERR CATCHING IS TO MAKE IT CLEARER!!! NOT FIX
    return pages
}

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
    getURLsFromHTML,
    crawlPage
}