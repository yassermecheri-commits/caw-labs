import React, { useState } from 'react';
import { Trash2, Plus } from 'lucide-react';

// TaskForm Component
function TaskForm({ onAddTask }) {
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');

  const handleSubmit = () => {
    if (title.trim()) {
      onAddTask({ title, description });
      setTitle('');
      setDescription('');
    }
  };

  return (
    <div className="mb-6 p-4 bg-blue-50 rounded-lg">
      <h2 className="text-lg font-bold mb-3 text-gray-800">Ajouter une tâche</h2>
      <input
        type="text"
        placeholder="Titre de la tâche"
        value={title}
        onChange={(e) => setTitle(e.target.value)}
        className="w-full p-2 mb-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
        onKeyPress={(e) => e.key === 'Enter' && handleSubmit()}
      />
      <textarea
        placeholder="Description (optionnel)"
        value={description}
        onChange={(e) => setDescription(e.target.value)}
        className="w-full p-2 mb-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 resize-none"
        rows="3"
      />
      <button
        onClick={handleSubmit}
        className="w-full bg-blue-600 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded-md transition flex items-center justify-center gap-2"
      >
        <Plus size={18} /> Ajouter une tâche
      </button>
    </div>
  );
}

// TaskCard Component
function TaskCard({ task, onDelete, onMove, currentStatus }) {
  const statuses = ['To Do', 'In Progress', 'Done'];
  const nextStatus = statuses[(statuses.indexOf(currentStatus) + 1) % statuses.length];

  return (
    <div className="bg-white p-4 rounded-lg shadow-md hover:shadow-lg transition mb-3 border-l-4 border-blue-500">
      <h3 className="font-bold text-gray-800 mb-2">{task.title}</h3>
      {task.description && (
        <p className="text-gray-600 text-sm mb-3">{task.description}</p>
      )}
      <div className="flex gap-2">
        <button
          onClick={() => onMove(task.id, nextStatus)}
          className="flex-1 text-xs bg-green-500 hover:bg-green-600 text-white py-1 px-2 rounded transition"
        >
          → {nextStatus}
        </button>
        <button
          onClick={() => onDelete(task.id)}
          className="bg-red-500 hover:bg-red-600 text-white py-1 px-2 rounded transition"
          title="Supprimer"
        >
          <Trash2 size={16} />
        </button>
      </div>
    </div>
  );
}

// Column Component
function Column({ title, tasks, onDeleteTask, onMoveTask }) {
  const colors = {
    'To Do': 'bg-red-100',
    'In Progress': 'bg-yellow-100',
    'Done': 'bg-green-100',
  };

  return (
    <div className={`${colors[title]} rounded-lg p-4 min-h-96 flex-1`}>
      <div className="flex items-center justify-between mb-4">
        <h2 className="text-xl font-bold text-gray-800">{title}</h2>
        <span className="bg-gray-600 text-white rounded-full px-3 py-1 text-sm font-bold">
          {tasks.length}
        </span>
      </div>
      <div className="space-y-2">
        {tasks.map((task) => (
          <TaskCard
            key={task.id}
            task={task}
            onDelete={onDeleteTask}
            onMove={onMoveTask}
            currentStatus={title}
          />
        ))}
      </div>
    </div>
  );
}

// App Component
export default function App() {
  const [tasks, setTasks] = useState([
    { id: 1, title: 'Configurer Vite', description: 'Initialiser le projet', status: 'Done' },
    { id: 2, title: 'Créer les composants', description: 'Column, TaskCard, TaskForm', status: 'In Progress' },
    { id: 3, title: 'Ajouter les styles', description: 'Utiliser Tailwind CSS', status: 'To Do' },
  ]);

  const addTask = ({ title, description }) => {
    const newTask = {
      id: Date.now(),
      title,
      description,
      status: 'To Do',
    };
    setTasks([...tasks, newTask]);
  };

  const deleteTask = (id) => {
    setTasks(tasks.filter((task) => task.id !== id));
  };

  const moveTask = (id, newStatus) => {
    setTasks(
      tasks.map((task) =>
        task.id === id ? { ...task, status: newStatus } : task
      )
    );
  };

  const getTasksByStatus = (status) => tasks.filter((task) => task.status === status);

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-900 via-purple-900 to-gray-900 p-8">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-8">
          <h1 className="text-4xl font-bold text-white mb-2">Kanban Board</h1>
          <p className="text-gray-300">Organisez vos tâches facilement</p>
        </div>

        <TaskForm onAddTask={addTask} />

        <div className="flex gap-6">
          <Column
            title="To Do"
            tasks={getTasksByStatus('To Do')}
            onDeleteTask={deleteTask}
            onMoveTask={moveTask}
          />
          <Column
            title="In Progress"
            tasks={getTasksByStatus('In Progress')}
            onDeleteTask={deleteTask}
            onMoveTask={moveTask}
          />
          <Column
            title="Done"
            tasks={getTasksByStatus('Done')}
            onDeleteTask={deleteTask}
            onMoveTask={moveTask}
          />
        </div>
      </div>
    </div>
  );
}