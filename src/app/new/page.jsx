"use client";
import { useState, useEffect } from 'react'
import { useRouter } from "next/navigation";

function NewPage({ params }) {
  const router = useRouter();

  const [title, setTitle] = useState("")
  const [description, setDescription] = useState("")

  useEffect(() => {
    if (params.id) {
      fetch(`/api/tasks/${params.id}`)
        .then(res => res.json())
        .then(data => {
          setTitle(data.title)
          setDescription(data.description)
        })
    }
  }, [params.id])


  const onSubmit = async (e) => {
    e.preventDefault();

    if (params.id) {
      await fetch(`/api/tasks/${params.id}`, {
        method: "PUT",
        body: JSON.stringify({ title, description }),
        headers: {
          "Content-Type": 'application/json'
        }
      });
    }
    else {
      await fetch('/api/tasks', {
        method: "POST",
        body: JSON.stringify({ title, description }),
        headers: {
          "Content-Type": 'application/json'
        }
      });
    }

    router.refresh();
    router.push('/');
  }

  return (
    <div className="h-screen flex justify-center items-center">
      <form onSubmit={onSubmit} className="bg-slate-800 p-10 w-full md:w-1/2 lg:w-1/3">
        <label htmlFor="title" className="font-bold text-sm">Title</label>
        <input
          id="title"
          type="text"
          className="border border-gray-400 p-2 mb-4 w-full text-black"
          placeholder="Title"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
        />

        <label htmlFor="description" className="font-bold text-sm">Description</label>
        <textarea
          id="description"
          rows="3"
          className="border border-gray-400 p-2 mb-4 w-full text-black"
          placeholder="Description"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
        >
        </textarea>

        <div className="flex justify-between items-center">
          <button className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded">
            {params.id ? 'Edit' : 'Create'}
          </button>

          {params.id &&
            <button
              type="button"
              className="bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded"
              onClick={() => {
                fetch(`/api/tasks/${params.id}`, {
                  method: "DELETE",
                });
                router.refresh();
                router.push('/');
              }}
            >
              Delete
            </button>
          }
        </div>
      </form>
    </div>
  )
}

export default NewPage;