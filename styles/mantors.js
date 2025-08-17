import { useState, useEffect } from 'react';
import Link from 'next/link';

export default function Mentors() {
  const [mentors, setMentors] = useState([]);
  const [loading, setLoading] = useState(true);
  const [filter, setFilter] = useState('all');
  const [searchTerm, setSearchTerm] = useState('');

  useEffect(() => {
    fetch('/api/mentors')
      .then(r => r.json())
      .then(data => {
        setMentors(data);
        setLoading(false);
      })
      .catch(() => {
        // Demo data if API fails
        setMentors([
          {
            id: 1,
            name: "שרה כהן",
            expertise: "React & Frontend",
            points: 450,
            experience: "5+ שנים",
            company: "Microsoft",
            rating: 4.9,
            sessions: 89,
            bio: "מפתחת Frontend מנוסה עם התמחות ב-React, Next.js ו-TypeScript"
          },
          {
            id: 2,
            name: "דוד לוי",
            expertise: "Backend & DevOps",
            points: 380,
            experience: "8+ שנים",
            company: "Google",
            rating: 4.8,
            sessions: 67,
            bio: "מהנדס תוכנה בכיר עם התמחות ב-Node.js, Python ו-Cloud"
          },
          {
            id: 3,
            name: "מיכל אברהם",
            expertise: "Data Science & ML",
            points: 520,
            experience: "6+ שנים",
            company: "Amazon",
            rating: 4.9,
            sessions: 94,
            bio: "מדענית נתונים עם התמחות ב-Machine Learning ו-AI"
          },
          {
            id: 4,
            name: "אמיר רוזן",
            expertise: "Mobile Development",
            points: 290,
            experience: "4+ שנים",
            company: "Meta",
            rating: 4.7,
            sessions: 45,
            bio: "מפתח אפליקציות סלולריות עם התמחות ב-React Native ו-Flutter"
          },
          {
            id: 5,
            name: "רותם גרין",
            expertise: "UX/UI Design",
            points: 340,
            experience: "7+ שנים",
            company: "Adobe",
            rating: 4.8,
            sessions: 78,
            bio: "מעצבת UX/UI מנוסה עם התמחות בעיצוב מוצרים דיגיטליים"
          },
          {
            id: 6,
            name: "יוסי כרמל",
            expertise: "Cybersecurity",
            points: 410,
            experience: "10+ שנים",
            company: "Check Point",
            rating: 4.9,
            sessions: 56,
            bio: "מומחה אבטחת מידע עם התמחות ב-Penetration Testing"
          }
        ]);
        setLoading(false);
      });
  }, []);

  // Filter mentors based on expertise and search term
  const filteredMentors = mentors.filter(mentor => {
    const matchesFilter = filter === 'all' || mentor.expertise.toLowerCase().includes(filter.toLowerCase());
    const matchesSearch = mentor.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         mentor.expertise.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         (mentor.company && mentor.company.toLowerCase().includes(searchTerm.toLowerCase()));
    return matchesFilter && matchesSearch;
  });

  const expertiseAreas = ['all', 'frontend', 'backend', 'mobile', 'data', 'design', 'security'];
  const expertiseLabels = {
    all: 'כל התחומים',
    frontend: 'Frontend',
    backend: 'Backend',
    mobile: 'Mobile',
    data: 'Data Science',
    design: 'UX/UI',
    security: 'Cybersecurity'
  };

  if (loading) {
    return (
      <div style={{ direction: 'rtl', padding: '2rem', textAlign: 'center' }}>
        <h1>טוען מנטורים...</h1>
      </div>
    );
  }

  return (
    <div style={{ direction: 'rtl', fontFamily: 'system-ui, -apple-system, sans-serif', minHeight: '100vh', background: '#f8fafc' }}>
      {/* Header */}
      <header style={{
        background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
        color: 'white',
        padding: '2rem 0',
      }}>
        <div style={{ maxWidth: '1200px', margin: '0 auto', padding: '0 1rem' }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: '1rem' }}>
            <div>
              <h1 style={{ fontSize: '2.5rem', margin: '0 0 0.5rem 0', fontWeight: '700' }}>
                מנטורים
              </h1>
              <p style={{ fontSize: '1.1rem', margin: '0', opacity: '0.9' }}>
                מצא את המנטור המושלם עבורך מתוך {mentors.length} מנטורים פעילים
              </p>
            </div>
            <Link href="/" style={{ textDecoration: 'none' }}>
              <button style={{
                background: 'rgba(255,255,255,0.2)',
                color: 'white',
                padding: '0.75rem 1.5rem',
                border: '1px solid rgba(255,255,255,0.3)',
                borderRadius: '8px',
                fontSize: '1rem',
                cursor: 'pointer'
              }}>
                ← חזרה לדף הבית
              </button>
            </Link>
          </div>
        </div>
      </header>

      {/* Filters & Search */}
      <section style={{ padding: '2rem 0', background: 'white', borderBottom: '1px solid #e2e8f0' }}>
        <div style={{ maxWidth: '1200px', margin: '0 auto', padding: '0 1rem' }}>
          {/* Search Bar */}
          <div style={{ marginBottom: '2rem' }}>
            <input
              type="text"
              placeholder="חפש מנטור לפי שם, תחום או חברה..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              style={{
                width: '100%',
                padding: '1rem',
                fontSize: '1rem',
                border: '2px solid #e2e8f0',
                borderRadius: '8px',
                background: '#f8fafc',
                transition: 'all 0.2s',
                outline: 'none'
              }}
              onFocus={(e) => {
                e.target.style.borderColor = '#667eea';
                e.target.style.background = 'white';
              }}
              onBlur={(e) => {
                e.target.style.borderColor = '#e2e8f0';
                e.target.style.background = '#f8fafc';
              }}
            />
          </div>

          {/* Filter Buttons */}
          <div style={{ display: 'flex', gap: '0.5rem', flexWrap: 'wrap', justifyContent: 'center' }}>
            {expertiseAreas.map(area => (
              <button
                key={area}
                onClick={() => setFilter(area)}
                style={{
                  padding: '0.75rem 1.5rem',
                  border: `2px solid ${filter === area ? '#667eea' : '#e2e8f0'}`,
                  background: filter === area ? '#667eea' : 'white',
                  color: filter === area ? 'white' : '#4a5568',
                  borderRadius: '25px',
                  fontSize: '0.9rem',
                  fontWeight: '500',
                  cursor: 'pointer',
                  transition: 'all 0.2s',
                  outline: 'none'
                }}
                onMouseOver={(e) => {
                  if (filter !== area) {
                    e.target.style.borderColor = '#667eea';
                    e.target.style.color = '#667eea';
                  }
                }}
                onMouseOut={(e) => {
                  if (filter !== area) {
                    e.target.style.borderColor = '#e2e8f0';
                    e.target.style.color = '#4a5568';
                  }
                }}
              >
                {expertiseLabels[area]}
              </button>
            ))}
          </div>
        </div>
      </section>

      {/* Mentors Grid */}
      <section style={{ padding: '3rem 0' }}>
        <div style={{ maxWidth: '1200px', margin: '0 auto', padding: '0 1rem' }}>
          {filteredMentors.length === 0 ? (
            <div style={{ textAlign: 'center', padding: '3rem 0' }}>
              <div style={{ fontSize: '3rem', marginBottom: '1rem' }}>🔍</div>
              <h3 style={{ fontSize: '1.5rem', color: '#4a5568', marginBottom: '0.5rem' }}>
                לא נמצאו מנטורים
              </h3>
              <p style={{ color: '#64748b' }}>
                נסה לשנות את הפילטר או את החיפוש
              </p>
            </div>
          ) : (
            <div style={{
              display: 'grid',
              gridTemplateColumns: 'repeat(auto-fill, minmax(350px, 1fr))',
              gap: '2rem'
            }}>
              {filteredMentors.map(mentor => (
                <MentorCard key={mentor.id} mentor={mentor} />
              ))}
            </div>
          )}
        </div>
      </section>
    </div>
  );
}

