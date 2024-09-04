type FilterType = "All" | "Active" | "Completed";

interface FooterProps {
  todos: { completed: boolean }[];  // Typage des tâches, qui sont des objets avec au moins une propriété `completed`
  filter: FilterType;
  setFilter: (filter: FilterType) => void; 
}

const Footer = ({ todos, filter, setFilter }: FooterProps) => {
  return (
    <div className="mt-6 flex items-center space-x-20">
      <span className="text-lg">
        {/* Retourne le nombre de tâches restantes à accomplir */}
        Tâches restantes: {todos.filter(todo => !todo.completed).length}
      </span>
      <div className="flex space-x-10">
        <button
          className={`px-4 py-2 rounded-full text-white font-semibold transition-colors duration-300 ${
            filter === 'All'
              ? 'bg-gradient-to-r from-purple-400 to-pink-500 shadow-lg'
              : 'bg-gray-200 text-gray-600 hover:bg-gradient-to-r hover:from-purple-400 hover:to-pink-500 hover:text-white'
          }`}
          onClick={() => setFilter('All')}
        >
          Tout Voir 🎯
        </button>
        <button
          className={`px-4 py-2 rounded-full text-white font-semibold transition-colors duration-300 ${
            filter === 'Active'
              ? 'bg-gradient-to-r from-green-400 to-teal-500 shadow-lg'
              : 'bg-gray-200 text-gray-600 hover:bg-gradient-to-r hover:from-green-400 hover:to-teal-500 hover:text-white'
          }`}
          onClick={() => setFilter('Active')}
        >
          En Cours 🚀
        </button>
        <button
          className={`px-4 py-2 rounded-full text-white font-semibold transition-colors duration-300 ${
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
  );
};

export default Footer;
