const url = require("url")
const http = require("http")
const PORT = process.env.PORT || 3000

const { STATUS_CODES } = http

const hello  = `
    <html>
        <head>
            <style>
                body {
                    background: #333; 
                    margin: 1.25rem
                }
                h1 {
                    color: #EEE;
                    font-family: sans-serif;
                }
            </style>
        </head>

        <body>
            <h1>Home</h1>
            <h1>Hello World</h1>
            <h2>My First Web Server </h2>
            <h2>Go to the <a href="/"> root </a> page </h2>
        </body>
    </html>
`

const root = `
                <html>
                    <head>
                        <style>
                            body {
                                background: #333; 
                                margin: 1.25rem
                            }
                            h1 {
                                color: #EEE;
                                font-family: sans-serif;
                            }
                        </style>
                    </head>

                    <body>
                            <h2>This is the root page </h2>
                           <h2> Go to the <a href="/hello"> hello </a> page </h2>
                    </body>
                </html>
`

const server = http.createServer( (req, res) => {
    res.setHeader("content-Type", "text/html")

    if (req.method !== "GET") {
        res.statusCode = 405
        res.end(STATUS_CODES[res.statusCode] + `\r\n`)
        return
    }

    const { pathname } = url.parse(req.url)
    if (pathname === `/`) {
        res.end(root)
        return
    }

    if (pathname === "/hello") {
        res.end(hello)
        return
    }

    res.statusCode = 404

    res.end(STATUS_CODES[res.statusCode] + `\r\n`)
} )

server.listen(PORT)