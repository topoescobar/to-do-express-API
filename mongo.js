const mongoose = require('mongoose')
const Task = require('./models/Task.js')

const connectionString =  'mongodb+srv://topoescobar:ERWlMDKatKA6DAU1@cluster0.ridbtwx.mongodb.net/?retryWrites=true&w=majority'

//conexion 
mongoose.connect(connectionString).then(() => {
  console.log('conectado correctamente')
}).catch(err=>{
  console.error('error', err)
})

//Objeto
const task = new Task({
  title:'aprendiendo mongoose',
  description:'curso midu',
  done:false
})  

task.save().then(result => {
  console.log('result', result)
  mongoose.connection.close()
}).catch(err=>{ 
  console.error('error', err)
})
