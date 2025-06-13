const http = require("http");
const url = require("url");

let tasks = [];
let ids = 1;

const server = http.createServer((req, res) => {
    const parsedUrl = url.parse(req.url, true);
    const method = req.method;
    const path = parsedUrl.pathname;

    if (method === 'GET' && path === "/tasks") {
        res.writeHead(200, { "content-type": "application/json" });
        res.end(JSON.stringify(tasks));
        return;
    }

    if (method === "POST" && path === "/tasks") {
        let body = '';

        req.on("data", chunk => body += chunk);
        req.on("end", () => {
            try {
                const { title } = JSON.parse(body);

                if (!title || typeof title !== "string") {
                    res.writeHead(400, { "content-type": "application/json" });
                    res.end(JSON.stringify({ error: "Title is requried" }));
                    return;
                }

                const newTask = { id: ids++, title }
                tasks.push(newTask);

                res.writeHead(201, { "content-type": "application/json" });
                res.end(JSON.stringify(newTask));

            } catch (err) {
                res.writeHead(400, { "content-type": "application/json" });
                res.end(JSON.stringify({ error: "Invalid json formate." }))
            }
        });
        return;
    }

});

const PORT = 3000;
server.listen(PORT, () => console.log(`Server running at http://localhost:${PORT}`));