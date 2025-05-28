import { useEffect, useState } from "react";
import { auth } from "../firebase";
import { useNavigate } from "react-router-dom";
import {
  signInWithEmailAndPassword,
  createUserWithEmailAndPassword,
  onAuthStateChanged,
} from "firebase/auth";

export default function LoginPage() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  // Redirect if already logged in
  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      if (user) navigate("/");
    });
    return () => unsubscribe();
  }, [navigate]);

  const handleLogin = async () => {
    try {
      setLoading(true);
      await signInWithEmailAndPassword(auth, email, password);
      navigate("/");
    } catch (err: any) {
      console.error("Login error:", err);
      alert(`Login failed: ${err.message}`);
    } finally {
      setLoading(false);
    }
  };

  const handleRegister = async () => {
    try {
      setLoading(true);
      await createUserWithEmailAndPassword(auth, email, password);
      navigate("/");
    } catch (err: any) {
      console.error("Registration error:", err);
      alert(`Register failed: ${err.message}`);
    } finally {
      setLoading(false);
    }
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
        padding: '2rem',
        fontFamily: "'Inter', sans-serif",
        position: 'relative',
        overflow: 'hidden'
    }}>
      {/* Loading overlay */}
      {loading && (
        <div style={{
            position: 'absolute',
            inset: 0,
            backgroundColor: 'rgba(255, 255, 255, 0.8)',
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
            fontSize: '1.25rem',
            fontWeight: 600,
            color: '#637E4C',
            transition: 'opacity 0.4s ease-in-out, visibility 0.4s ease-in-out',
            opacity: loading ? 1 : 0,
            visibility: loading ? 'visible' : 'hidden',
            pointerEvents: loading ? 'auto' : 'none',
            zIndex: 10
        }}>
          Logging in...
        </div>
      )}

      <div style={{
        width: '100%',
        maxWidth: '480px',
        backgroundColor: 'rgba(255, 255, 255, 0.85)', 
        backdropFilter: 'blur(6px)',
        padding: '2rem',
        borderRadius: '1rem',
        boxShadow: '0 10px 20px rgba(0,0,0,0.05)',
        textAlign: 'center',
        color: '#2D2D2D'
      }}>
        <h1 style={{
          fontSize: 'clamp(1.75rem, 4vw, 2.25rem)',
          marginBottom: '0.5rem',
          fontWeight: 700
        }}>
          Welcome to Durian Leaf Classifier
        </h1>

        <p style={{
          fontSize: '1rem',
          color: '#555',
          marginBottom: '1.5rem',
          lineHeight: 1.5
        }}>
          Instantly identify types of durian leaves from photos using machine learning.
          Upload an image, and we’ll take care of the rest.
        </p>

        <div style={{ display: 'flex', flexDirection: 'column', gap: '0.75rem' }}>
          <input
            type="email"
            placeholder="Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            disabled={loading}
            style={{
              padding: '0.75rem 1rem',
              border: '1px solid #ccc',
              borderRadius: '8px',
              fontSize: '1rem'
            }}
          />
          <input
            type="password"
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            disabled={loading}
            style={{
              padding: '0.75rem 1rem',
              border: '1px solid #ccc',
              borderRadius: '8px',
              fontSize: '1rem'
            }}
          />

          <button
            onClick={handleLogin}
            disabled={loading}
            style={{
              backgroundColor: '#637E4C',
              color: 'white',
              padding: '0.75rem',
              border: 'none',
              borderRadius: '8px',
              fontWeight: 600,
              cursor: loading ? 'not-allowed' : 'pointer',
              fontSize: '1rem'
            }}
          >
            Sign In
          </button>

          <button
            onClick={handleRegister}
            disabled={loading}
            style={{
              backgroundColor: '#e0e0e0',
              color: '#2D2D2D',
              padding: '0.75rem',
              border: 'none',
              borderRadius: '8px',
              fontWeight: 600,
              cursor: loading ? 'not-allowed' : 'pointer',
              fontSize: '1rem'
            }}
          >
            Create an Account
          </button>
        </div>
      </div>
    </div>
  );
}
