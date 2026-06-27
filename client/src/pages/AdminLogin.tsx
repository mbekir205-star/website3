import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Card } from '@/components/ui/card';
import { useLocation } from 'wouter';
import { Lock, AlertCircle } from 'lucide-react';

export default function AdminLogin() {
  const [, setLocation] = useLocation();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    setLoading(true);

    try {
      // Hardcoded credentials for admin login
      const ADMIN_EMAIL = 'muradovbekir2@gmail.com';
      const ADMIN_PASSWORD = 'Northframe1116@';

      if (email === ADMIN_EMAIL && password === ADMIN_PASSWORD) {
        // Store admin session in localStorage
        localStorage.setItem('adminSession', JSON.stringify({
          email,
          timestamp: new Date().getTime(),
          authenticated: true,
        }));
        setLocation('/admin');
      } else {
        setError('Invalid email or password');
      }
    } catch (err) {
      setError('An error occurred during login');
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900 flex items-center justify-center p-4">
      <div className="w-full max-w-md">
        <Card className="bg-slate-800/50 border-slate-700 backdrop-blur-sm">
          <div className="p-8">
            {/* Header */}
            <div className="flex items-center justify-center mb-8">
              <div className="bg-blue-600 p-3 rounded-lg">
                <Lock className="w-6 h-6 text-white" />
              </div>
            </div>

            <h1 className="text-2xl font-bold text-white text-center mb-2">
              Admin Dashboard
            </h1>
            <p className="text-slate-400 text-center mb-8">
              Sign in to manage consultations
            </p>

            {/* Error Message */}
            {error && (
              <div className="mb-6 p-4 bg-red-900/20 border border-red-700/50 rounded-lg flex items-start gap-3">
                <AlertCircle className="w-5 h-5 text-red-500 flex-shrink-0 mt-0.5" />
                <p className="text-red-300 text-sm">{error}</p>
              </div>
            )}

            {/* Login Form */}
            <form onSubmit={handleLogin} className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-slate-300 mb-2">
                  Email Address
                </label>
                <Input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="admin@example.com"
                  className="bg-slate-700/50 border-slate-600 text-white placeholder-slate-500"
                  disabled={loading}
                  required
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-slate-300 mb-2">
                  Password
                </label>
                <Input
                  type="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="••••••••"
                  className="bg-slate-700/50 border-slate-600 text-white placeholder-slate-500"
                  disabled={loading}
                  required
                />
              </div>

              <Button
                type="submit"
                className="w-full bg-blue-600 hover:bg-blue-700 text-white font-semibold py-2"
                disabled={loading}
              >
                {loading ? 'Signing in...' : 'Sign In'}
              </Button>
            </form>

            {/* Footer */}
            <p className="text-xs text-slate-500 text-center mt-6">
              Secure admin access only
            </p>
          </div>
        </Card>
      </div>
    </div>
  );
}
