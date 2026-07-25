import { useState } from 'react';
import { Mail, KeyRound, ArrowLeft, ArrowRight } from 'lucide-react';
import { Link } from 'react-router-dom';
import { Button } from '@/components';

export function ClientResetPassword() {
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
    <div className="w-full max-w-[420px] bg-white rounded-2xl p-8 lg:p-10 border border-border relative shadow-[0_8px_30px_rgb(0,0,0,0.04)] mx-auto">
      {/* Header */}
      <div className="flex flex-col items-center mb-8 relative z-10 text-center">
        <div className="w-14 h-14 bg-primary-50 rounded-xl flex items-center justify-center mb-5 border border-primary-100">
          <KeyRound className="w-6 h-6 text-primary-600" />
        </div>
        <h2 className="text-2xl font-black text-gray-900 mb-2">Reset Password</h2>
        <p className="text-sm font-medium text-gray-500">
          {isSubmitted 
            ? "We've sent a password reset link to your email." 
            : "Enter your email address and we'll send you a link to reset your password."}
        </p>
      </div>

      {!isSubmitted ? (
        <form onSubmit={handleReset} className="space-y-4">
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

          <Button 
            type="submit" 
            className="w-full bg-brand-gradient text-white font-bold py-2.5 rounded-lg shadow-md hover:shadow-lg transition-all group"
          >
            Send Reset Link
            <ArrowRight className="w-4 h-4 ml-2 group-hover:translate-x-1 transition-transform" />
          </Button>
        </form>
      ) : (
        <Button 
          onClick={() => setIsSubmitted(false)} 
          variant="outline"
          className="w-full py-2.5 font-bold text-gray-700 bg-white"
        >
          Try another email
        </Button>
      )}

      {/* Back to Login */}
      <div className="mt-8 pt-6 border-t border-border text-center">
        <Link to="/client/auth/login" className="inline-flex items-center text-sm font-bold text-gray-500 hover:text-gray-900 transition-colors">
          <ArrowLeft className="w-4 h-4 mr-2" /> Back to Sign In
        </Link>
      </div>
    </div>
  );
}
