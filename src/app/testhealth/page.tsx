"use client"; // Add this at the top
import React from 'react';


export default function TestHealth() {
  const handleClick = () => {
    console.log("Button clicked");
    fetch('/api/auth/health')
      .then(res => res.json())
      .then(data =>
        <p>
          {data.status} {data.message}
        </p>
      )
  };

  return (
    <div>
      <button onClick={handleClick}>Click me</button>
    </div>
  );
}

