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

    else if (method === "POST" && path === "/tasks") {
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

    else if (method === "PUT" && path.startsWith("/tasks/")) {
        const id = parseInt(path.split("/")[2]);

        if (isNaN(id)) {
            res.writeHead(400, { "content-type": "application/json" });
            res.end(JSON.stringify({ error: "Invalid Id" }));
            return;
        }

        let body = "";
        req.on("data", chunk => body += chunk);
        req.on("end", () => {
            try {
                const { title } = JSON.parse(body);

                if (!title || typeof title !== "string") {
                    res.writeHead(400, { "content-type": "application/json" });
                    res.end(JSON.stringify({ error: "Title is required" }));
                    return;
                }

                const task = tasks.find((task) => task.id === id);

                if (!task) {
                    res.writeHead(400, { "content-type": "application/json" });
                    res.end(JSON.stringify({ error: "Task Not Found!" }));
                    return;
                }

                task.title = title;

                res.writeHead(200, { "content-type": "application/json" });
                res.end(JSON.stringify(task));

            } catch (err) {
                res.writeHead(400, { "content-type": "application/json" });
                res.end(JSON.stringify({ error: "Invalid JSON format" }));
            }
        });
        return;
    }

    else if (method === "DELETE" && path.startsWith("/tasks/")) {

        const id = parseInt(path.split('/')[2]);

        const taskIndex = tasks.findIndex((task) => task.id === id);

        if (taskIndex === -1) {
            res.writeHead(400, { "content-type": "appliation/json" });
            res.end(JSON.stringify({ error: "Task Not Found!" }));
            return;
        }

        tasks.splice(taskIndex, 1);     // It will remove the task.  

        res.writeHead(200, { "content-type": "application/json" });
        res.end(JSON.stringify({ message: "Task Deleted Successfully" }));
    }

    else {
        res.writeHead(400, { "content-type": "application/json" });
        res.end(JSON.stringify({ error: "Route Not Found!" }));
        return;
    }
});

const PORT = 3000;
server.listen(PORT, () => console.log(`Server running at http://localhost:${PORT}`));