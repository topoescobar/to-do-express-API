const mongoose = require('mongoose')

//esquema con tipos de datos
const taskSchema = new mongoose.Schema({
  title: String,
  description: String,
  done: Boolean
})

//Clase para crear instancias
const Task = mongoose.model('task', taskSchema)

module.exports = Task