const {normalizeURL} = require("./crawl")
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