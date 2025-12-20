'use client';
import React from 'react';

export function LoadingSkeleton() {
  return (
    <div
      style={{
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        flexDirection: 'column',
        padding: '20px',
      }}
    >
      <h1>Welcome to the Dog Pictures App!</h1>

      {/* Image skeleton */}
      <div
        style={{
          width: '400px',
          height: '500px',
          backgroundColor: '#f0f0f0',
          borderRadius: '8px',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          marginBottom: '20px',
        }}
      >
        <div style={{ color: '#999', fontSize: '18px' }}>Loading...</div>
      </div>

      {/* Navigation skeleton */}
      <div
        style={{
          display: 'flex',
          flexDirection: 'row',
          width: '800px',
          justifyContent: 'space-between',
          alignItems: 'center',
          marginBottom: '20px',
        }}
      >
        <div
          style={{
            width: '40px',
            height: '40px',
            backgroundColor: '#f0f0f0',
            borderRadius: '4px',
          }}
        />
        <div
          style={{
            width: '200px',
            height: '30px',
            backgroundColor: '#f0f0f0',
            borderRadius: '4px',
          }}
        />
        <div
          style={{
            width: '40px',
            height: '40px',
            backgroundColor: '#f0f0f0',
            borderRadius: '4px',
          }}
        />
      </div>

      {/* Comment input skeleton */}
      <div
        style={{
          display: 'flex',
          flexDirection: 'row',
          gap: '10px',
          alignItems: 'center',
          marginTop: '20px',
        }}
      >
        <div
          style={{
            width: '300px',
            height: '40px',
            backgroundColor: '#f0f0f0',
            borderRadius: '4px',
          }}
        />
        <div
          style={{
            width: '80px',
            height: '40px',
            backgroundColor: '#f0f0f0',
            borderRadius: '4px',
          }}
        />
      </div>
    </div>
  );
}
