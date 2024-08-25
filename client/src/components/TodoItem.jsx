import { useState } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTrash, faCheck, faSave } from '@fortawesome/free-solid-svg-icons';
import PropTypes from 'prop-types';

const TodoItem = ({ todo, onDelete, onToggle, onUpdate }) => {
 // console.log('TodoItem rendu', todo);

  const [isEditing, setIsEditing] = useState(false);
  const [updatedTitle, setUpdatedTitle] = useState(todo.title);
  const [updatedDescription, setUpdatedDescription] = useState(todo.description);

  const handleSave = () => {
    console.log('En train de sauvegarder la tâche:', updatedTitle, updatedDescription);
    if (updatedTitle.trim() && updatedDescription.trim()) {
      onUpdate(todo._id, { title: updatedTitle, description: updatedDescription });
    }
    setIsEditing(false);
  };

  return (
    <div
      className={`flex items-center justify-between p-4 bg-white shadow-md rounded-lg transition duration-300 ease-in-out transform hover:scale-105 hover:shadow-lg ${todo.completed ? 'line-through bg-gradient-to-r from-green-200 to-green-400' : 'bg-gradient-to-r from-gray-100 to-gray-200'}`}
    >
      <div>
        {isEditing ? (
          <div>
            <input
              type="text"
              value={updatedTitle}
              onChange={(e) => setUpdatedTitle(e.target.value)}
              className="border p-1 rounded w-full"
            />
            <textarea
              value={updatedDescription}
              onChange={(e) => setUpdatedDescription(e.target.value)}
              className="border p-1 rounded w-full mt-2"
            />
          </div>
        ) : (
          <div>
            <h3 className="text-lg font-bold text-gray-800">{todo.title}</h3>
            <p className="text-gray-600">{todo.description}</p>
          </div>
        )}
      </div>
      <div className="flex items-center space-x-4">
        {isEditing ? (
          <button
            className="text-blue-500 hover:text-blue-600 transition duration-300 ease-in-out"
            onClick={handleSave}
          >
            <FontAwesomeIcon icon={faSave} className="h-6 w-6" />
          </button>
        ) : (
          <>
            <button
              className="text-green-500 hover:text-green-600 transition duration-300 ease-in-out"
              onClick={() => onToggle(todo._id)}
            >
              <FontAwesomeIcon icon={faCheck} className="h-6 w-6" />
            </button>
            <button
              className="text-red-500 hover:text-red-600 transition duration-300 ease-in-out"
              onClick={() => onDelete(todo._id)}
            >
              <FontAwesomeIcon icon={faTrash} className="h-6 w-6" />
            </button>
          </>
        )}
        {!isEditing && (
          <button
            className="text-yellow-500 hover:text-yellow-600 transition duration-300 ease-in-out"
            onClick={() => setIsEditing(true)}
          >
            ✏️
          </button>
        )}
      </div>
    </div>
  );
};

TodoItem.propTypes = {
  todo: PropTypes.object.isRequired,
  onDelete: PropTypes.func.isRequired,
  onToggle: PropTypes.func.isRequired,
  onUpdate: PropTypes.func.isRequired,
};

export default TodoItem;


