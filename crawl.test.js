const {normalizeURL, getURLsFromHTML} = require("./crawl")
const {test, expect} = require("@jest/globals")

//take a url and normalize 
test('normalizeURL strip protocal', ()=>{
    //only need the URL page so deduct protocal ONLY domain + path
    const input = 'https://blog.boot.dev/path/'
    const actual = normalizeURL(input)
    const expected = 'blog.boot.dev/path'
    expect(actual).toEqual(expected)
})
test('normalizeURL capitals', ()=>{
    const input ='https://BLOG.boot.dev/path/'
    const actual = normalizeURL(input)
    const expected = 'blog.boot.dev/path'
    expect(actual).toEqual(expected)
})
test('normalizeURL strip Http', ()=>{
    const input ='http://BLOG.boot.dev/path/'
    const actual = normalizeURL(input)
    const expected = 'blog.boot.dev/path'
    expect(actual).toEqual(expected)
})
test('getURLsFromHTML absolute',  ()=>{
    const inputHTMLBody = `
    <html> 
        <body>
            <a href="https://blog.boot.dev/path/">
            Boot.dev Blog
            </a>
        </body>
    </html>
`
    const inputBaseURL = "https://blog.boot.dev/path/"
    const actual = getURLsFromHTML(inputHTMLBody, inputBaseURL)
    const expected = ["https://blog.boot.dev/path/"]
    expect(actual).toEqual(expected)
    // The purpose of the getURLsFromMTML function is to grab all of urls or links imbedded within an HTML page
})

test('getURLsFromHTML both relative and absolute',  ()=>{
    //relative URL are ones without the protocal and domain. its just a path.
    // the relative here is the same as the URL in the top because
    // the browser assumes by what domain you are on. if you are in the same
    // domain, the relative path will be http://<domainYouAreOn>/<relativePath>/
    const inputHTMLBody = `
    <html> 
        <body>
            <a href="https://blog.boot.dev/path1/">
            Boot.dev Blog Path One
            </a>
            <a href="/path2/">
            Boot.dev Blog Path two
            </a>
        </body>
    </html>
`
    const inputBaseURL = "https://blog.boot.dev"
    const actual = getURLsFromHTML(inputHTMLBody, inputBaseURL)
    const expected = ["https://blog.boot.dev/path1/","https://blog.boot.dev/path2/"]
    expect(actual).toEqual(expected)
    // The purpose of the getURLsFromMTML function is to grab all of urls or links imbedded within an HTML page
})
test('getURLsFromHTML invalid',  ()=>{
    const inputHTMLBody = `
    <html> 
        <body>
            <a href="invalid">
                Invalidd URL
            </a>
        </body>
    </html>
`
    const inputBaseURL = "https://blog.boot.dev/path/"
    const actual = getURLsFromHTML(inputHTMLBody, inputBaseURL)
    const expected = []
    expect(actual).toEqual(expected)
    
})