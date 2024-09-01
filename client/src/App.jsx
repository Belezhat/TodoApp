import TodoList from './components/TodoList';
import AddTodoForm from './components/AddTodoForm';
import Footer from './components/Footer';
import { useTodos } from './hooks/useTodos';
import { useFilter } from './hooks/useFilter';
import { useReminders } from './hooks/useReminders';

const App = () => {
  console.log('Rendu du composant...');

  const { todos, addTodo, removeTodo, toggleTodo, updateTodo } = useTodos();
   /** null : signifies que je ne souhaite pas filtrer ou transformer mes données
   * mais les inclure toutes telle quelles
   * 2 : indentation du Json avec deux espaces par niveau d'imbrication pour une meilleur lisibilité
   */
  console.log('Liste des tâches:', JSON.stringify(todos, null, 2));

  const { filter, setFilter, filteredTodos } = useFilter(todos);
  console.log('Tâches filtrées à rendre:', filteredTodos);

  useReminders(todos); // Gérer les rappels

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
        <Footer todos={todos} filter={filter} setFilter={setFilter} />
      </div>
    </div>
  );
};

export default App;





