import React, { useState } from 'react';
import { User, Mail, Lock, Eye, EyeOff, ArrowLeft, Sparkles, Check } from 'lucide-react';

export default function SignUpPage({ onNavigate, onSignUp, theme }) {
  const [formData, setFormData] = useState({
    fullName: '',
    email: '',
    password: '',
    confirmPassword: ''
  });
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState(false);

  const getThemeColors = () => {
    switch(theme) {
      case 'red': return { primary: '#dc2626', primaryDark: '#b91c1c', glow: 'rgba(220, 38, 38, 0.3)' };
      case 'blue': return { primary: '#2563eb', primaryDark: '#1d4ed8', glow: 'rgba(37, 99, 235, 0.3)' };
      case 'green': return { primary: '#16a34a', primaryDark: '#15803d', glow: 'rgba(22, 163, 74, 0.3)' };
      case 'pink': return { primary: '#db2777', primaryDark: '#be185d', glow: 'rgba(219, 39, 119, 0.3)' };
      default: return { primary: '#dc2626', primaryDark: '#b91c1c', glow: 'rgba(220, 38, 38, 0.3)' };
    }
  };

  const colors = getThemeColors();

  const checkEmailExists = (email) => {
    // Check if email already exists in localStorage
    const existingUsers = JSON.parse(localStorage.getItem('videosum_users') || '[]');
    return existingUsers.some(user => user.email.toLowerCase() === email.toLowerCase());
  };

  const saveUser = (userData) => {
    // Save user to localStorage users list
    const existingUsers = JSON.parse(localStorage.getItem('videosum_users') || '[]');
    existingUsers.push(userData);
    localStorage.setItem('videosum_users', JSON.stringify(existingUsers));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setError('');
    setSuccess(false);

    if (!formData.fullName.trim()) {
      setError('Please enter your full name');
      return;
    }

    if (!formData.email.includes('@')) {
      setError('Please enter a valid email');
      return;
    }

    // Check if email already exists
    if (checkEmailExists(formData.email)) {
      setError('This email is already registered. Please use another email or login.');
      return;
    }

    if (formData.password.length < 6) {
      setError('Password must be at least 6 characters');
      return;
    }

    if (formData.password !== formData.confirmPassword) {
      setError('Passwords do not match');
      return;
    }

    // Save user to users list
    const userData = { 
      name: formData.fullName, 
      email: formData.email,
      password: formData.password // In real app, this should be hashed!
    };
    saveUser(userData);

    // Success!
    setSuccess(true);
    onSignUp({ 
      name: formData.fullName, 
      email: formData.email 
    });

    // Redirect to chat after 1.5 seconds
    setTimeout(() => {
      onNavigate('chat');
    }, 1500);
  };

  return (
    <div style={{ 
      height: '100vh',
      width: '100vw',
      maxWidth: '100%',
      background: 'linear-gradient(135deg, #000 0%, #1a1a1a 100%)', 
      display: 'flex', 
      alignItems: 'center', 
      justifyContent: 'center',
      padding: '20px',
      position: 'relative',
      overflow: 'hidden'
    }}>
      {/* Background Effects */}
      <div style={{ position: 'absolute', inset: 0, overflow: 'hidden', pointerEvents: 'none' }}>
        <div style={{ position: 'absolute', top: '10%', left: '10%', width: '300px', height: '300px', background: colors.glow, borderRadius: '50%', filter: 'blur(100px)', opacity: 0.3 }} />
        <div style={{ position: 'absolute', bottom: '10%', right: '10%', width: '400px', height: '400px', background: colors.glow, borderRadius: '50%', filter: 'blur(120px)', opacity: 0.2 }} />
      </div>

      {/* Main Container - Scrollable */}
      <div style={{ 
        width: '100%', 
        maxWidth: '480px',
        maxHeight: '95vh',
        overflowY: 'auto',
        overflowX: 'hidden',
        position: 'relative',
        padding: '10px'
      }}>
        {/* Back Button */}
        <button
          onClick={() => onNavigate('home')}
          style={{ 
            display: 'flex', 
            alignItems: 'center', 
            gap: '8px', 
            background: 'transparent', 
            border: 'none', 
            color: '#9ca3af', 
            fontSize: '15px', 
            fontWeight: '600', 
            cursor: 'pointer', 
            marginBottom: '24px',
            transition: 'all 0.3s ease',
            padding: '8px 0'
          }}
          onMouseEnter={(e) => { e.target.style.color = colors.primary; }}
          onMouseLeave={(e) => { e.target.style.color = '#9ca3af'; }}
        >
          <ArrowLeft size={20} />
          Back to Home
        </button>

        {/* Card */}
        <div style={{ 
          background: 'rgba(0, 0, 0, 0.6)', 
          backdropFilter: 'blur(20px)', 
          borderRadius: '24px', 
          padding: '32px', 
          border: '1px solid rgba(255, 255, 255, 0.1)',
          boxShadow: '0 20px 60px rgba(0, 0, 0, 0.5)'
        }}>
          {/* Header */}
          <div style={{ textAlign: 'center', marginBottom: '32px' }}>
            <div style={{ display: 'inline-flex', alignItems: 'center', gap: '12px', background: colors.primary, padding: '10px 20px', borderRadius: '50px', marginBottom: '20px' }}>
              <Sparkles size={18} />
              <span style={{ fontSize: '14px', fontWeight: '700' }}>Create Account</span>
            </div>
            <h1 style={{ fontSize: '28px', fontWeight: '900', marginBottom: '10px', color: 'white' }}>
              Join <span style={{ color: colors.primary }}>SparkClip</span>
            </h1>
            <p style={{ fontSize: '14px', color: '#9ca3af' }}>
              Start summarizing videos with AI
            </p>
          </div>

          {/* Success Message */}
          {success && (
            <div style={{ 
              background: 'rgba(34, 197, 94, 0.1)', 
              border: '1px solid rgba(34, 197, 94, 0.3)', 
              borderRadius: '12px', 
              padding: '14px', 
              marginBottom: '20px',
              display: 'flex',
              alignItems: 'center',
              gap: '12px',
              animation: 'slideIn 0.3s ease-out'
            }}>
              <div style={{ 
                width: '36px', 
                height: '36px', 
                borderRadius: '50%', 
                background: 'rgba(34, 197, 94, 0.2)', 
                display: 'flex', 
                alignItems: 'center', 
                justifyContent: 'center',
                flexShrink: 0
              }}>
                <Check size={20} color="#22c55e" />
              </div>
              <div>
                <div style={{ color: '#22c55e', fontSize: '15px', fontWeight: '700', marginBottom: '2px' }}>
                  Account Created!
                </div>
                <div style={{ color: '#86efac', fontSize: '13px' }}>
                  Redirecting to chat...
                </div>
              </div>
            </div>
          )}

          {/* Error Message */}
          {error && !success && (
            <div style={{ 
              background: 'rgba(220, 38, 38, 0.1)', 
              border: '1px solid rgba(220, 38, 38, 0.3)', 
              borderRadius: '12px', 
              padding: '12px 14px', 
              marginBottom: '20px',
              color: '#fca5a5',
              fontSize: '13px',
              fontWeight: '500',
              lineHeight: '1.5'
            }}>
              {error}
            </div>
          )}

          {/* Form */}
          <form onSubmit={handleSubmit}>
            {/* Full Name */}
            <div style={{ marginBottom: '16px' }}>
              <label style={{ display: 'block', fontSize: '13px', fontWeight: '600', color: '#d1d5db', marginBottom: '6px' }}>
                Full Name
              </label>
              <div style={{ position: 'relative' }}>
                <User size={18} style={{ position: 'absolute', left: '14px', top: '50%', transform: 'translateY(-50%)', color: '#6b7280' }} />
                <input
                  type="text"
                  value={formData.fullName}
                  onChange={(e) => setFormData({ ...formData, fullName: e.target.value })}
                  placeholder="John Doe"
                  disabled={success}
                  style={{ 
                    width: '100%', 
                    padding: '12px 14px 12px 44px', 
                    background: 'rgba(255, 255, 255, 0.05)', 
                    border: '1px solid rgba(255, 255, 255, 0.1)', 
                    borderRadius: '10px', 
                    color: 'white', 
                    fontSize: '14px',
                    outline: 'none',
                    transition: 'all 0.3s ease',
                    boxSizing: 'border-box',
                    opacity: success ? 0.5 : 1
                  }}
                  onFocus={(e) => { if (!success) { e.target.style.borderColor = colors.primary; e.target.style.background = 'rgba(255, 255, 255, 0.08)'; } }}
                  onBlur={(e) => { e.target.style.borderColor = 'rgba(255, 255, 255, 0.1)'; e.target.style.background = 'rgba(255, 255, 255, 0.05)'; }}
                />
              </div>
            </div>

            {/* Email */}
            <div style={{ marginBottom: '16px' }}>
              <label style={{ display: 'block', fontSize: '13px', fontWeight: '600', color: '#d1d5db', marginBottom: '6px' }}>
                Email Address
              </label>
              <div style={{ position: 'relative' }}>
                <Mail size={18} style={{ position: 'absolute', left: '14px', top: '50%', transform: 'translateY(-50%)', color: '#6b7280' }} />
                <input
                  type="email"
                  value={formData.email}
                  onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                  placeholder="john@example.com"
                  disabled={success}
                  style={{ 
                    width: '100%', 
                    padding: '12px 14px 12px 44px', 
                    background: 'rgba(255, 255, 255, 0.05)', 
                    border: '1px solid rgba(255, 255, 255, 0.1)', 
                    borderRadius: '10px', 
                    color: 'white', 
                    fontSize: '14px',
                    outline: 'none',
                    transition: 'all 0.3s ease',
                    boxSizing: 'border-box',
                    opacity: success ? 0.5 : 1
                  }}
                  onFocus={(e) => { if (!success) { e.target.style.borderColor = colors.primary; e.target.style.background = 'rgba(255, 255, 255, 0.08)'; } }}
                  onBlur={(e) => { e.target.style.borderColor = 'rgba(255, 255, 255, 0.1)'; e.target.style.background = 'rgba(255, 255, 255, 0.05)'; }}
                />
              </div>
            </div>

            {/* Password */}
            <div style={{ marginBottom: '16px' }}>
              <label style={{ display: 'block', fontSize: '13px', fontWeight: '600', color: '#d1d5db', marginBottom: '6px' }}>
                Password
              </label>
              <div style={{ position: 'relative' }}>
                <Lock size={18} style={{ position: 'absolute', left: '14px', top: '50%', transform: 'translateY(-50%)', color: '#6b7280' }} />
                <input
                  type={showPassword ? 'text' : 'password'}
                  value={formData.password}
                  onChange={(e) => setFormData({ ...formData, password: e.target.value })}
                  placeholder="At least 6 characters"
                  disabled={success}
                  style={{ 
                    width: '100%', 
                    padding: '12px 44px 12px 44px', 
                    background: 'rgba(255, 255, 255, 0.05)', 
                    border: '1px solid rgba(255, 255, 255, 0.1)', 
                    borderRadius: '10px', 
                    color: 'white', 
                    fontSize: '14px',
                    outline: 'none',
                    transition: 'all 0.3s ease',
                    boxSizing: 'border-box',
                    opacity: success ? 0.5 : 1
                  }}
                  onFocus={(e) => { if (!success) { e.target.style.borderColor = colors.primary; e.target.style.background = 'rgba(255, 255, 255, 0.08)'; } }}
                  onBlur={(e) => { e.target.style.borderColor = 'rgba(255, 255, 255, 0.1)'; e.target.style.background = 'rgba(255, 255, 255, 0.05)'; }}
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  disabled={success}
                  style={{ position: 'absolute', right: '14px', top: '50%', transform: 'translateY(-50%)', background: 'none', border: 'none', color: '#6b7280', cursor: success ? 'default' : 'pointer', padding: '4px', display: 'flex', alignItems: 'center', opacity: success ? 0.5 : 1 }}
                >
                  {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
                </button>
              </div>
            </div>

            {/* Confirm Password */}
            <div style={{ marginBottom: '24px' }}>
              <label style={{ display: 'block', fontSize: '13px', fontWeight: '600', color: '#d1d5db', marginBottom: '6px' }}>
                Confirm Password
              </label>
              <div style={{ position: 'relative' }}>
                <Lock size={18} style={{ position: 'absolute', left: '14px', top: '50%', transform: 'translateY(-50%)', color: '#6b7280' }} />
                <input
                  type={showConfirmPassword ? 'text' : 'password'}
                  value={formData.confirmPassword}
                  onChange={(e) => setFormData({ ...formData, confirmPassword: e.target.value })}
                  placeholder="Re-enter your password"
                  disabled={success}
                  style={{ 
                    width: '100%', 
                    padding: '12px 44px 12px 44px', 
                    background: 'rgba(255, 255, 255, 0.05)', 
                    border: '1px solid rgba(255, 255, 255, 0.1)', 
                    borderRadius: '10px', 
                    color: 'white', 
                    fontSize: '14px',
                    outline: 'none',
                    transition: 'all 0.3s ease',
                    boxSizing: 'border-box',
                    opacity: success ? 0.5 : 1
                  }}
                  onFocus={(e) => { if (!success) { e.target.style.borderColor = colors.primary; e.target.style.background = 'rgba(255, 255, 255, 0.08)'; } }}
                  onBlur={(e) => { e.target.style.borderColor = 'rgba(255, 255, 255, 0.1)'; e.target.style.background = 'rgba(255, 255, 255, 0.05)'; }}
                />
                <button
                  type="button"
                  onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                  disabled={success}
                  style={{ position: 'absolute', right: '14px', top: '50%', transform: 'translateY(-50%)', background: 'none', border: 'none', color: '#6b7280', cursor: success ? 'default' : 'pointer', padding: '4px', display: 'flex', alignItems: 'center', opacity: success ? 0.5 : 1 }}
                >
                  {showConfirmPassword ? <EyeOff size={18} /> : <Eye size={18} />}
                </button>
              </div>
            </div>

            {/* Submit Button */}
            <button
              type="submit"
              disabled={success}
              style={{ 
                width: '100%', 
                padding: '14px', 
                background: success ? '#22c55e' : colors.primary, 
                color: 'white', 
                border: 'none', 
                borderRadius: '10px', 
                fontSize: '15px', 
                fontWeight: '700', 
                cursor: success ? 'default' : 'pointer',
                transition: 'all 0.3s ease',
                boxShadow: success ? '0 4px 20px rgba(34, 197, 94, 0.3)' : '0 4px 20px ' + colors.glow,
                marginBottom: '16px',
                opacity: success ? 0.8 : 1
              }}
              onMouseEnter={(e) => { if (!success) { e.target.style.transform = 'translateY(-2px)'; e.target.style.boxShadow = '0 6px 28px ' + colors.glow; } }}
              onMouseLeave={(e) => { if (!success) { e.target.style.transform = 'translateY(0)'; e.target.style.boxShadow = '0 4px 20px ' + colors.glow; } }}
            >
              {success ? '✓ Account Created!' : 'Create Account'}
            </button>
          </form>

          {/* Footer */}
          {!success && (
            <div style={{ textAlign: 'center', marginTop: '20px', paddingTop: '20px', borderTop: '1px solid rgba(255, 255, 255, 0.1)' }}>
              <p style={{ fontSize: '13px', color: '#9ca3af' }}>
                Already have an account?{' '}
                <button
                  onClick={() => onNavigate('login')}
                  style={{ background: 'none', border: 'none', color: colors.primary, fontWeight: '700', cursor: 'pointer', fontSize: '13px', padding: 0 }}
                  onMouseEnter={(e) => e.target.style.textDecoration = 'underline'}
                  onMouseLeave={(e) => e.target.style.textDecoration = 'none'}
                >
                  Sign In
                </button>
              </p>
            </div>
          )}
        </div>
      </div>

      <style>{`
        @keyframes slideIn {
          from {
            opacity: 0;
            transform: translateY(-20px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }
        
        /* Custom scrollbar */
        div::-webkit-scrollbar {
          width: 6px;
        }
        
        div::-webkit-scrollbar-track {
          background: rgba(255, 255, 255, 0.05);
          border-radius: 10px;
        }
        
        div::-webkit-scrollbar-thumb {
          background: ${colors.primary};
          border-radius: 10px;
        }
        
        div::-webkit-scrollbar-thumb:hover {
          background: ${colors.primaryDark};
        }
      `}</style>
    </div>
  );
}