import React, { useState } from 'react';
import { Mail, Lock, Eye, EyeOff, ArrowLeft, Sparkles } from 'lucide-react';

export default function LoginPage({ onNavigate, onLogin, theme }) {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState('');

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

  const handleSubmit = (e) => {
    e.preventDefault();
    setError('');

    if (!email.includes('@')) {
      setError('Please enter a valid email');
      return;
    }

    if (password.length < 6) {
      setError('Password must be at least 6 characters');
      return;
    }

    onLogin({ email, name: email.split('@')[0] });
    onNavigate('chat');
  };

  return (
    <div style={{ 
      minHeight: '100vh', 
      background: 'linear-gradient(135deg, #000 0%, #1a1a1a 100%)', 
      display: 'flex', 
      alignItems: 'center', 
      justifyContent: 'center',
      padding: '20px',
      position: 'relative',
      overflow: 'auto'
    }}>
      {/* Background Effects */}
      <div style={{ position: 'absolute', inset: 0, overflow: 'hidden', pointerEvents: 'none' }}>
        <div style={{ position: 'absolute', top: '10%', left: '10%', width: '300px', height: '300px', background: colors.glow, borderRadius: '50%', filter: 'blur(100px)', opacity: 0.3 }} />
        <div style={{ position: 'absolute', bottom: '10%', right: '10%', width: '400px', height: '400px', background: colors.glow, borderRadius: '50%', filter: 'blur(120px)', opacity: 0.2 }} />
      </div>

      {/* Main Container */}
      <div style={{ 
        width: '100%', 
        maxWidth: '480px', 
        position: 'relative',
        margin: '40px auto'
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
            marginBottom: '32px',
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
          padding: '40px', 
          border: '1px solid rgba(255, 255, 255, 0.1)',
          boxShadow: '0 20px 60px rgba(0, 0, 0, 0.5)'
        }}>
          {/* Header */}
          <div style={{ textAlign: 'center', marginBottom: '40px' }}>
            <div style={{ display: 'inline-flex', alignItems: 'center', gap: '12px', background: colors.primary, padding: '12px 24px', borderRadius: '50px', marginBottom: '24px' }}>
              <Sparkles size={20} />
              <span style={{ fontSize: '15px', fontWeight: '700' }}>Welcome Back</span>
            </div>
            <h1 style={{ fontSize: '32px', fontWeight: '900', marginBottom: '12px', color: 'white' }}>
              Sign In to <span style={{ color: colors.primary }}>SparkClip</span>
            </h1>
            <p style={{ fontSize: '16px', color: '#9ca3af' }}>
              Continue your AI-powered journey
            </p>
          </div>

          {/* Error Message */}
          {error && (
            <div style={{ 
              background: 'rgba(220, 38, 38, 0.1)', 
              border: '1px solid rgba(220, 38, 38, 0.3)', 
              borderRadius: '12px', 
              padding: '12px 16px', 
              marginBottom: '24px',
              color: '#fca5a5',
              fontSize: '14px',
              fontWeight: '500'
            }}>
              {error}
            </div>
          )}

          {/* Form */}
          <form onSubmit={handleSubmit}>
            {/* Email */}
            <div style={{ marginBottom: '20px' }}>
              <label style={{ display: 'block', fontSize: '14px', fontWeight: '600', color: '#d1d5db', marginBottom: '8px' }}>
                Email Address
              </label>
              <div style={{ position: 'relative' }}>
                <Mail size={20} style={{ position: 'absolute', left: '16px', top: '50%', transform: 'translateY(-50%)', color: '#6b7280' }} />
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="john@example.com"
                  style={{ 
                    width: '100%', 
                    padding: '14px 16px 14px 48px', 
                    background: 'rgba(255, 255, 255, 0.05)', 
                    border: '1px solid rgba(255, 255, 255, 0.1)', 
                    borderRadius: '12px', 
                    color: 'white', 
                    fontSize: '15px',
                    outline: 'none',
                    transition: 'all 0.3s ease',
                    boxSizing: 'border-box'
                  }}
                  onFocus={(e) => { e.target.style.borderColor = colors.primary; e.target.style.background = 'rgba(255, 255, 255, 0.08)'; }}
                  onBlur={(e) => { e.target.style.borderColor = 'rgba(255, 255, 255, 0.1)'; e.target.style.background = 'rgba(255, 255, 255, 0.05)'; }}
                />
              </div>
            </div>

            {/* Password */}
            <div style={{ marginBottom: '28px' }}>
              <label style={{ display: 'block', fontSize: '14px', fontWeight: '600', color: '#d1d5db', marginBottom: '8px' }}>
                Password
              </label>
              <div style={{ position: 'relative' }}>
                <Lock size={20} style={{ position: 'absolute', left: '16px', top: '50%', transform: 'translateY(-50%)', color: '#6b7280' }} />
                <input
                  type={showPassword ? 'text' : 'password'}
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="At least 6 characters"
                  style={{ 
                    width: '100%', 
                    padding: '14px 48px 14px 48px', 
                    background: 'rgba(255, 255, 255, 0.05)', 
                    border: '1px solid rgba(255, 255, 255, 0.1)', 
                    borderRadius: '12px', 
                    color: 'white', 
                    fontSize: '15px',
                    outline: 'none',
                    transition: 'all 0.3s ease',
                    boxSizing: 'border-box'
                  }}
                  onFocus={(e) => { e.target.style.borderColor = colors.primary; e.target.style.background = 'rgba(255, 255, 255, 0.08)'; }}
                  onBlur={(e) => { e.target.style.borderColor = 'rgba(255, 255, 255, 0.1)'; e.target.style.background = 'rgba(255, 255, 255, 0.05)'; }}
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  style={{ position: 'absolute', right: '16px', top: '50%', transform: 'translateY(-50%)', background: 'none', border: 'none', color: '#6b7280', cursor: 'pointer', padding: '4px', display: 'flex', alignItems: 'center' }}
                >
                  {showPassword ? <EyeOff size={20} /> : <Eye size={20} />}
                </button>
              </div>
            </div>

            {/* Submit Button */}
            <button
              type="submit"
              style={{ 
                width: '100%', 
                padding: '16px', 
                background: colors.primary, 
                color: 'white', 
                border: 'none', 
                borderRadius: '12px', 
                fontSize: '16px', 
                fontWeight: '700', 
                cursor: 'pointer',
                transition: 'all 0.3s ease',
                boxShadow: '0 4px 20px ' + colors.glow,
                marginBottom: '20px'
              }}
              onMouseEnter={(e) => { e.target.style.transform = 'translateY(-2px)'; e.target.style.boxShadow = '0 6px 28px ' + colors.glow; }}
              onMouseLeave={(e) => { e.target.style.transform = 'translateY(0)'; e.target.style.boxShadow = '0 4px 20px ' + colors.glow; }}
            >
              Sign In
            </button>
          </form>

          {/* Footer */}
          <div style={{ textAlign: 'center', marginTop: '24px', paddingTop: '24px', borderTop: '1px solid rgba(255, 255, 255, 0.1)' }}>
            <p style={{ fontSize: '14px', color: '#9ca3af' }}>
              Don't have an account?{' '}
              <button
                onClick={() => onNavigate('signup')}
                style={{ background: 'none', border: 'none', color: colors.primary, fontWeight: '700', cursor: 'pointer', fontSize: '14px', padding: 0 }}
                onMouseEnter={(e) => e.target.style.textDecoration = 'underline'}
                onMouseLeave={(e) => e.target.style.textDecoration = 'none'}
              >
                Sign Up
              </button>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}