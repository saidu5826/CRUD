const http = require("http")
const Users = [
    {
        name: "Bruce",
        age: 25
    },
    {
        name: "Tony",
        age: 30
    },
    {
        name: "Steve",
        age: 70
    }
]
const server = http.createServer(function (request, response) {
    const paths = request.url.split("/")
    if (request.method === "GET" && paths[1] === "users" && paths.length === 2) {
        response.write(JSON.stringify(Users))
    }
    else if (request.method === "GET" && paths[1] === "users" && paths[2]) {
        const idx = paths[2]
        const user = Users[idx]
        if (user) {
            response.write(JSON.stringify(user))
        } else {
            response.write("Not Found")
        }
    }
    else if (request.method === "POST" && paths[1] === "users") {
        let data = ""
        request.on("data", function (chunk) {
            data += chunk
        })
        request.on("end", function () {
            const obj = JSON.parse(data.toString())
            Users.push(obj)
        })
        response.statusCode = 201
        response.write("User data created.")
    }
    else if (request.method === "PUT" && paths[1] === "users" && paths[2]) {
        const idx = paths[2]
        if (idx >= 0 && idx < Users.length) {
            let data = ""
            request.on("data", function (chunk) {
                data += chunk
            })
            request.on("end", function () {
                const obj = JSON.parse(data.toString())
                Users[idx] = obj
            })
            response.statusCode = 200
            response.write("User data updated.")
        } else {
            response.statusCode = 404
            response.write("User not found.")
        }
    }
    else if (request.method === "DELETE" && paths[1] === "users" && paths[2]) {
        const idx = paths[2]
        if (idx >= 0 && idx < Users.length) {
            Users.splice(idx, 1)
            response.statusCode = 200
            response.write("User data deleted.")
        } else {
            response.statusCode = 404
            response.write("User not found.")
        }
    }
    else {
        response.statusCode = 404
        response.write("Not Found")
    }
    response.end()
})
server.listen(3000, function () {
    console.log("server is running on port number 3000")
})