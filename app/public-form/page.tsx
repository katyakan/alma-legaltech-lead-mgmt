"use client";
import React, { useState } from 'react';

export default function PublicFormPage() {
  const [formData, setFormData] = useState({ firstName: '', lastName: '', email: '', linkedin: '' });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const response = await fetch('/api/leads', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(formData),
    });
    response.ok ? alert('Submitted!') : alert('Error!');
  };

  return (
    <main style={{ padding: '2rem' }}>
      <h1>Public Lead Form</h1>
      <form onSubmit={handleSubmit}>
        {/* Поля формы */}
        <input type="text" name="firstName" placeholder="First Name" onChange={handleChange} required />
        <input type="text" name="lastName" placeholder="Last Name" onChange={handleChange} required />
        <input type="email" name="email" placeholder="Email" onChange={handleChange} required />
        <input type="text" name="linkedin" placeholder="LinkedIn Profile" onChange={handleChange} />
        {/* Кнопка отправки */}
        <button type="submit">Submit</button>
      </form>
    </main>
  );
}
