// src/pages/Home.tsx
import ImageUpload from '../components/ImageUpload'

export default function Home() {
  return (
    <div style={{
      minHeight: '100vh',
      backgroundColor: '#ecf3e6',
      display: 'flex',
      justifyContent: 'center',
      alignItems: 'center',
      padding: '1rem'
    }}>
      <div style={{
        width: '100%',
        maxWidth: '500px',
        backgroundColor: '#fff',
        padding: '2rem',
        borderRadius: '1rem',
        boxShadow: '0 10px 20px rgba(0,0,0,0.05)',
        fontFamily: "'Poppins', sans-serif"
      }}>
        <h1 style={{
          fontSize: 'clamp(1.5rem, 4vw, 2.5rem)',
          textAlign: 'center',
          marginBottom: '1.5rem',
          color: '#333'
        }}>
          Durian Leaf Classifier
        </h1>
        <ImageUpload />
      </div>
    </div>
  )
}
