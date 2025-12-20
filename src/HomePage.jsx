import React, { useState, useEffect } from 'react';
import { Video, ChevronDown, Menu, X, Check, Sun, Moon, Sparkles, Zap, Clock, Brain, Shield, Users, Star, FileText, Download, Search, BarChart3, MessageSquare } from 'lucide-react';

export default function HomePage({ onNavigate, user, onLogout }) {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [isDarkMode, setIsDarkMode] = useState(false);
  const [email, setEmail] = useState('');
  const [scrolled, setScrolled] = useState(false);
  const [lastScrollY, setLastScrollY] = useState(0);
  const [navbarVisible, setNavbarVisible] = useState(true);

  useEffect(() => {
    const handleScroll = () => {
      const currentScrollY = window.scrollY;
      
      if (currentScrollY > 100) {
        setScrolled(true);
        if (currentScrollY > lastScrollY) {
          setNavbarVisible(false);
        } else {
          setNavbarVisible(true);
        }
      } else {
        setScrolled(false);
        setNavbarVisible(true);
      }
      
      setLastScrollY(currentScrollY);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, [lastScrollY]);

  const getTheme = () => {
    if (isDarkMode) {
      return {
        bg: '#0a0a0a',
        navBg: '#1a1a1a',
        text: '#ffffff',
        textMuted: '#a0a0a0',
        border: '#2a2a2a',
        cardBg: '#1a1a1a',
        sectionBg: '#0f0f0f',
        chatBg: '#2a2a2a'
      };
    } else {
      return {
        bg: '#ffffff',
        navBg: '#ffffff',
        text: '#1a1a1a',
        textMuted: '#666666',
        border: '#e5e5e5',
        cardBg: '#f9f9f9',
        sectionBg: '#f5f5f5',
        chatBg: '#ffffff'
      };
    }
  };

  const theme = getTheme();

  const features = [
    { icon: Zap, title: 'Instant Summaries', desc: 'Get video summaries in 3 seconds with AI', color: '#f59e0b' },
    { icon: Brain, title: 'Smart Analysis', desc: 'GPT-4 powered video understanding', color: '#8b5cf6' },
    { icon: Clock, title: 'Save 90% Time', desc: '2-hour video → 2-minute summary', color: '#10b981' },
    { icon: FileText, title: 'Key Points', desc: 'Automatic bullet-point extraction', color: '#3b82f6' },
    { icon: Download, title: 'Export Options', desc: 'Download as PDF, TXT, or MD', color: '#f43f5e' },
    { icon: MessageSquare, title: 'Ask Questions', desc: 'Chat with your video content', color: '#06b6d4' }
  ];

  const stats = [
    { value: '1M+', label: 'Videos Summarized', icon: Video },
    { value: '50K+', label: 'Happy Users', icon: Users },
    { value: '90%', label: 'Time Saved', icon: Clock },
    { value: '4.9★', label: 'User Rating', icon: Star }
  ];

  const testimonials = [
    {
      name: 'Sarah Mitchell',
      role: 'Content Creator',
      avatar: 'https://i.pravatar.cc/80?img=1',
      rating: 5,
      text: 'SparkClip transformed how I consume educational content. I can now get through 10+ videos in the time it used to take me to watch one!'
    },
    {
      name: 'David Chen',
      role: 'Software Engineer',
      avatar: 'https://i.pravatar.cc/80?img=12',
      rating: 5,
      text: 'As someone who watches tons of tech tutorials, this is a game-changer. The AI summaries are incredibly accurate and save me hours every week.'
    },
    {
      name: 'Emily Rodriguez',
      role: 'Student',
      avatar: 'https://i.pravatar.cc/80?img=9',
      rating: 5,
      text: 'Perfect for studying! I summarize all my lecture recordings and can review everything quickly before exams. My grades improved significantly.'
    }
  ];

  const howItWorks = [
    { step: '1', title: 'Paste Video URL', desc: 'Copy any YouTube video link and paste it into SparkClip', icon: Video },
    { step: '2', title: 'AI Processing', desc: 'Our AI analyzes the video, extracts audio, and generates transcript', icon: Brain },
    { step: '3', title: 'Get Summary', desc: 'Receive comprehensive summary with key points and timestamps', icon: FileText }
  ];

  const keyframesStyle = `
    @keyframes fadeIn {
      from { opacity: 0; transform: translateY(30px); }
      to { opacity: 1; transform: translateY(0); }
    }
    
    @keyframes slideIn {
      from { opacity: 0; transform: translateX(-30px); }
      to { opacity: 1; transform: translateX(0); }
    }
    
    @keyframes float {
      0%, 100% { transform: translateY(0px); }
      50% { transform: translateY(-15px); }
    }
    
    @keyframes pulse {
      0%, 100% { opacity: 1; }
      50% { opacity: 0.5; }
    }
    
    @keyframes scaleIn {
      from { opacity: 0; transform: scale(0.95); }
      to { opacity: 1; transform: scale(1); }
    }
    
    * { box-sizing: border-box; margin: 0; padding: 0; }
    body { font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', 'Roboto', 'Helvetica', 'Arial', sans-serif; }
    
    @media (max-width: 768px) {
      .desktop-only { display: none !important; }
      .mobile-menu-btn { display: flex !important; }
      .section-grid { grid-template-columns: 1fr !important; }
      .chat-mockup { transform: scale(0.85) !important; }
      .features-grid { grid-template-columns: 1fr !important; }
      .testimonials-grid { grid-template-columns: 1fr !important; }
      .stats-grid { grid-template-columns: repeat(2, 1fr) !important; }
      .how-it-works-grid { grid-template-columns: 1fr !important; }
      .cta-image-container { margin-top: 40px !important; }
      section > div[style*="grid-template-columns: 1fr 1fr"] { grid-template-columns: 1fr !important; text-align: center !important; }
    }
  `;

  return (
    <React.Fragment>
      <style>{keyframesStyle}</style>

      {/* Mobile Menu */}
      {mobileMenuOpen && (
        <>
          <div style={{ position: 'fixed', top: 0, left: 0, right: 0, bottom: 0, background: 'rgba(0,0,0,0.5)', zIndex: 999 }} onClick={() => setMobileMenuOpen(false)} />
          <div style={{ position: 'fixed', top: 0, right: 0, width: '300px', height: '100vh', background: theme.navBg, zIndex: 1000, boxShadow: '-4px 0 20px rgba(0,0,0,0.1)', animation: 'slideIn 0.3s ease-out', overflowY: 'auto' }}>
            <div style={{ padding: '24px', borderBottom: `1px solid ${theme.border}` }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                <span style={{ fontSize: '18px', fontWeight: '700', color: theme.text }}>Menu</span>
                <button onClick={() => setMobileMenuOpen(false)} style={{ background: 'transparent', border: 'none', cursor: 'pointer' }}>
                  <X size={24} color={theme.text} />
                </button>
              </div>
            </div>
            <div style={{ padding: '24px' }}>
              <div style={{ display: 'flex', flexDirection: 'column', gap: '12px', marginBottom: '24px' }}>
                {user ? (
                  <>
                    <button onClick={() => { onNavigate('chat'); setMobileMenuOpen(false); }} style={{ padding: '12px', background: 'transparent', border: '2px solid #2d09b1ff', borderRadius: '8px', fontSize: '15px', fontWeight: '600', cursor: 'pointer', color: '#050505ff' }}>Go to Chat</button>
                    <button onClick={() => { onLogout(); setMobileMenuOpen(false); }} style={{ padding: '12px', background: '#2d09b1ff', border: 'none', borderRadius: '8px', color: 'white', fontSize: '15px', fontWeight: '600', cursor: 'pointer' }}>Logout</button>
                  </>
                ) : (
                  <>
                    <button onClick={() => { onNavigate('login'); setMobileMenuOpen(false); }} style={{ padding: '12px', background: 'transparent', border: '2px solid #1a1a1a', borderRadius: '8px', fontSize: '15px', fontWeight: '600', cursor: 'pointer' }}>Log in</button>
                    <button onClick={() => { onNavigate('signup'); setMobileMenuOpen(false); }} style={{ padding: '12px', background: '#2d09b1ff', border: 'none', borderRadius: '8px', color: 'white', fontSize: '15px', fontWeight: '600', cursor: 'pointer' }}>Sign up free</button>
                  </>
                )}
              </div>
            </div>
          </div>
        </>
      )}

      <div style={{ minHeight: '100vh', background: theme.bg, transition: 'all 0.3s ease' }}>
        {/* Navigation */}
        <nav style={{ 
          position: 'fixed', 
          top: navbarVisible ? 0 : '-100px',
          left: 0,
          right: 0,
          background: scrolled ? (isDarkMode ? 'rgba(251, 243, 243, 0.95)' : 'rgba(255, 255, 255, 0.95)') : theme.navBg, 
          backdropFilter: scrolled ? 'blur(20px)' : 'none',
          borderBottom: `1px solid ${theme.border}`, 
          zIndex: 100, 
          transition: 'all 0.3s ease',
          boxShadow: scrolled ? (isDarkMode ? '0 4px 20px rgba(0,0,0,0.5)' : '0 4px 20px rgba(0,0,0,0.1)') : 'none'
        }}>
          <div style={{ maxWidth: '1400px', margin: '0 auto', padding: '16px 24px', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '8px', cursor: 'pointer' }} onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}>
              <div style={{ width: '40px', height: '40px', background: 'linear-gradient(135deg, #050505ff, #4d23f3ff)', borderRadius: '10px', display: 'flex', alignItems: 'center', justifyContent: 'center', boxShadow: '0 4px 15px rgba(128, 0, 32, 0.3)' }}>
                <Video size={22} color="white" strokeWidth={2.5} />
              </div>
              <div>
                <div style={{ fontSize: '20px', fontWeight: '900', color: theme.text, lineHeight: '1' }}>SparkClip</div>
                <div style={{ fontSize: '9px', color: theme.textMuted, fontWeight: '600' }}>Video Summarizer</div>
              </div>
            </div>

            <div className="desktop-only" style={{ display: 'flex', gap: '32px', alignItems: 'center' }}>
              <a href="#features" style={{ color: theme.text, textDecoration: 'none', fontWeight: '600', fontSize: '15px', transition: 'color 0.3s' }} onMouseEnter={(e) => e.target.style.color = '#050505ff'} onMouseLeave={(e) => e.target.style.color = theme.text}>Features</a>
              <a href="#how-it-works" style={{ color: theme.text, textDecoration: 'none', fontWeight: '600', fontSize: '15px', transition: 'color 0.3s' }} onMouseEnter={(e) => e.target.style.color = '#050505ff'} onMouseLeave={(e) => e.target.style.color = theme.text}>How It Works</a>
              <a href="#testimonials" style={{ color: theme.text, textDecoration: 'none', fontWeight: '600', fontSize: '15px', transition: 'color 0.3s' }} onMouseEnter={(e) => e.target.style.color = '#050505ff'} onMouseLeave={(e) => e.target.style.color = theme.text}>Reviews</a>
            </div>

            <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
              <button onClick={() => setIsDarkMode(!isDarkMode)} style={{ width: '40px', height: '40px', borderRadius: '10px', background: theme.cardBg, border: `1px solid ${theme.border}`, display: 'flex', alignItems: 'center', justifyContent: 'center', cursor: 'pointer', transition: 'all 0.3s' }}>
                {isDarkMode ? <Sun size={18} color={theme.text} /> : <Moon size={18} color={theme.text} />}
              </button>

              <div className="desktop-only" style={{ display: 'flex', gap: '12px' }}>
                {user ? (
                  <>
                    <button onClick={() => onNavigate('chat')} style={{ padding: '10px 20px', background: 'transparent', border: '2px solid #050505ff', borderRadius: '10px', fontSize: '14px', fontWeight: '700', cursor: 'pointer', color: '#050505ff', transition: 'all 0.3s' }}>Go to Chat</button>
                    <button onClick={onLogout} style={{ padding: '10px 24px', background: '#050505ff', border: 'none', borderRadius: '10px', color: 'white', fontSize: '14px', fontWeight: '700', cursor: 'pointer', boxShadow: '0 4px 15px rgba(128, 0, 32, 0.3)', transition: 'all 0.3s' }}>Logout</button>
                  </>
                ) : (
                  <>
                    <button onClick={() => onNavigate('login')} style={{ padding: '10px 20px', background: 'transparent', borderRadius: '10px', fontSize: '14px', fontWeight: '700', cursor: 'pointer', transition: 'all 0.3s' }}>Log in</button>
                    <button onClick={() => onNavigate('signup')} style={{ padding: '10px 24px', background: '#050505ff', border: 'none', borderRadius: '10px', color: 'white', fontSize: '14px', fontWeight: '700', cursor: 'pointer', transition: 'all 0.3s' }}>Sign up free</button>
                  </>
                )}
              </div>

              <button className="mobile-menu-btn" onClick={() => setMobileMenuOpen(true)} style={{ display: 'none', background: 'transparent', border: 'none', cursor: 'pointer' }}>
                <Menu size={24} color={theme.text} />
              </button>
            </div>
          </div>
        </nav>

        {/* Hero Banner Section with Image */}
        <section style={{ position: 'relative', minHeight: '1000px', display: 'flex', alignItems: 'center', justifyContent: 'center', overflow: 'hidden', marginTop: '70px' }}>
          {/* Background Image */}
          <div style={{ 
            position: 'absolute', 
            top: 0, 
            left: 0, 
            width: '100%', 
            height: '100%', 
            backgroundImage: "url('/images/homepage.jpg')",
            backgroundSize: 'cover',
            backgroundPosition: 'center',
            backgroundRepeat: 'no-repeat',
            filter: 'brightness(0.7)',
            zIndex: 0
          }} />
          
          {/* Gradient Overlay */}
          <div style={{ 
            position: 'absolute', 
            top: 0, 
            left: 0, 
            width: '100%', 
            height: '100%', 
      
            zIndex: 1
          }} />
          
          {/* Content */}
          <div style={{ position: 'relative', zIndex: 2, textAlign: 'center', maxWidth: '1100px', margin: '0 auto', padding: '0 24px' }}>
            <div style={{ display: 'inline-flex', alignItems: 'center', gap: '8px', background: 'rgba(255,255,255,0.15)', backdropFilter: 'blur(10px)', padding: '10px 24px', borderRadius: '50px', fontSize: '14px', fontWeight: '700', marginBottom: '32px', border: '1px solid rgba(255,255,255,0.2)' }}>
              <Sparkles size={18} color="white" />
              <span style={{ color: 'white' }}>AI-Powered Video Summarization</span>
            </div>

            <h1 style={{ fontSize: '45px', fontWeight: '900', lineHeight: '1.1', color: 'white', marginBottom: '28px', textShadow: '0 4px 40px rgba(0,0,0,0.5)', animation: 'fadeIn 0.8s ease-out' }}>
              Transform hours of video<br />
              into <span style={{ background: 'linear-gradient(135deg, #fcf7f7ff, #a91c06ff)', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent', textShadow: 'none' }}>minutes of insight</span>
            </h1>

            <p style={{ fontSize: '24px', color: 'rgba(255,255,255,0.95)', marginBottom: '48px', textShadow: '0 2px 20px rgba(0,0,0,0.5)', lineHeight: '1.6', animation: 'fadeIn 1s ease-out' }}>
              Get AI-powered summaries, key points, and timestamps from any YouTube video.<br />
              Save <strong style={{ fontWeight: '800', color: 'white' }}>90% of your time</strong> with intelligent video analysis.
            </p>

            <div style={{ display: 'flex', gap: '16px', justifyContent: 'center', alignItems: 'center', marginBottom: '24px', animation: 'fadeIn 1.2s ease-out', flexWrap: 'wrap' }}>
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="Enter your email"
                style={{
                  width: '380px',
                  padding: '18px 24px',
                  fontSize: '16px',
                  border: '2px solid rgba(255,255,255,0.3)',
                  borderRadius: '12px',
                  outline: 'none',
                  background: 'rgba(255,255,255,0.15)',
                  backdropFilter: 'blur(10px)',
                  color: 'white',
                  transition: 'all 0.3s'
                }}
                onFocus={(e) => { e.target.style.background = 'rgba(255,255,255,0.25)'; e.target.style.borderColor = 'rgba(255,255,255,0.5)'; }}
                onBlur={(e) => { e.target.style.background = 'rgba(255,255,255,0.15)'; e.target.style.borderColor = 'rgba(255,255,255,0.3)'; }}
              />
              <button
                onClick={() => user ? onNavigate('chat') : onNavigate('signup')}
                style={{
                  padding: '18px 40px',
                  background: 'white',
                  border: 'none',
                  borderRadius: '12px',
                  color: '#050505ff',
                  fontSize: '18px',
                  fontWeight: '700',
                  cursor: 'pointer',
                  boxShadow: '0 10px 40px rgba(0,0,0,0.4)',
                  transition: 'all 0.3s',
                  whiteSpace: 'nowrap'
                }}
                onMouseEnter={(e) => { e.target.style.transform = 'translateY(-3px)'; e.target.style.boxShadow = '0 15px 50px rgba(0,0,0,0.5)'; }}
                onMouseLeave={(e) => { e.target.style.transform = 'translateY(0)'; e.target.style.boxShadow = '0 10px 40px rgba(0,0,0,0.4)'; }}
              >
                Start Free Trial
              </button>
            </div>

            <div style={{ display: 'flex', gap: '32px', justifyContent: 'center', alignItems: 'center', fontSize: '16px', color: 'rgba(255,255,255,0.95)', animation: 'fadeIn 1.4s ease-out' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                <Check size={20} color="#10b981" strokeWidth={3} />
                <span>Free 14-day trial</span>
              </div>
              <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                <Check size={20} color="#10b981" strokeWidth={3} />
                <span>No credit card required</span>
              </div>
            </div>
          </div>
        </section>

        {/* Original Hero Section with Yellow Background - Now below */}
        <section style={{ padding: '80px 24px 0', maxWidth: '1400px', margin: '0 auto' }}>
          <div style={{ textAlign: 'center', marginBottom: '60px' }}>
            <h2 style={{ fontSize: '48px', fontWeight: '900', lineHeight: '1.1', color: theme.text, marginBottom: '20px' }}>
              See SparkClip in Action
            </h2>
            <p style={{ fontSize: '20px', color: theme.textMuted, marginBottom: '40px' }}>
              Watch how our AI transforms lengthy videos into actionable insights
            </p>
          </div>

          {/* Hero Image with Person */}
          <div style={{ position: 'relative', marginBottom: '-1px' }}>
            <div style={{ 
               backgroundImage: "url('/images/photo1.jpg')",
              position: 'relative', 
              background: 'linear-gradient(135deg, #dfe0e5ff 0%, #ebeaf7ff 50%, #141415ff 100%)', 
              borderRadius: '4px 4px 0 0',
              padding: '70px 10px',
              display: 'flex',
              justifyContent: 'center',
              alignItems: 'center',
              minHeight: '600px',
              overflow: 'hidden'
            }}>
              {/* Circular Pattern Background */}
              <div style={{ position: 'absolute', top: '50%', left: '50%', transform: 'translate(-50%, -50%)', width: '900px', height: '900px', pointerEvents: 'none' }}>
                {[...Array(7)].map((_, i) => (
                  <div key={i} style={{ 
                    position: 'absolute',
                    top: '50%',
                    left: '50%',
                    transform: 'translate(-50%, -50%)',
                    width: `${200 + i * 100}px`,
                    height: `${200 + i * 100}px`,
                    border: '3px solid rgba(251, 191, 36, 0.25)',
                    borderRadius: '50%'
                  }} />
                ))}
              </div>

              {/* Person Image */}
              <img 
                src="/images/photo1.jpg" 
                alt="Customer using SparkClip" 
                style={{ 
                  position: 'relative',
                  width: '900px', 
                  height: 'auto', 
                  objectFit: 'contain',
                  zIndex: 2
                }} 
              />

              {/* Chat Bubbles */}
              {/* User Message - Top Right */}
              <div style={{ position: 'absolute', top: '120px', right: '120px', animation: 'float 4s ease-in-out infinite', zIndex: 3, maxWidth: '320px' }}>
                <div style={{ display: 'flex', alignItems: 'flex-start', gap: '8px', marginBottom: '8px', justifyContent: 'flex-end' }}>
                  <span style={{ fontSize: '13px', fontWeight: '600', color: '#666', marginTop: '8px' }}>Sarah</span>
                  <img src="https://i.pravatar.cc/40?img=5" style={{ width: '36px', height: '36px', borderRadius: '50%' }} alt="user" />
                </div>
                <div style={{ background: 'white', padding: '16px 20px', borderRadius: '16px 16px 4px 16px', boxShadow: '0 8px 30px rgba(0,0,0,0.15)' }}>
                  <p style={{ fontSize: '15px', color: '#1a1a1a', margin: 0, lineHeight: '1.5' }}>Can you summarize this 45-minute lecture video for me?</p>
                </div>
              </div>

              {/* Bot Response - Left */}
              <div style={{ position: 'absolute', top: '200px', left: '80px', animation: 'float 4s ease-in-out infinite 0.5s', zIndex: 3, maxWidth: '360px' }}>
                <div style={{ display: 'flex', alignItems: 'flex-start', gap: '12px' }}>
                  <div style={{ width: '40px', height: '40px', background: '#050505ff', borderRadius: '50%', display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0 }}>
                    <Brain size={22} color="white" />
                  </div>
                  <div>
                    <div style={{ fontSize: '12px', color: '#666', marginBottom: '6px', fontWeight: '600' }}>SparkClip AI</div>
                    <div style={{ background: '#050505ff', padding: '16px 20px', borderRadius: '16px 16px 16px 4px', boxShadow: '0 8px 30px rgba(128, 0, 32, 0.4)' }}>
                      <p style={{ fontSize: '15px', color: 'white', margin: 0, lineHeight: '1.5' }}>Sure! Here's a comprehensive summary with key points and timestamps.</p>
                    </div>
                  </div>
                </div>
              </div>

              {/* User Response - Bottom Right */}
              <div style={{ position: 'absolute', bottom: '120px', right: '120px', animation: 'float 4s ease-in-out infinite 1s', zIndex: 3, maxWidth: '280px' }}>
                <div style={{ display: 'flex', alignItems: 'flex-start', gap: '8px', marginBottom: '8px', justifyContent: 'flex-end' }}>
                  <span style={{ fontSize: '13px', fontWeight: '600', color: '#666', marginTop: '8px' }}>Sarah</span>
                  <img src="https://i.pravatar.cc/40?img=5" style={{ width: '36px', height: '36px', borderRadius: '50%' }} alt="user" />
                </div>
                <div style={{ background: 'white', padding: '16px 20px', borderRadius: '16px 16px 4px 16px', boxShadow: '0 8px 30px rgba(0,0,0,0.15)' }}>
                  <p style={{ fontSize: '15px', color: '#1a1a1a', margin: 0, lineHeight: '1.5' }}>Perfect! This saved me so much time.</p>
                </div>
              </div>

              {/* Floating Chat Widget - Bottom Right Corner */}
              <div style={{ position: 'absolute', bottom: '40px', right: '40px', zIndex: 4 }}>
                <div style={{ background: 'white', borderRadius: '16px', padding: '20px 24px', boxShadow: '0 12px 40px rgba(0,0,0,0.2)', minWidth: '280px' }}>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '12px', marginBottom: '12px' }}>
                    <div style={{ display: 'flex', gap: '-8px' }}>
                      <img src="https://i.pravatar.cc/32?img=1" style={{ width: '32px', height: '32px', borderRadius: '50%', border: '2px solid white' }} alt="user1" />
                      <img src="https://i.pravatar.cc/32?img=2" style={{ width: '32px', height: '32px', borderRadius: '50%', border: '2px solid white', marginLeft: '-12px' }} alt="user2" />
                      <img src="https://i.pravatar.cc/32?img=3" style={{ width: '32px', height: '32px', borderRadius: '50%', border: '2px solid white', marginLeft: '-12px' }} alt="user3" />
                    </div>
                  </div>
                  <p style={{ fontSize: '16px', fontWeight: '700', color: '#1a1a1a', marginBottom: '8px' }}>Hello 👋</p>
                  <p style={{ fontSize: '14px', color: '#666', marginBottom: '12px', lineHeight: '1.5' }}>Welcome to SparkClip!<br />Try our AI video summarizer</p>
                  <button style={{ width: '100%', padding: '10px', background: '#2563eb', border: 'none', borderRadius: '8px', color: 'white', fontSize: '14px', fontWeight: '700', cursor: 'pointer', marginBottom: '8px' }}>Free trial</button>
                  <button style={{ width: '100%', padding: '10px', background: '#1a1a1a', border: 'none', borderRadius: '8px', color: 'white', fontSize: '14px', fontWeight: '700', cursor: 'pointer' }}>💬 Product expert</button>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Stats Section */}
        <section style={{ padding: '60px 24px', background: theme.sectionBg, borderTop: `1px solid ${theme.border}`, borderBottom: `1px solid ${theme.border}` }}>
          <div style={{ maxWidth: '1200px', margin: '0 auto' }}>
            <div className="stats-grid" style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: '40px', textAlign: 'center' }}>
              {stats.map((stat, idx) => {
                const Icon = stat.icon;
                return (
                  <div key={idx} style={{ animation: `scaleIn 0.8s ease-out ${idx * 0.1}s both` }}>
                    <Icon size={32} color="#050505ff" style={{ marginBottom: '12px', margin: '0 auto' }} />
                    <div style={{ fontSize: '48px', fontWeight: '900', color: '#050505ff', marginBottom: '8px' }}>{stat.value}</div>
                    <div style={{ fontSize: '15px', color: theme.textMuted, fontWeight: '600' }}>{stat.label}</div>
                  </div>
                );
              })}
            </div>
          </div>
        </section>

        {/* Section 1: Instant Summaries */}
        <section style={{ padding: '100px 24px', background: theme.bg }}>
          <div className="section-grid" style={{ maxWidth: '1400px', margin: '0 auto', display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '80px', alignItems: 'center' }}>
            <div style={{ animation: 'slideIn 1s ease-out' }}>
              <h2 style={{ fontSize: '56px', fontWeight: '900', color: theme.text, marginBottom: '24px', lineHeight: '1.1' }}>
                Get instant video summaries
              </h2>
              <p style={{ fontSize: '20px', color: theme.textMuted, marginBottom: '32px', lineHeight: '1.7' }}>
                Simply paste a YouTube URL and our AI analyzes the entire video to extract key insights, main topics, and important timestamps in seconds.
              </p>
              <button onClick={() => user ? onNavigate('chat') : onNavigate('signup')} style={{ padding: '16px 36px', background: '#1a1a1a', border: 'none', borderRadius: '12px', color: 'white', fontSize: '16px', fontWeight: '700', cursor: 'pointer', transition: 'all 0.3s' }} onMouseEnter={(e) => e.target.style.transform = 'translateY(-2px)'} onMouseLeave={(e) => e.target.style.transform = 'translateY(0)'}>
                Try It Now
              </button>
            </div>

            {/* Chat Mockup 1 */}
            <div className="chat-mockup" style={{ background: theme.chatBg, borderRadius: '20px', padding: '32px', boxShadow: isDarkMode ? '0 20px 60px rgba(0,0,0,0.5)' : '0 20px 60px rgba(0,0,0,0.15)', animation: 'fadeIn 1.2s ease-out', border: `1px solid ${theme.border}` }}>
              <div style={{ marginBottom: '20px', textAlign: 'right' }}>
                <div style={{ display: 'inline-flex', alignItems: 'center', gap: '8px', marginBottom: '8px' }}>
                  <span style={{ fontSize: '13px', fontWeight: '600', color: theme.textMuted }}>You</span>
                  <div style={{ width: '32px', height: '32px', background: '#10b981', borderRadius: '50%', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '14px', fontWeight: '700', color: 'white' }}>
                    U
                  </div>
                </div>
                <div style={{ background: isDarkMode ? '#2a2a2a' : '#f3f4f6', padding: '14px 18px', borderRadius: '16px 16px 4px 16px', display: 'inline-block', textAlign: 'left', maxWidth: '80%' }}>
                  <p style={{ fontSize: '15px', color: theme.text, margin: 0 }}>Summarize this 2-hour machine learning tutorial video for me</p>
                </div>
              </div>

              <div style={{ marginBottom: '20px' }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '8px' }}>
                  <div style={{ width: '32px', height: '32px', background: '#050505ff', borderRadius: '50%', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                    <Brain size={18} color="white" />
                  </div>
                  <span style={{ fontSize: '13px', fontWeight: '600', color: theme.textMuted }}>SparkClip AI</span>
                </div>
                <div style={{ background: '#050505ff', padding: '16px 20px', borderRadius: '16px 16px 16px 4px', maxWidth: '85%' }}>
                  <p style={{ fontSize: '15px', color: 'white', margin: 0, marginBottom: '12px' }}>Here's your comprehensive summary:</p>
                  <div style={{ background: 'rgba(255,255,255,0.1)', padding: '12px', borderRadius: '8px', fontSize: '14px', color: 'rgba(255,255,255,0.95)', lineHeight: '1.6' }}>
                    📌 Introduction to neural networks<br />
                    📌 Backpropagation explained<br />
                    📌 Training optimization techniques<br />
                    📌 Real-world implementation examples<br />
                    <br />
                    ⏱️ Key timestamps included
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Section 2: Ask Questions */}
        <section style={{ padding: '100px 24px', background: theme.sectionBg }}>
          <div className="section-grid" style={{ maxWidth: '1400px', margin: '0 auto', display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '80px', alignItems: 'center' }}>
            {/* Chat Mockup 2 */}
            <div className="chat-mockup" style={{ background: theme.chatBg, borderRadius: '20px', padding: '32px', boxShadow: isDarkMode ? '0 20px 60px rgba(0,0,0,0.5)' : '0 20px 60px rgba(0,0,0,0.15)', animation: 'fadeIn 1.2s ease-out', border: `1px solid ${theme.border}` }}>
              <div style={{ textAlign: 'center', marginBottom: '24px' }}>
                <div style={{ display: 'inline-flex', alignItems: 'center', gap: '8px', padding: '10px 20px', background: theme.sectionBg, borderRadius: '12px' }}>
                  <div style={{ width: '8px', height: '8px', borderRadius: '50%', background: '#10b981', animation: 'pulse 2s infinite' }} />
                  <span style={{ fontSize: '13px', fontWeight: '700', color: theme.text }}>Chat with your video</span>
                </div>
              </div>

              <div style={{ marginBottom: '20px', textAlign: 'right' }}>
                <div style={{ display: 'inline-flex', alignItems: 'center', gap: '8px', marginBottom: '8px' }}>
                  <div style={{ width: '28px', height: '28px', background: '#10b981', borderRadius: '50%', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '12px', fontWeight: '700', color: 'white' }}>
                    U
                  </div>
                </div>
                <div style={{ background: isDarkMode ? '#2a2a2a' : '#f3f4f6', padding: '12px 16px', borderRadius: '16px 16px 4px 16px', display: 'inline-block', textAlign: 'left', maxWidth: '75%' }}>
                  <p style={{ fontSize: '14px', color: theme.text, margin: 0 }}>At what timestamp do they explain deployment?</p>
                </div>
              </div>

              <div style={{ marginBottom: '20px' }}>
                <div style={{ display: 'flex', gap: '8px', marginBottom: '8px' }}>
                  <div style={{ width: '28px', height: '28px', background: '#050505ff', borderRadius: '50%', display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0 }}>
                    <Search size={14} color="white" />
                  </div>
                </div>
                <div style={{ background: '#050505ff', padding: '14px 18px', borderRadius: '16px 16px 16px 4px', maxWidth: '85%' }}>
                  <p style={{ fontSize: '14px', color: 'white', margin: 0, marginBottom: '8px' }}>Found it! Deployment is covered at:</p>
                  <div style={{ background: 'rgba(255,255,255,0.15)', padding: '10px', borderRadius: '8px', fontSize: '13px', color: 'white' }}>
                    ⏱️ 1:24:15 - Deployment overview<br />
                    ⏱️ 1:28:40 - Docker setup<br />
                    ⏱️ 1:35:20 - Cloud deployment
                  </div>
                  <div style={{ marginTop: '8px', fontSize: '11px', color: 'rgba(255,255,255,0.7)', display: 'flex', alignItems: 'center', gap: '4px' }}>
                    <Sparkles size={12} />
                    <span>AI-powered search</span>
                  </div>
                </div>
              </div>
            </div>

            <div style={{ animation: 'slideIn 1s ease-out' }}>
              <h2 style={{ fontSize: '56px', fontWeight: '900', color: theme.text, marginBottom: '24px', lineHeight: '1.1' }}>
                Ask questions, get precise answers
              </h2>
              <p style={{ fontSize: '20px', color: theme.textMuted, marginBottom: '32px', lineHeight: '1.7' }}>
                Chat with your video content using our RAG-powered AI. Get instant answers with exact timestamps and contextual information.
              </p>
              <button onClick={() => user ? onNavigate('chat') : onNavigate('signup')} style={{ padding: '16px 36px', background: '#1a1a1a', border: 'none', borderRadius: '12px', color: 'white', fontSize: '16px', fontWeight: '700', cursor: 'pointer', transition: 'all 0.3s' }} onMouseEnter={(e) => e.target.style.transform = 'translateY(-2px)'} onMouseLeave={(e) => e.target.style.transform = 'translateY(0)'}>
                Try It Now
              </button>
            </div>
          </div>
        </section>

        {/* Features Section */}
        <section id="features" style={{ padding: '100px 24px', background: theme.bg }}>
          <div style={{ maxWidth: '1200px', margin: '0 auto', textAlign: 'center', marginBottom: '60px' }}>
            <h2 style={{ fontSize: '52px', fontWeight: '900', color: theme.text, marginBottom: '20px' }}>Powerful Features</h2>
            <p style={{ fontSize: '20px', color: theme.textMuted }}>Everything you need to extract knowledge from videos</p>
          </div>

          <div className="features-grid" style={{ maxWidth: '1200px', margin: '0 auto', display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '32px' }}>
            {features.map((feature, idx) => {
              const Icon = feature.icon;
              return (
                <div key={idx} style={{ padding: '32px', background: theme.cardBg, borderRadius: '16px', border: `1px solid ${theme.border}`, transition: 'all 0.3s', cursor: 'pointer', animation: `fadeIn 0.8s ease-out ${idx * 0.1}s both` }} onMouseEnter={(e) => { e.currentTarget.style.transform = 'translateY(-8px)'; e.currentTarget.style.boxShadow = isDarkMode ? '0 20px 40px rgba(0,0,0,0.3)' : '0 20px 40px rgba(0,0,0,0.1)'; }} onMouseLeave={(e) => { e.currentTarget.style.transform = 'translateY(0)'; e.currentTarget.style.boxShadow = 'none'; }}>
                  <div style={{ width: '56px', height: '56px', background: theme.sectionBg, borderRadius: '12px', display: 'flex', alignItems: 'center', justifyContent: 'center', marginBottom: '20px' }}>
                    <Icon size={28} color={feature.color} />
                  </div>
                  <h3 style={{ fontSize: '20px', fontWeight: '800', color: theme.text, marginBottom: '12px' }}>{feature.title}</h3>
                  <p style={{ color: theme.textMuted, lineHeight: '1.7', fontSize: '15px' }}>{feature.desc}</p>
                </div>
              );
            })}
          </div>
        </section>

        {/* How It Works */}
        <section id="how-it-works" style={{ padding: '100px 24px', background: theme.sectionBg }}>
          <div style={{ maxWidth: '1200px', margin: '0 auto', textAlign: 'center', marginBottom: '60px' }}>
            <h2 style={{ fontSize: '52px', fontWeight: '900', color: theme.text, marginBottom: '20px' }}>How It Works</h2>
            <p style={{ fontSize: '20px', color: theme.textMuted }}>Get video summaries in three simple steps</p>
          </div>

          <div className="how-it-works-grid" style={{ maxWidth: '1200px', margin: '0 auto', display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '60px' }}>
            {howItWorks.map((step, idx) => {
              const Icon = step.icon;
              return (
                <div key={idx} style={{ textAlign: 'center', animation: `scaleIn 0.8s ease-out ${idx * 0.2}s both` }}>
                  <div style={{ position: 'relative', display: 'inline-block', marginBottom: '24px' }}>
                    <div style={{ width: '120px', height: '120px', background: 'linear-gradient(135deg, #050505ff, #4d23f3ff)', borderRadius: '50%', display: 'flex', alignItems: 'center', justifyContent: 'center', boxShadow: '0 10px 40px rgba(128, 0, 32, 0.3)' }}>
                      <Icon size={50} strokeWidth={2.5} color="white" />
                    </div>
                    <div style={{ position: 'absolute', top: '-10px', right: '-10px', width: '44px', height: '44px', background: '#050505ff', borderRadius: '50%', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '20px', fontWeight: '900', color: 'white', border: `4px solid ${theme.bg}`, boxShadow: '0 4px 20px rgba(128, 0, 32, 0.3)' }}>
                      {step.step}
                    </div>
                  </div>
                  <h3 style={{ fontSize: '24px', fontWeight: '800', color: theme.text, marginBottom: '12px' }}>{step.title}</h3>
                  <p style={{ fontSize: '16px', color: theme.textMuted, lineHeight: '1.7' }}>{step.desc}</p>
                </div>
              );
            })}
          </div>
        </section>

        {/* Testimonials */}
        <section id="testimonials" style={{ padding: '100px 24px', background: theme.bg }}>
          <div style={{ maxWidth: '1200px', margin: '0 auto', textAlign: 'center', marginBottom: '60px' }}>
            <h2 style={{ fontSize: '52px', fontWeight: '900', color: theme.text, marginBottom: '20px' }}>What Our Users Say</h2>
            <p style={{ fontSize: '20px', color: theme.textMuted }}>Join thousands of satisfied users</p>
          </div>

          <div className="testimonials-grid" style={{ maxWidth: '1200px', margin: '0 auto', display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '32px' }}>
            {testimonials.map((testimonial, idx) => (
              <div key={idx} style={{ padding: '32px', background: theme.cardBg, borderRadius: '16px', border: `1px solid ${theme.border}`, animation: `fadeIn 0.8s ease-out ${idx * 0.1}s both` }}>
                <div style={{ display: 'flex', gap: '4px', marginBottom: '16px' }}>
                  {[...Array(testimonial.rating)].map((_, i) => (
                    <Star key={i} size={18} fill="#050505ff" color="#050505ff" />
                  ))}
                </div>
                <p style={{ fontSize: '15px', color: theme.textMuted, lineHeight: '1.7', marginBottom: '24px' }}>"{testimonial.text}"</p>
                <div style={{ display: 'flex', alignItems: 'center', gap: '12px', paddingTop: '20px', borderTop: `1px solid ${theme.border}` }}>
                  <img src={testimonial.avatar} style={{ width: '48px', height: '48px', borderRadius: '50%' }} alt={testimonial.name} />
                  <div>
                    <p style={{ fontWeight: '700', fontSize: '15px', color: theme.text }}>{testimonial.name}</p>
                    <p style={{ color: theme.textMuted, fontSize: '13px' }}>{testimonial.role}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* CTA Section */}
        <section style={{ padding: '100px 24px', background: 'linear-gradient(135deg, #dbe3fbff 0%, #818184ff 100%)', position: 'relative', overflow: 'hidden' }}>
          <div style={{ maxWidth: '1400px', margin: '0 auto', display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '60px', alignItems: 'center' }}>
            {/* Left Side - Text Content */}
            <div style={{ position: 'relative', zIndex: 2 }}>
              <h2 style={{ fontSize: '52px', fontWeight: '900', color: 'white', marginBottom: '20px', textShadow: '0 4px 30px rgba(0,0,0,0.3)', lineHeight: '1.1' }}>
                Ready to save hours of time?
              </h2>
              <p style={{ fontSize: '20px', color: 'rgba(255,255,255,0.95)', marginBottom: '32px', lineHeight: '1.6' }}>
                Join 50,000+ users who are already transforming videos into knowledge with AI-powered summaries
              </p>
              <button 
                onClick={() => user ? onNavigate('chat') : onNavigate('signup')} 
                style={{ 
                  padding: '18px 40px', 
                  background: 'white', 
                  border: 'none', 
                  borderRadius: '12px', 
                  color: '#050505ff', 
                  fontSize: '18px', 
                  fontWeight: '700', 
                  cursor: 'pointer', 
                  boxShadow: '0 10px 40px rgba(0,0,0,0.3)', 
                  transition: 'all 0.3s',
                  marginBottom: '16px'
                }} 
                onMouseEnter={(e) => { e.target.style.transform = 'scale(1.05)'; e.target.style.boxShadow = '0 15px 50px rgba(0,0,0,0.4)'; }} 
                onMouseLeave={(e) => { e.target.style.transform = 'scale(1)'; e.target.style.boxShadow = '0 10px 40px rgba(0,0,0,0.3)'; }}
              >
                Start Free Trial
              </button>
              <p style={{ fontSize: '14px', color: 'rgba(255,255,255,0.9)' }}>
                <Check size={16} color="#10b981" style={{ display: 'inline', marginRight: '6px' }} />
                No credit card required • Free 14-day trial
              </p>
            </div>

            {/* Right Side - Image */}
            <div className="cta-image-container" style={{ position: 'relative', display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
              {/* Animated Background Elements */}
              <div style={{ position: 'absolute', top: '10%', left: '5%', width: '100px', height: '100px', background: 'rgba(255,255,255,0.08)', borderRadius: '50%', animation: 'float 6s ease-in-out infinite' }} />
              <div style={{ position: 'absolute', bottom: '15%', right: '10%', width: '120px', height: '120px', background: 'rgba(255,255,255,0.06)', borderRadius: '50%', animation: 'float 8s ease-in-out infinite 1s' }} />
              
              {/* Floating Icons */}
              <div style={{ position: 'absolute', top: '10%', right: '15%', animation: 'float 5s ease-in-out infinite' }}>
                <Video size={35} color="rgba(255,255,255,0.25)" strokeWidth={2} />
              </div>
              <div style={{ position: 'absolute', bottom: '20%', left: '10%', animation: 'float 7s ease-in-out infinite 2s' }}>
                <Brain size={40} color="rgba(255,255,255,0.2)" strokeWidth={2} />
              </div>
              
              {/* Main Image */}
             
               <img 
                src="/images/photo2.avif" 
              
                style={{ 
                  position: 'relative',
                  width: '100%',
                  maxWidth: '500px',
                  height: 'auto',
                  borderRadius: '20px',
                  
                  zIndex: 1
                }} 
              />
            </div>
          </div>
        </section>

        {/* Footer */}
        <footer style={{ background: theme.sectionBg, borderTop: `1px solid ${theme.border}`, padding: '60px 24px 30px', textAlign: 'center' }}>
          <div style={{ maxWidth: '1400px', margin: '0 auto' }}>
            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '12px', marginBottom: '20px' }}>
              <div style={{ width: '40px', height: '40px', background: 'linear-gradient(135deg, #050505ff, ##050505ff)', borderRadius: '10px', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                <Video size={22} color="white" />
              </div>
              <span style={{ fontSize: '24px', fontWeight: '900', color: theme.text }}>SparkClip</span>
            </div>
            <p style={{ color: theme.textMuted, marginBottom: '20px', fontSize: '14px' }}>Transform videos into knowledge with AI-powered summarization</p>
            <p style={{ color: theme.textMuted, fontSize: '13px', opacity: 0.7 }}>© 2026 SparkClip by jana maryem ramy hatem nader </p>
          </div>
        </footer>
      </div>
    </React.Fragment>
  );
}