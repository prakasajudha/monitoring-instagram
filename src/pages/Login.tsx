import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Checkbox } from '@/components/ui/checkbox';
import { useToast } from '@/hooks/use-toast';

export function Login() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [rememberMe, setRememberMe] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [step, setStep] = useState<'email' | 'password'>('email');
  const { login } = useAuth();
  const navigate = useNavigate();
  const { toast } = useToast();

  const handleEmailSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (email) {
      setStep('password');
    }
  };

  const handlePasswordSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);

    try {
      // Mock authentication - using email as username
      const username = email.split('@')[0];
      await login(username, password);
      toast({
        title: 'Login successful',
        description: 'Welcome back!',
      });
      navigate('/overview');
    } catch (error) {
      toast({
        title: 'Login failed',
        description: 'Invalid email or password',
        variant: 'destructive',
      });
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center p-4" style={{ background: 'linear-gradient(135deg, #E8EAF6 0%, #C5CAE9 100%)' }}>
      <div className="w-full max-w-6xl">
        <div className="bg-white rounded-2xl shadow-2xl overflow-hidden">
          <div className="grid grid-cols-1 lg:grid-cols-2">
            {/* Left Side - Login Form */}
            <div className="p-8 md:p-12">
              <div className="mb-8">
                <img 
                  src="https://c.animaapp.com/mjxnk1q0BwGZL7/img/image.png" 
                  alt="Pertamina Logo" 
                  className="h-12 w-auto object-contain mb-6"
                />
                <h2 className="text-2xl font-bold text-foreground mb-2">Welcome to IdAMan - Portal</h2>
                <p className="text-muted-foreground">Please login to your account</p>
              </div>

              {step === 'email' ? (
                <form onSubmit={handleEmailSubmit} className="space-y-6">
                  <div className="space-y-2">
                    <Label htmlFor="email" className="text-foreground font-medium">Email</Label>
                    <Input
                      id="email"
                      type="email"
                      placeholder="you@example.com"
                      value={email}
                      onChange={(e: React.ChangeEvent<HTMLInputElement>) => setEmail(e.target.value)}
                      className="bg-background text-foreground border-border h-12"
                      required
                    />
                  </div>

                  <div className="flex items-center space-x-2">
                    <Checkbox
                      id="remember"
                      checked={rememberMe}
                      onCheckedChange={(checked: boolean | "indeterminate") => setRememberMe(checked === true)}
                    />
                    <label
                      htmlFor="remember"
                      className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70 text-foreground"
                    >
                      Remember Me
                    </label>
                  </div>

                  <Button
                    type="submit"
                    className="w-full bg-primary text-primary-foreground hover:bg-primary/90 font-medium h-12 text-base"
                  >
                    Next
                  </Button>


                </form>
              ) : (
                <form onSubmit={handlePasswordSubmit} className="space-y-6">
                  <div className="space-y-2">
                    <Label htmlFor="password" className="text-foreground font-medium">Password</Label>
                    <Input
                      id="password"
                      type="password"
                      placeholder="Enter your password"
                      value={password}
                      onChange={(e: React.ChangeEvent<HTMLInputElement>) => setPassword(e.target.value)}
                      className="bg-background text-foreground border-border h-12"
                      required
                    />
                  </div>

                  <div className="flex items-center justify-between">
                    <button
                      type="button"
                      onClick={() => setStep('email')}
                      className="text-sm text-primary hover:underline font-medium"
                    >
                      ← Back
                    </button>
                    <button
                      type="button"
                      className="text-sm text-primary hover:underline font-medium"
                    >
                      Forgot password?
                    </button>
                  </div>

                  <Button
                    type="submit"
                    className="w-full bg-primary text-primary-foreground hover:bg-primary/90 font-medium h-12 text-base"
                    disabled={isLoading}
                  >
                    {isLoading ? 'Signing in...' : 'Sign In'}
                  </Button>
                </form>
              )}

              <div className="mt-8 pt-6 border-t border-border">
                <div className="space-y-2 text-sm">
                  <div className="p-3 rounded-lg bg-accent/50">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div>
                        <p className="font-medium text-foreground mb-1">Admin:</p>
                        <p className="text-muted-foreground">Email: <span className="font-mono">admin@pertamina.com</span></p>
                        <p className="text-muted-foreground">Password: <span className="font-mono">admin123</span></p>
                      </div>
                      <div>
                        <p className="font-medium text-foreground mb-1">Users:</p>
                        <p className="text-muted-foreground">Email: <span className="font-mono">john_doe@pertamina.com</span></p>
                        <p className="text-muted-foreground">Password: <span className="font-mono">user123</span></p>
                      </div>
                    </div>
                  </div>
                </div>


              </div>
            </div>

                      {/* Right Side - Illustration */}
            <div className="hidden lg:flex items-center justify-center p-12 relative overflow-hidden" style={{ background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)' }}>
              <img 
                src="/uploaded_image_1768785394520.png" 
                alt="Login Illustration" 
                className="w-full h-auto max-w-md object-contain"
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
