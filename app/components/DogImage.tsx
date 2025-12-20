'use client';
import React, { memo } from 'react';

type DogImageProps = {
  url: string;
  title: string;
  onPrevious: () => void;
  onNext: () => void;
  canGoPrevious: boolean;
  canGoNext: boolean;
};

export const DogImage = memo(function DogImage({
  url,
  title,
  onPrevious,
  onNext,
  canGoPrevious,
  canGoNext,
}: DogImageProps) {
  return (
    <div>
      <img
        src={url}
        alt={title}
        style={{ height: '500px', objectFit: 'cover' }}
        loading="lazy"
      />
      <div
        style={{
          display: 'flex',
          flexDirection: 'row',
          width: '800px',
          justifyContent: 'space-between',
          alignItems: 'center',
          marginTop: '20px',
        }}
      >
        <button
          onClick={onPrevious}
          disabled={!canGoPrevious}
          style={{
            padding: '10px 20px',
            fontSize: '18px',
            cursor: canGoPrevious ? 'pointer' : 'not-allowed',
            opacity: canGoPrevious ? 1 : 0.5,
          }}
        >
          {'<'}
        </button>
        <h2 style={{ textAlign: 'center', margin: '0 20px' }}>{title}</h2>
        <button
          onClick={onNext}
          disabled={!canGoNext}
          style={{
            padding: '10px 20px',
            fontSize: '18px',
            cursor: canGoNext ? 'pointer' : 'not-allowed',
            opacity: canGoNext ? 1 : 0.5,
          }}
        >
          {'>'}
        </button>
      </div>
    </div>
  );
});
