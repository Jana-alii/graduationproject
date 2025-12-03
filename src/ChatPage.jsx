import React, { useState, useRef, useEffect } from 'react';
import { Send, Video, LogOut, User, Bot, Download, Loader, Home } from 'lucide-react';

export default function ChatPage({ user, onLogout, onNavigate, theme }) {
  const [messages, setMessages] = useState([
    {
      type: 'assistant',
      content: 'Hi! I\'m your AI video summarizer. Send me a YouTube link and I\'ll extract the key insights for you! 🎬'
    }
  ]);
  const [input, setInput] = useState('');
  const [isProcessing, setIsProcessing] = useState(false);
  const messagesEndRef = useRef(null);
  const inputRef = useRef(null);

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

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  useEffect(() => {
    if (inputRef.current) {
      inputRef.current.focus();
    }
  }, [isProcessing]);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  const isYouTubeLink = (text) => {
    return text.includes('youtube.com') || text.includes('youtu.be');
  };

  const handleSend = async () => {
    if (!input.trim() || isProcessing) return;

    const userMessage = input.trim();
    setInput('');
    setMessages(prev => [...prev, { type: 'user', content: userMessage }]);

    if (isYouTubeLink(userMessage)) {
      setIsProcessing(true);
      setMessages(prev => [...prev, { 
        type: 'assistant', 
        content: 'Processing your video...',
        isLoading: true
      }]);

      setTimeout(() => {
        setMessages(prev => {
          const newMessages = [...prev];
          newMessages[newMessages.length - 1] = {
            type: 'assistant',
            content: `**Video Summary**

**Title:** Sample YouTube Video

**Key Points:**
• Main point 1: Important information from the video
• Main point 2: Another crucial insight discussed
• Main point 3: Key takeaway for viewers

**Timestamps:**
• [0:00] Introduction to the topic
• [2:30] Discussion of main concepts
• [5:45] Practical examples and demonstrations
• [8:15] Conclusion and final thoughts

**Summary:**
This video covers essential concepts about the topic. The presenter explains key ideas with clear examples and provides actionable insights for viewers to apply.

**Sentiment:** Informative and Educational
**Duration:** ~10 minutes`,
            hasDownload: true
          };
          return newMessages;
        });
        setIsProcessing(false);
      }, 2500);
    } else {
      setMessages(prev => [...prev, {
        type: 'assistant',
        content: 'Please send me a YouTube link to summarize. I can extract key points, timestamps, and insights from any video! 🎥'
      }]);
    }
  };

  const handleKeyPress = (e) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSend();
    }
  };

  const downloadSummary = (content) => {
    const blob = new Blob([content], { type: 'text/plain' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = 'video-summary.txt';
    a.click();
    URL.revokeObjectURL(url);
  };

  return (
    <div style={{ height: '100vh', display: 'flex', flexDirection: 'column', background: '#000' }}>
      {/* Header */}
      <div style={{ 
        borderBottom: '1px solid rgba(255,255,255,0.1)', 
        padding: '16px 24px', 
        display: 'flex', 
        justifyContent: 'space-between', 
        alignItems: 'center',
        background: 'rgba(0,0,0,0.8)',
        backdropFilter: 'blur(20px)'
      }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
          <div style={{ width: '40px', height: '40px', background: colors.primary, borderRadius: '10px', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
            <Video size={22} />
          </div>
          <div>
            <div style={{ fontSize: '16px', fontWeight: '700', color: 'white' }}>VideoSum AI</div>
            <div style={{ fontSize: '12px', color: '#9ca3af' }}>Video Summarizer</div>
          </div>
        </div>
        
        <div style={{ display: 'flex', alignItems: 'center', gap: '12px', flexWrap: 'wrap' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '8px', padding: '8px 16px', background: 'rgba(255,255,255,0.05)', borderRadius: '12px' }}>
            <User size={18} color={colors.primary} />
            <span style={{ fontSize: '14px', color: 'white', fontWeight: '600' }}>{user?.name}</span>
          </div>
          
          <button
            onClick={() => onNavigate('home')}
            style={{ padding: '8px 16px', background: 'transparent', border: '1px solid rgba(255,255,255,0.2)', borderRadius: '10px', color: 'white', fontSize: '14px', fontWeight: '600', cursor: 'pointer', display: 'flex', alignItems: 'center', gap: '8px', transition: 'all 0.3s ease' }}
            onMouseEnter={(e) => { e.target.style.borderColor = colors.primary; e.target.style.color = colors.primary; }}
            onMouseLeave={(e) => { e.target.style.borderColor = 'rgba(255,255,255,0.2)'; e.target.style.color = 'white'; }}
          >
            <Home size={16} />
            <span style={{ display: 'inline' }}>Home</span>
          </button>
          
          <button
            onClick={onLogout}
            style={{ padding: '8px 16px', background: 'transparent', border: '1px solid rgba(255,255,255,0.2)', borderRadius: '10px', color: 'white', fontSize: '14px', fontWeight: '600', cursor: 'pointer', display: 'flex', alignItems: 'center', gap: '8px', transition: 'all 0.3s ease' }}
            onMouseEnter={(e) => { e.target.style.borderColor = colors.primary; e.target.style.color = colors.primary; }}
            onMouseLeave={(e) => { e.target.style.borderColor = 'rgba(255,255,255,0.2)'; e.target.style.color = 'white'; }}
          >
            <LogOut size={16} />
            <span style={{ display: 'inline' }}>Logout</span>
          </button>
        </div>
      </div>

      {/* Messages Container */}
      <div style={{ 
        flex: 1, 
        overflowY: 'auto', 
        padding: '24px',
        display: 'flex',
        flexDirection: 'column'
      }}>
        <div style={{ maxWidth: '800px', width: '100%', margin: '0 auto' }}>
          {messages.map((message, index) => (
            <div 
              key={index} 
              style={{ 
                marginBottom: '24px',
                display: 'flex',
                gap: '16px',
                animation: 'fadeIn 0.3s ease-out'
              }}
            >
              <div style={{ 
                width: '36px', 
                height: '36px', 
                borderRadius: '8px', 
                background: message.type === 'user' ? 'rgba(255,255,255,0.1)' : colors.primary,
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                flexShrink: 0
              }}>
                {message.type === 'user' ? <User size={20} /> : <Bot size={20} />}
              </div>

              <div style={{ flex: 1, minWidth: 0 }}>
                <div style={{ 
                  fontSize: '14px', 
                  fontWeight: '600', 
                  color: message.type === 'user' ? 'white' : colors.primary,
                  marginBottom: '8px'
                }}>
                  {message.type === 'user' ? 'You' : 'VideoSum AI'}
                </div>
                
                {message.isLoading ? (
                  <div style={{ display: 'flex', alignItems: 'center', gap: '12px', color: '#9ca3af' }}>
                    <Loader size={16} style={{ animation: 'spin 1s linear infinite' }} />
                    <span>{message.content}</span>
                  </div>
                ) : (
                  <div>
                    <div style={{ 
                      color: '#d1d5db', 
                      fontSize: '15px', 
                      lineHeight: '1.7',
                      whiteSpace: 'pre-wrap',
                      wordBreak: 'break-word',
                      fontFamily: message.type === 'assistant' ? 'system-ui' : 'inherit'
                    }}>
                      {message.content}
                    </div>
                    
                    {message.hasDownload && (
                      <button
                        onClick={() => downloadSummary(message.content)}
                        style={{ 
                          marginTop: '16px',
                          padding: '10px 20px',
                          background: colors.primary,
                          border: 'none',
                          borderRadius: '8px',
                          color: 'white',
                          fontSize: '14px',
                          fontWeight: '600',
                          cursor: 'pointer',
                          display: 'flex',
                          alignItems: 'center',
                          gap: '8px',
                          transition: 'all 0.3s ease'
                        }}
                        onMouseEnter={(e) => e.target.style.opacity = '0.9'}
                        onMouseLeave={(e) => e.target.style.opacity = '1'}
                      >
                        <Download size={16} />
                        Download Summary
                      </button>
                    )}
                  </div>
                )}
              </div>
            </div>
          ))}
          <div ref={messagesEndRef} />
        </div>
      </div>

      {/* Input Area */}
      <div style={{ 
        borderTop: '1px solid rgba(255,255,255,0.1)', 
        padding: '20px 24px',
        background: 'rgba(0,0,0,0.8)',
        backdropFilter: 'blur(20px)'
      }}>
        <div style={{ maxWidth: '800px', margin: '0 auto' }}>
          <div style={{ 
            display: 'flex', 
            gap: '8px',
            background: 'rgba(255,255,255,0.05)',
            borderRadius: '16px',
            padding: '4px',
            border: '1px solid rgba(255,255,255,0.1)'
          }}>
            <input
              ref={inputRef}
              type="text"
              value={input}
              onChange={(e) => setInput(e.target.value)}
              onKeyPress={handleKeyPress}
              placeholder="Paste a YouTube link..."
              disabled={isProcessing}
              style={{ 
                flex: 1,
                background: 'transparent',
                border: 'none',
                outline: 'none',
                color: 'white',
                fontSize: '15px',
                padding: '14px 16px',
                fontFamily: 'inherit',
                minWidth: 0
              }}
            />
            <button
              onClick={handleSend}
              disabled={!input.trim() || isProcessing}
              style={{ 
                padding: '12px 20px',
                background: input.trim() && !isProcessing ? colors.primary : 'rgba(255,255,255,0.1)',
                border: 'none',
                borderRadius: '12px',
                color: 'white',
                cursor: input.trim() && !isProcessing ? 'pointer' : 'not-allowed',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                transition: 'all 0.3s ease',
                opacity: input.trim() && !isProcessing ? 1 : 0.5,
                flexShrink: 0
              }}
            >
              <Send size={18} />
            </button>
          </div>
          <div style={{ textAlign: 'center', marginTop: '12px', fontSize: '12px', color: '#6b7280' }}>
            VideoSum can make mistakes. Please verify important information.
          </div>
        </div>
      </div>

      <style>{`
        @keyframes fadeIn {
          from { opacity: 0; transform: translateY(10px); }
          to { opacity: 1; transform: translateY(0); }
        }
        @keyframes spin {
          from { transform: rotate(0deg); }
          to { transform: rotate(360deg); }
        }
        
        @media (max-width: 768px) {
          body {
            font-size: 14px;
          }
        }
        
        @media (max-width: 640px) {
          /* Header adjustments */
          div[style*="padding: 16px 24px"] {
            padding: 12px 16px !important;
          }
          
          /* Logo size */
          div[style*="width: 40px; height: 40px"] {
            width: 32px !important;
            height: 32px !important;
          }
          
          /* Hide text in buttons on small screens */
          button span {
            display: none;
          }
          
          /* User badge - hide on very small screens */
          div[style*="padding: 8px 16px"][style*="background: rgba(255,255,255,0.05)"] span {
            display: none;
          }
          
          /* Messages padding */
          div[style*="padding: 24px"][style*="overflowY"] {
            padding: 16px !important;
          }
          
          /* Message gap */
          div[style*="marginBottom: 24px"] {
            margin-bottom: 16px !important;
            gap: 12px !important;
          }
          
          /* Avatar size */
          div[style*="width: 36px; height: 36px"] {
            width: 28px !important;
            height: 28px !important;
          }
          
          /* Input area padding */
          div[style*="padding: 20px 24px"][style*="borderTop"] {
            padding: 12px 16px !important;
          }
          
          /* Input font size */
          input[type="text"] {
            font-size: 14px !important;
            padding: 12px !important;
          }
          
          /* Send button */
          button[style*="padding: 12px 20px"] {
            padding: 10px 16px !important;
          }
          
          /* Disclaimer */
          div[style*="textAlign: center"][style*="fontSize: 12px"] {
            font-size: 10px !important;
          }
        }
        
        @media (max-width: 480px) {
          /* Even smaller adjustments */
          div[style*="gap: 12px"][style*="flexWrap"] {
            gap: 8px !important;
          }
          
          button {
            padding: 6px 12px !important;
            font-size: 12px !important;
          }
          
          /* Message content */
          div[style*="fontSize: 15px"] {
            font-size: 14px !important;
          }
          
          /* Download button */
          button[style*="marginTop: 16px"] {
            font-size: 12px !important;
            padding: 8px 16px !important;
          }
        }
      `}</style>
    </div>
  );
}