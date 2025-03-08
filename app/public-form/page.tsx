"use client";
import React, { useState } from 'react';

export default function PublicFormPage() {
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    email: '',
    linkedin: '',
    visas: [] as string[],
    additionalInfo: '',
  });

  
  const [resumeFile, setResumeFile] = useState<File | null>(null);

  
  const handleInputChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  // Файл
  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      setResumeFile(e.target.files[0]);
    }
  };

  // Visas (multiple select)
  const handleVisasChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const selectedOptions = Array.from(e.target.selectedOptions).map(opt => opt.value);
    setFormData({ ...formData, visas: selectedOptions });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    try {
      
      const dataToSend = new FormData();
      dataToSend.append('firstName', formData.firstName);
      dataToSend.append('lastName', formData.lastName);
      dataToSend.append('email', formData.email);
      dataToSend.append('linkedin', formData.linkedin);
      dataToSend.append('additionalInfo', formData.additionalInfo);

      
      formData.visas.forEach((visa) => {
        dataToSend.append('visas', visa);
      });

      
      if (resumeFile) {
        dataToSend.append('resume', resumeFile);
      }

      const response = await fetch('/api/leads', {
        method: 'POST',
        body: dataToSend,
      });

      if (response.ok) {
        alert('Your information was submitted successfully!');
      } else {
        alert('Something went wrong...');
      }
    } catch (err) {
      console.error(err);
      alert('Network error');
    }
  };

  return (
    <main style={{ padding: '1rem' }}>
      <h1>Public Lead Form</h1>
      <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
        <input
          type="text"
          name="firstName"
          placeholder="First Name"
          value={formData.firstName}
          onChange={handleInputChange}
          required
        />
        <input
          type="text"
          name="lastName"
          placeholder="Last Name"
          value={formData.lastName}
          onChange={handleInputChange}
          required
        />
        <input
          type="email"
          name="email"
          placeholder="Email"
          value={formData.email}
          onChange={handleInputChange}
          required
        />
        <input
          type="text"
          name="linkedin"
          placeholder="LinkedIn Profile"
          value={formData.linkedin}
          onChange={handleInputChange}
        />
        
        {/* Multiple-select for visas */}
        <label htmlFor="visas">Select Visa Categories of Interest:</label>
        <select
          id="visas"
          name="visas"
          multiple
          value={formData.visas}
          onChange={handleVisasChange}
        >
          <option value="F1">F1</option>
          <option value="B2">B2</option>
          <option value="EB-3">EB-3</option>
          <option value="I don’t know">I don’t know</option>
        </select>

        {/* Additional Info */}
        <textarea
          name="additionalInfo"
          placeholder="Additional Information"
          value={formData.additionalInfo}
          onChange={handleInputChange}
          rows={4}
        />

        {/* File upload */}
        <label htmlFor="resume">Upload Resume/CV:</label>
        <input
          type="file"
          name="resume"
          accept=".pdf,.doc,.docx"
          onChange={handleFileChange}
        />

        <button type="submit">Submit</button>
      </form>
    </main>
  );
}
