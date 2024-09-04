import { useEffect } from 'react';
import { Todo } from '../types'; 


export const useReminders = (todos: Todo[]) => {
  useEffect(() => {
    //console.log('Initialisation...');
    
    const checkReminders = () => {
        /** Crée un nouvel objet qui représente l'heure actuelle pour la comparaison 
       * de l'heure actuelle avec la date de rappel de chaque tâche et voir si cette date est passée.*/
      const now = new Date();
      console.log('Vérification des rappels à:', now);

        /** Parcourt chaque tâche dans la liste et vérifie si il y a une date de rappel
       * si la date de rappel est passé ou égale à l'heure actuelle
       * si elle est marquée comme complétée */
      todos.forEach(todo => {
        if (todo.reminderDate && new Date(todo.reminderDate) <= now && !todo.completed) {
          console.log('Rappel déclenché pour:', todo.title);
          showNotification('Rappel de tâche', `Il est temps de faire: ${todo.title}`);
        }
      });
    };

    const intervalId = setInterval(checkReminders, 60000); // Vérifie toutes les minutes
    console.log('Intervalle de rappel initialisé avec ID:', intervalId);

    return () => {
      clearInterval(intervalId);
      console.log('Intervalle de rappel nettoyé');
    };
  }, [todos]); // Surveille la liste des tâches, si elle change alors "useEffect" est réexécuté et réinitialise l'intervalle

  const showNotification = (title: string, body: string) => {
    console.log('Tentative d\'affichage de la notification:', title);

    if (Notification.permission === 'granted') {
      new Notification(title, { body });
      console.log('Notification affichée:', title);
    } else {
      console.log('Permission de notification non accordée');
    }
  };

  useEffect(() => {
    console.log('Demande d\'autorisation de notification...');
    
    if (Notification.permission === 'default') { // default : signifie que l'utilisateur n'a pas encore choisi ou refuse
      Notification.requestPermission().then(permission => { // demande à l'utilisateur d'accorder ou refuser puis renvoie la réponse
        console.log('Permission de notification:', permission);
      });
    }
  }, []); // Le tableau vide assure que cet effet ne s'exécute qu'une fois

};
