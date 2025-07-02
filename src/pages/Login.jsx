import { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { login } from '../services/auth';
import { Eye, EyeOff } from 'lucide-react';
import ForgotPasswordModal from '../components/ForgetPasswordModal';

export default function Login({ setToken }) {
  const [authError, setAuthError] = useState("");
  const [authLoading, setAuthLoading] = useState(false);
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [showForgotPassword, setShowForgotPassword] = useState(false);
  const navigate = useNavigate();

  const handleLogin = async (username, password) => {
    setAuthLoading(true);
    setAuthError("");

    try {
      const response = await login({ username, password });
      setToken(response.data.token);
      navigate("/");
    } catch (error) {
      setAuthError(error.response?.data?.message || "Login failed");
    } finally {
      setAuthLoading(false);
    }
  };

  return (
    <>
      <div className='min-h-screen flex items-center justify-center bg-gradient-to-br from-gray-50 to-gray-200 p-4'>
        <div className='w-full max-w-md bg-white shadow-xl rounded-2xl p-8 border border-gray-100'>
          <h2 className='text-3xl font-bold mb-6 text-center text-indigo-600'>
            Welcome Back
          </h2>
          {authError && (
            <div className='mb-4 text-center text-red-600 font-medium'>
              {authError}
            </div>
          )}
          <form
            onSubmit={(e) => {
              e.preventDefault();
              handleLogin(username, password);
            }}
          >
            <input
              type='text'
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              className='p-3 border border-gray-300 rounded w-full mb-4 focus:outline-none focus:ring-2 focus:ring-indigo-400'
              placeholder='Username'
            />

            <div className="relative mb-4">
              <input
                type={showPassword ? 'text' : 'password'}
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className='p-3 border border-gray-300 rounded w-full focus:outline-none focus:ring-2 focus:ring-indigo-400 pr-10'
                placeholder='Password'
              />
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="absolute top-1/2 right-3 transform -translate-y-1/2 text-gray-500"
                tabIndex={-1}
              >
                {showPassword ? <EyeOff size={20} /> : <Eye size={20} />}
              </button>
            </div>

            <div className="text-right mb-4">
              <button
                onClick={() => setShowForgotPassword(true)}
                className="text-indigo-500 hover:underline text-sm"
                type="button"
              >
                Forgot Password?
              </button>
            </div>

            <button
              type="submit"
              className='px-4 py-2 bg-indigo-500 hover:bg-indigo-600 text-white rounded w-full transition-colors shadow'
              disabled={authLoading}
            >
              {authLoading ? "Logging in..." : "Login"}
            </button>
          </form>

          <div className='mt-6 text-center text-gray-600'>
            Don't have an account?{" "}
            <Link to="/register">
              <span className='text-indigo-500 hover:underline font-medium'>Sign Up</span>
            </Link>
          </div>
        </div>
      </div>

      <ForgotPasswordModal
        isOpen={showForgotPassword}
        onClose={() => setShowForgotPassword(false)}
      />
    </>
  );
}
