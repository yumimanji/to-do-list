import React, { useState } from 'react';
import { PlusIcon, RepeatIcon } from './IconComponents';
import { Recurrence, Priority } from '../types';

interface TodoFormProps {
  onAddTodo: (data: { text: string; recurrence: Recurrence; priority: Priority }) => void;
}

const priorityOptions = [
    { value: Priority.IMPORTANT_URGENT, label: 'Important & Urgent' },
    { value: Priority.IMPORTANT_NOT_URGENT, label: 'Important, Not Urgent' },
    { value: Priority.NOT_IMPORTANT_URGENT, label: 'Not Important, Urgent' },
    { value: Priority.NOT_IMPORTANT_NOT_URGENT, label: 'Not Important, Not Urgent' },
];

const TodoForm: React.FC<TodoFormProps> = ({ onAddTodo }) => {
  const [text, setText] = useState('');
  const [recurrence, setRecurrence] = useState<Recurrence>(Recurrence.NONE);
  const [priority, setPriority] = useState<Priority>(Priority.IMPORTANT_NOT_URGENT);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (text.trim()) {
      onAddTodo({ text: text.trim(), recurrence, priority });
      setText('');
      setRecurrence(Recurrence.NONE);
      setPriority(Priority.IMPORTANT_NOT_URGENT);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="flex flex-col gap-4">
      <div className="flex gap-2 items-center">
        <input
          type="text"
          value={text}
          onChange={(e) => setText(e.target.value)}
          placeholder="What needs to be done?"
          className="flex-grow bg-slate-800/80 border-2 border-slate-700 rounded-lg py-3 px-4 text-slate-100 placeholder-slate-500 focus:outline-none focus:ring-2 focus:ring-sky-500 focus:border-sky-500 transition-all duration-200"
        />
        <button
          type="submit"
          className="bg-sky-600 hover:bg-sky-500 text-white font-bold py-3 px-5 rounded-lg transition-all duration-200 flex items-center gap-2 disabled:bg-slate-600 disabled:cursor-not-allowed"
          disabled={!text.trim()}
        >
          <PlusIcon className="w-5 h-5" />
          <span className="hidden md:inline">Add Task</span>
        </button>
      </div>

      <div className="flex items-center gap-4">
        <select
          value={priority}
          onChange={(e) => setPriority(e.target.value as Priority)}
          className="flex-grow bg-slate-800/80 border-2 border-slate-700 rounded-lg py-2 px-3 text-slate-100 focus:outline-none focus:ring-2 focus:ring-sky-500 focus:border-sky-500 transition-all duration-200"
          aria-label="Task priority"
        >
          {priorityOptions.map(opt => (
              <option key={opt.value} value={opt.value}>{opt.label}</option>
          ))}
        </select>

        <button
          type="button"
          onClick={() => setRecurrence(r => r === Recurrence.DAILY ? Recurrence.NONE : Recurrence.DAILY)}
          className={`p-2 rounded-lg border-2 transition-colors duration-200 ${recurrence === Recurrence.DAILY ? 'bg-sky-600 border-sky-500 text-white' : 'bg-slate-800/80 border-slate-700 text-slate-400 hover:border-sky-500 hover:text-white'}`}
          title={recurrence === Recurrence.DAILY ? 'Set as one-time task' : 'Set as daily task'}
          aria-pressed={recurrence === Recurrence.DAILY}
        >
          <RepeatIcon className="w-5 h-5" />
        </button>
      </div>
    </form>
  );
};

export default TodoForm;