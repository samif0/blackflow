"use client";
import React, { useState } from 'react';

export default function TestHealth() {
  const [healthData, setHealthData] = useState<{ status: string; timestamp: string } | null>(null);

  const handleClick = () => {
    console.log("Button clicked");
    fetch('/api/health')
      .then(res => res.json())
      .then(data => {
        setHealthData(data);
      })
      .catch(err => {
        console.error('Error fetching health data:', err);
      });
  };

  return (
    <div>
      <button onClick={handleClick}>Click me</button>
      {healthData && (
        <p>
          Status: {healthData.status} - Timestamp: {healthData.timestamp}
        </p>
      )}
    </div>
  );
}

