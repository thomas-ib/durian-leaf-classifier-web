// src/pages/Home.tsx
import ImageUpload from '../components/ImageUpload'
import { auth } from '../firebase'
import { useNavigate } from 'react-router-dom'

export default function Home() {
  const navigate = useNavigate();

  const handleLogout = async () => {
    await auth.signOut();
    navigate('/login');
  };

  return (
    <div style={{
      minHeight: '100vh',
      backgroundImage: 'url(/leaf-bg.png)',
      backgroundSize: 'cover',
      backgroundPosition: 'center',
      backgroundRepeat: 'no-repeat',
      display: 'flex',
      justifyContent: 'center',
      alignItems: 'center',
      padding: '1rem',
      fontFamily: "'Inter', sans-serif",
      position: 'relative',
      overflow: 'hidden'
    }}>
      <div style={{
        width: '100%',
        maxWidth: '500px',
        backgroundColor: 'rgba(255, 255, 255, 0.85)',
        backdropFilter: 'blur(6px)',
        padding: '2rem',
        borderRadius: '1rem',
        boxShadow: '0 10px 20px rgba(0,0,0,0.2)',
        position: 'relative',
        textAlign: 'center',
        color: '#2D2D2D'
      }}>
        {/* Logout Button */}
        <div style={{ marginBottom: '1rem', display: 'flex', justifyContent: 'center' }}>
          <button
            onClick={handleLogout}
            style={{
              backgroundColor: '#a5b79d', // soft muted green-gray
              color: '#fff',
              border: 'none',
              padding: '0.5rem 1.25rem',
              borderRadius: '8px',
              fontWeight: 600,
              fontSize: '0.95rem',
              cursor: 'pointer',
              transition: 'background 0.3s ease',
            }}
          >
            Logout
          </button>
        </div>

        <h1 style={{
          fontSize: 'clamp(1.5rem, 4vw, 2.5rem)',
          marginBottom: '1.5rem',
          fontWeight: 700,
          color: '#333'
        }}>
          Durian Leaf Classifier
        </h1>

        <ImageUpload />
      </div>
    </div>
  )
}
