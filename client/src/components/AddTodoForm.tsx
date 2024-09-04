import { useState } from 'react';


interface AddTodoFormProps {
  onAdd: (todo: { title: string; description: string; reminderDate: string }) => void; // void : indique que la fonction ne retourne rien
}

const AddTodoForm = ({ onAdd } : AddTodoFormProps) => {
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [reminderDate, setReminderDate] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // console.log('soumission du formulaire', { title, description }); 
    onAdd({ title, description, reminderDate });
    setTitle('');
    setDescription('');
    setReminderDate('');
  };

  return (
    <form 
      onSubmit={handleSubmit} 
      className="mb-8 p-8 bg-white rounded-lg shadow-lg hover:shadow-xl transition-shadow duration-300 ease-in-out max-w-3xl mx-auto"
    >
      <div className="mb-6">
        <label className="block mb-2 text-lg font-semibold text-gray-700">Titre</label>
        <input
          type="text"
          className="w-full px-4 py-3 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition duration-300 ease-in-out"
          placeholder="Titre de la tâche"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          required
        />
      </div>
      <div className="mb-6">
        <label className="block mb-2 text-lg font-semibold text-gray-700">Description</label>
        <textarea
          className="w-full px-4 py-3 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition duration-300 ease-in-out"
          placeholder="Description de la tâche"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          rows={4}
        />
      </div>
      <div className="mb-6">
        <label className="block mb-2 text-lg font-semibold text-gray-700">N&apos;oubliez pas !</label>
        <input
          type="datetime-local"
          value={reminderDate}
          onChange={(e) => setReminderDate(e.target.value)}
          className="w-full p-3 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent bg-white transition duration-300 ease-in-out transform hover:scale-105"
        />
      </div>
      <div className="flex justify-center">
        <button 
          type="submit"
          className="py-3 px-8 bg-gradient-to-r from-blue-500 to-purple-600 text-white font-semibold text-lg rounded-full hover:from-blue-600 hover:to-purple-700 transition duration-300 ease-in-out transform hover:scale-105 shadow-md hover:shadow-lg"
        >
          Hop, C&apos;est fait !
        </button>
      </div>
    </form>
  );
};

export default AddTodoForm;






