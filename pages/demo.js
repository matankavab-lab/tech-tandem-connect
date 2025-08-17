import { useEffect, useState } from 'react';
import Link from 'next/link';

export default function Demo() {
  const [mentors, setMentors] = useState([]);
  const [meetings, setMeetings] = useState([]);
  const [chats, setChats] = useState([]);
  const [leaderboard, setLeaderboard] = useState([]);
  const [activeTab, setActiveTab] = useState('mentors');
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Load all data
    Promise.all([
      fetch('/api/mentors').then(r => r.json()).catch(() => []),
      fetch('/api/meetings').then(r => r.json()).catch(() => []),
      fetch('/api/chats').then(r => r.json()).catch(() => []),
      fetch('/api/leaderboard').then(r => r.json()).catch(() => [])
    ]).then(([mentorsData, meetingsData, chatsData, leaderboardData]) => {
      setMentors(mentorsData);
      setMeetings(meetingsData);
      setChats(chatsData);
      setLeaderboard(leaderboardData);
      setLoading(false);
    }).catch(() => {
      // Demo data if API fails
      setMentors([
        { id: 1, name: "שרה כהן", expertise: "React & Frontend", points: 450, experience: "5+ שנים" },
        { id: 2, name: "דוד לוי", expertise: "Backend & DevOps", points: 380, experience: "8+ שנים" },
        { id: 3, name: "מיכל אברהם", expertise: "Data Science & ML", points: 520, experience: "6+ שנים" }
      ]);
      setMeetings([
        { id: 1, title: "סקירת קוד ב-React", mentor: "שרה כהן", date: "2025-08-20", time: "14:00" },
        { id: 2, title: "אבטחת API", mentor: "דוד לוי", date: "2025-08-21", time: "10:30" }
      ]);
      setChats([
        { id: 1, participant: "שרה כהן", lastMessage: "בואי נדבר על הפרויקט שלך", time: "10:30" },
        { id: 2, participant: "מיכל אברהם", lastMessage: "יש לי כמה רעיונות לאלגוריתם", time: "09:15" }
      ]);
      setLeaderboard([
        { id: 1, name: "מיכל אברהם", points: 520, sessions: 94 },
        { id: 2, name: "שרה כהן", points: 450, sessions: 89 },
        { id: 3, name: "דוד לוי", points: 380, sessions: 67 }
      ]);
      setLoading(false);
    });
  }, []);

  const tabs = [
    { id: 'mentors', label: 'מנטורים', icon: '👨‍🏫', count: mentors.length },
    { id: 'meetings', label: 'פגישות', icon: '📅', count: meetings.length },
    { id: 'chats', label: 'צ\'אטים', icon: '💬', count: chats.length },
    { id: 'leaderboard', label: 'לוח תוצאות', icon: '🏆', count: leaderboard.length }
  ];

  if (loading) {
    return (
      <div style={{ direction: 'rtl', padding: '2rem', textAlign: 'center', minHeight: '100vh', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
        <div>
          <div style={{ fontSize: '3rem', marginBottom: '1rem' }}>⏳</div>
          <h2>טוען נתונים...</h2>
        </div>
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
                דמו - TechTandem
              </h1>
              <p style={{ fontSize: '1.1rem', margin: '0', opacity: '0.9' }}>
                חקור את כל הנתונים והתכונות של הפלטפורמה
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
                cursor: 'pointer',
                transition: 'all 0.2s'
              }}
              onMouseOver={(e) => {
                e.target.style.background = 'rgba(255,255,255,0.3)';
              }}
              onMouseOut={(e) => {
                e.target.style.background = 'rgba(255,255,255,0.2)';
              }}
              >
                ← חזרה לדף הבית
              </button>
            </Link>
          </div>
        </div>
      </header>

      {/* Navigation Tabs */}
      <section style={{ background: 'white', borderBottom: '2px solid #e2e8f0', position: 'sticky', top: '0', zIndex: '10' }}>
        <div style={{ maxWidth: '1200px', margin: '0 auto', padding: '0 1rem' }}>
          <div style={{ display: 'flex', gap: '0', overflowX: 'auto' }}>
            {tabs.map(tab => (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                style={{
                  padding: '1rem 2rem',
                  border: 'none',
                  background: activeTab === tab.id ? '#667eea' : 'transparent',
                  color: activeTab === tab.id ? 'white' : '#4a5568',
                  fontSize: '1rem',
                  fontWeight: '600',
                  cursor: 'pointer',
                  transition: 'all 0.2s',
                  borderBottom: activeTab === tab.id ? '3px solid #667eea' : '3px solid transparent',
                  whiteSpace: 'nowrap',
                  display: 'flex',
                  alignItems: 'center',
                  gap: '0.5rem'
                }}
                onMouseOver={(e) => {
                  if (activeTab !== tab.id) {
                    e.target.style.background = '#f1f5f9';
                  }
                }}
                onMouseOut={(e) => {
                  if (activeTab !== tab.id) {
                    e.target.style.background = 'transparent';
                  }
                }}
              >
                <span>{tab.icon}</span>
                <span>{tab.label}</span>
                <span style={{
                  background: activeTab === tab.id ? 'rgba(255,255,255,0.3)' : '#e2e8f0',
                  color: activeTab === tab.id ? 'white' : '#64748b',
                  padding: '0.2rem 0.5rem',
                  borderRadius: '12px',
                  fontSize: '0.8rem',
                  minWidth: '24px',
                  textAlign: 'center'
                }}>
                  {tab.count}
                </span>
              </button>
            ))}
          </div>
        </div>
      </section>

      {/* Content */}
      <section style={{ padding: '2rem 0' }}>
        <div style={{ maxWidth: '1200px', margin: '0 auto', padding: '0 1rem' }}>
          {activeTab === 'mentors' && <MentorsContent mentors={mentors} />}
          {activeTab === 'meetings' && <MeetingsContent meetings={meetings} />}
          {activeTab === 'chats' && <ChatsContent chats={chats} />}
          {activeTab === 'leaderboard' && <LeaderboardContent leaderboard={leaderboard} />}
        </div>
      </section>
    </div>
  );
}

