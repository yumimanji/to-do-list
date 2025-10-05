import React, { useState, useMemo, useEffect } from 'react';
import { useLocalStorage } from './hooks/useLocalStorage';
import { Todo, Filter, Recurrence, Priority } from './types';
import Header from './components/Header';
import TodoForm from './components/TodoForm';
import FilterButtons from './components/FilterButtons';
import TodoList from './components/TodoList';

const App: React.FC = () => {
  const [todos, setTodos] = useLocalStorage<Todo[]>('todos', []);
  const [filter, setFilter] = useState<Filter>(Filter.ALL);

  useEffect(() => {
    const today = new Date();
    today.setHours(0, 0, 0, 0);

    const updatedTodos = todos.map(todo => {
      if (
        todo.recurrence === Recurrence.DAILY &&
        todo.completed &&
        todo.completedAt &&
        new Date(todo.completedAt) < today
      ) {
        return { ...todo, completed: false, completedAt: null };
      }
      return todo;
    });

    if (JSON.stringify(updatedTodos) !== JSON.stringify(todos)) {
        setTodos(updatedTodos);
    }
  }, []); // Run only once on mount to reset daily tasks

  const addTodo = ({ text, recurrence, priority }: { text: string; recurrence: Recurrence; priority: Priority }) => {
    const newTodo: Todo = {
      id: crypto.randomUUID(),
      text,
      completed: false,
      recurrence,
      priority,
      completedAt: null,
    };
    setTodos([newTodo, ...todos]);
  };

  const toggleTodo = (id: string) => {
    setTodos(
      todos.map(todo =>
        todo.id === id ? { ...todo, completed: !todo.completed, completedAt: !todo.completed ? new Date().toISOString() : null } : todo
      )
    );
  };

  const deleteTodo = (id: string) => {
    setTodos(todos.filter(todo => todo.id !== id));
  };

  const editTodo = (id: string, updates: Partial<Omit<Todo, 'id'>>) => {
    setTodos(
      todos.map(todo =>
        todo.id === id ? { ...todo, ...updates } : todo
      )
    );
  };
  
  const clearCompleted = () => {
    setTodos(todos.filter(todo => !todo.completed));
  };

  const priorityOrder: { [key in Priority]: number } = {
    [Priority.IMPORTANT_URGENT]: 1,
    [Priority.IMPORTANT_NOT_URGENT]: 2,
    [Priority.NOT_IMPORTANT_URGENT]: 3,
    [Priority.NOT_IMPORTANT_NOT_URGENT]: 4,
  };

  const filteredTodos = useMemo(() => {
    let filtered = todos;
    switch (filter) {
      case Filter.ACTIVE:
        filtered = todos.filter(todo => !todo.completed);
        break;
      case Filter.COMPLETED:
        filtered = todos.filter(todo => todo.completed);
        break;
      default:
        filtered = todos;
        break;
    }
    return filtered.sort((a, b) => priorityOrder[a.priority] - priorityOrder[b.priority]);
  }, [todos, filter]);
  
  const activeCount = useMemo(() => todos.filter(todo => !todo.completed).length, [todos]);

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 to-slate-800 text-slate-100 font-sans p-4 flex justify-center items-start">
      <main className="w-full max-w-2xl mx-auto mt-8 md:mt-16">
        <Header />
        <TodoForm onAddTodo={addTodo} />
        
        <div className="mt-8 bg-slate-800/50 rounded-lg shadow-2xl backdrop-blur-sm">
           <div className="p-4 border-b border-slate-700">
             <FilterButtons currentFilter={filter} onFilterChange={setFilter} />
           </div>
          
          <TodoList
            todos={filteredTodos}
            onToggleTodo={toggleTodo}
            onDeleteTodo={deleteTodo}
            onEditTodo={editTodo}
          />

          {todos.length > 0 && (
             <div className="p-4 flex justify-between items-center text-sm text-slate-400">
               <span>{activeCount} {activeCount === 1 ? 'item' : 'items'} left</span>
               <button 
                 onClick={clearCompleted}
                 className="hover:text-white transition-colors duration-200"
               >
                 Clear Completed
               </button>
             </div>
           )}
        </div>
      </main>
    </div>
  );
};

export default App;