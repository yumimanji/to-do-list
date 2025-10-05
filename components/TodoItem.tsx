import React, { useState, useRef, useEffect } from 'react';
import { Todo, Priority, Recurrence } from '../types';
import { TrashIcon, PencilIcon, CheckIcon, RepeatIcon } from './IconComponents';

interface TodoItemProps {
  todo: Todo;
  onToggle: (id: string) => void;
  onDelete: (id: string) => void;
  onEdit: (id: string, updates: Partial<Omit<Todo, 'id'>>) => void;
}

const priorityClasses: { [key in Priority]: string } = {
  [Priority.IMPORTANT_URGENT]: 'bg-red-500',
  [Priority.IMPORTANT_NOT_URGENT]: 'bg-amber-500',
  [Priority.NOT_IMPORTANT_URGENT]: 'bg-sky-500',
  [Priority.NOT_IMPORTANT_NOT_URGENT]: 'bg-slate-500',
};

const priorityOptions = [
    { value: Priority.IMPORTANT_URGENT, label: 'Important & Urgent' },
    { value: Priority.IMPORTANT_NOT_URGENT, label: 'Important, Not Urgent' },
    { value: Priority.NOT_IMPORTANT_URGENT, label: 'Not Important, Urgent' },
    { value: Priority.NOT_IMPORTANT_NOT_URGENT, label: 'Not Important, Not Urgent' },
];

const TodoItem: React.FC<TodoItemProps> = ({ todo, onToggle, onDelete, onEdit }) => {
  const [isEditing, setIsEditing] = useState(false);
  const [editText, setEditText] = useState(todo.text);
  const [editPriority, setEditPriority] = useState<Priority>(todo.priority);
  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    if (isEditing) {
      inputRef.current?.focus();
    }
  }, [isEditing]);

  const handleEdit = () => {
    if (isEditing) {
      handleSave();
    } else {
      setIsEditing(true);
    }
  };

  const handleSave = () => {
    const updates: Partial<Omit<Todo, 'id'>> = {};
    const newText = editText.trim();
    
    if (newText && newText !== todo.text) {
        updates.text = newText;
    } else if (!newText) {
        setEditText(todo.text);
    }

    if (editPriority !== todo.priority) {
        updates.priority = editPriority;
    }
    
    if (Object.keys(updates).length > 0) {
        onEdit(todo.id, updates);
    }
    
    setIsEditing(false);
  };
  
  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter') {
      handleSave();
    } else if (e.key === 'Escape') {
      setEditText(todo.text);
      setEditPriority(todo.priority);
      setIsEditing(false);
    }
  };

  return (
    <li className="flex items-center p-4 group transition-colors duration-200 hover:bg-slate-700/30">
      <div className={`flex-shrink-0 w-1.5 h-10 rounded-full mr-4 ${priorityClasses[todo.priority]}`}></div>
      <div className="flex-grow flex items-center gap-4">
        <button 
          onClick={() => onToggle(todo.id)} 
          className="relative flex-shrink-0 w-6 h-6 border-2 rounded-full transition-all duration-200"
          style={{ borderColor: todo.completed ? '#22c55e' : '#64748b' }}
          aria-label={todo.completed ? `Mark ${todo.text} as incomplete` : `Mark ${todo.text} as complete`}
        >
          {todo.completed && (
            <CheckIcon className="w-5 h-5 text-green-500 absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2" />
          )}
        </button>
        {isEditing ? (
          <div className="flex-grow flex flex-col gap-2">
            <input
              ref={inputRef}
              type="text"
              value={editText}
              onChange={(e) => setEditText(e.target.value)}
              onBlur={handleSave}
              onKeyDown={handleKeyDown}
              className="w-full bg-transparent text-slate-100 outline-none border-b-2 border-sky-500"
            />
             <select
                value={editPriority}
                onChange={(e) => setEditPriority(e.target.value as Priority)}
                className="w-full bg-slate-700 border border-slate-600 rounded-md py-1 px-2 text-slate-200 text-xs"
                aria-label="Edit task priority"
            >
                {priorityOptions.map(opt => (
                    <option key={opt.value} value={opt.value}>{opt.label}</option>
                ))}
            </select>
          </div>
        ) : (
          <div className="flex items-center gap-2 flex-wrap">
            <span
              className={`cursor-pointer transition-all duration-200 ${todo.completed ? 'text-slate-500 line-through' : 'text-slate-200'}`}
              onDoubleClick={() => setIsEditing(true)}
            >
              {todo.text}
            </span>
            {todo.recurrence === Recurrence.DAILY && (
              <RepeatIcon className="w-4 h-4 text-sky-400 flex-shrink-0" title="Daily recurring task"/>
            )}
          </div>
        )}
      </div>
      <div className="flex-shrink-0 flex items-center gap-2 ml-4 opacity-0 group-hover:opacity-100 transition-opacity duration-200">
        <button onClick={handleEdit} className="text-slate-400 hover:text-sky-400 p-1" aria-label={isEditing ? 'Save changes' : 'Edit task'}>
          {isEditing ? <CheckIcon className="w-5 h-5" /> : <PencilIcon className="w-5 h-5" />}
        </button>
        <button onClick={() => onDelete(todo.id)} className="text-slate-400 hover:text-red-500 p-1" aria-label="Delete task">
          <TrashIcon className="w-5 h-5" />
        </button>
      </div>
    </li>
  );
};

export default TodoItem;