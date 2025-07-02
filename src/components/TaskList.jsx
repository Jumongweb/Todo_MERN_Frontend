import { useEffect, useState } from 'react';
import api from '../services/api';

export default function TaskList() {
  const [tasks, setTasks] = useState([]);

  useEffect(() => {
    const fetchTasks = async () => {
      try {
        const response = await api.get('/tasks');
        setTasks(response.data);
      } catch (error) {
        console.error('Error fetching tasks:', error);
      }
    };
    fetchTasks();
  }, []);

  return (
    <div>
      <h3>Your Tasks</h3>
      <ul>
        {tasks.map(task => (
          <li key={task._id}>
            {task.text} - {task.status}
          </li>
        ))}
      </ul>
    </div>
  );
}