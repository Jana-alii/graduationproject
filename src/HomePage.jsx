import React, { useState } from 'react';
import { Video, Zap, Brain, TrendingUp, Sparkles, Clock, FileText, Download, Star, Users, CheckCircle, Play, BarChart, Shield, Globe, Menu, X } from 'lucide-react';

export default function HomePage({ onNavigate, theme, setTheme, user, onLogout }) {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

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

  const handleNavClick = (section) => {
    setMobileMenuOpen(false);
    const element = document.querySelector(section);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  const keyframesStyle = `
    @keyframes float {
      0%, 100% { transform: translateY(0px); }
      50% { transform: translateY(-20px); }
    }
    @keyframes pulse {
      0%, 100% { opacity: 1; }
      50% { opacity: 0.5; }
    }
    @keyframes bounce {
      0%, 100% { transform: translateY(0); }
      50% { transform: translateY(-10px); }
    }
    @keyframes fadeIn {
      from { opacity: 0; transform: translateY(20px); }
      to { opacity: 1; transform: translateY(0); }
    }
    @keyframes scaleIn {
      from { transform: scale(0.8); opacity: 0; }
      to { transform: scale(1); opacity: 1; }
    }
    @keyframes slideInLeft {
      from { opacity: 0; transform: translateX(-50px); }
      to { opacity: 1; transform: translateX(0); }
    }
    @keyframes slideInRight {
      from { opacity: 0; transform: translateX(50px); }
      to { opacity: 1; transform: translateX(0); }
    }
    @keyframes slideInFromRight {
      from { transform: translateX(100%); }
      to { transform: translateX(0); }
    }
    
    /* Global Mobile Fixes */
    * {
      box-sizing: border-box;
    }
    
    body, html {
      overflow-x: hidden;
      max-width: 100vw;
    }
    
    /* Mobile Menu */
    .mobile-menu-overlay {
      position: fixed;
      top: 0;
      left: 0;
      right: 0;
      bottom: 0;
      background: rgba(0, 0, 0, 0.8);
      z-index: 999;
      animation: fadeIn 0.3s ease-out;
    }
    
    .mobile-menu {
      position: fixed;
      top: 0;
      right: 0;
      width: 280px;
      height: 100vh;
      background: linear-gradient(135deg, #1a1a1a 0%, #0d0d0d 100%);
      border-left: 1px solid ${colors.primary};
      z-index: 1000;
      animation: slideInFromRight 0.3s ease-out;
      overflow-y: auto;
      box-shadow: -4px 0 20px rgba(0, 0, 0, 0.5);
    }
    
    /* Hamburger Menu Button - Hidden on Desktop */
    .hamburger-btn {
      display: none;
    }
    
    /* Responsive Styles */
    @media (max-width: 1024px) {
      .desktop-nav { display: none !important; }
      .hamburger-btn { display: flex !important; }
      h1 { font-size: 52px !important; line-height: 1.1 !important; }
      h2 { font-size: 40px !important; }
    }
    
    @media (max-width: 768px) {
      header { padding: 12px 0 !important; }
      header > div { 
        padding: 0 16px !important; 
        gap: 12px !important;
      }
      header .logo-section span { font-size: 20px !important; }
      header .logo-section > div > div { font-size: 8px !important; }
      h1 { font-size: 42px !important; line-height: 1.1 !important; }
      h2 { font-size: 36px !important; }
      p { font-size: 16px !important; }
      section { padding: 60px 16px !important; }
      .grid-3 { 
        grid-template-columns: 1fr !important; 
        gap: 24px !important;
      }
      .stats-grid { 
        grid-template-columns: repeat(2, 1fr) !important; 
        gap: 24px !important; 
      }
      footer .footer-grid { 
        grid-template-columns: 1fr !important; 
        text-align: center !important; 
      }
    }
    
    @media (max-width: 640px) {
      header .color-switcher { display: none !important; }
      .auth-buttons-desktop { display: none !important; }
    }
    
    @media (max-width: 480px) {
      header > div { padding: 0 12px !important; }
      header .logo-section {
        gap: 8px !important;
      }
      header .logo-section > div:first-child { 
        width: 40px !important; 
        height: 40px !important; 
      }
      header .logo-section span { font-size: 18px !important; }
      h1 { 
        font-size: 36px !important; 
        line-height: 1.2 !important; 
        margin-bottom: 20px !important;
      }
      h2 { font-size: 28px !important; }
      p { font-size: 15px !important; }
      section { padding: 50px 12px !important; }
      .stats-grid { grid-template-columns: 1fr !important; }
      .stats-grid > div > div:first-child { font-size: 48px !important; }
      button { 
        font-size: 15px !important; 
        padding: 12px 24px !important;
      }
    }
  `;

  const features = [
    { 
      icon: Clock, 
      title: 'Save Time', 
      desc: 'Transform hours of video content into concise summaries in seconds',
      color: colors.primary
    },
    { 
      icon: Brain, 
      title: 'AI-Powered', 
      desc: 'Advanced machine learning algorithms extract key insights and topics',
      color: colors.primary
    },
    { 
      icon: FileText, 
      title: 'Smart Summaries', 
      desc: 'Get structured summaries with timestamps, key points, and action items',
      color: colors.primary
    },
    { 
      icon: Download, 
      title: 'Export Anywhere', 
      desc: 'Download summaries as text files or share them with your team',
      color: colors.primary
    },
    { 
      icon: BarChart, 
      title: 'Analytics', 
      desc: 'Track your summarization history and productivity metrics',
      color: colors.primary
    },
    { 
      icon: Globe, 
      title: 'Multi-Language', 
      desc: 'Support for videos in multiple languages with accurate translations',
      color: colors.primary
    }
  ];

  const reviews = [
    {
      name: 'Sarah Mitchell',
      role: 'Content Creator',
      image: '👩‍💼',
      rating: 5,
      text: 'VideoSum has transformed how I consume educational content. I can now get through 10+ videos in the time it used to take me to watch one!'
    },
    {
      name: 'David Chen',
      role: 'Software Engineer',
      image: '👨‍💻',
      rating: 5,
      text: 'As someone who watches tons of tech tutorials, this is a game-changer. The AI summaries are incredibly accurate and save me hours every week.'
    },
    {
      name: 'Emily Rodriguez',
      role: 'Marketing Manager',
      image: '👩‍🎨',
      rating: 5,
      text: 'I use VideoSum to summarize competitor videos and industry webinars. The insights help me stay ahead without watching hours of content.'
    },
    {
      name: 'James Wilson',
      role: 'Student',
      image: '👨‍🎓',
      rating: 5,
      text: 'Perfect for studying! I summarize all my lecture recordings and can review everything quickly before exams. My grades have improved significantly.'
    }
  ];

  const howItWorks = [
    {
      step: '1',
      title: 'Paste Video Link',
      desc: 'Simply copy and paste any YouTube video URL into our chat interface',
      icon: Video
    },
    {
      step: '2',
      title: 'AI Processing',
      desc: 'Our advanced AI analyzes the video content, extracts key information, and identifies important timestamps',
      icon: Brain
    },
    {
      step: '3',
      title: 'Get Summary',
      desc: 'Receive a comprehensive summary with main topics, key insights, and downloadable text file',
      icon: CheckCircle
    }
  ];

  return (
    <React.Fragment>
      <style>{keyframesStyle}</style>
      
      {/* Mobile Menu Overlay */}
      {mobileMenuOpen && (
        <>
          <div 
            className="mobile-menu-overlay" 
            onClick={() => setMobileMenuOpen(false)}
          />
          <div className="mobile-menu">
            {/* Close Button */}
            <div style={{ 
              padding: '20px', 
              display: 'flex', 
              justifyContent: 'space-between', 
              alignItems: 'center',
              borderBottom: '1px solid rgba(255,255,255,0.1)'
            }}>
              <span style={{ fontSize: '20px', fontWeight: '700', color: colors.primary }}>Menu</span>
              <button
                onClick={() => setMobileMenuOpen(false)}
                style={{ 
                  background: 'transparent', 
                  border: 'none', 
                  color: 'white', 
                  cursor: 'pointer',
                  padding: '8px',
                  display: 'flex',
                  alignItems: 'center'
                }}
              >
                <X size={24} />
              </button>
            </div>

            {/* Menu Items */}
            <div style={{ padding: '20px' }}>
              {/* Navigation Links */}
              <div style={{ marginBottom: '32px' }}>
                <button
                  onClick={() => handleNavClick('#features')}
                  style={{ 
                    width: '100%',
                    background: 'transparent', 
                    border: 'none', 
                    color: 'white', 
                    fontSize: '18px',
                    fontWeight: '600',
                    padding: '16px 0',
                    textAlign: 'left',
                    cursor: 'pointer',
                    borderBottom: '1px solid rgba(255,255,255,0.1)',
                    transition: 'all 0.3s ease'
                  }}
                  onMouseEnter={(e) => e.target.style.color = colors.primary}
                  onMouseLeave={(e) => e.target.style.color = 'white'}
                >
                  Features
                </button>
                <button
                  onClick={() => handleNavClick('#how-it-works')}
                  style={{ 
                    width: '100%',
                    background: 'transparent', 
                    border: 'none', 
                    color: 'white', 
                    fontSize: '18px',
                    fontWeight: '600',
                    padding: '16px 0',
                    textAlign: 'left',
                    cursor: 'pointer',
                    borderBottom: '1px solid rgba(255,255,255,0.1)',
                    transition: 'all 0.3s ease'
                  }}
                  onMouseEnter={(e) => e.target.style.color = colors.primary}
                  onMouseLeave={(e) => e.target.style.color = 'white'}
                >
                  How It Works
                </button>
                <button
                  onClick={() => handleNavClick('#reviews')}
                  style={{ 
                    width: '100%',
                    background: 'transparent', 
                    border: 'none', 
                    color: 'white', 
                    fontSize: '18px',
                    fontWeight: '600',
                    padding: '16px 0',
                    textAlign: 'left',
                    cursor: 'pointer',
                    borderBottom: '1px solid rgba(255,255,255,0.1)',
                    transition: 'all 0.3s ease'
                  }}
                  onMouseEnter={(e) => e.target.style.color = colors.primary}
                  onMouseLeave={(e) => e.target.style.color = 'white'}
                >
                  Reviews
                </button>
              </div>

              {/* Color Themes */}
              <div style={{ marginBottom: '32px' }}>
                <p style={{ fontSize: '14px', color: '#9ca3af', marginBottom: '12px', fontWeight: '600' }}>Choose Theme</p>
                <div style={{ display: 'flex', gap: '12px' }}>
                  <button 
                    onClick={() => { setTheme('red'); setMobileMenuOpen(false); }} 
                    style={{ width: '48px', height: '48px', borderRadius: '12px', background: 'linear-gradient(135deg, #dc2626, #b91c1c)', border: theme === 'red' ? '3px solid white' : 'none', cursor: 'pointer', transition: 'all 0.3s ease' }}
                  />
                  <button 
                    onClick={() => { setTheme('blue'); setMobileMenuOpen(false); }} 
                    style={{ width: '48px', height: '48px', borderRadius: '12px', background: 'linear-gradient(135deg, #2563eb, #1d4ed8)', border: theme === 'blue' ? '3px solid white' : 'none', cursor: 'pointer', transition: 'all 0.3s ease' }}
                  />
                  <button 
                    onClick={() => { setTheme('green'); setMobileMenuOpen(false); }} 
                    style={{ width: '48px', height: '48px', borderRadius: '12px', background: 'linear-gradient(135deg, #16a34a, #15803d)', border: theme === 'green' ? '3px solid white' : 'none', cursor: 'pointer', transition: 'all 0.3s ease' }}
                  />
                  <button 
                    onClick={() => { setTheme('pink'); setMobileMenuOpen(false); }} 
                    style={{ width: '48px', height: '48px', borderRadius: '12px', background: 'linear-gradient(135deg, #db2777, #be185d)', border: theme === 'pink' ? '3px solid white' : 'none', cursor: 'pointer', transition: 'all 0.3s ease' }}
                  />
                </div>
              </div>

              {/* User Info / Auth Buttons */}
              {user ? (
                <div>
                  <div style={{ 
                    padding: '16px', 
                    background: 'rgba(255,255,255,0.05)', 
                    borderRadius: '12px',
                    marginBottom: '16px',
                    display: 'flex',
                    alignItems: 'center',
                    gap: '12px'
                  }}>
                    <div style={{ 
                      width: '40px', 
                      height: '40px', 
                      borderRadius: '50%', 
                      background: colors.primary, 
                      display: 'flex', 
                      alignItems: 'center', 
                      justifyContent: 'center',
                      fontSize: '18px',
                      fontWeight: '700'
                    }}>
                      {user.name.charAt(0).toUpperCase()}
                    </div>
                    <div>
                      <p style={{ fontSize: '16px', fontWeight: '700', color: 'white', marginBottom: '2px' }}>{user.name}</p>
                      <p style={{ fontSize: '13px', color: '#9ca3af' }}>{user.email}</p>
                    </div>
                  </div>
                  
                  <button
                    onClick={() => { onNavigate('chat'); setMobileMenuOpen(false); }}
                    style={{ 
                      width: '100%',
                      padding: '14px', 
                      background: 'transparent',
                      border: `2px solid ${colors.primary}`,
                      borderRadius: '10px',
                      color: colors.primary,
                      fontSize: '16px',
                      fontWeight: '700',
                      cursor: 'pointer',
                      marginBottom: '12px',
                      transition: 'all 0.3s ease'
                    }}
                  >
                    Go to Chat
                  </button>
                  
                  <button
                    onClick={() => { onLogout(); setMobileMenuOpen(false); }}
                    style={{ 
                      width: '100%',
                      padding: '14px', 
                      background: colors.primary,
                      border: 'none',
                      borderRadius: '10px',
                      color: 'white',
                      fontSize: '16px',
                      fontWeight: '700',
                      cursor: 'pointer',
                      transition: 'all 0.3s ease'
                    }}
                  >
                    Logout
                  </button>
                </div>
              ) : (
                <div>
                  <button
                    onClick={() => { onNavigate('login'); setMobileMenuOpen(false); }}
                    style={{ 
                      width: '100%',
                      padding: '14px', 
                      background: 'transparent',
                      border: `2px solid ${colors.primary}`,
                      borderRadius: '10px',
                      color: colors.primary,
                      fontSize: '16px',
                      fontWeight: '700',
                      cursor: 'pointer',
                      marginBottom: '12px',
                      transition: 'all 0.3s ease'
                    }}
                  >
                    Login
                  </button>
                  
                  <button
                    onClick={() => { onNavigate('signup'); setMobileMenuOpen(false); }}
                    style={{ 
                      width: '100%',
                      padding: '14px', 
                      background: colors.primary,
                      border: 'none',
                      borderRadius: '10px',
                      color: 'white',
                      fontSize: '16px',
                      fontWeight: '700',
                      cursor: 'pointer',
                      transition: 'all 0.3s ease'
                    }}
                  >
                    Sign Up
                  </button>
                </div>
              )}
            </div>
          </div>
        </>
      )}

      <div style={{ minHeight: '100vh', background: 'linear-gradient(to bottom, #000000, #0a0a0a)', color: 'white', position: 'relative', overflow: 'hidden' }}>
        <div style={{ position: 'absolute', top: '80px', left: '40px', width: '300px', height: '300px', background: colors.glow, borderRadius: '50%', filter: 'blur(80px)', animation: 'pulse 4s ease-in-out infinite', pointerEvents: 'none' }} />
        <div style={{ position: 'absolute', bottom: '80px', right: '40px', width: '400px', height: '400px', background: colors.glow, borderRadius: '50%', filter: 'blur(100px)', animation: 'pulse 6s ease-in-out infinite', pointerEvents: 'none' }} />

        <header style={{ position: 'sticky', top: 0, background: 'rgba(0, 0, 0, 0.95)', backdropFilter: 'blur(20px)', borderBottom: '1px solid rgba(255, 255, 255, 0.05)', padding: '16px 0', zIndex: 100, transition: 'all 0.3s ease' }}>
          <div style={{ maxWidth: '1400px', margin: '0 auto', padding: '0 40px', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
            {/* Logo Section */}
            <div className="logo-section" style={{ display: 'flex', alignItems: 'center', gap: '12px', cursor: 'pointer' }} onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}>
              <div style={{ width: '48px', height: '48px', background: colors.primary, borderRadius: '12px', display: 'flex', alignItems: 'center', justifyContent: 'center', boxShadow: '0 4px 20px ' + colors.glow }}>
                <Video size={26} strokeWidth={2.5} />
              </div>
              <div>
                <span style={{ fontSize: '26px', fontWeight: '900', color: colors.primary, letterSpacing: '-0.5px' }}>SparkClip</span>
                <div style={{ fontSize: '10px', color: colors.primary, fontWeight: '700', opacity: 0.9, marginTop: '-2px' }}>AI Powered</div>
              </div>
            </div>
            
            {/* Desktop Navigation */}
            <nav className="desktop-nav" style={{ display: 'flex', gap: '48px', alignItems: 'center' }}>
              <a 
                href="#features" 
                style={{ color: '#9ca3af', textDecoration: 'none', fontWeight: '600', cursor: 'pointer', fontSize: '16px', transition: 'all 0.3s ease' }} 
                onMouseEnter={(e) => { e.target.style.color = 'white'; }}
                onMouseLeave={(e) => { e.target.style.color = '#9ca3af'; }}
              >
                Features
              </a>
              <a 
                href="#how-it-works" 
                style={{ color: '#9ca3af', textDecoration: 'none', fontWeight: '600', cursor: 'pointer', fontSize: '16px', transition: 'all 0.3s ease' }} 
                onMouseEnter={(e) => { e.target.style.color = 'white'; }}
                onMouseLeave={(e) => { e.target.style.color = '#9ca3af'; }}
              >
                How It Works
              </a>
              <a 
                href="#reviews" 
                style={{ color: '#9ca3af', textDecoration: 'none', fontWeight: '600', cursor: 'pointer', fontSize: '16px', transition: 'all 0.3s ease' }} 
                onMouseEnter={(e) => { e.target.style.color = 'white'; }}
                onMouseLeave={(e) => { e.target.style.color = '#9ca3af'; }}
              >
                Reviews
              </a>
            </nav>
            
            {/* Right Section */}
            <div style={{ display: 'flex', gap: '20px', alignItems: 'center' }}>
              {/* Color Theme Switcher - Desktop Only */}
              <div className="color-switcher" style={{ display: 'flex', gap: '8px', padding: '6px', background: 'rgba(255,255,255,0.03)', borderRadius: '12px', border: '1px solid rgba(255,255,255,0.05)' }}>
                <button 
                  onClick={() => setTheme('red')} 
                  style={{ width: '36px', height: '36px', borderRadius: '10px', background: 'linear-gradient(135deg, #dc2626, #b91c1c)', border: theme === 'red' ? '2px solid white' : 'none', cursor: 'pointer', opacity: theme === 'red' ? 1 : 0.5, transition: 'all 0.3s ease', boxShadow: theme === 'red' ? '0 4px 12px rgba(220, 38, 38, 0.4)' : 'none' }}
                  onMouseEnter={(e) => e.target.style.opacity = '1'}
                  onMouseLeave={(e) => e.target.style.opacity = theme === 'red' ? '1' : '0.5'}
                />
                <button 
                  onClick={() => setTheme('blue')} 
                  style={{ width: '36px', height: '36px', borderRadius: '10px', background: 'linear-gradient(135deg, #2563eb, #1d4ed8)', border: theme === 'blue' ? '2px solid white' : 'none', cursor: 'pointer', opacity: theme === 'blue' ? 1 : 0.5, transition: 'all 0.3s ease', boxShadow: theme === 'blue' ? '0 4px 12px rgba(37, 99, 235, 0.4)' : 'none' }}
                  onMouseEnter={(e) => e.target.style.opacity = '1'}
                  onMouseLeave={(e) => e.target.style.opacity = theme === 'blue' ? '1' : '0.5'}
                />
                <button 
                  onClick={() => setTheme('green')} 
                  style={{ width: '36px', height: '36px', borderRadius: '10px', background: 'linear-gradient(135deg, #16a34a, #15803d)', border: theme === 'green' ? '2px solid white' : 'none', cursor: 'pointer', opacity: theme === 'green' ? 1 : 0.5, transition: 'all 0.3s ease', boxShadow: theme === 'green' ? '0 4px 12px rgba(22, 163, 74, 0.4)' : 'none' }}
                  onMouseEnter={(e) => e.target.style.opacity = '1'}
                  onMouseLeave={(e) => e.target.style.opacity = theme === 'green' ? '1' : '0.5'}
                />
                <button 
                  onClick={() => setTheme('pink')} 
                  style={{ width: '36px', height: '36px', borderRadius: '10px', background: 'linear-gradient(135deg, #db2777, #be185d)', border: theme === 'pink' ? '2px solid white' : 'none', cursor: 'pointer', opacity: theme === 'pink' ? 1 : 0.5, transition: 'all 0.3s ease', boxShadow: theme === 'pink' ? '0 4px 12px rgba(219, 39, 119, 0.4)' : 'none' }}
                  onMouseEnter={(e) => e.target.style.opacity = '1'}
                  onMouseLeave={(e) => e.target.style.opacity = theme === 'pink' ? '1' : '0.5'}
                />
              </div>

              {/* Auth Buttons - Desktop Only */}
              <div className="auth-buttons-desktop" style={{ display: 'flex', gap: '12px', alignItems: 'center' }}>
                {user ? (
                  <>
                    <button 
                      onClick={() => onNavigate('chat')}
                      style={{ 
                        background: 'transparent', 
                        color: 'white', 
                        padding: '10px 24px', 
                        borderRadius: '10px', 
                        border: '1.5px solid rgba(255,255,255,0.2)', 
                        fontWeight: '600', 
                        cursor: 'pointer', 
                        transition: 'all 0.3s ease', 
                        fontSize: '15px' 
                      }}
                      onMouseEnter={(e) => { 
                        e.target.style.borderColor = colors.primary; 
                        e.target.style.color = colors.primary;
                      }}
                      onMouseLeave={(e) => { 
                        e.target.style.borderColor = 'rgba(255,255,255,0.2)'; 
                        e.target.style.color = 'white';
                      }}
                    >
                      Go to Chat
                    </button>
                    <button 
                      onClick={onLogout}
                      style={{ 
                        background: colors.primary, 
                        color: 'white', 
                        padding: '10px 28px', 
                        borderRadius: '10px', 
                        border: 'none', 
                        fontWeight: '700', 
                        cursor: 'pointer', 
                        transition: 'all 0.3s ease', 
                        boxShadow: '0 4px 20px ' + colors.glow, 
                        fontSize: '15px' 
                      }}
                      onMouseEnter={(e) => e.target.style.transform = 'translateY(-2px)'}
                      onMouseLeave={(e) => e.target.style.transform = 'translateY(0)'}
                    >
                      Logout
                    </button>
                  </>
                ) : (
                  <>
                    <button 
                      onClick={() => onNavigate('login')}
                      style={{ background: 'transparent', color: 'white', padding: '10px 24px', borderRadius: '10px', border: '1.5px solid rgba(255,255,255,0.2)', fontWeight: '600', cursor: 'pointer', transition: 'all 0.3s ease', fontSize: '15px' }}
                      onMouseEnter={(e) => { 
                        e.target.style.borderColor = colors.primary; 
                        e.target.style.color = colors.primary;
                      }}
                      onMouseLeave={(e) => { 
                        e.target.style.borderColor = 'rgba(255,255,255,0.2)'; 
                        e.target.style.color = 'white';
                      }}
                    >
                      Login
                    </button>
                    <button 
                      onClick={() => onNavigate('signup')}
                      style={{ background: colors.primary, color: 'white', padding: '10px 28px', borderRadius: '10px', border: 'none', fontWeight: '700', cursor: 'pointer', transition: 'all 0.3s ease', boxShadow: '0 4px 20px ' + colors.glow, fontSize: '15px' }}
                      onMouseEnter={(e) => e.target.style.transform = 'translateY(-2px)'}
                      onMouseLeave={(e) => e.target.style.transform = 'translateY(0)'}
                    >
                      Sign Up
                    </button>
                  </>
                )}
              </div>

              {/* Hamburger Menu Button - Mobile Only */}
              <button
                className="hamburger-btn"
                onClick={() => setMobileMenuOpen(true)}
                style={{ 
                  background: 'transparent', 
                  border: `2px solid ${colors.primary}`, 
                  borderRadius: '10px',
                  padding: '10px 12px',
                  cursor: 'pointer',
                  color: colors.primary,
                  alignItems: 'center',
                  justifyContent: 'center',
                  transition: 'all 0.3s ease'
                }}
                onMouseEnter={(e) => { e.target.style.background = colors.primary; e.target.style.color = 'white'; }}
                onMouseLeave={(e) => { e.target.style.background = 'transparent'; e.target.style.color = colors.primary; }}
              >
                <Menu size={24} />
              </button>
            </div>
          </div>
        </header>

        {/* Hero Section - continuing with rest of HomePage... */}
        <section style={{ maxWidth: '1400px', margin: '0 auto', padding: '120px 40px 80px', textAlign: 'center', position: 'relative', zIndex: 1 }}>
          <div style={{ display: 'inline-flex', alignItems: 'center', gap: '12px', background: colors.primary, padding: '12px 32px', borderRadius: '50px', fontSize: '15px', fontWeight: '700', marginBottom: '48px', animation: 'bounce 2s ease-in-out infinite', boxShadow: '0 4px 24px ' + colors.glow, border: 'none', color: 'white' }}>
            <Zap size={18} />
            <span>AI-Powered Summarization</span>
          </div>
          
          <h1 style={{ fontSize: '88px', fontWeight: '900', lineHeight: '1.1', marginBottom: '32px', animation: 'fadeIn 1s ease-out', color: 'white' }}>
            Transform Videos
            <br />
            <span style={{ color: colors.primary }}>Into Knowledge</span>
          </h1>
          
          <p style={{ fontSize: '24px', color: '#9ca3af', marginBottom: '56px', maxWidth: '900px', margin: '0 auto 56px', lineHeight: '1.7', animation: 'fadeIn 1s ease-out 0.2s both' }}>
            Get instant AI summaries, key points, and timestamps.{' '}
            <span style={{ color: colors.primary, fontWeight: '700' }}>Save hours of time.</span>
          </p>

          <button 
            onClick={() => user ? onNavigate('chat') : onNavigate('signup')}
            style={{ display: 'inline-flex', alignItems: 'center', gap: '12px', background: colors.primary, color: 'white', padding: '20px 44px', borderRadius: '14px', border: 'none', fontSize: '19px', fontWeight: '700', cursor: 'pointer', transition: 'all 0.3s ease', boxShadow: '0 8px 32px ' + colors.glow, animation: 'scaleIn 1s ease-out 0.4s both', marginBottom: '100px' }}
            onMouseEnter={(e) => { e.target.style.transform = 'translateY(-3px)'; e.target.style.boxShadow = '0 12px 40px ' + colors.glow; }}
            onMouseLeave={(e) => { e.target.style.transform = 'translateY(0)'; e.target.style.boxShadow = '0 8px 32px ' + colors.glow; }}
          >
            <Video size={22} />
            <span>Try It Now - Free</span>
            <Sparkles size={20} />
          </button>
        </section>

        {/* Features Section */}
        <section id="features" style={{ padding: '140px 40px', borderTop: '1px solid ' + colors.glow, position: 'relative', zIndex: 1, background: 'linear-gradient(180deg, rgba(0,0,0,0) 0%, rgba(0,0,0,0.5) 100%)' }}>
          <div style={{ maxWidth: '1400px', margin: '0 auto' }}>
            <div style={{ textAlign: 'center', marginBottom: '100px' }}>
              <div style={{ display: 'inline-block', background: colors.glow, padding: '10px 24px', borderRadius: '50px', fontSize: '14px', fontWeight: '700', marginBottom: '24px', border: '1px solid ' + colors.glow }}>
                ✨ Powerful Features
              </div>
              <h2 style={{ fontSize: '64px', fontWeight: '900', marginBottom: '24px', background: 'linear-gradient(135deg, white, ' + colors.primary + ')', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent', backgroundClip: 'text' }}>Why Choose VideoSum?</h2>
              <p style={{ fontSize: '22px', color: '#9ca3af', maxWidth: '700px', margin: '0 auto' }}>Everything you need to transform video content into actionable insights</p>
            </div>

            <div className="grid-3" style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(350px, 1fr))', gap: '40px' }}>
              {features.map((feature, idx) => {
                const FeatureIcon = feature.icon;
                return (
                  <div key={idx} style={{ position: 'relative', animation: 'fadeIn 0.8s ease-out ' + (idx * 0.15) + 's both' }}>
                    <div style={{ position: 'absolute', inset: '-2px', background: 'linear-gradient(135deg, ' + colors.glow + ', transparent)', borderRadius: '28px', opacity: 0.4 }} />
                    <div style={{ position: 'relative', background: 'linear-gradient(135deg, #1a1a1a 0%, #0d0d0d 100%)', padding: '48px 40px', borderRadius: '28px', border: '1px solid rgba(255,255,255,0.1)', transition: 'all 0.5s ease', cursor: 'pointer', height: '100%' }}
                      onMouseEnter={(e) => {
                        e.currentTarget.style.transform = 'translateY(-8px)';
                        e.currentTarget.style.borderColor = colors.primary;
                        e.currentTarget.style.boxShadow = '0 20px 60px ' + colors.glow;
                      }}
                      onMouseLeave={(e) => {
                        e.currentTarget.style.transform = 'translateY(0)';
                        e.currentTarget.style.borderColor = 'rgba(255,255,255,0.1)';
                        e.currentTarget.style.boxShadow = 'none';
                      }}
                    >
                      <div style={{ width: '72px', height: '72px', background: 'linear-gradient(135deg, ' + colors.primary + ', ' + colors.primaryDark + ')', borderRadius: '20px', display: 'flex', alignItems: 'center', justifyContent: 'center', marginBottom: '28px', boxShadow: '0 8px 30px ' + colors.glow, position: 'relative', zIndex: 1 }}>
                        <FeatureIcon size={38} />
                      </div>
                      <h3 style={{ fontSize: '28px', fontWeight: '900', color: 'white', marginBottom: '16px', position: 'relative', zIndex: 1 }}>{feature.title}</h3>
                      <p style={{ color: '#9ca3af', lineHeight: '1.7', fontSize: '17px', position: 'relative', zIndex: 1 }}>{feature.desc}</p>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        </section>

        {/* How It Works Section */}
        <section id="how-it-works" style={{ padding: '140px 40px', position: 'relative', zIndex: 1 }}>
          <div style={{ maxWidth: '1400px', margin: '0 auto' }}>
            <div style={{ textAlign: 'center', marginBottom: '100px' }}>
              <div style={{ display: 'inline-block', background: colors.glow, padding: '10px 24px', borderRadius: '50px', fontSize: '14px', fontWeight: '700', marginBottom: '24px', border: '1px solid ' + colors.glow }}>
                🚀 Simple Process
              </div>
              <h2 style={{ fontSize: '64px', fontWeight: '900', marginBottom: '24px', background: 'linear-gradient(135deg, white, ' + colors.primary + ')', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent', backgroundClip: 'text' }}>How VideoSum Works</h2>
              <p style={{ fontSize: '22px', color: '#9ca3af', maxWidth: '700px', margin: '0 auto' }}>Get comprehensive video summaries in three simple steps</p>
            </div>

            <div className="grid-3" style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: '60px' }}>
              {howItWorks.map((step, idx) => {
                const StepIcon = step.icon;
                return (
                  <div key={idx} style={{ textAlign: 'center', position: 'relative', animation: 'slideInLeft 0.8s ease-out ' + (idx * 0.2) + 's both' }}>
                    <div style={{ position: 'relative', display: 'inline-block', marginBottom: '32px' }}>
                      <div style={{ position: 'absolute', inset: '-20px', background: colors.glow, borderRadius: '50%', filter: 'blur(40px)' }} />
                      <div style={{ position: 'relative', width: '140px', height: '140px', background: 'linear-gradient(135deg, ' + colors.primary + ', ' + colors.primaryDark + ')', borderRadius: '50%', display: 'flex', alignItems: 'center', justifyContent: 'center', boxShadow: '0 10px 40px ' + colors.glow, border: '4px solid rgba(0,0,0,0.3)' }}>
                        <StepIcon size={60} strokeWidth={2.5} />
                      </div>
                      <div style={{ position: 'absolute', top: '-15px', right: '-15px', width: '50px', height: '50px', background: colors.primary, borderRadius: '50%', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '24px', fontWeight: '900', border: '4px solid #000', boxShadow: '0 4px 20px ' + colors.glow }}>
                        {step.step}
                      </div>
                    </div>
                    <h3 style={{ fontSize: '32px', fontWeight: '900', color: 'white', marginBottom: '16px' }}>{step.title}</h3>
                    <p style={{ fontSize: '18px', color: '#9ca3af', lineHeight: '1.7', maxWidth: '320px', margin: '0 auto' }}>{step.desc}</p>
                  </div>
                );
              })}
            </div>

            <div style={{ marginTop: '100px', textAlign: 'center' }}>
              <button
                onClick={() => user ? onNavigate('chat') : onNavigate('signup')}
                style={{ padding: '20px 50px', background: colors.primary, color: 'white', border: 'none', borderRadius: '16px', fontSize: '20px', fontWeight: '700', cursor: 'pointer', boxShadow: '0 8px 40px ' + colors.glow, transition: 'all 0.3s ease', display: 'inline-flex', alignItems: 'center', gap: '12px' }}
                onMouseEnter={(e) => { e.target.style.transform = 'scale(1.05)'; }}
                onMouseLeave={(e) => { e.target.style.transform = 'scale(1)'; }}
              >
                <Sparkles size={24} />
                Get Started Now - Free
                <Sparkles size={24} />
              </button>
            </div>
          </div>
        </section>

        {/* Reviews Section */}
        <section id="reviews" style={{ padding: '140px 40px', background: 'linear-gradient(180deg, rgba(0,0,0,0.5) 0%, rgba(0,0,0,0) 100%)', position: 'relative', zIndex: 1 }}>
          <div style={{ maxWidth: '1400px', margin: '0 auto' }}>
            <div style={{ textAlign: 'center', marginBottom: '100px' }}>
              <div style={{ display: 'inline-block', background: colors.glow, padding: '10px 24px', borderRadius: '50px', fontSize: '14px', fontWeight: '700', marginBottom: '24px', border: '1px solid ' + colors.glow }}>
                ⭐ Testimonials
              </div>
              <h2 style={{ fontSize: '64px', fontWeight: '900', marginBottom: '24px', background: 'linear-gradient(135deg, white, ' + colors.primary + ')', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent', backgroundClip: 'text' }}>Loved by Thousands</h2>
              <p style={{ fontSize: '22px', color: '#9ca3af', maxWidth: '700px', margin: '0 auto' }}>See what our users are saying about VideoSum</p>
            </div>

            <div className="grid-3" style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))', gap: '40px' }}>
              {reviews.map((review, idx) => (
                <div key={idx} style={{ position: 'relative', animation: 'slideInRight 0.8s ease-out ' + (idx * 0.15) + 's both' }}>
                  <div style={{ position: 'absolute', inset: '-2px', background: 'linear-gradient(135deg, ' + colors.glow + ', transparent)', borderRadius: '24px', opacity: 0.3 }} />
                  <div style={{ position: 'relative', background: 'linear-gradient(135deg, rgba(26, 26, 26, 0.9), rgba(13, 13, 13, 0.9))', padding: '40px', borderRadius: '24px', border: '1px solid rgba(255,255,255,0.1)', transition: 'all 0.5s ease', cursor: 'pointer', height: '100%' }}
                    onMouseEnter={(e) => {
                      e.currentTarget.style.transform = 'translateY(-8px)';
                      e.currentTarget.style.borderColor = colors.primary;
                      e.currentTarget.style.boxShadow = '0 20px 60px ' + colors.glow;
                    }}
                    onMouseLeave={(e) => {
                      e.currentTarget.style.transform = 'translateY(0)';
                      e.currentTarget.style.borderColor = 'rgba(255,255,255,0.1)';
                      e.currentTarget.style.boxShadow = 'none';
                    }}
                  >
                    <div style={{ display: 'flex', gap: '6px', marginBottom: '24px' }}>
                      {[...Array(review.rating)].map((_, i) => (
                        <Star key={i} size={20} fill={colors.primary} color={colors.primary} />
                      ))}
                    </div>
                    <p style={{ fontSize: '17px', color: '#e5e7eb', lineHeight: '1.8', marginBottom: '28px', fontStyle: 'italic' }}>
                      "{review.text}"
                    </p>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '16px', paddingTop: '24px', borderTop: '1px solid rgba(255,255,255,0.1)' }}>
                      <div style={{ width: '56px', height: '56px', background: 'linear-gradient(135deg, ' + colors.primary + ', ' + colors.primaryDark + ')', borderRadius: '50%', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '28px', boxShadow: '0 4px 20px ' + colors.glow }}>
                        {review.image}
                      </div>
                      <div>
                        <p style={{ fontWeight: '700', fontSize: '18px', color: 'white', marginBottom: '4px' }}>{review.name}</p>
                        <p style={{ color: '#9ca3af', fontSize: '14px' }}>{review.role}</p>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Stats Section */}
        <section style={{ position: 'relative', padding: '100px 40px', background: colors.primary, zIndex: 1 }}>
          <div style={{ maxWidth: '1400px', margin: '0 auto' }}>
            <div className="stats-grid" style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))', gap: '80px', textAlign: 'center' }}>
              <div style={{ animation: 'scaleIn 1s ease-out both' }}>
                <div style={{ fontSize: '80px', fontWeight: '900', color: 'white', marginBottom: '16px', textShadow: '0 4px 20px rgba(0,0,0,0.3)' }}>1M+</div>
                <div style={{ color: 'rgba(255,255,255,0.9)', fontSize: '22px', fontWeight: '600' }}>Videos Summarized</div>
              </div>
              <div style={{ animation: 'scaleIn 1s ease-out 0.2s both' }}>
                <div style={{ fontSize: '80px', fontWeight: '900', color: 'white', marginBottom: '16px', textShadow: '0 4px 20px rgba(0,0,0,0.3)' }}>50K+</div>
                <div style={{ color: 'rgba(255,255,255,0.9)', fontSize: '22px', fontWeight: '600' }}>Active Users</div>
              </div>
              <div style={{ animation: 'scaleIn 1s ease-out 0.4s both' }}>
                <div style={{ fontSize: '80px', fontWeight: '900', color: 'white', marginBottom: '16px', textShadow: '0 4px 20px rgba(0,0,0,0.3)' }}>90%</div>
                <div style={{ color: 'rgba(255,255,255,0.9)', fontSize: '22px', fontWeight: '600' }}>Time Saved</div>
              </div>
              <div style={{ animation: 'scaleIn 1s ease-out 0.6s both' }}>
                <div style={{ fontSize: '80px', fontWeight: '900', color: 'white', marginBottom: '16px', textShadow: '0 4px 20px rgba(0,0,0,0.3)' }}>4.9</div>
                <div style={{ color: 'rgba(255,255,255,0.9)', fontSize: '22px', fontWeight: '600' }}>User Rating</div>
              </div>
            </div>
          </div>
        </section>

        {/* Footer */}
        <footer style={{ position: 'relative', background: '#000', borderTop: '1px solid ' + colors.glow, padding: '80px 40px 40px', zIndex: 1 }}>
          <div style={{ maxWidth: '1400px', margin: '0 auto' }}>
            <div className="footer-grid" style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))', gap: '60px', marginBottom: '60px' }}>
              <div>
                <div style={{ display: 'flex', alignItems: 'center', gap: '16px', marginBottom: '24px' }}>
                  <div style={{ width: '52px', height: '52px', background: colors.primary, borderRadius: '16px', display: 'flex', alignItems: 'center', justifyContent: 'center', boxShadow: '0 0 30px ' + colors.glow }}>
                    <Video size={28} />
                  </div>
                  <span style={{ fontSize: '32px', fontWeight: '900', color: colors.primary }}>VideoSum</span>
                </div>
                <p style={{ color: '#9ca3af', marginBottom: '24px', fontSize: '16px', lineHeight: '1.6' }}>
                  Transform hours of video content into concise, actionable summaries with the power of AI.
                </p>
              </div>

              <div>
                <h4 style={{ fontSize: '18px', fontWeight: '700', color: 'white', marginBottom: '24px' }}>Product</h4>
                <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
                  <a href="#features" style={{ color: '#9ca3af', textDecoration: 'none', fontSize: '15px', transition: 'all 0.3s ease' }} onMouseEnter={(e) => e.target.style.color = colors.primary} onMouseLeave={(e) => e.target.style.color = '#9ca3af'}>Features</a>
                  <a href="#how-it-works" style={{ color: '#9ca3af', textDecoration: 'none', fontSize: '15px', transition: 'all 0.3s ease' }} onMouseEnter={(e) => e.target.style.color = colors.primary} onMouseLeave={(e) => e.target.style.color = '#9ca3af'}>How It Works</a>
                  <a href="#reviews" style={{ color: '#9ca3af', textDecoration: 'none', fontSize: '15px', transition: 'all 0.3s ease' }} onMouseEnter={(e) => e.target.style.color = colors.primary} onMouseLeave={(e) => e.target.style.color = '#9ca3af'}>Reviews</a>
                </div>
              </div>

              <div>
                <h4 style={{ fontSize: '18px', fontWeight: '700', color: 'white', marginBottom: '24px' }}>Company</h4>
                <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
                  <a href="#" style={{ color: '#9ca3af', textDecoration: 'none', fontSize: '15px', transition: 'all 0.3s ease' }} onMouseEnter={(e) => e.target.style.color = colors.primary} onMouseLeave={(e) => e.target.style.color = '#9ca3af'}>About Us</a>
                  <a href="#" style={{ color: '#9ca3af', textDecoration: 'none', fontSize: '15px', transition: 'all 0.3s ease' }} onMouseEnter={(e) => e.target.style.color = colors.primary} onMouseLeave={(e) => e.target.style.color = '#9ca3af'}>Contact</a>
                </div>
              </div>
            </div>

            <div style={{ paddingTop: '40px', borderTop: '1px solid rgba(255,255,255,0.1)', textAlign: 'center' }}>
              <p style={{ color: '#666', fontSize: '14px' }}>© 2024 VideoSum. All rights reserved. Made with ❤️ for content creators.</p>
            </div>
          </div>
        </footer>
      </div>
    </React.Fragment>
  );
}