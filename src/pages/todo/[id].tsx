import Head from "next/head";
import { useRouter } from "next/router";
import { useState, useEffect } from "react";
import Link from "next/link";

interface Todo {
  id: number;
  title: string;
  description: string;
  completed: boolean;
}

export default function TodoDetail() {
  const router = useRouter();
  const { id } = router.query;
  const [todo, setTodo] = useState<Todo | null>(null);

  useEffect(() => {
    if (!id) return;
    const stored = localStorage.getItem("todos");
    if (stored) {
      const todos: Todo[] = JSON.parse(stored);
      const found = todos.find(t => t.id.toString() === id.toString());
      setTodo(found || null);
    }
  }, [id]);

  if (!todo) {
    return (
      <>
        <Head>
          <title>Todo Detail</title>
          <meta name="viewport" content="width=device-width, initial-scale=1" />
        </Head>
        <main className="p-8 font-sans">
          <p>Todo not found.</p>
          <Link href="/todo">Back to Todo List</Link>
        </main>
      </>
    );
  }

  return (
    <>
      <Head>
        <title>{todo.title} Detail</title>
        <meta name="viewport" content="width=device-width, initial-scale=1" />
      </Head>
      <main className="p-8 font-sans">
        <h1 className="text-3xl font-bold mb-6">Todo Detail</h1>
        <div className="p-4 border rounded mb-6">
          <h2 className="text-2xl font-semibold">{todo.title}</h2>
          <p className="mt-2">{todo.description}</p>
          <p className="mt-2">Status: {todo.completed ? "Completed" : "Not Completed"}</p>
        </div>
        <Link href="/todo">
          <a className="bg-gray-500 text-white p-2 inline-block">Back to Todo List</a>
        </Link>
      </main>
    </>
  );
}
