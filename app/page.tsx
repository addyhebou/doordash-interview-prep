'use client';

import React, { useEffect, useState } from 'react';
import { getDogs } from './dogapi';
import { ImageCarousel } from './components/ImageCarousel';
import { MyCommentInput } from './components/CommentInput';
import { CommentList } from './components/CommentList';

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
      dogs.map((dog) => {
        if (dog.id === currentPageIndex) {
          return { ...dog, comments: [...dog.comments, newComment] };
        }
        return dog;
      })
    );
    setCommentText('');
  };

  const handleLike = (commentID: number) => {
    setDogs(
      dogs.map((dog) => {
        if (dog.id === currentPageIndex) {
          return {
            ...dog,
            comments: dog.comments.map((comment) => {
              if (comment.id === commentID) {
                return { ...comment, likes: comment.likes + 1 };
              }
              return comment;
            }),
          };
        }
        return dog;
      })
    );
  };
  const handleDislike = (commentID: number) => {
    setDogs(
      dogs.map((dog) => {
        if (dog.id === currentPageIndex) {
          return {
            ...dog,
            comments: dog.comments.map((comment) => {
              if (comment.id === commentID) {
                return { ...comment, dislikes: comment.dislikes + 1 };
              }
              return comment;
            }),
          };
        }
        return dog;
      })
    );
  };

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
      <CommentList
        comments={currentDog.comments}
        handleDislike={handleDislike}
        handleLike={handleLike}
      />
    </div>
  );
}
