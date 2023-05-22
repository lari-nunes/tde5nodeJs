const express = require('express');

const server = express();

server.use(express.json());

const prisma = require('./prisma');


server.get("/", async (req, res) => {
    const tasks = await prisma.task.findMany();
    return res.json(tasks)
})

server.post("/", async (req, res) => {
    const { nome, descricao, isDone } = req.body;
    const createTask = await prisma.task.create({
        data: {
            nome,
            descricao,
            isDone
        }
    });
    return res.json(createTask).status(201)
})

const port = 3000;
server.listen(port, () => {
    console.log(`Server is running in ${port}`)
});