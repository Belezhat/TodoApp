const API_URL = 'http://localhost:5001/api/todos';

export const fetchTodos = async () => {
  const response = await fetch(API_URL);
  const data = await response.json();
  return data;
};

export const createTodo = async (todo) => {
  const response = await fetch(API_URL, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(todo),
  });
  const data = await response.json();
  return data;
};

export const deleteTodo = async (id) => {
  await fetch(`${API_URL}/${id}`, {
    method: 'DELETE',
  });
};

export const updateTodo = async (id, updatedTodo) => {
  const response = await fetch(`${API_URL}/${id}`, {
    method: 'PUT',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(updatedTodo),
  });
  const data = await response.json();
  return data;
};