import TodoItem from './TodoItem';
import PropTypes from 'prop-types';

const TodoList = ({ todos, onDelete, onToggle, onUpdate }) => {
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

TodoList.propTypes = {
  todos: PropTypes.array.isRequired, // précise que c'est est tableau
  onDelete: PropTypes.func.isRequired, // précise que c'est une fonction
  onToggle: PropTypes.func.isRequired,
  onUpdate: PropTypes.func.isRequired,
};

export default TodoList;

