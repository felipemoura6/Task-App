// App.tsx
import { useState } from 'react';
import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom';
import { CreateTaskForm } from './components/CreateTaskForm';
import { ToDoItem } from './components/toDoItem';
import { TrashIcon, PlusCircledIcon } from '@radix-ui/react-icons';
import * as Dialog from '@radix-ui/react-dialog'
import { X } from 'lucide-react'

  


interface Task {
  id: number;
  title: string;
  text: string;
  checkbox: boolean;
}

export function App() {
  const [tasks, setTasks] = useState<Task[]>([
    { id: 1, title: 'Task 1', text: 'This task should be solved...', checkbox: false }
  ]);

  const handleCheckboxChange = (id: number) => {
    setTasks((prevTasks) =>
      prevTasks.map((task) =>
        task.id === id ? { ...task, checkbox: !task.checkbox } : task
      )
    );
  };

  const createTask = (title: string, text: string) => {
    const newTask: Task = {
      id: tasks.length + 1, // Gerando ID único
      title: title,
      text: text,
      checkbox: false,
    };

    setTasks((prevTasks) => [...prevTasks, newTask]);
  };

  const handleDeleteTask = (id: number) => {
    setTasks((prevTask)=>prevTask.filter(tasks=>tasks.id!=id))
  }


  // const handleAddDialog(){
    
  // }

  return (
    <Router>
      <header className='w-full h-full px-1 py-2 flex items-center justify-center bg-green-900 border border-yellow-500 rounded-lg'>
        <h1 className='text-lg font-bold text-yellow-500'>
          <Link to="/">Check Task - App to organize</Link>
        </h1>
      </header>

      <nav className='flex items-center justify-center bg-green-900'>
        <div className='bg-green-950 py-2 px-4 w-[720px]'>
          <ul className='text-yellow-400 flex justify-between'>
            <li className='hover:text-yellow-300'><Link to="/create-task">Create Task</Link></li>
            <li className='hover:text-yellow-300'><Link to="/update-task">Update Task</Link></li>
            <li className='hover:text-yellow-300'><Link to="/delete-task">Delete Task</Link></li>
            <li className='hover:text-yellow-300'><Link to="/details-task">Details</Link></li>
          </ul>
        </div>
      </nav>

      <main className='w-screen h-screen bg-green-100'>
        <div className='p-4 text-green-950'>
          <h1 className='flex justify-center text-green-950 font-semibold text-2xl'>Task List</h1>

          {/* Renderizando a lista de tasks */}
          <ul className='text-lg mr-10'>
            {tasks.map((task) => (
              <li className='flex items-center justify-between' key={task.id}>
                <div className='flex items-center'>
                  <input
                    type='checkbox'
                    checked={task.checkbox}
                    onChange={() => handleCheckboxChange(task.id)}
                  />
                  <div className={`mx-2 ${task.checkbox ? 'line-through text-gray-400' : 'text-green-950'}`}>
                    <span className='font-semibold'>{task.title}: </span>
                    <span>{task.text}</span>
                  </div>
                </div>

                <TrashIcon onClick={()=>{handleDeleteTask(task.id)}} className='w-4 h-4 hover:w-5 hover:h-5 text-gray-700 hover:cursor-pointer hover:bg-red-500 transition-all duration-200 rounded-2xl' />
              </li>
            ))}
          </ul>

          <div>
            

            <Dialog.Root>
              <Dialog.Trigger asChild>
                <PlusCircledIcon className='my-2 size-4 hover:text-green-500 hover:cursor-pointer'/>
              </Dialog.Trigger>
              <Dialog.Overlay className="inset-0 fixed bg-black/50" />
              <Dialog.Portal>
                <Dialog.Content className="flex flex-col space-y-2 items-center justify-items-start overflow-hidden fixed inset-0 md:inset-auto md:left-1/2 md:top-1/2 md:-translate-x-1/2 md:-translate-y-1/2 md:max-w-[640px] w-full md:h-[40vh] bg-[#16351fef] md:rounded-lg outline-none overflow-y-auto">
                  <Dialog.Title className='p-2 text-lg text-green-300'>New Task</Dialog.Title>
                  <Dialog.Description className='text-green-700'>
                    Add new task.
                  </Dialog.Description>
                  <CreateTaskForm onCreateTask={createTask} />
                  <Dialog.Close className="absolute top-0 right-0 bg-green-800 hover:bg-red-900 p-1.5  text-slate-400 hover:text-slate-100 ">
                    <X className="size-5" />
                  </Dialog.Close>
                </Dialog.Content>
              </Dialog.Portal>
            </Dialog.Root>
          </div>

        </div>
      </main>

      <Routes>
        <Route path="/create-task" element={<CreateTaskForm onCreateTask={createTask} />} />
        <Route path="/update-task" element={<CreateTaskForm onCreateTask={createTask} />} />
        <Route path="/delete-task" element={<CreateTaskForm onCreateTask={createTask} />} />
        <Route path="/details-task" element={<CreateTaskForm onCreateTask={createTask} />} />
        <Route path="/" element={<ToDoItem/>} />
      </Routes>
    </Router>
  );
}
