const express = require('express'); //framework para crear servidores
const app = express(); //instancia de aplicacion express para definir rutas y manejar solicitudes
const PORT = 3000; //puesto donde corre el servidor

app.use(express.json()); // Para poder manejar JSON en las solicitudes

// Colección de tareas (TODOS) por defecto
let todos = [
  { id: 1, title: 'Lavarse los dientes', completed: false }, //propiedad para ver si se completó o no
  { id: 2, title: 'Tomar el camion', completed: false },
  { id: 3, title: 'Entrar a clases', completed: true },
  { id: 4, title: 'Comer', completed: false },
  { id: 5, title: 'Lavar Trastes', completed: true },
];

// Ruta principal
app.get('/', (req, res) => { //ruta que responde a las solicitudes GET
  res.send('API de Tareas - TODOS'); //respuesta simple
});

// Crear tarea (CREATE)
app.post('/todos', (req, res) => { //ruta que responde solicitud
  const newTodo = { //nuevo objeto con id que se va sumando
    id: todos.length + 1,
    title: req.body.title,
    completed: false, //por defecto en false porque no se ha completado
  };
  todos.push(newTodo); //añadir el objeto a la coleccion
  res.status(201).json(newTodo);
});

// Leer todas las tareas (READ)
app.get('/todos', (req, res) => {
  res.json(todos);
});

// Leer una tarea por ID (READ)
app.get('/todos/:id', (req, res) => { //buscar por id
  const todo = todos.find(t => t.id === parseInt(req.params.id)); //find para encontrar la tarea con el id especificado
  if (!todo) return res.status(404).send('Tarea no encontrada.'); //sino se encuentra se devuelve alerta
  res.json(todo);
});

// Actualizar una tarea (UPDATE)
app.put('/todos/:id', (req, res) => { //buscar por id 
  const todo = todos.find(t => t.id === parseInt(req.params.id));
  if (!todo) return res.status(404).send('Tarea no encontrada.');

  todo.title = req.body.title; //actualizar title
  todo.completed = req.body.completed; //actualizar completed
  res.json(todo);
});

// Eliminar una tarea (DELETE)
app.delete('/todos/:id', (req, res) => { //buscar por id
  const todoIndex = todos.findIndex(t => t.id === parseInt(req.params.id)); //findIndex para obtener la tarea que se quiere eliminar
  if (todoIndex === -1) return res.status(404).send('Tarea no encontrada.'); //sino se encuentra devolvemos un error

  todos.splice(todoIndex, 1); //splice elimina el elemento
  res.status(204).send(); //sin contenido, no necesitamos enviar datos adicionales
});

// Iniciar servidor
app.listen(PORT, () => {
  console.log(`Servidor corriendo en http://localhost:${PORT}`);
});
