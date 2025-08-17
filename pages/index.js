import { useState, useEffect } from 'react';
import Link from 'next/link';

export default function Home() {
  const [stats, setStats] = useState({
    mentors: 0,
    mentees: 0,
    meetings: 0,
    activeChats: 0
  });

  useEffect(() => {
    // טעינת סטטיסטיקות
    Promise.all([
      fetch('/api/mentors').then(r => r.json()),
      fetch('/api/mentees').then(r => r.json()),
      fetch('/api/meetings').then(r => r.json()),
      fetch('/api/chats').then(r => r.json())
    ]).then(([mentors, mentees, meetings, chats]) => {
      setStats({
        mentors: mentors.length,
        mentees: mentees.length,
        meetings: meetings.length,
        activeChats: chats.length
      });
    }).catch(() => {
      // אם אין API, נציג נתונים לדמו
      setStats({
        mentors: 15,
        mentees: 42,
        meetings: 28,
        activeChats: 8
      });
    });
  }, []);

  return (
    <div style={{ direction: 'rtl', fontFamily: 'system-ui, -apple-system, sans-serif' }}>
      {/* Header */}
      <header style={{
        background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
        color: 'white',
        padding: '2rem 0',
        textAlign: 'center'
      }}>
        <div style={{ maxWidth: '1200px', margin: '0 auto', padding: '0 1rem' }}>
          <h1 style={{ 
            fontSize: '3rem', 
            margin: '0 0 0.5rem 0', 
            fontWeight: '700',
            textShadow: '2px 2px 4px rgba(0,0,0,0.3)'
          }}>
            TechTandem
          </h1>
          <p style={{ 
            fontSize: '1.2rem', 
            margin: '0', 
            opacity: '0.9',
            fontWeight: '300'
          }}>
            פלטפורמת Mentoring לעולם הטכנולוגיה
          </p>
        </div>
      </header>

      {/* Stats Section */}
      <section style={{ 
        padding: '3rem 1rem',
        background: '#f8fafc',
        borderBottom: '1px solid #e2e8f0'
      }}>
        <div style={{ maxWidth: '1200px', margin: '0 auto' }}>
          <h2 style={{ 
            textAlign: 'center', 
            marginBottom: '2rem', 
            color: '#2d3748',
            fontSize: '2rem',
            fontWeight: '600'
          }}>
            הקהילה שלנו
          </h2>
          <div style={{ 
            display: 'grid', 
            gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', 
            gap: '1.5rem',
            marginBottom: '2rem'
          }}>
            <StatCard 
              title="מנטורים פעילים" 
              value={stats.mentors} 
              icon="👨‍🏫"
              color="#10b981" 
            />
            <StatCard 
              title="חניכים" 
              value={stats.mentees} 
              icon="👩‍💻"
              color="#3b82f6" 
            />
            <StatCard 
              title="פגישות השבוע" 
              value={stats.meetings} 
              icon="📅"
              color="#8b5cf6" 
            />
            <StatCard 
              title="צ'אטים פעילים" 
              value={stats.activeChats} 
              icon="💬"
              color="#f59e0b" 
            />
          </div>
        </div>
      </section>

      {/* Navigation Cards */}
      <section style={{ padding: '3rem 1rem' }}>
        <div style={{ maxWidth: '1200px', margin: '0 auto' }}>
          <h2 style={{ 
            textAlign: 'center', 
            marginBottom: '2rem', 
            color: '#2d3748',
            fontSize: '2rem',
            fontWeight: '600'
          }}>
            מה תרצה לעשות היום?
          </h2>
          <div style={{ 
            display: 'grid', 
            gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', 
            gap: '2rem' 
          }}>
            <Link href="/mentors" style={{ textDecoration: 'none' }}>
              <NavCard
                title="מצא מנטור"
                description="התחבר למנטורים מנוסים בתחום שלך"
                icon="🎯"
                bgColor="#ecfdf5"
                borderColor="#10b981"
              />
            </Link>
            <Link href="/meetings" style={{ textDecoration: 'none' }}>
              <NavCard
                title="פגישות"
                description="נהל את הפגישות והמפגשים שלך"
                icon="📅"
                bgColor="#eff6ff"
                borderColor="#3b82f6"
              />
            </Link>
            <Link href="/chats" style={{ textDecoration: 'none' }}>
              <NavCard
                title="הודעות"
                description="התכתב עם המנטורים והחניכים שלך"
                icon="💬"
                bgColor="#fefce8"
                borderColor="#eab308"
              />
            </Link>
            <Link href="/leaderboard" style={{ textDecoration: 'none' }}>
              <NavCard
                title="לוח התוצאות"
                description="ראה מי המנטורים המובילים בקהילה"
                icon="🏆"
                bgColor="#faf5ff"
                borderColor="#8b5cf6"
              />
            </Link>
          </div>
        </div>
      </section>

      {/* Call to Action */}
      <section style={{ 
        background: 'linear-gradient(135deg, #764ba2 0%, #667eea 100%)',
        color: 'white',
        padding: '3rem 1rem',
        textAlign: 'center'
      }}>
        <div style={{ maxWidth: '800px', margin: '0 auto' }}>
          <h2 style={{ 
            fontSize: '2rem', 
            marginBottom: '1rem',
            fontWeight: '600'
          }}>
            מוכן להתחיל?
          </h2>
          <p style={{ 
            fontSize: '1.1rem', 
            marginBottom: '2rem', 
            opacity: '0.9',
            lineHeight: '1.6'
          }}>
            הצטרף לקהילה של מפתחים ומפתחות שעוזרים זה לזה לצמוח מקצועית
          </p>
          <div style={{ display: 'flex', gap: '1rem', justifyContent: 'center', flexWrap: 'wrap' }}>
            <Link href="/demo" style={{ textDecoration: 'none' }}>
              <button style={{
                background: 'white',
                color: '#667eea',
                padding: '1rem 2rem',
                border: 'none',
                borderRadius: '8px',
                fontSize: '1.1rem',
                fontWeight: '600',
                cursor: 'pointer',
                transition: 'transform 0.2s',
                boxShadow: '0 4px 6px rgba(0,0,0,0.1)'
              }}
              onMouseOver={(e) => e.target.style.transform = 'translateY(-2px)'}
              onMouseOut={(e) => e.target.style.transform = 'translateY(0)'}
              >
                רשימת מנטורים
              </button>
            </Link>
            <button style={{
              background: 'transparent',
              color: 'white',
              padding: '1rem 2rem',
              border: '2px solid white',
              borderRadius: '8px',
              fontSize: '1.1rem',
              fontWeight: '600',
              cursor: 'pointer',
              transition: 'all 0.2s'
            }}
            onMouseOver={(e) => {
              e.target.style.background = 'white';
              e.target.style.color = '#667eea';
            }}
            onMouseOut={(e) => {
              e.target.style.background = 'transparent';
              e.target.style.color = 'white';
            }}
            >
              הרשמה
            </button>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer style={{ 
        background: '#2d3748', 
        color: 'white', 
        padding: '2rem 1rem', 
        textAlign: 'center' 
      }}>
        <div style={{ maxWidth: '1200px', margin: '0 auto' }}>
          <p style={{ margin: '0', opacity: '0.8' }}>
            © 2025 TechTandem - מחברים בין מנטורים וחניכים בעולם הטכנולוגיה
          </p>
        </div>
      </footer>
    </div>
  );
}

