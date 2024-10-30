export async function getStaticPaths() {
    const response = await fetch('https://jsonplaceholder.typicode.com/todos');
    const todos = await response.json();
  
    const paths = todos.map((todo) => ({
      params: { id: todo.id.toString() },
    }));
  
    return { paths, fallback: false };
  }
  
  export async function getStaticProps({ params }) {
    const response = await fetch(`https://jsonplaceholder.typicode.com/todos/${params.id}`);
    const todo = await response.json();
  
    return { props: { todo } };
  }
  
  export default function TodoDetail({ todo }) {
    return (
      <div>
        <h1>Todo Məlumatı</h1>
        <h2>{todo.title}</h2>
        <p>{todo.completed ? 'Ok' : 'Not ok'}</p>
      </div>
    );
  }
  