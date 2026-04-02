import React from "react";
import "./Subjects.css";
import { Brain, Moon, LogOut, Plus, Folder } from "lucide-react";
import { useNavigate } from "react-router-dom";

const colorSets = [
  { bg: "c-indigo", icon: "i-indigo" },
  { bg: "c-purple", icon: "i-purple" },
  { bg: "c-green", icon: "i-green" },
  { bg: "c-yellow", icon: "i-yellow" },
  { bg: "c-pink", icon: "i-pink" },
  { bg: "c-blue", icon: "i-blue" },
];

export default function Subjects({
  user,
  subjects = [],
  onCreateSubject,
  onOpenSubject,
  onLogout,
  onToggleTheme,
}) {
  const nav = useNavigate(); // ✅ add this

  return (
    <div className="subj">
      <header className="subj-nav">
        <div className="subj-container subj-nav__inner">
          <div
            className="subj-brand"
            onClick={() => nav("/")}
            role="button"
            tabIndex={0}
            onKeyDown={(e) => e.key === "Enter" && nav("/")}
            style={{ cursor: "pointer" }}
          >
            <span className="subj-logo"><Brain size={18} /></span>
            <span className="subj-brand__text">Lecture Brain</span>
          </div>

          <div className="subj-actions">
            <button className="subj-iconBtn" onClick={onToggleTheme} aria-label="theme">
              <Moon size={16} />
            </button>
            <button className="subj-iconBtn" onClick={onLogout} aria-label="logout" title="Logout">
              <LogOut size={16} />
            </button>
          </div>
        </div>
      </header>

      <main className="subj-container subj-main">
        <div className="subj-head">
          <div>
            <h1 className="subj-h1">My Subjects</h1>
            <p className="subj-muted">Organize your lecture brains by subject</p>
          </div>

          <button className="subj-btn" onClick={onCreateSubject}>
            <Plus size={16} /> New Subject
          </button>
        </div>

        <section className="subj-grid">
          {subjects.map((s, idx) => {
            const c = colorSets[idx % colorSets.length];
            return (
              <button
                key={s.id}
                className="subj-card"
                onClick={() => onOpenSubject?.(s.id)}
              >
                <div className={`subj-card__icon ${c.bg}`}>
                  <Folder className={c.icon} size={18} />
                </div>

                <div className="subj-card__body">
                  <div className="subj-card__title">{s.name}</div>
                  <span className="subj-pill">
                    {s.brainsCount ?? 0} Lecture Brains
                  </span>
                </div>
              </button>
            );
          })}

          <button className="subj-card subj-card--add" onClick={onCreateSubject}>
            <div className="subj-addIcon">
              <Plus size={22} />
            </div>
            <div className="subj-card__body">
              <div className="subj-card__title">Add New Subject</div>
              <div className="subj-muted">Create a new subject folder</div>
            </div>
          </button>
        </section>
      </main>
    </div>
  );
}