// רכיב כרטיס סטטיסטיקה
function StatCard({ title, value, icon, color }) {
  return (
    <div style={{
      background: 'white',
      padding: '2rem',
      borderRadius: '12px',
      textAlign: 'center',
      boxShadow: '0 4px 6px rgba(0,0,0,0.07)',
      border: '1px solid #e2e8f0',
      transition: 'transform 0.2s',
      cursor: 'pointer'
    }}
    onMouseOver={(e) => e.currentTarget.style.transform = 'translateY(-4px)'}
    onMouseOut={(e) => e.currentTarget.style.transform = 'translateY(0)'}
    >
      <div style={{ fontSize: '2.5rem', marginBottom: '0.5rem' }}>{icon}</div>
      <div style={{ 
        fontSize: '2.5rem', 
        fontWeight: '700', 
        color: color,
        marginBottom: '0.5rem' 
      }}>
        {value}
      </div>
      <div style={{ 
        fontSize: '1rem', 
        color: '#64748b',
        fontWeight: '500'
      }}>
        {title}
      </div>
    </div>
  );
}

// רכיב כרטיס ניווט
function NavCard({ title, description, icon, bgColor, borderColor }) {
  return (
    <div style={{
      background: bgColor,
      padding: '2rem',
      borderRadius: '12px',
      border: `2px solid ${borderColor}`,
      transition: 'all 0.2s',
      cursor: 'pointer',
      height: '100%'
    }}
    onMouseOver={(e) => {
      e.currentTarget.style.transform = 'translateY(-4px)';
      e.currentTarget.style.boxShadow = '0 8px 25px rgba(0,0,0,0.15)';
    }}
    onMouseOut={(e) => {
      e.currentTarget.style.transform = 'translateY(0)';
      e.currentTarget.style.boxShadow = 'none';
    }}
    >
      <div style={{ fontSize: '3rem', marginBottom: '1rem' }}>{icon}</div>
      <h3 style={{ 
        fontSize: '1.5rem', 
        fontWeight: '600', 
        marginBottom: '0.5rem',
        color: '#1a202c'
      }}>
        {title}
      </h3>
      <p style={{ 
        color: '#4a5568', 
        lineHeight: '1.5',
        margin: '0',
        fontSize: '1rem'
      }}>
        {description}
      </p>
    </div>
  );
}
