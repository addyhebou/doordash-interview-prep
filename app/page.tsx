'use client';

import React, { useEffect, useState } from 'react';
import { getDogs } from './dogapi';
import { ImageCarousel } from './myComponents/ImageCarousel';
import { MyCommentInput } from './myComponents/CommentInput';
import { CommentList } from './myComponents/CommentList';

type Dog = {
  id: number;
  title: string;
  url: string;
  comments: Comment[];
};

export type Comment = {
  id: number;
  text: string;
  likes: number;
  dislikes: number;
};

export default function Home() {
  const [dogs, setDogs] = useState<Dog[]>([]);
  const [currentPageIndex, setCurrentPageIndex] = useState<number>(0);
  const [loading, setLoading] = useState<boolean>(false);
  const [commentText, setCommentText] = useState<string>('');

  const handlePrev = () => {
    if (currentPageIndex === 0) setCurrentPageIndex(dogs.length - 1);
    else setCurrentPageIndex((page) => page - 1);
  };
  const handleNext = () => {
    setCurrentPageIndex((page) => (page + 1) % dogs.length);
  };
  const handleCommentText = (e: React.ChangeEvent<HTMLInputElement>) => {
    e.preventDefault();
    setCommentText(e.target.value);
  };
  const handleSubmitComment = () => {
    const newComment: Comment = {
      id: Date.now(),
      text: commentText,
      likes: 0,
      dislikes: 0,
    };
    setDogs(
      dogs.map((dog) =>
        dog.id === currentPageIndex
          ? { ...dog, comments: [...dog.comments, newComment] }
          : dog
      )
    );
    setCommentText('');
  };

  const handleVote = (commentID: number, action: 'like' | 'dislike') => {
    setDogs(
      dogs.map((dog) =>
        dog.id === currentPageIndex
          ? {
              ...dog,
              comments: dog.comments.map((comment) =>
                comment.id === commentID
                  ? action === 'dislike'
                    ? { ...comment, dislikes: comment.dislikes + 1 }
                    : { ...comment, likes: comment.likes + 1 }
                  : comment
              ),
            }
          : dog
      )
    );
  };

  const handleKeyPress = (e: KeyboardEvent) => {
    if (e.key === 'ArrowLeft') {
      e.preventDefault();
      handlePrev();
    } else if (e.key === 'ArrowRight') {
      e.preventDefault();
      handleNext();
    } else if (e.key === 'Enter') {
      e.preventDefault();
      handleSubmitComment();
    }
  };

  useEffect(() => {
    window.addEventListener('keydown', handleKeyPress);
    return () => window.removeEventListener('keydown', handleKeyPress);
  }, [handleKeyPress]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const data = await getDogs();
        setDogs(
          data.map((dog, id) => {
            return { ...dog, comments: [], id };
          })
        );
      } catch (error) {
        console.error('Error with fetching dog data: ', error);
      } finally {
        setLoading(false);
      }
    };
    setLoading(true);
    fetchData();
  }, []);

  if (loading) return <p>Loading...</p>;

  if (dogs.length === 0) return <p>No dogs fetched...</p>;

  const currentDog = dogs[currentPageIndex];

  return (
    <div
      style={{
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
      }}
    >
      <h1>Carousel</h1>
      <ImageCarousel
        url={currentDog.url}
        title={currentDog.title}
        handleNext={handleNext}
        handlePrev={handlePrev}
      />
      <MyCommentInput
        commentText={commentText}
        onChange={handleCommentText}
        onSubmit={handleSubmitComment}
      />
      <CommentList comments={currentDog.comments} handleVote={handleVote} />
    </div>
  );
}
