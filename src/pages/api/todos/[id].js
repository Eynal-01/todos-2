export default function handler(req, res) {
    const { id } = req.query;
    const todoIndex = todos.findIndex((todo) => todo.id === parseInt(id));
  
    if (todoIndex === -1) {
      return res.status(404).json({ message: 'Todo not found' });
    }
  
    if (req.method === 'GET') {
      return res.status(200).json(todos[todoIndex]);
    } else if (req.method === 'PUT' || req.method === 'PATCH') {
      const { title, description, completed } = req.body;
      todos[todoIndex] = {
        ...todos[todoIndex],
        title: title || todos[todoIndex].title,
        description: description || todos[todoIndex].description,
        completed: completed ?? todos[todoIndex].completed,
      };
      return res.status(200).json(todos[todoIndex]);
    } else if (req.method === 'DELETE') {
      todos.splice(todoIndex, 1);
      return res.status(204).end();  
    } else {
      res.status(405).json({ message: 'Method Not Allowed' });
    }
  }
  