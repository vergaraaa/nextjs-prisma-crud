import TaskCard from "@/components/TaskCard";

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
          <TaskCard key={task.id} task={task} />
        ))}
      </div>
    </section>
  )
}