"use client";

import { useRouter } from "next/navigation";

function NewPage() {
  const router = useRouter();

  const onSubmit = async (e) => {
    e.preventDefault();

    const title = e.target.title.value;
    const description = e.target.description.value;

    await fetch('/api/tasks', {
      method: "POST",
      body: JSON.stringify({ title, description }),
      headers: {
        "Content-Type": 'application/json'
      }
    });

    router.push('/')
  }

  return (
    <div className="h-screen flex justify-center items-center">
      <form onSubmit={onSubmit} className="bg-slate-800 p-10 w-full md:w-1/2 lg:w-1/3">
        <label htmlFor="title" className="font-bold text-sm">Title</label>
        <input id="title" type="text" className="border border-gray-400 p-2 mb-4 w-full text-black" placeholder="Title" />

        <label htmlFor="description" className="font-bold text-sm">Description</label>
        <textarea id="description" rows="3" className="border border-gray-400 p-2 mb-4 w-full text-black" placeholder="Description" ></textarea>

        <button className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded">Create</button>
      </form>
    </div>
  )
}

export default NewPage;