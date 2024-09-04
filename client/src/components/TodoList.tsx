import TodoItem from './TodoItem';
import { Todo } from '../types'; 

interface TodoListProps {
  todos: Todo[];
  onDelete: (id: string) => void;
  onToggle: (id: string) => void;
  onUpdate: (id: string, updatedTodo: Partial<Todo>) => void;
}

const TodoList = ({ todos, onDelete, onToggle, onUpdate }: TodoListProps) => {
  return (
    <div className="space-y-2">
    {todos.map(todo => (
      <TodoItem 
        key={todo._id} 
        todo={todo} 
        onDelete={onDelete} 
        onToggle={onToggle} 
        onUpdate={onUpdate} 
      />
    ))}
  </div>
);
};

export default TodoList;

