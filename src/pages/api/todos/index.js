let todos = [
    { id: 1, title: 'Todo 1', description: 'Description 1', completed: false },
    { id: 2, title: 'Todo 2', description: 'Description 2', completed: true },
  ];
  
  export default function handler(req, res) {
    if (req.method === 'GET') {
      res.status(200).json(todos);
    } else if (req.method === 'POST') {
      const { title, description } = req.body;
      const newTodo = {
        id: todos.length + 1,
        title,
        description,
        completed: false,
      };
      todos.push(newTodo);
      res.status(201).json(newTodo);
    } else {
      res.status(405).json({ message: 'Method Not Allowed' });
    }
  }
  