import React from 'react';
import { Todo } from '../types';
import TodoItem from './TodoItem';

interface TodoListProps {
  todos: Todo[];
  onToggleTodo: (id: string) => void;
  onDeleteTodo: (id: string) => void;
  onEditTodo: (id: string, updates: Partial<Omit<Todo, 'id'>>) => void;
}

const TodoList: React.FC<TodoListProps> = ({ todos, onToggleTodo, onDeleteTodo, onEditTodo }) => {
  if (todos.length === 0) {
    return (
      <div className="text-center py-16 px-4">
        <p className="text-slate-400">No tasks here. Add one above to get started!</p>
      </div>
    );
  }

  return (
    <ul className="divide-y divide-slate-700">
      {todos.map((todo) => (
        <TodoItem
          key={todo.id}
          todo={todo}
          onToggle={onToggleTodo}
          onDelete={onDeleteTodo}
          onEdit={onEditTodo}
        />
      ))}
    </ul>
  );
};

export default TodoList;