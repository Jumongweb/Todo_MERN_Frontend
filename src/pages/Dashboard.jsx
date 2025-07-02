import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { getCurrentUser } from '../services/auth';
import Navbar from '../components/Navbar';
import { addTask as apiAddTask, deleteTask, updateStatus, updatePriority } from '../services/api';

export default function Dashboard({ token }) {
  const [user, setUser] = useState(null);
  const [tasks, setTasks] = useState([]);
  const [taskText, setTaskText] = useState("");
  const [filterStatus, setFilterStatus] = useState("all");
  const [filterPriority, setFilterPriority] = useState("all");
  const navigate = useNavigate();

  useEffect(() => {
    const currentUser = getCurrentUser();
    if (!currentUser) {
      navigate('/login');
    } else {
      setUser(currentUser);
      if (token) fetchTasks();
    }
  }, [navigate, token]);

  const fetchTasks = async () => {
    try {
      const response = await fetch(`${process.env.REACT_APP_API_URL}/tasks`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      const data = await response.json();
      setTasks(Array.isArray(data) ? data : data.tasks || []);
    } catch (err) {
      console.error(err);
    }
  };

  const handleAddTask = async (e) => {
    e.preventDefault();
    if (!taskText) return;

    try {
      const newTask = await apiAddTask(taskText);
      setTasks([...tasks, newTask]);
      setTaskText("");
    } catch (err) {
      console.error(err);
    }
  };

  const filterTasks = tasks.filter(
    (task) =>
      (filterStatus === "all" || task.status === filterStatus) &&
      (filterPriority === "all" || task.priority === filterPriority)
  );

  if (!user) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50">
        <div className="text-lg text-gray-600">Loading...</div>
      </div>
    );
  }

  return (
    <div className="flex flex-col h-screen bg-gradient-to-br from-gray-50 to-gray-200">
      
      {/* Navbar fixed at top */}
      <div className="flex-shrink-0">
        <Navbar />
      </div>

      {/* Main scrollable content */}
      <main className="flex-1 overflow-y-auto p-8">
        <h1 className='text-4xl font-extrabold text-center mb-8 text-indigo-700 drop-shadow'>
          MERN TO-DO APP
        </h1>

        <form onSubmit={handleAddTask} className='mb-6 flex gap-2 justify-center'>
          <input
            type="text"
            value={taskText}
            onChange={(e) => setTaskText(e.target.value)}
            className="p-3 border border-gray-300 rounded-lg w-2/3 focus:outline-none focus:ring-2 focus:ring-indigo-400"
            placeholder='Add a task'
          />
          <button type='submit' className='px-4 py-2 bg-indigo-600 hover:bg-indigo-700 text-white rounded-lg shadow'>
            Add Task
          </button>
        </form>

        <div className='mb-6 flex gap-4 justify-center'>
          <select
            onChange={(e) => setFilterStatus(e.target.value)}
            className='p-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-400'
            value={filterStatus}
          >
            <option value="all">All</option>
            <option value="pending">Pending</option>
            <option value="complete">Complete</option>
          </select>

          <select
            onChange={(e) => setFilterPriority(e.target.value)}
            className='p-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-400'
            value={filterPriority}
          >
            <option value="all">All Priorities</option>
            <option value="low">Low</option>
            <option value="medium">Medium</option>
            <option value="high">High</option>
          </select>
        </div>

        <ul className='space-y-4 max-w-3xl mx-auto'>
          {filterTasks.map((task) => (
            <li key={task._id} className='p-4 bg-white rounded-xl shadow flex flex-col md:flex-row md:items-center md:justify-between gap-4 hover:bg-indigo-50 transition duration-300'>
              <div className='flex-1'>
                <span className='text-lg text-indigo-800'>{task.text}</span>
                <span className='ml-2 text-sm text-gray-500'>({task.status}, {task.priority})</span>
              </div>
              <div className='flex gap-2 items-center'>
                <button
                  onClick={() => updateStatus(task._id, task.status)}
                  className={`px-3 py-1 rounded-full font-semibold transition-colors duration-300 ${
                    task.status === "pending"
                      ? "bg-yellow-400 text-yellow-900 hover:bg-yellow-500"
                      : "bg-green-400 text-green-900 hover:bg-green-500"
                  }`}
                >
                  {task.status === "pending" ? "Mark Complete" : "Mark Pending"}
                </button>

                <select
                  value={task.priority}
                  onChange={(e) => updatePriority(task._id, e.target.value)}
                  className='p-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-400'
                >
                  <option value="low">Low</option>
                  <option value="medium">Medium</option>
                  <option value="high">High</option>
                </select>

                <button
                  onClick={() => deleteTask(task._id)}
                  title="Delete task"
                  className='flex items-center gap-1 px-3 py-1 bg-red-500 hover:bg-red-700 text-white font-semibold rounded-full transition-colors duration-200 ml-2'
                >
                  <i className='fas fa-trash' /> Delete
                </button>
              </div>
            </li>
          ))}
        </ul>
      </main>

      {/* Footer fixed at bottom */}
      <footer className='flex-shrink-0 bg-indigo-600 text-white p-4 text-center shadow-inner'>
        © 2025 Your To-Do App
      </footer>
    </div>
  );
}