// Mentors Content
function MentorsContent({ mentors }) {
  return (
    <div>
      <h2 style={{ marginBottom: '2rem', color: '#2d3748' }}>רשימת המנטורים ({mentors.length})</h2>
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(300px, 1fr))', gap: '1.5rem' }}>
        {mentors.map(mentor => (
          <div key={mentor.id} style={{
            background: 'white',
            padding: '2rem',
            borderRadius: '12px',
            boxShadow: '0 4px 6px rgba(0,0,0,0.07)',
            border: '1px solid #e2e8f0',
            transition: 'transform 0.2s'
          }}
          onMouseOver={(e) => e.currentTarget.style.transform = 'translateY(-4px)'}
          onMouseOut={(e) => e.currentTarget.style.transform = 'translateY(0)'}
          >
            <div style={{ display: 'flex', alignItems: 'center', marginBottom: '1rem' }}>
              <div style={{
                width: '50px',
                height: '50px',
                background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
                borderRadius: '50%',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                color: 'white',
                fontSize: '1.2rem',
                fontWeight: '600',
                marginLeft: '1rem'
              }}>
                {mentor.name.charAt(0)}
              </div>
              <div>
                <h3 style={{ margin: '0', fontSize: '1.2rem', fontWeight: '600' }}>{mentor.name}</h3>
                <p style={{ margin: '0', color: '#667eea', fontWeight: '500' }}>{mentor.expertise}</p>
              </div>
            </div>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', fontSize: '0.9rem', color: '#64748b' }}>
              <span>🎯 {mentor.experience}</span>
              <span style={{ background: '#f1f5f9', padding: '0.3rem 0.8rem', borderRadius: '12px', fontWeight: '600' }}>
                {mentor.points} נק'
              </span>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

// Meetings Content
function MeetingsContent({ meetings }) {
  return (
    <div>
      <h2 style={{ marginBottom: '2rem', color: '#2d3748' }}>פגישות קרובות ({meetings.length})</h2>
      <div style={{ display: 'grid', gap: '1rem' }}>
        {meetings.map(meeting => (
          <div key={meeting.id} style={{
            background: 'white',
            padding: '1.5rem',
            borderRadius: '12px',
            boxShadow: '0 2px 4px rgba(0,0,0,0.05)',
            border: '1px solid #e2e8f0',
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'center'
          }}>
            <div>
              <h3 style={{ margin: '0 0 0.5rem 0', fontSize: '1.2rem', fontWeight: '600' }}>{meeting.title}</h3>
              <p style={{ margin: '0', color: '#64748b' }}>עם {meeting.mentor}</p>
            </div>
            <div style={{ textAlign: 'left', color: '#667eea', fontWeight: '600' }}>
              <div>📅 {meeting.date}</div>
              <div>🕐 {meeting.time}</div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

// Chats Content
function ChatsContent({ chats }) {
  return (
    <div>
      <h2 style={{ marginBottom: '2rem', color: '#2d3748' }}>צ'אטים פעילים ({chats.length})</h2>
      <div style={{ display: 'grid', gap: '1rem' }}>
        {chats.map(chat => (
          <div key={chat.id} style={{
            background: 'white',
            padding: '1.5rem',
            borderRadius: '12px',
            boxShadow: '0 2px 4px rgba(0,0,0,0.05)',
            border: '1px solid #e2e8f0',
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'center'
          }}>
            <div style={{ flex: 1 }}>
              <div style={{ display: 'flex', alignItems: 'center', marginBottom: '0.5rem' }}>
                <div style={{
                  width: '40px',
                  height: '40px',
                  background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
                  borderRadius: '50%',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  color: 'white',
                  fontSize: '1rem',
                  fontWeight: '600',
                  marginLeft: '1rem'
                }}>
                  {chat.participant.charAt(0)}
                </div>
                <div>
                  <h3 style={{ margin: '0', fontSize: '1.1rem', fontWeight: '600' }}>{chat.participant}</h3>
                  <p style={{ margin: '0', color: '#64748b', fontSize: '0.9rem' }}>{chat.time}</p>
                </div>
              </div>
              <p style={{ margin: '0', color: '#4a5568', paddingRight: '3rem' }}>{chat.lastMessage}</p>
            </div>
            <div style={{ color: '#10b981', fontSize: '1.5rem' }}>💬</div>
          </div>
        ))}
      </div>
    </div>
  );
}

// Leaderboard Content
function LeaderboardContent({ leaderboard }) {
  return (
    <div>
      <h2 style={{ marginBottom: '2rem', color: '#2d3748' }}>לוח המובילים ({leaderboard.length})</h2>
      <div style={{ display: 'grid', gap: '1rem' }}>
        {leaderboard.map((mentor, index) => (
          <div key={mentor.id} style={{
            background: 'white',
            padding: '1.5rem',
            borderRadius: '12px',
            boxShadow: '0 2px 4px rgba(0,0,0,0.05)',
            border: '1px solid #e2e8f0',
            display: 'flex',
            alignItems: 'center',
            position: 'relative'
          }}>
            <div style={{
              width: '50px',
              height: '50px',
              background: index === 0 ? '#ffd700' : index === 1 ? '#c0c0c0' : index === 2 ? '#cd7f32' : '#667eea',
              borderRadius: '50%',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              color: 'white',
              fontSize: '1.5rem',
              marginLeft: '1rem'
            }}>
              {index < 3 ? ['🥇', '🥈', '🥉'][index] : (index + 1)}
            </div>
            <div style={{ flex: 1 }}>
              <h3 style={{ margin: '0', fontSize: '1.2rem', fontWeight: '600' }}>{mentor.name}</h3>
              <div style={{ display: 'flex', gap: '2rem', marginTop: '0.5rem', fontSize: '0.9rem', color: '#64748b' }}>
                <span>🎯 {mentor.points} נקודות</span>
                <span>👥 {mentor.sessions} פגישות</span>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
