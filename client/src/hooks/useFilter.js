import { useState } from 'react';

export const useFilter = (todos) => {
  console.log('Initialisation du hook useFilter avec les tâches:', todos);
  
  const [filter, setFilter] = useState('All');
  console.log('Filtre actuel:', filter);

  const filteredTodos = todos.filter(todo => {
    console.log('Filtrage des tâches selon le filtre:', filter);
    
    if (filter === 'Active') {
      const activeTodos = !todo.completed;
      console.log('Tâches actives:', activeTodos);
      return activeTodos;
    }

    if (filter === 'Completed') {
      const completedTodos = todo.completed;
      console.log('Tâches complétées:', completedTodos);
      return completedTodos;
    }

    return true; // Si le filtre est 'All', toutes les tâches sont retournées sans modification
  });

  console.log('Tâches filtrées:', filteredTodos);

  return { filter, setFilter, filteredTodos };
};

