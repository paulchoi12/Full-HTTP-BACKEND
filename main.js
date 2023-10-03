// <process.argv>
//This grabs the commandLine arguemnts

const {crawlPage} = require("./crawl.js")

async function main() {
    if (process.argv.length < 3){
        console.log("no website provided")
        process.exit(1) //1 is a standard error code
    }
    if (process.argv.length > 3) {
        console.log("too many command line args")
        process.exit(1)
    }
    const baseURL = process.argv[2]
    for (const arg of process.argv){
        // console.log(arg)
/*
        this console logs three lines
/Users/admin/.nvm/versions/node/v18.7.0/bin/node
/Users/admin/Desktop/Full HTTP BACKEND/main.js
wagslane.dev
******ANY COMMAND BEGINS WITH THREE LINES OF CODE********
         (if not errored)
    the first argument is the name of our program(interpreter)
    the second argument is the name of our code
    the thrid argument is what we are passing as our argument

*/
    }

    console.log(`starting crawl ${baseURL}`)
    const pages = await crawlPage(baseURL, baseURL, {})
    // because we start at the homepage and the current page will be homepage
    for (const page of Object.entries(pages)){
        console.log(page)
    }
}

main()

/*
 we are going to make a function that is going take a URL
 as an input and crawl on that website 
*/ 