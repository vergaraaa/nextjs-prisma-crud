const getTasks = async () => {
  const res = await fetch('http://localhost:3000/api/tasks');
  const data = await res.json();
  return data;
}

export default async function HomePage() {
  const tasks = await getTasks();

  return (
    <section className="container mx-auto mt-10">
      <div className="grid grid-cols-3 gap-3">
        {tasks.map(task => (
          <div key={task.id} className="bg-slate-900 p-3 hover:bg-slate-800 hover:cursor-pointer">
            <h3 className="font-bold text-2xl mb-2">{task.title}</h3>
            <p>{task.description}</p>
            <p>{new Date(task.createdAt).toLocaleDateString()}</p>
          </div>
        ))}
      </div>
    </section>
  )
}