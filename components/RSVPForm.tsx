'use client';

import { useState } from 'react';

export default function RSVPForm() {
  const [name, setName] = useState('');
  const [attendance, setAttendance] = useState('yes');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    await fetch('/rsvp/submit', {
      method: 'POST',
      body: JSON.stringify({ name, attendance }),
    });

    alert('送信ありがとうございました！');
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4 max-w-md mx-auto">
      <div>
        <label className="block text-sm font-medium">お名前</label>
        <input
          type="text"
          required
          value={name}
          onChange={(e) => setName(e.target.value)}
          className="mt-1 block w-full border rounded p-2"
        />
      </div>
      <div>
        <label className="block text-sm font-medium">出欠</label>
        <select
          value={attendance}
          onChange={(e) => setAttendance(e.target.value)}
          className="mt-1 block w-full border rounded p-2"
        >
          <option value="yes">出席</option>
          <option value="no">欠席</option>
        </select>
      </div>
      <button type="submit" className="bg-pink-500 text-white px-4 py-2 rounded">
        送信
      </button>
    </form>
  );
}
