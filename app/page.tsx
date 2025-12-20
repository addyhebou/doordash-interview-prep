'use client';
import { useEffect, useState, useCallback } from 'react';
import { getDogs } from './dogapi';
import { CommentProvider } from './context/CommentContext';
import { AppProviders } from './context/AppProviders';
import { DogImage } from './components/DogImage';
import { CommentInput } from './components/CommentInput';
import { CommentList } from './components/CommentList';
import { LoadingSkeleton } from './components/LoadingSkeleton';

type DogData = {
  title: string;
  url: string;
};

function DogCarousel() {
  const [page, setPage] = useState(0);
  const [dogs, setCurrentDogs] = useState<DogData[] | null>(null);
  const [loading, setLoading] = useState(true);

  // Navigation with keyboard support
  const goBack = useCallback(() => {
    if (page > 0) setPage((page) => page - 1);
  }, [page]);

  const goForward = useCallback(() => {
    if (dogs && page < dogs.length - 1) setPage((page) => page + 1);
  }, [dogs, page]);

  // Keyboard navigation
  useEffect(() => {
    const handleKeyPress = (e: KeyboardEvent) => {
      if (e.key === 'ArrowLeft') {
        e.preventDefault();
        goBack();
      } else if (e.key === 'ArrowRight') {
        e.preventDefault();
        goForward();
      }
    };

    window.addEventListener('keydown', handleKeyPress);
    return () => window.removeEventListener('keydown', handleKeyPress);
  }, [goBack, goForward]);

  // Preload next image for better performance
  useEffect(() => {
    if (dogs && page < dogs.length - 1) {
      const nextImage = new Image();
      nextImage.src = dogs[page + 1].url;
    }
  }, [dogs, page]);

  useEffect(() => {
    const fetchDogData = async () => {
      try {
        setLoading(true);
        const data = await getDogs();
        setCurrentDogs(data);
      } catch (error) {
        console.error('Failed to fetch dog data:', error);
      } finally {
        setLoading(false);
      }
    };
    fetchDogData();
  }, []);

  if (loading || !dogs) {
    return <LoadingSkeleton />;
  }
  return (
    <div
      style={{
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        flexDirection: 'column',
        padding: '20px',
        maxWidth: '1000px',
        margin: '0 auto',
      }}
    >
      <h1>Welcome to the Dog Pictures App!</h1>
      <DogImage
        url={dogs[page].url}
        title={dogs[page].title}
        onPrevious={goBack}
        onNext={goForward}
        canGoPrevious={page > 0}
        canGoNext={page < dogs.length - 1}
      />

      <CommentInput pageIndex={page} />
      <CommentList pageIndex={page} />

      {/* Navigation hint */}
      <div
        style={{
          marginTop: '20px',
          color: '#666',
          fontSize: '14px',
          textAlign: 'center',
        }}
      >
        <p>
          Use arrow keys or buttons to navigate • Page {page + 1} of{' '}
          {dogs.length}
        </p>
      </div>
    </div>
  );
}

export default function Home() {
  return (
    <AppProviders>
      <DogCarousel />
    </AppProviders>
  );
}

/**
 * Steps to the problem:
 *
 * 1. Fetch the data
 * 2. Save the date in state
 * 3. Render each image
 * 
 * comments:
 * {
 * 0: {
 * value: string;
 * likes: number
 * dislikes: number
 * }[]
 * }
 * 
 * 
 * 
 * when someone adds a comment, they add it to the map at index page, then adds a new comment with 
 * 
 * 
 * ⏱️ 40–45 min — Production Ready Improvements

ALWAYS end with these:

✅ Extract components

(Image, CommentList, CommentInput)

✅ Memoize heavy parts

React.memo() on image component

✅ Use reducer for complex comment logic

(if it grows)

✅ Add loading skeleton
✅ Add optimistic updates for comments
✅ Add keyboard arrows for navigation
✅ Add preloading for next image

This is what will get you a “Strong Hire.”
 */
