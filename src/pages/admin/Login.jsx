import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Eye, EyeOff, LogIn } from 'lucide-react';

export default function AdminLogin() {
  const [password, setPassword] = useState('');
  const [show, setShow] = useState(false);
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    if (localStorage.getItem('admin_session') === 'authenticated') {
      navigate('/admin/dashboard/about', { replace: true });
    }
  }, [navigate]);

  function handleSubmit(e) {
    e.preventDefault();
    setError('');
    setLoading(true);

    setTimeout(() => {
      const correct = import.meta.env.VITE_ADMIN_PASSWORD;
      if (!correct) {
        setError('VITE_ADMIN_PASSWORD is not set in your .env file.');
        setLoading(false);
        return;
      }
      if (password === correct) {
        localStorage.setItem('admin_session', 'authenticated');
        navigate('/admin/dashboard/about', { replace: true });
      } else {
        setError('Incorrect password. Please try again.');
        setLoading(false);
      }
    }, 600);
  }

  return (
    <div className="min-h-screen flex items-center justify-center px-6">
      <motion.div
        initial={{ opacity: 0, y: 24 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="w-full max-w-md"
      >
        <div className="text-center mb-10">
          <div className="flex justify-center mb-5">
            <svg width="48" height="48" viewBox="0 0 48 48" fill="none">
              <polygon points="24,4 44,42 4,42" fill="#7c3aed" />
              <polygon points="24,12 36,38 12,38" fill="#0a0a1a" opacity="0.7" />
            </svg>
          </div>
          <h1 className="font-heading font-black text-2xl text-white mb-1">Admin Panel</h1>
          <p className="text-violet-400 text-sm">Modesty Designs & Prints</p>
        </div>

        <div className="card p-8">
          <form onSubmit={handleSubmit} className="space-y-5">
            <div>
              <label className="block font-heading text-xs uppercase tracking-wider text-violet-300 mb-2">
                Password
              </label>
              <div className="relative">
                <input
                  type={show ? 'text' : 'password'}
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="Enter admin password"
                  className="field-input pr-12"
                  autoFocus
                  required
                />
                <button
                  type="button"
                  onClick={() => setShow((s) => !s)}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-violet-400 hover:text-violet-200 transition-colors"
                >
                  {show ? <EyeOff size={16} /> : <Eye size={16} />}
                </button>
              </div>
            </div>

            {error && (
              <motion.p
                initial={{ opacity: 0, y: -8 }}
                animate={{ opacity: 1, y: 0 }}
                className="text-red-400 text-xs font-medium"
              >
                {error}
              </motion.p>
            )}

            <button
              type="submit"
              disabled={loading || !password}
              className="btn-primary w-full justify-center"
            >
              {loading ? (
                <span className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" />
              ) : (
                <LogIn size={15} />
              )}
              {loading ? 'Verifying...' : 'Enter Dashboard'}
            </button>
          </form>
        </div>

        <p className="text-center text-violet-400/40 text-xs mt-6 font-heading">
          &larr; <a href="/" className="hover:text-violet-300 transition-colors">Back to portfolio</a>
        </p>
      </motion.div>
    </div>
  );
}
