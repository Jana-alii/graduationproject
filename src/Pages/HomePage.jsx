import React, { useEffect, useMemo, useState } from "react";
import "./HomePage.css";
import {
  Moon,
  Sun,
  Brain,
  BookOpen,
  FileText,
  HelpCircle,
} from "lucide-react";

export default function HomePage({
  onNavigate,
  onGetStarted,
  user,
  onLogout,
}) {
  const [dark, setDark] = useState(false);

  // load theme
  useEffect(() => {
    const saved = localStorage.getItem("lb_theme");
    if (saved === "dark") setDark(true);
    if (saved === "light") setDark(false);
  }, []);

  // apply theme + save
  useEffect(() => {
    document.documentElement.setAttribute("data-theme", dark ? "dark" : "light");
    localStorage.setItem("lb_theme", dark ? "dark" : "light");
  }, [dark]);

  const go = (page) => (onNavigate ? onNavigate(page) : null);

  const features = useMemo(
    () => [
      {
        icon: <BookOpen size={18} />,
        title: "Explain",
        desc: "Get detailed explanations of complex concepts from your lectures. Ask questions and receive instant, clear answers.",
        tint: "tint-indigo",
      },
      {
        icon: <FileText size={18} />,
        title: "Summary",
        desc: "Generate concise summaries of your lectures. Save time and quickly review key points before exams.",
        tint: "tint-amber",
      },
      {
        icon: <HelpCircle size={18} />,
        title: "Quiz",
        desc: "Test your knowledge with AI-generated MCQs and essay questions based on your lecture content.",
        tint: "tint-green",
      },
    ],
    []
  );

  return (
    <div className="lb2">
      {/* NAV */}
      <header className="lb2-nav">
        <div className="lb2-container lb2-nav__inner">
          <div className="lb2-brand" onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}>
            <span className="lb2-logo">
              <Brain size={18} />
            </span>
            <span className="lb2-brand__text">Lecture Brain</span>
          </div>

          <nav className="lb2-links">
            <a href="#features">Features</a>
            <a href="#how">How it Works</a>
            <a href="#pricing">Pricing</a>
          </nav>

          <div className="lb2-actions">
            <button
              className="lb2-iconBtn"
              onClick={() => setDark((v) => !v)}
              aria-label="Toggle dark mode"
              title="Toggle dark mode"
            >
              {dark ? <Sun size={16} /> : <Moon size={16} />}
            </button>

            {user ? (
              <>
                <button className="lb2-linkBtn" onClick={() => go("chat")}>
                  Chat
                </button>
                <button className="lb2-btn lb2-btn--primary" onClick={onLogout}>
                  Logout
                </button>
              </>
            ) : (
              <>
<div className="hero-actions">
  <button 
    className="btn-primary"
    onClick={onGetStarted}
  >
    Get Started
  </button>

  <button 
    className="btn-secondary"
    onClick={() => onNavigate("login")}
  >
    Login
  </button>
</div>

              </>
            )}
          </div>
        </div>
      </header>

      {/* HERO */}
      <main className="lb2-main">
        <section className="lb2-hero">
          <div className="lb2-container lb2-hero__inner">
            <div className="lb2-pill">
              <span className="lb2-pill__dot" />
              AI-Powered Learning Platform
            </div>

            <h1 className="lb2-h1">
              Interact Intelligently with Your <br />
              Lectures
            </h1>

            <p className="lb2-sub">
              Transform your lecture notes and videos into interactive learning experiences.
              Get explanations, summaries, and quiz questions powered by AI.
            </p>

            <div className="lb2-hero__btns">
              <button
                className="lb2-btn lb2-btn--primary"
                onClick={() => (onGetStarted ? onGetStarted() : onNavigate("chat"))}
              >
                Get Started
              </button>

              <button className="lb2-btn lb2-btn--ghost" onClick={() => go("login")}>
                Login
              </button>
            </div>

            {/* Illustration card */}
            <div className="lb2-illusWrap" aria-hidden="true">
              <div className="lb2-illusCard">
                <div className="lb2-illusBrain">
                  <Brain size={70} />
                </div>

                <div className="lb2-illusStack">
                  <div className="lb2-illusMini">
                    <BookOpen size={16} />
                  </div>
                  <div className="lb2-illusMini">
                    <FileText size={16} />
                  </div>
                  <div className="lb2-illusMini">
                    <HelpCircle size={16} />
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* FEATURES */}
        <section id="features" className="lb2-section">
          <div className="lb2-container">
            <h2 className="lb2-h2">Powerful Features</h2>

            <div className="lb2-features">
              {features.map((f) => (
                <article key={f.title} className="lb2-card">
                  <div className={`lb2-card__icon ${f.tint}`}>{f.icon}</div>
                  <h3 className="lb2-card__title">{f.title}</h3>
                  <p className="lb2-card__desc">{f.desc}</p>
                </article>
              ))}
            </div>
          </div>
        </section>

        {/* HOW IT WORKS (simple, like screenshot spacing) */}
        <section id="how" className="lb2-section lb2-section--how">
          <div className="lb2-container">
            <h2 className="lb2-h2">How It Works</h2>
            <p className="lb2-muted">Get started in three simple steps</p>

            <div className="lb2-steps">
              <div className="lb2-step">
                <span className="lb2-step__n n1">1</span>
                <div className="lb2-step__t">Upload Your Lecture</div>
              </div>
              <div className="lb2-step">
                <span className="lb2-step__n n2">2</span>
                <div className="lb2-step__t">Ask Questions</div>
              </div>
              <div className="lb2-step">
                <span className="lb2-step__n n3">3</span>
                <div className="lb2-step__t">Master the Material</div>
              </div>
            </div>
          </div>
        </section>

        {/* CTA */}
        <section className="lb2-cta">
          <div className="lb2-container lb2-cta__inner">
            <h3 className="lb2-h3">Ready to transform your learning?</h3>
            <p className="lb2-cta__p">
              Join thousands of students who are already learning smarter with Lecture Brain.
            </p>
            <div className="lb2-cta__btns">
              <button className="lb2-btn lb2-btn--white" onClick={() => (user ? go("chat") : go("signup"))}>
                Get Started Free
              </button>
              <button className="lb2-btn lb2-btn--outlineWhite">View Demo</button>
            </div>
          </div>
        </section>

        {/* FOOTER */}
        <footer className="lb2-footer">
          <div className="lb2-container lb2-footer__inner">
            <div className="lb2-footerBrand">
              <span className="lb2-logo">
                <Brain size={18} />
              </span>
              <span className="lb2-brand__text">Lecture Brain</span>
            </div>

            <div className="lb2-footerCols">
              <div>
                <div className="lb2-footTitle">Product</div>
                <a href="#features">Features</a>
                <a href="#pricing">Pricing</a>
                <a href="#faq">FAQ</a>
              </div>
              <div>
                <div className="lb2-footTitle">Company</div>
                <a href="#about">About</a>
                <a href="#blog">Blog</a>
                <a href="#contact">Contact</a>
              </div>
              <div>
                <div className="lb2-footTitle">Legal</div>
                <a href="#terms">Terms</a>
                <a href="#privacy">Privacy</a>
                <a href="#security">Security</a>
              </div>
            </div>
          </div>

          <div className="lb2-container lb2-footer__bottom">
            <small className="lb2-muted">© {new Date().getFullYear()} Lecture Brain. All rights reserved.</small>
          </div>
        </footer>
      </main>
    </div>
  );
}
