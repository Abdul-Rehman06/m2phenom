import { useState } from 'react';
import { User, Lock, Eye, EyeOff, Mail, ArrowRight, UserPlus } from 'lucide-react';
import { useNavigate, Link } from 'react-router-dom';
import { useAuth } from '@/contexts';
import { Button } from '@/components';

export function ClientRegister() {
  const navigate = useNavigate();
  const { login } = useAuth();
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');

  const handleRegister = (e: React.FormEvent) => {
    e.preventDefault();
    if (password !== confirmPassword) {
      alert("Passwords don't match");
      return;
    }
    // Mock user registration
    login('mock-jwt-token-register', {
      id: '3',
      email,
      firstName: name.split(' ')[0] || 'New',
      lastName: name.split(' ')[1] || 'User',
      role: 'CLIENT',
      createdAt: new Date().toISOString(),
    });
    navigate('/client/dashboard');
  };

  return (
    <div className="w-full max-w-[420px] bg-white rounded-2xl p-8 lg:p-10 border border-border relative shadow-[0_8px_30px_rgb(0,0,0,0.04)] mx-auto">
      {/* Header */}
      <div className="flex flex-col items-center mb-8 relative z-10 text-center">
        <div className="w-14 h-14 bg-primary-50 rounded-xl flex items-center justify-center mb-5 border border-primary-100">
          <UserPlus className="w-6 h-6 text-primary-600" />
        </div>
        <h2 className="text-2xl font-black text-gray-900 mb-2">Create Account</h2>
        <p className="text-sm font-medium text-gray-500">Sign up for your M2 Phenom account</p>
      </div>

      {/* Form */}
      <form onSubmit={handleRegister} className="space-y-4">
        <div className="space-y-1.5">
          <label className="text-xs font-bold text-gray-700">Full Name</label>
          <div className="relative">
            <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none">
              <User className="h-4 w-4 text-gray-400" />
            </div>
            <input 
              type="text" 
              value={name}
              onChange={(e) => setName(e.target.value)}
              className="w-full pl-10 pr-4 py-2.5 bg-white border border-border rounded-lg text-gray-900 text-sm placeholder:text-gray-400 focus:outline-none focus:ring-2 focus:ring-primary-500/20 focus:border-primary-500 transition-all shadow-sm" 
              placeholder="John Doe"
              required
            />
          </div>
        </div>

        <div className="space-y-1.5">
          <label className="text-xs font-bold text-gray-700">Email Address</label>
          <div className="relative">
            <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none">
              <Mail className="h-4 w-4 text-gray-400" />
            </div>
            <input 
              type="email" 
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full pl-10 pr-4 py-2.5 bg-white border border-border rounded-lg text-gray-900 text-sm placeholder:text-gray-400 focus:outline-none focus:ring-2 focus:ring-primary-500/20 focus:border-primary-500 transition-all shadow-sm" 
              placeholder="you@example.com"
              required
            />
          </div>
        </div>

        <div className="space-y-1.5">
          <label className="text-xs font-bold text-gray-700">Password</label>
          <div className="relative">
            <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none">
              <Lock className="h-4 w-4 text-gray-400" />
            </div>
            <input 
              type={showPassword ? 'text' : 'password'} 
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full pl-10 pr-11 py-2.5 bg-white border border-border rounded-lg text-gray-900 text-sm placeholder:text-gray-400 focus:outline-none focus:ring-2 focus:ring-primary-500/20 focus:border-primary-500 transition-all shadow-sm" 
              placeholder="••••••••"
              required
            />
            <button 
              type="button" 
              onClick={() => setShowPassword(!showPassword)}
              className="absolute inset-y-0 right-0 pr-3.5 flex items-center text-gray-400 hover:text-gray-600 transition-colors"
            >
              {showPassword ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
            </button>
          </div>
        </div>

        <div className="space-y-1.5 pb-2">
          <label className="text-xs font-bold text-gray-700">Confirm Password</label>
          <div className="relative">
            <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none">
              <Lock className="h-4 w-4 text-gray-400" />
            </div>
            <input 
              type={showConfirmPassword ? 'text' : 'password'} 
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
              className="w-full pl-10 pr-11 py-2.5 bg-white border border-border rounded-lg text-gray-900 text-sm placeholder:text-gray-400 focus:outline-none focus:ring-2 focus:ring-primary-500/20 focus:border-primary-500 transition-all shadow-sm" 
              placeholder="••••••••"
              required
            />
            <button 
              type="button" 
              onClick={() => setShowConfirmPassword(!showConfirmPassword)}
              className="absolute inset-y-0 right-0 pr-3.5 flex items-center text-gray-400 hover:text-gray-600 transition-colors"
            >
              {showConfirmPassword ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
            </button>
          </div>
        </div>

        <Button 
          type="submit" 
          className="w-full bg-brand-gradient text-white font-bold py-2.5 rounded-lg shadow-md hover:shadow-lg transition-all group"
        >
          Create Account
          <ArrowRight className="w-4 h-4 ml-2 group-hover:translate-x-1 transition-transform" />
        </Button>
      </form>

      {/* Login Divider */}
      <div className="mt-8 pt-6 border-t border-border text-center">
        <p className="text-sm font-medium text-gray-600">
          Already have an account?{' '}
          <Link to="/client/auth/login" className="font-bold text-primary-600 hover:text-primary-700 transition-colors">
            Sign In Here
          </Link>
        </p>
      </div>
    </div>
  );
}
