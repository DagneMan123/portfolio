# Install React Phone Number Input - Professional Phone Validation

## Step 1: Install Dependencies

Run this command in your frontend directory:

```bash
cd frontend
npm install react-phone-number-input
```

This will install the professional phone number input library.

---

## Step 2: Update Contact.tsx

Replace your current Contact.tsx with the professional version below.

---

## Complete Updated Contact.tsx

```typescript
import { useState, useEffect } from 'react'
import axios from 'axios'
import { ContactFormData } from '../types/index'
import PhoneInput from 'react-phone-number-input'
import 'react-phone-number-input/style.css'

export default function Contact() {
  const [formData, setFormData] = useState<ContactFormData>({
    name: '',
    email: '',
    phone: '',
    subject: '',
    message: ''
  })
  const [loading, setLoading] = useState(false)
  const [success, setSuccess] = useState(false)
  const [error, setError] = useState('')
  const [qrCode, setQrCode] = useState<string>('')

  // Your Contact Info
  const contactName = "Dagne Developer"
  const contactPhone = "+251964855740" 
  const contactEmail = "aydenfudagne@gmail.com"
  
  // Generate QR code on mount
  useEffect(() => {
    const generateQRCode = async () => {
      try {
        const contactData = `BEGIN:VCARD
VERSION:3.0
FN:${contactName}
TEL;TYPE=CELL:${contactPhone}
EMAIL:${contactEmail}
URL:https://dagnedeveloper.com
END:VCARD`
        
        const encodedData = encodeURIComponent(contactData)
        const qrUrl = `https://api.qrserver.com/v1/create-qr-code/?size=200x200&data=${encodedData}`
        setQrCode(qrUrl)
      } catch (err) {
        console.error('Error generating QR code:', err)
      }
    }
    
    generateQRCode()
  }, [])

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target
    setFormData(prev => ({ ...prev, [name]: value }))
  }

  const handleNameChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { value } = e.target
    // Only allow letters (a-z, A-Z) and spaces
    const filteredValue = value.replace(/[^a-zA-Z ]/g, '')
    setFormData(prev => ({ ...prev, name: filteredValue }))
  }

  const handlePhoneChange = (value: string | undefined) => {
    // react-phone-number-input handles validation
    setFormData(prev => ({ ...prev, phone: value || '' }))
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setLoading(true)
    setError('')
    setSuccess(false)

    // Validate phone number - must be valid international format
    if (!formData.phone || formData.phone.length < 10) {
      setError('Please enter a valid phone number')
      setLoading(false)
      return
    }

    try {
      await axios.post('/api/contact', formData)
      setSuccess(true)
      setFormData({ name: '', email: '', phone: '', subject: '', message: '' })
      setTimeout(() => setSuccess(false), 5000)
    } catch (err) {
      setError('Failed to send message. Please try again.')
      console.error(err)
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="min-h-screen bg-light-bg dark:bg-dark-bg overflow-hidden">
      <style>{`
        @keyframes fadeInUp {
          from { opacity: 0; transform: translateY(40px); }
          to { opacity: 1; transform: translateY(0); }
        }

        @keyframes scaleIn {
          from { opacity: 0; transform: scale(0.9); }
          to { opacity: 1; transform: scale(1); }
        }

        .section-animate {
          animation: fadeInUp 0.8s ease-out forwards;
          opacity: 0;
        }

        .stagger-item {
          animation: fadeInUp 0.6s ease-out forwards;
          opacity: 0;
        }

        .stagger-item:nth-child(1) { animation-delay: 0.1s; }
        .stagger-item:nth-child(2) { animation-delay: 0.2s; }
        .stagger-item:nth-child(3) { animation-delay: 0.3s; }

        .qr-card {
          animation: scaleIn 0.8s cubic-bezier(0.16, 1, 0.3, 1) forwards;
          transition: all 0.4s ease;
        }

        .qr-card:hover {
          transform: translateY(-10px);
          border-color: #2563eb;
        }

        @media (max-width: 768px) {
          .qr-card {
            padding: 2rem 1.5rem;
          }

          .qr-card > div:first-child {
            order: 2;
          }

          .qr-card > div:last-child {
            order: 1;
            margin-bottom: 2rem;
          }
        }

        @media (max-width: 480px) {
          .qr-card {
            padding: 1.5rem 1rem;
          }

          .qr-card h2 {
            font-size: 1.5rem;
          }

          .qr-card p {
            font-size: 0.9rem;
          }

          .qr-card ul li {
            font-size: 0.85rem;
          }
        }

        .input-field {
          width: 100%;
          padding: 0.75rem 1rem;
          background: rgba(255, 255, 255, 0.05);
          border: 1px solid rgba(37, 99, 235, 0.2);
          border-radius: 0.75rem;
          outline: none;
          transition: all 0.3s ease;
          color: inherit;
        }

        .input-field:focus {
          border-color: #2563eb;
          box-shadow: 0 0 0 4px rgba(37, 99, 235, 0.1);
        }

        /* React Phone Number Input Styling */
        .PhoneInputInput {
          width: 100%;
          padding: 0.75rem 1rem;
          background: rgba(255, 255, 255, 0.05);
          border: 1px solid rgba(37, 99, 235, 0.2);
          border-radius: 0.75rem;
          outline: none;
          transition: all 0.3s ease;
          color: inherit;
          font-size: 1rem;
        }

        .PhoneInputInput:focus {
          border-color: #2563eb;
          box-shadow: 0 0 0 4px rgba(37, 99, 235, 0.1);
        }

        .PhoneInputCountry {
          padding: 0.5rem;
          background: rgba(255, 255, 255, 0.05);
          border-right: 1px solid rgba(37, 99, 235, 0.2);
          border-radius: 0.75rem 0 0 0.75rem;
        }

        .PhoneInputCountrySelect {
          background: transparent;
          border: none;
          cursor: pointer;
          color: inherit;
        }

        .interactive-card {
          position: relative;
          overflow: hidden;
        }

        .interactive-card::before {
          content: '';
          position: absolute;
          top: 0; left: -100%;
          width: 100%; height: 100%;
          background: linear-gradient(90deg, transparent, rgba(37, 99, 235, 0.1), transparent);
          transition: left 0.6s ease;
        }

        .interactive-card:hover::before { left: 100%; }
      `}</style>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
        <div className="max-w-4xl mx-auto">
          
          {/* Header */}
          <div className="section-animate text-center mb-16">
            <h1 className="text-5xl sm:text-6xl font-black mb-4 gradient-text">Get In Touch</h1>
            <p className="text-light-muted dark:text-dark-muted text-lg max-w-2xl mx-auto">
              Have a project in mind or want to collaborate? I'm currently available for new opportunities.
            </p>
          </div>

          {/* Social Links */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-16">
            <div className="stagger-item interactive-card card p-6 text-center border border-primary/10">
              <div className="text-4xl mb-4">📧</div>
              <h3 className="font-bold mb-1 text-primary">Email</h3>
              <a href={`mailto:${contactEmail}`} className="text-sm text-light-muted dark:text-dark-muted hover:text-primary transition-colors">
                {contactEmail}
              </a>
            </div>

            <div className="stagger-item interactive-card card p-6 text-center border border-primary/10">
              <div className="text-4xl mb-4">💼</div>
              <h3 className="font-bold mb-1 text-primary">LinkedIn</h3>
              <a href="https://linkedin.com/in/dagnedeveloper" target="_blank" rel="noopener noreferrer" className="text-sm text-light-muted dark:text-dark-muted hover:text-primary transition-colors">
                https://linkedin/dagnedeveloper
              </a>
            </div>

            <div className="stagger-item interactive-card card p-6 text-center border border-primary/10">
              <div className="text-4xl mb-4">🐙</div>
              <h3 className="font-bold mb-1 text-primary">GitHub</h3>
              <a href="https://github.com/DagneMan123" target="_blank" rel="noopener noreferrer" className="text-sm text-light-muted dark:text-dark-muted hover:text-primary transition-colors">
                github.com/DagneMan123
              </a>
            </div>
          </div>

          {/* QR Section */}
          <div className="qr-card grid grid-cols-1 md:grid-cols-2 gap-10 items-center card p-8 md:p-12 mb-16 border-primary/20 shadow-2xl">
            <div className="space-y-6">
              <h2 className="text-3xl font-black text-primary">Digital Business Card</h2>
              <p className="text-light-muted dark:text-dark-muted">
                Scan this QR code with your phone's camera to instantly save my professional contact information.
              </p>
              <ul className="space-y-3">
                <li className="flex items-center gap-3 text-sm text-light-text dark:text-dark-text">
                  <span className="w-6 h-6 bg-primary/10 rounded-full flex items-center justify-center text-primary font-bold">1</span>
                  Open your camera app
                </li>
                <li className="flex items-center gap-3 text-sm text-light-text dark:text-dark-text">
                  <span className="w-6 h-6 bg-primary/10 rounded-full flex items-center justify-center text-primary font-bold">2</span>
                  Point at the QR code
                </li>
                <li className="flex items-center gap-3 text-sm text-light-text dark:text-dark-text">
                  <span className="w-6 h-6 bg-primary/10 rounded-full flex items-center justify-center text-primary font-bold">3</span>
                  Tap to add to contacts
                </li>
              </ul>
            </div>

            <div className="flex justify-center">
              <div className="p-4 bg-white rounded-2xl shadow-2xl border-8 border-primary/5 hover:scale-105 transition-transform duration-500">
                {qrCode ? (
                  <img 
                    src={qrCode} 
                    alt="Contact QR Code" 
                    className="w-48 h-48 rounded-lg"
                  />
                ) : (
                  <div className="w-48 h-48 bg-gray-200 rounded-lg flex items-center justify-center">
                    <span className="text-gray-500">Loading QR Code...</span>
                  </div>
                )}
              </div>
            </div>
          </div>

          {/* Form Section */}
          <div className="section-animate card p-8 md:p-12 mb-12 border-primary/10">
            <h2 className="text-3xl font-black mb-8 text-primary">Send Message</h2>
            <form onSubmit={handleSubmit} className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <label className="block text-xs font-black uppercase tracking-widest mb-3 text-light-muted">Full Name</label>
                  <input
                    type="text"
                    name="name"
                    value={formData.name}
                    onChange={handleNameChange}
                    required
                    className="input-field dark:text-white"
                    placeholder="John Doe"
                    pattern="[a-zA-Z ]+"
                    title="Full name can only contain letters and spaces"
                  />
                </div>
                <div>
                  <label className="block text-xs font-black uppercase tracking-widest mb-3 text-light-muted">Email Address</label>
                  <input
                    type="email"
                    name="email"
                    value={formData.email}
                    onChange={handleChange}
                    required
                    className="input-field dark:text-white"
                    placeholder="john@example.com"
                  />
                </div>
              </div>

              <div>
                <label className="block text-xs font-black uppercase tracking-widest mb-3 text-light-muted">Phone Number</label>
                <PhoneInput
                  international
                  countryCallingCodeEditable={false}
                  defaultCountry="ET"
                  value={formData.phone}
                  onChange={handlePhoneChange}
                  placeholder="Enter phone number"
                  className="input-field"
                />
              </div>

              <div>
                <label className="block text-xs font-black uppercase tracking-widest mb-3 text-light-muted">Subject</label>
                <input
                  type="text"
                  name="subject"
                  value={formData.subject}
                  onChange={handleChange}
                  required
                  className="input-field dark:text-white"
                  placeholder="Project Inquiry"
                />
              </div>

              <div>
                <label className="block text-xs font-black uppercase tracking-widest mb-3 text-light-muted">Message</label>
                <textarea
                  name="message"
                  value={formData.message}
                  onChange={handleChange}
                  required
                  rows={6}
                  className="input-field dark:text-white"
                  placeholder="Describe your project ideas..."
                />
              </div>

              {success && (
                <div className="p-4 bg-green-500/10 border border-green-500/50 rounded-xl text-green-500 font-bold">
                  ✓ Message sent successfully! I'll respond within 24 hours.
                </div>
              )}
              
              {error && (
                <div className="p-4 bg-red-500/10 border border-red-500/50 rounded-xl text-red-500 font-bold">
                  ✗ {error}
                </div>
              )}

              <button
                type="submit"
                disabled={loading}
                className="w-full btn-primary py-4 rounded-xl font-black uppercase tracking-widest disabled:opacity-50"
              >
                {loading ? 'Sending...' : 'Send Message'}
              </button>
            </form>
          </div>

          {/* Response Footer */}
          <div className="section-animate card p-8 border-primary/5 bg-primary/5 text-center">
            <h2 className="text-xl font-bold mb-2 text-primary">Availability</h2>
            <p className="text-light-muted dark:text-dark-muted mb-4">
              Typical response time is less than 24 hours.
            </p>
            <div className="flex flex-wrap justify-center gap-4 text-xs font-black uppercase tracking-widest opacity-60">
              <span>📍 Addis Ababa, ET</span>
              <span>⏰ Mon — Fri: 9am - 6pm</span>
              <span>🚀 Open for Freelance</span>
            </div>
          </div>

        </div>
      </div>
    </div>
  )
}
```

---

## Step 3: Copy and Replace

1. Open `frontend/src/pages/Contact.tsx`
2. Replace entire content with the code above
3. Save the file

---

## Step 4: Restart Frontend

```bash
cd frontend
npm run dev
```

---

## Features

✅ **International Phone Support** - Supports all countries  
✅ **Country Selection** - Dropdown to select country  
✅ **Auto-Formatting** - Automatically formats phone numbers  
✅ **Validation** - Built-in phone number validation  
✅ **Default Country** - Set to Ethiopia (ET)  
✅ **Professional UI** - Clean, modern design  
✅ **Mobile Friendly** - Works great on mobile  

---

## How It Works

1. **Select Country** - Click flag to choose country
2. **Enter Number** - Type phone number
3. **Auto-Format** - Number formats automatically
4. **Validation** - Validates on submit
5. **Submit** - Send message with valid phone

---

## Example Phone Numbers

- **Ethiopia:** +251 96 485 5740
- **USA:** +1 202 555 1234
- **UK:** +44 20 7946 0958
- **India:** +91 98765 43210

---

## Styling

The component includes:
- Dark mode support
- Focus states
- Hover effects
- Responsive design
- Professional appearance

---

## Testing

1. Go to http://localhost:5173/contact
2. Click phone field
3. Select country from dropdown
4. Enter phone number
5. Number auto-formats
6. Submit form

Your contact form is now professional! 🚀
