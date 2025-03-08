"use client";
import React, { useEffect, useState } from 'react';

export default function InternalLeadsPage() {
  const [leads, setLeads] = useState<any[]>([]);

  useEffect(() => {
    fetch('/api/leads')
      .then((res) => res.json())
      .then((data) => setLeads(data))
      .catch(console.error);
  }, []);

  const handleStatusChange = async (email: string, newStatus: string) => {
    const response = await fetch('/api/leads', {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ email, newStatus }),
    });
    if (response.ok) {
      setLeads((prev) => prev.map((lead) => (lead.email === email ? { ...lead, status: newStatus } : lead)));
    }
  };

  return (
    <main style={{ padding: '2rem' }}>
      <h1>Internal Leads Management</h1>
      <table>
        <thead>
          <tr>
            <th>Name</th>
            <th>Email</th>
            <th>Status</th>
            <th>Action</th>
          </tr>
        </thead>
        <tbody>
          {leads.map((lead, i) => (
            <tr key={i}>
              <td>{lead.firstName} {lead.lastName}</td>
              <td>{lead.email}</td>
              <td>{lead.status}</td>
              <td>
                {lead.status === 'PENDING' && (
                  <button onClick={() => handleStatusChange(lead.email, 'REACHED_OUT')}>
                    Mark as Reached Out
                  </button>
                )}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </main>
  );
}
