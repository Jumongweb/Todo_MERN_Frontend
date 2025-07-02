import { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { register } from '../services/auth';
import { Eye, EyeOff } from 'lucide-react';

export default function Register() {
    const [authError, setAuthError] = useState("");
    const [authLoading, setAuthLoading] = useState(false);
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const [confirmPassword, setConfirmPassword] = useState("");
    const [showPassword, setShowPassword] = useState(false);
    const [showConfirmPassword, setShowConfirmPassword] = useState(false);
    const navigate = useNavigate();

    const handleRegister = async (e) => {
        e.preventDefault();
        setAuthLoading(true);
        setAuthError("");

        if (password !== confirmPassword) {
            setAuthError("Passwords do not match");
            setAuthLoading(false);
            return;
        }

        try {
            await register({ username, password });
            navigate("/login");
        } catch (error) {
            setAuthError(error.response?.data?.message || "Registration failed");
        } finally {
            setAuthLoading(false);
        }
    };

    return (
        <div className='min-h-screen flex items-center justify-center bg-gradient-to-br from-gray-50 to-gray-200 p-4'>
            <div className='w-full max-w-md bg-white shadow-xl rounded-2xl p-8 border border-gray-100'>
                <h2 className='text-3xl font-bold mb-6 text-center text-indigo-600'>
                    Create an Account
                </h2>
                {authError && (
                    <div className='mb-4 text-center text-red-600 font-medium'>
                        {authError}
                    </div>
                )}
                <form onSubmit={handleRegister}>
                    <input
                        type='text'
                        value={username}
                        onChange={(e) => setUsername(e.target.value)}
                        className='p-3 border border-gray-300 rounded w-full mb-4 focus:outline-none focus:ring-2 focus:ring-indigo-400'
                        placeholder='Username'
                        required
                    />

                    <div className="relative mb-4">
                        <input
                            type={showPassword ? 'text' : 'password'}
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            className='p-3 border border-gray-300 rounded w-full focus:outline-none focus:ring-2 focus:ring-indigo-400 pr-10'
                            placeholder='Password'
                            required
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

                    <div className="relative mb-4">
                        <input
                            type={showConfirmPassword ? 'text' : 'password'}
                            value={confirmPassword}
                            onChange={(e) => setConfirmPassword(e.target.value)}
                            className='p-3 border border-gray-300 rounded w-full focus:outline-none focus:ring-2 focus:ring-indigo-400 pr-10'
                            placeholder='Confirm Password'
                            required
                        />
                        <button
                            type="button"
                            onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                            className="absolute top-1/2 right-3 transform -translate-y-1/2 text-gray-500"
                            tabIndex={-1}
                        >
                            {showConfirmPassword ? <EyeOff size={20} /> : <Eye size={20} />}
                        </button>
                    </div>

                    <button
                        type="submit"
                        className='px-4 py-2 bg-indigo-500 hover:bg-indigo-600 text-white rounded w-full transition-colors shadow'
                        disabled={authLoading}
                    >
                        {authLoading ? "Registering..." : "Register"}
                    </button>
                </form>

                <div className='mt-6 text-center text-gray-600'>
                    Already have an account?{" "}
                    <Link to="/login">
                        <span className='text-indigo-500 hover:underline font-medium'>Login</span>
                    </Link>
                </div>
            </div>
        </div>
    );
}
