const express = require('express')
const app = express()
const port = process.env.PORT || 3001
const cors = require('cors')
let taskArr = require('./database')

app.use(cors()) // middleware que permite funcionar con cualquier origen
app.use(express.json())

app.get('/', (req, res) => {
  res.send('Hello World!')
})

app.get('/api/tasks', (req, res) => {
  res.json(taskArr)
})

app.get('/api/tasks/:id', (req, res) => {
  const id = Number(req.params.id) // se debe transformar en number porque el id recibido viene como string
  const user = taskArr.find(userDB => userDB.id === id)
  if (user) {
    res.json(user)
  } else {
    res.status(404).end()
  }
})

app.post('/api/tasks/', (req, res) => {
  const taskReq = req.body

  if (!taskReq || !taskReq.title) {
    return res.status(400).json({
      error: 'required task title'
    })
  }
  const ids = taskArr.map(usr => usr.id) // array de ids
  const idMax = Math.max(...ids)

  const newTask = {
    id: idMax + 1,
    title: taskReq.title,
    description: taskReq.description,
    done: taskReq.done
  }

  taskArr = [...taskArr, newTask]
  res.status(201).json(newTask)
})

app.delete('/api/tasks/:id', (req, res) => {
  const id = Number(req.params.id)
  taskArr = taskArr.filter(u => u.id !== id)
  console.log('eliminado tarea de id:', id)
  res.status(204).end()
})

app.listen(port, () => {
  console.log(`Topo app listening on port ${port}`)
})

/* VANILLA NODEJS
const server = http.createServer((req, res) => {
  res.statusCode = 200;
  res.setHeader('Content-Type', 'application/json');
  res.end(JSON.stringify(users));
});

server.listen(port, hostname, () => {
  console.log(`Topo app, server running at http://${hostname}:${port}/`);
});
*/
