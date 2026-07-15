import { useState } from 'react';
import { Mail, KeyRound, ArrowLeft } from 'lucide-react';
import { Link } from 'react-router-dom';
import { Button } from '@/components';

export function ResetPassword() {
  const [email, setEmail] = useState('');
  const [isSubmitted, setIsSubmitted] = useState(false);

  const handleReset = (e: React.FormEvent) => {
    e.preventDefault();
    // Mock API call to send reset email
    setTimeout(() => {
      setIsSubmitted(true);
    }, 1000);
  };

  return (
    <div className="w-full max-w-[460px] bg-[#1A1A1F] rounded-2xl p-8 lg:p-10 border border-white/5 relative shadow-2xl">
      {/* Top subtle glow */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-3/4 h-px bg-gradient-to-r from-transparent via-primary-500 to-transparent opacity-50" />
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-1/2 h-4 bg-primary-500/20 blur-2xl rounded-full pointer-events-none" />

      {/* Header */}
      <div className="flex flex-col items-center mb-8 relative z-10">
        <div className="w-14 h-14 bg-brand-gradient rounded-full flex items-center justify-center mb-4 shadow-lg shadow-primary-500/20">
          <KeyRound className="w-6 h-6 text-white" />
        </div>
        <h2 className="text-2xl font-bold text-white mb-2">Reset Password</h2>
        <p className="text-sm text-gray-400 text-center">
          {isSubmitted 
            ? "We've sent a password reset link to your email." 
            : "Enter your email address and we'll send you a link to reset your password."}
        </p>
      </div>

      {!isSubmitted ? (
        <form onSubmit={handleReset} className="space-y-5">
          <div className="relative">
            <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
              <Mail className="h-4 w-4 text-gray-500" />
            </div>
            <input 
              type="email" 
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full pl-11 pr-4 py-3 bg-[#111114] border border-white/10 rounded-lg text-white text-sm placeholder:text-gray-600 focus:outline-none focus:border-primary-500 transition-colors" 
              placeholder="Email Address"
              required
            />
          </div>

          <Button type="submit" className="w-full h-12 bg-brand-gradient text-white font-bold tracking-wide border-0 shadow-lg shadow-primary-500/20 hover:shadow-primary-500/40 rounded-lg">
            SEND RESET LINK
          </Button>
        </form>
      ) : (
        <Button 
          onClick={() => setIsSubmitted(false)} 
          className="w-full h-12 bg-[#111114] text-white border border-white/10 hover:bg-white/5 rounded-lg"
        >
          Try another email
        </Button>
      )}

      {/* Back to Login */}
      <div className="mt-8 flex items-center justify-center">
        <Link to="/auth/login" className="flex items-center text-sm text-gray-400 hover:text-white transition-colors">
          <ArrowLeft className="w-4 h-4 mr-2" /> Back to Login
        </Link>
      </div>
    </div>
  );
}
