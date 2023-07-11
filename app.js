const express = require('express')
const app = express()
const port = 3001

app.use(express.json())
app.get('/', (req, res) => {
  res.send('Hello World!')
})

app.get('/api/users', (req, res) => {
  res.json(users)
  
})

app.get('/api/users/:id', (req, res) => {
  const id = Number(req.params.id) //se debe transformar en number porque el id recibido viene como string
  const user = users.find(userDB => userDB.id === id) 
  if (user) {
    res.json(user)
  } else {
    res.status(404).end()
  }
})

app.post('/api/users', (req, res) => {
  const user = req.body
  console.log(user);

  const ids = users.map(usr => usr.id) //array de ids
  const idMax = Math.max(...ids)

  const newUser = {
    id: idMax +1,
    name: user.name,
    username: user.name,
    email: user.email
  }

  users = [...users, newUser]
  res.json(newUser)
})

app.delete('/api/users/:id', (req, res) =>{
  const id = Number(req.params.id)
  users = users.filter(u => u.id !== id)
  console.log('eliminado usuario de id:', id);
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


let users = [
  {
    "id": 1,
    "name": "Ivan Garcia",
    "username": "topoescobar",
    "email": "Sincere@april.biz",
  },
  {
    "id": 2,
    "name": "Ervin Howell",
    "username": "Antonette",
    "email": "Shanna@melissa.tv",
    },
  {
    "id": 3,
    "name": "Clementine Bauch",
    "username": "Samantha",
    "email": "Nathan@yesenia.net",
  },
]
  