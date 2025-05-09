import React, { useState, useEffect } from 'react';
import './App.css';

function App() {
  const [todos, setTodos] = useState([]);
  const [newTodo, setNewTodo] = useState({ title: '', description: '' });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const API_URL = process.env.REACT_APP_API_URL;

  // Fetch all todos
  const fetchTodos = async () => {
    setLoading(true);
    try {
      const response = await fetch(`${API_URL}/todos`);
      if (!response.ok) {
        throw new Error('Failed to fetch todos');
      }
      const data = await response.json();
      setTodos(data);
      setError(null);
    } catch (err) {
      console.error('Error fetching todos:', err);
      setError('Failed to load todos. Please try again later.');
    } finally {
      setLoading(false);
    }
  };

  // Create a new todo
  const createTodo = async (e) => {
    e.preventDefault();
    if (!newTodo.title.trim()) return;
    
    setLoading(true);
    try {
      const response = await fetch(`${API_URL}/todos`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(newTodo),
      });
      
      if (!response.ok) {
        throw new Error('Failed to create todo');
      }
      
      const createdTodo = await response.json();
      setTodos([...todos, createdTodo]);
      setNewTodo({ title: '', description: '' });
      setError(null);
    } catch (err) {
      console.error('Error creating todo:', err);
      setError('Failed to create todo. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  // Update todo (toggle completion)
  const toggleTodoCompletion = async (todo) => {
    setLoading(true);
    try {
      const updatedTodo = { ...todo, completed: !todo.completed };
      
      const response = await fetch(`${API_URL}/todos/${todo.id}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(updatedTodo),
      });
      
      if (!response.ok) {
        throw new Error('Failed to update todo');
      }
      
      const result = await response.json();
      setTodos(todos.map(t => t.id === todo.id ? result : t));
      setError(null);
    } catch (err) {
      console.error('Error updating todo:', err);
      setError('Failed to update todo. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  // Delete todo
  const deleteTodo = async (id) => {
    setLoading(true);
    try {
      const response = await fetch(`${API_URL}/todos/${id}`, {
        method: 'DELETE',
      });
      
      if (!response.ok) {
        throw new Error('Failed to delete todo');
      }
      
      setTodos(todos.filter(todo => todo.id !== id));
      setError(null);
    } catch (err) {
      console.error('Error deleting todo:', err);
      setError('Failed to delete todo. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  // Load todos on component mount
  useEffect(() => {
    fetchTodos();
  }, []);

  return (
    <div className="App">
      <header className="App-header">
        <h1>Serverless Todo App</h1>
      </header>
      
      <main>
        {error && <div className="error-message">{error}</div>}
        
        <form onSubmit={createTodo} className="todo-form">
          <input
            type="text"
            placeholder="What needs to be done?"
            value={newTodo.title}
            onChange={(e) => setNewTodo({ ...newTodo, title: e.target.value })}
            disabled={loading}
          />
          <input
            type="text"
            placeholder="Description (optional)"
            value={newTodo.description}
            onChange={(e) => setNewTodo({ ...newTodo, description: e.target.value })}
            disabled={loading}
          />
          <button type="submit" disabled={loading || !newTodo.title.trim()}>
            Add Todo
          </button>
        </form>
        
        <div className="todo-list">
          {loading && todos.length === 0 ? (
            <p>Loading todos...</p>
          ) : todos.length === 0 ? (
            <p>No todos yet! Add one above.</p>
          ) : (
            todos.map(todo => (
              <div key={todo.id} className={`todo-item ${todo.completed ? 'completed' : ''}`}>
                <div className="todo-content">
                  <h3>{todo.title}</h3>
                  {todo.description && <p>{todo.description}</p>}
                </div>
                <div className="todo-actions">
                  <button onClick={() => toggleTodoCompletion(todo)} disabled={loading}>
                    {todo.completed ? 'Mark Incomplete' : 'Mark Complete'}
                  </button>
                  <button onClick={() => deleteTodo(todo.id)} disabled={loading} className="delete-btn">
                    Delete
                  </button>
                </div>
              </div>
            ))
          )}
        </div>
      </main>
    </div>
  );
}

export default App;