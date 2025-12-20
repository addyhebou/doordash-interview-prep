'use client';
import React, { useState } from 'react';
import { useComments } from '../context/CommentContext';

type CommentInputProps = {
  pageIndex: number;
};

export function CommentInput({ pageIndex }: CommentInputProps) {
  const [value, setValue] = useState('');
  const { addComment } = useComments();

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (value.trim()) {
      addComment(pageIndex, value.trim());
      setValue('');
    }
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSubmit(e);
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <div
        style={{
          display: 'flex',
          flexDirection: 'row',
          gap: '10px',
          alignItems: 'center',
          marginTop: '20px',
        }}
      >
        <input
          type="text"
          placeholder="Add a comment..."
          value={value}
          onChange={(e) => setValue(e.target.value)}
          onKeyPress={handleKeyPress}
          style={{
            padding: '10px',
            borderRadius: '4px',
            border: '1px solid #ccc',
            fontSize: '14px',
            minWidth: '300px',
          }}
        />
        <button
          type="submit"
          disabled={!value.trim()}
          style={{
            padding: '10px 20px',
            backgroundColor: '#007bff',
            color: 'white',
            border: 'none',
            borderRadius: '4px',
            cursor: value.trim() ? 'pointer' : 'not-allowed',
            opacity: value.trim() ? 1 : 0.6,
          }}
        >
          Submit
        </button>
      </div>
    </form>
  );
}
