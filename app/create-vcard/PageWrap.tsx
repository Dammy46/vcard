"use client"
import { useState, ChangeEvent, FormEvent } from 'react';

interface VCardForm {
  name: string;
  phone: string;
  email: string;
  company: string;
  website: string;
}


const PageWrap = () => {
    const [link, setLink] = useState<string>('');
  const [form, setForm] = useState<VCardForm>({
    name: '',
    phone: '',
    email: '',
    company: '',
    website: '',
  });

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    const res = await fetch('/api/generate-vcard', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(form),
    });
    const data = await res.json();
    setLink(data.link);
  };
    return (
 <div style={{ padding: 30 }}>
      <h1>Create a vCard</h1>
      <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: 10 }}>
        <input name="name" placeholder="Full Name" required onChange={handleChange} />
        <input name="phone" placeholder="Phone Number" required onChange={handleChange} />
        <input name="email" placeholder="Email Address" onChange={handleChange} />
        <input name="company" placeholder="Company" onChange={handleChange} />
        <input name="website" placeholder="Website URL" onChange={handleChange} />
        <button type="submit">Generate vCard</button>
      </form>

      {link && (
        <div style={{ marginTop: 20 }}>
          <p>Your vCard is ready:</p>
          <a href={link} target="_blank" rel="noopener noreferrer">
            {typeof window !== 'undefined' ? window.location.origin + link : link}
          </a>
        </div>
      )}
    </div>
    )
}
export default PageWrap