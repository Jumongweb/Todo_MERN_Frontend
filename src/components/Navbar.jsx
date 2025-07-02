import { Link } from 'react-router-dom';
import { logout } from '../services/auth';

export default function Navbar() {
  const handleLogout = () => {
    logout();
    window.location = '/login';
  };

  return (
    <div className="flex flex-col">
      <nav className='bg-indigo-600 text-white px-6 py-4 flex justify-between items-center shadow-md'>
        
        <ul className='flex space-x-4'>
          <li>
            <Link 
              to="/" 
              className="px-4 py-2 rounded-full font-semibold transition-colors duration-200 hover:bg-indigo-700 hover:text-white focus:bg-indigo-700 focus:outline-none shadow-sm"
            >
              Home
            </Link>
          </li>
        </ul>

        <button 
          onClick={handleLogout} 
          className="px-4 py-2 rounded-full font-semibold transition-colors duration-200 hover:bg-indigo-700 hover:text-white focus:bg-indigo-700 focus:outline-none shadow-sm"
        >
          Logout
        </button>
      </nav>
    </div>
  );
}
