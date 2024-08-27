import { useState, useEffect } from 'react';
import TodoList from './components/TodoList';
import AddTodoForm from './components/AddTodoForm';
import { useTodos } from './hooks/useTodos';

const App = () => {
  //console.log('Charge correctement'); 

  // j'appelle "useTodos" pour accéder à la liste des tâche et les fonctions qui permettent de les manipuler
  const { todos, addTodo, removeTodo, toggleTodo, updateTodo } = useTodos();

  /** null : signifies que je ne souhaite pas filtrer ou transformer mes données
   * mais les inclure toutes telle quelles
   * 2 : indentation du Json avec deux espaces par niveau d'imbrication pour une meilleur lisibilité
   */
  console.log('Liste des tâches:', JSON.stringify(todos, null, 2)); 

  const [filter, setFilter] = useState('All');

  console.log('Filtre actuel:', filter); 

  const filteredTodos = todos.filter(todo => {
    if (filter === 'Active') return !todo.completed;
    if (filter === 'Completed') return todo.completed;
    return true; // Si le filtre est 'All', toutes les tâches sans modification
  });

  // Vérification des rappels de tâches
  useEffect(() => {
    //console.log('Déclenchebien la vérification des rappels...');  

    const checkReminders = () => {
      /** Crée un nouvel objet qui représente l'heure actuelle pour la comparaison 
       * de l'heure actuelle avec la date de rappel de chaque tâche et voir si cette date est passée. 
      */
      const now = new Date(); 
      /** Parcourt chaque tâche dans la liste et vérifie si il y a une date de rappel
       * si la date de rappel est passé ou égale à l'heure actuelle
       * si elle est marquée comme complétée
       */
      todos.forEach(todo => {
        if (todo.reminderDate && new Date(todo.reminderDate) <= now && !todo.completed) {
          //console.log('Rappel déclenché pour:', todo.title);  
          // Si toutes les conditions sont remplies, cela la signifie qu'il est temps de faire un rappel
          showNotification('Rappel de tâche', `Il est temps de faire: ${todo.title}`);
        }
      });
    };

    const intervalId = setInterval(checkReminders, 60000); // 60000 millisecondes = 1 minute vérifie toutes les minutes
    return () => clearInterval(intervalId); // Annulation de l'interval
  }, [todos]); // Surveille la liste des tâches, si elle change alors "useEffect" est réexécuté et réinitialise l'intervalle

  // Fonction pour afficher les notifications
  const showNotification = (title, body) => {
   //console.log('Tentative d\'affichage de la notification:', title);  // Log pour vérifier que la fonction de notification est appelée
    if (Notification.permission === 'granted') { // granted : signifie que l'utilisateur permet l'affichage des notifications
      new Notification(title, { body }); // Si accordée, crée et affiche une nouvelle notification
    }
  };

  // Demande la permission de notification lors du chargement de l'application
  useEffect(() => {
    //console.log('Demande d\'autorisation de notification...'); 
    if (Notification.permission === 'default') { // default : signifie que l'utilisateur n'a pas encore choisi ou refuse
      Notification.requestPermission().then(permission => { // demande à l'utilisateur d'accoder ou refuser puis renvoie la réponse
        console.log('Permission de notification:', permission);
      });
    }
  }, []);  // Le tableau vide [] assure que cet effet ne s'exécute qu'une fois

  return (
    <div
      className="min-h-screen flex items-center justify-center"
      style={{ background: 'linear-gradient(135deg, #89f7fe 0%, #66a6ff 100%)' }}
    >
      <div className="max-w-3xl w-full mx-auto p-8 bg-blue-50 rounded-lg shadow-xl hover:shadow-2xl transition-shadow durée-300">
        <h1 className="text-3xl font-bold text-center mb-6 text-gray-800">
          Planifie, Écrase, Répète !
        </h1>
        <AddTodoForm onAdd={addTodo} />
        <TodoList
          todos={filteredTodos}
          onDelete={removeTodo}
          onToggle={toggleTodo}
          onUpdate={updateTodo}
        />
        <div className="mt-6 flex items-center space-x-20">
          <span className="text-lg">
          {/* Retourne le nombre de tâches restantes à accomplir */}
            Tâches restantes: {todos.filter(todo => !todo.completed).length}
          </span>
          <div className="flex space-x-10">
            <button
              className={`px-4 py-2 rounded-full text-white font-semibold transition-colors durée-300 ${
                filter === 'All'
                  ? 'bg-gradient-to-r from-purple-400 to-pink-500 shadow-lg'
                  : 'bg-gray-200 text-gray-600 hover:bg-gradient-to-r hover:from-purple-400 hover:to-pink-500 hover:text-white'
              }`}
              onClick={() => setFilter('All')}
            >
              Tout Voir 🎯
            </button>
            <button
              className={`px-4 py-2 rounded-full text-white font-semibold transition-colors durée-300 ${
                filter === 'Active'
                  ? 'bg-gradient-to-r from-green-400 to-teal-500 shadow-lg'
                  : 'bg-gray-200 text-gray-600 hover:bg-gradient-to-r hover:from-green-400 hover:to-teal-500 hover:text-white'
              }`}
              onClick={() => setFilter('Active')}
            >
              En Cours 🚀
            </button>
            <button
              className={`px-4 py-2 rounded-full text-white font-semibold transition-colors durée-300 ${
                filter === 'Completed'
                  ? 'bg-gradient-to-r from-blue-400 to-indigo-500 shadow-lg'
                  : 'bg-gray-200 text-gray-600 hover:bg-gradient-to-r hover:from-blue-400 hover:to-indigo-500 hover:text-white'
              }`}
              onClick={() => setFilter('Completed')}
            >
              Terminé 🎉
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default App;




