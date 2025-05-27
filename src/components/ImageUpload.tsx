import { useRef, useState } from 'react'

export default function ImageUpload() {
  const [file, setFile] = useState<File | null>(null)
  const [preview, setPreview] = useState<string | null>(null)
  const [result, setResult] = useState<string>('')
  const [loading, setLoading] = useState(false)
  const [showResult, setShowResult] = useState(false)
  const inputRef = useRef<HTMLInputElement>(null)

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const selected = e.target.files?.[0]
    if (selected) {
      setFile(selected)
      setPreview(URL.createObjectURL(selected))
      setResult('')
      setShowResult(false)
    }
  }

  const handleUpload = async () => {
    if (!file) return
    const formData = new FormData()
    formData.append('image', file)

    setLoading(true)
    setShowResult(false)
    try {
      const res = await fetch('http://3.142.130.23/predict', {
        method: 'POST',
        headers: {
          'Authorization': 'Bearer TEST_T0KEN_101000',
        },
        body: formData,
      })
      const data = await res.json()
      setResult(data.prediction)
      setShowResult(true)
    } catch (err) {
      console.error(err)
      setResult('Prediction failed. Try again.')
      setShowResult(true)
    } finally {
      setLoading(false)
    }
  }

  const handleRemove = () => {
    setFile(null)
    setPreview(null)
    setResult('')
    setShowResult(false)
  }

  const triggerFileInput = () => {
    inputRef.current?.click()
  }

  return (
    <div style={{
      textAlign: 'center',
      fontFamily: "'Inter', sans-serif",
      color: '#2D2D2D'
    }}>
      <input
        ref={inputRef}
        type="file"
        accept="image/*"
        onChange={handleFileChange}
        style={{ display: 'none' }}
      />

      {/* Image Upload / Preview Box */}
      <div
        onClick={triggerFileInput}
        style={{
          width: '100%',
          height: '300px',
          marginBottom: '1.5rem',
          border: preview ? '1px solid #ccc' : '2px dashed #ccc',
          borderRadius: '0.75rem',
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
          position: 'relative',
          cursor: 'pointer',
          backgroundColor: preview ? '#fff' : '#f9f9f9',
          transition: 'all 0.2s ease'
        }}
      >
        {preview ? (
          <>
            <img
              src={preview}
              alt="preview"
              style={{
                maxHeight: '100%',
                maxWidth: '100%',
                objectFit: 'contain',
                borderRadius: '0.5rem'
              }}
            />
            <button
              onClick={(e) => {
                e.stopPropagation()
                handleRemove()
              }}
              style={{
                position: 'absolute',
                top: '10px',
                right: '10px',
                background: 'rgba(0,0,0,0.6)',
                color: 'white',
                border: 'none',
                borderRadius: '50%',
                width: '30px',
                height: '30px',
                fontSize: '1rem',
                cursor: 'pointer',
              }}
              title="Remove image"
            >
              &times;
            </button>
          </>
        ) : (
          <span style={{
            color: '#aaa',
            fontSize: '1rem',
            fontWeight: 500
          }}>
            Tap or click here to upload image
          </span>
        )}
      </div>

      {/* Upload Button */}
      <button
        onClick={handleUpload}
        disabled={!file || loading}
        style={{
          backgroundColor: '#637E4C',
          color: 'white',
          padding: '0.75rem 1.5rem',
          fontSize: 'clamp(1rem, 2vw, 1.125rem)',
          border: 'none',
          borderRadius: '8px',
          fontWeight: 600,
          cursor: loading || !file ? 'not-allowed' : 'pointer',
          transition: 'background 0.3s ease',
          marginBottom: '1rem'
        }}
      >
        {loading ? 'Classifying...' : 'Classify'}
      </button>

      {/* Result */}
      {showResult && (
        <p style={{
          marginTop: '1rem',
          fontSize: 'clamp(1rem, 2vw, 1.125rem)',
          fontWeight: 500,
          color: '#333',
          opacity: showResult ? 1 : 0,
          transition: 'opacity 0.6s ease-in-out'
        }}>
          Result: {result}
        </p>
      )}
    </div>
  )
}
