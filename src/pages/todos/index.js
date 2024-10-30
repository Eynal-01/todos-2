// import Link from 'next/link';

// export async function getServerSideProps() {
//   try {
//     const response = await fetch('https://jsonplaceholder.typicode.com/todos');
//     const todos = await response.json();

//     return { props: { todos } };
//   } catch (error) {
//     console.error("Failed to fetch todos:", error);
//     return { props: { todos: [] } }; 
//   }
// }

// export default function TodosPage({ todos }) {
//   if (!todos || todos.length === 0) {
//     return <p>No todos found.</p>;
//   }

//   return (
//     <div>
//       <h1>Todo List</h1>
//       <ul>
//         {todos.map((todo) => (
//           <li key={todo.id}>
//             <Link href={`/todos/${todo.id}`}>{todo.title}</Link>
//           </li>
//         ))}
//       </ul>
//     </div>
//   );
// }



import { useState, useEffect } from 'react';

export default function TodosPage() {
  const [todos, setTodos] = useState([]);
  const [newTodo, setNewTodo] = useState({ title: '', description: '' });

  // Fetch all todos on component load
  useEffect(() => {
    fetchTodos();
  }, []);

  async function fetchTodos() {
    const response = await fetch('/api/todos');
    const data = await response.json();
    setTodos(data);
  }

  async function addTodo(e) {
    e.preventDefault();
    const response = await fetch('/api/todos', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(newTodo),
    });
    const data = await response.json();
    setTodos([...todos, data]); // Update UI
    setNewTodo({ title: '', description: '' }); // Reset form
  }

  async function deleteTodo(id) {
    await fetch(`/api/todos/${id}`, { method: 'DELETE' });
    setTodos(todos.filter((todo) => todo.id !== id)); // Remove from UI
  }

  async function updateTodo(id, updatedFields) {
    const response = await fetch(`/api/todos/${id}`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(updatedFields),
    });
    const updatedTodo = await response.json();
    setTodos(todos.map((todo) => (todo.id === id ? updatedTodo : todo))); // Update UI
  }

  return (
    <div>
      <h1>Todos List</h1>

      <form onSubmit={addTodo}>
        <input
          type="text"
          value={newTodo.title}
          onChange={(e) => setNewTodo({ ...newTodo, title: e.target.value })}
          placeholder="Title"
          required
        />
        <input
          type="text"
          value={newTodo.description}
          onChange={(e) => setNewTodo({ ...newTodo, description: e.target.value })}
          placeholder="Description"
          required
        />
        <button type="submit">Add Todo</button>
      </form>

      <ul>
        {todos.map((todo) => (
          <li key={todo.id}>
            <h2>{todo.title}</h2>
            <p>{todo.description}</p>
            <button onClick={() => deleteTodo(todo.id)}>Delete</button>
            <button
              onClick={() =>
                updateTodo(todo.id, { completed: !todo.completed })
              }
            >
              {todo.completed ? 'Mark Incomplete' : 'Mark Complete'}
            </button>
          </li>
        ))}
      </ul>
    </div>
  );
}
