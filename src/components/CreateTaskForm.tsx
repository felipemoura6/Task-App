// components/CreateTaskForm.tsx
import { ChangeEvent, FormEvent, useState } from 'react';

interface CreateTaskFormProps {
  onCreateTask: (title: string, text: string) => void;
}

export function CreateTaskForm({ onCreateTask }: CreateTaskFormProps) {
  const [newTaskTitle, setNewTaskTitle] = useState<string>('');
  const [newTaskText, setNewTaskText] = useState<string>('');

  const handleInputChange = (e: ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    if (name === 'title') setNewTaskTitle(value);
    if (name === 'text') setNewTaskText(value);
  };

  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    
    if (newTaskTitle.trim() === '' || newTaskText.trim() === '') return; // Não permite task vazia

    // Notificar o componente pai (App) que uma nova task foi criada
    onCreateTask(newTaskTitle, newTaskText);

    // Limpar os campos de entrada
    setNewTaskTitle('');
    setNewTaskText('');
  };

  return (
  <form onSubmit={handleSubmit} className="flex flex-col items-center space-y-2 w-full justify-center">
      <input
        type="text"
        name="title"
        placeholder="New task title"
        value={newTaskTitle}
        onChange={handleInputChange}
        className="border p-2 w-[480px]"
      />
      <textarea
        name="text"
        placeholder="Task description"
        value={newTaskText}
        onChange={(e: ChangeEvent<HTMLTextAreaElement>) => setNewTaskText(e.target.value)}
        className="border w-[480px] h-40 p-2 text-left"
      />


      <button type="submit" className="p-2 bg-blue-500 text-white">
        Add Task
      </button>
    </form>
  );
}
