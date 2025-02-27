import Head from "next/head";
import { useState, useEffect } from "react";
import Link from "next/link";

interface Todo {
  id: number;
  title: string;
  description: string;
  completed: boolean;
}

export default function TodoList() {
  const [todos, setTodos] = useState<Todo[]>([]);
  const [newTitle, setNewTitle] = useState("");
  const [newDescription, setNewDescription] = useState("");
  const [editingId, setEditingId] = useState<number | null>(null);
  const [editTitle, setEditTitle] = useState("");
  const [editDescription, setEditDescription] = useState("");

  useEffect(() => {
    const stored = localStorage.getItem("todos");
    if (stored) {
      setTodos(JSON.parse(stored));
    }
  }, []);

  useEffect(() => {
    localStorage.setItem("todos", JSON.stringify(todos));
  }, [todos]);

  const handleAdd = () => {
    if (!newTitle.trim()) return;
    const newTodo: Todo = {
      id: Date.now(),
      title: newTitle,
      description: newDescription,
      completed: false,
    };
    setTodos([...todos, newTodo]);
    setNewTitle("");
    setNewDescription("");
  };

  const handleDelete = (id: number) => {
    setTodos(todos.filter(todo => todo.id !== id));
  };

  const startEditing = (todo: Todo) => {
    setEditingId(todo.id);
    setEditTitle(todo.title);
    setEditDescription(todo.description);
  };

  const handleUpdate = (id: number) => {
    setTodos(todos.map(todo => todo.id === id ? { ...todo, title: editTitle, description: editDescription } : todo));
    setEditingId(null);
  };

  return (
    <>
      <Head>
        <title>Todo List</title>
        <meta name="viewport" content="width=device-width, initial-scale=1" />
      </Head>
      <main className="p-8 font-sans">
        <h1 className="text-3xl font-bold mb-6">Todo List</h1>
        <div className="mb-6 p-4 border rounded">
          <h2 className="text-xl font-semibold mb-2">Add New Todo</h2>
          <input
            type="text"
            placeholder="Title"
            value={newTitle}
            onChange={(e) => setNewTitle(e.target.value)}
            className="border p-2 mr-2"
          />
          <input
            type="text"
            placeholder="Description"
            value={newDescription}
            onChange={(e) => setNewDescription(e.target.value)}
            className="border p-2 mr-2"
          />
          <button onClick={handleAdd} className="bg-blue-500 text-white p-2">Add</button>
        </div>
        <ul>
          {todos.map((todo) => (
            <li key={todo.id} className="mb-4 p-4 border rounded">
              {editingId === todo.id ? (
                <div>
                  <input
                    type="text"
                    value={editTitle}
                    onChange={(e) => setEditTitle(e.target.value)}
                    className="border p-2 mr-2"
                  />
                  <input
                    type="text"
                    value={editDescription}
                    onChange={(e) => setEditDescription(e.target.value)}
                    className="border p-2 mr-2"
                  />
                  <button onClick={() => handleUpdate(todo.id)} className="bg-green-500 text-white p-2 mr-2">Save</button>
                  <button onClick={() => setEditingId(null)} className="bg-gray-500 text-white p-2">Cancel</button>
                </div>
              ) : (
                <div>
                  <h3 className="text-xl font-bold">
                    <Link href={`/todo/${todo.id}`}>{todo.title}</Link>
                  </h3>
                  <p>{todo.description}</p>
                  <div className="mt-2">
                    <button onClick={() => startEditing(todo)} className="bg-yellow-500 text-white p-2 mr-2">Edit</button>
                    <button onClick={() => handleDelete(todo.id)} className="bg-red-500 text-white p-2">Delete</button>
                  </div>
                </div>
              )}
            </li>
          ))}
        </ul>
      </main>
    </>
  );
}