// Mentor Card Component
function MentorCard({ mentor }) {
  return (
    <div style={{
      background: 'white',
      borderRadius: '16px',
      padding: '2rem',
      boxShadow: '0 4px 6px rgba(0,0,0,0.07)',
      border: '1px solid #e2e8f0',
      transition: 'all 0.3s ease',
      position: 'relative',
      overflow: 'hidden'
    }}
    onMouseOver={(e) => {
      e.currentTarget.style.transform = 'translateY(-8px)';
      e.currentTarget.style.boxShadow = '0 12px 32px rgba(0,0,0,0.15)';
    }}
    onMouseOut={(e) => {
      e.currentTarget.style.transform = 'translateY(0)';
      e.currentTarget.style.boxShadow = '0 4px 6px rgba(0,0,0,0.07)';
    }}
    >
      {/* Points Badge */}
      <div style={{
        position: 'absolute',
        top: '1rem',
        left: '1rem',
        background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
        color: 'white',
        padding: '0.4rem 0.8rem',
        borderRadius: '20px',
        fontSize: '0.8rem',
        fontWeight: '600'
      }}>
        {mentor.points} נק'
      </div>

      {/* Avatar & Basic Info */}
      <div style={{ textAlign: 'center', marginBottom: '1.5rem' }}>
        <div style={{
          width: '80px',
          height: '80px',
          background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
          borderRadius: '50%',
          margin: '0 auto 1rem auto',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          fontSize: '2rem',
          color: 'white',
          fontWeight: '600'
        }}>
          {mentor.name.charAt(0)}
        </div>
        
        <h3 style={{
          fontSize: '1.4rem',
          fontWeight: '600',
          marginBottom: '0.5rem',
          color: '#1a202c'
        }}>
          {mentor.name}
        </h3>
        
        <p style={{
          color: '#667eea',
          fontWeight: '600',
          marginBottom: '0.5rem'
        }}>
          {mentor.expertise}
        </p>
        
        {mentor.company && (
          <p style={{
            color: '#64748b',
            fontSize: '0.9rem',
            marginBottom: '0.5rem'
          }}>
            {mentor.company}
          </p>
        )}
        
        <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', gap: '1rem', fontSize: '0.9rem', color: '#64748b' }}>
          <span>⭐ {mentor.rating || '4.8'}</span>
          <span>👥 {mentor.sessions || '0'} פגישות</span>
          <span>🎯 {mentor.experience}</span>
        </div>
      </div>

      {/* Bio */}
      {mentor.bio && (
        <p style={{
          color: '#4a5568',
          lineHeight: '1.5',
          marginBottom: '2rem',
          fontSize: '0.95rem',
          textAlign: 'center'
        }}>
          {mentor.bio}
        </p>
      )}

      {/* Action Buttons */}
      <div style={{ display: 'flex', gap: '0.75rem' }}>
        <button style={{
          flex: '1',
          padding: '0.75rem',
          background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
          color: 'white',
          border: 'none',
          borderRadius: '8px',
          fontSize: '0.95rem',
          fontWeight: '600',
          cursor: 'pointer',
          transition: 'all 0.2s'
        }}
        onMouseOver={(e) => {
          e.target.style.transform = 'scale(1.02)';
          e.target.style.boxShadow = '0 4px 12px rgba(102, 126, 234, 0.4)';
        }}
        onMouseOut={(e) => {
          e.target.style.transform = 'scale(1)';
          e.target.style.boxShadow = 'none';
        }}
        >
          📅 קבע פגישה
        </button>
        
        <button style={{
          padding: '0.75rem',
          background: 'transparent',
          color: '#667eea',
          border: '2px solid #667eea',
          borderRadius: '8px',
          fontSize: '1.2rem',
          cursor: 'pointer',
          transition: 'all 0.2s',
          aspectRatio: '1'
        }}
        onMouseOver={(e) => {
          e.target.style.background = '#667eea';
          e.target.style.color = 'white';
        }}
        onMouseOut={(e) => {
          e.target.style.background = 'transparent';
          e.target.style.color = '#667eea';
        }}
        title="שלח הודעה"
        >
          💬
        </button>
      </div>
    </div>
  );
}
