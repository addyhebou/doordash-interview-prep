'use client';
import { useEffect, useState } from 'react';
import { getDogs } from './dogapi';
import { CommentField } from './myComponents/CommentField';
import { CommentListSection } from './myComponents/CommentListSection';
import { ImageField } from './myComponents/ImageField';

export type Comment = {
  id: number;
  text: string;
  dislikes: number;
  likes: number;
};

type Dog = {
  title: string;
  url: string;
  comments?: Comment[];
};
export default function Home() {
  const [dogs, setDogs] = useState<Dog[]>([]);
  const [currentIndex, setCurrentIndex] = useState<number>(0);
  const [commentText, setCommentText] = useState<string>('');

  const currentDog = dogs[currentIndex];

  const handlePrev = () => {
    setCurrentIndex((currentIndex) =>
      currentIndex === 0 ? dogs.length - 1 : currentIndex - 1
    );
  };

  const handleAdvance = () => {
    setCurrentIndex((currentIndex) => (currentIndex + 1) % dogs.length);
  };

  const handleCommentText = (e: React.ChangeEvent<HTMLInputElement>) => {
    e.preventDefault();
    setCommentText(e.target.value);
  };

  const handleSubmitComment = () => {
    const newComment: Comment = {
      id: Date.now(),
      text: commentText,
      dislikes: 0,
      likes: 0,
    };
    setDogs((dogs) =>
      dogs.map((dog, ind) => {
        if (ind === currentIndex) {
          return {
            ...dog,
            comments: dog.comments
              ? [...dog.comments, newComment]
              : [newComment],
          };
        }
        return dog;
      })
    );
    setCommentText('');
  };

  const handleDislike = (commentID: number) => {
    setDogs((dogs) =>
      dogs.map((dog, ind) => {
        if (ind === currentIndex) {
          return {
            ...dog,
            comments: dog.comments!.map((comment) => {
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
  const handleLike = (commentID: number) => {
    setDogs((dogs) =>
      dogs.map((dog, ind) => {
        if (ind === currentIndex) {
          return {
            ...dog,
            comments: dog.comments!.map((comment) => {
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

  useEffect(() => {
    const fetchDogData = async () => {
      const data = (await getDogs()) as Dog[];
      setDogs(data);
    };
    fetchDogData();
  }, []);

  if (dogs.length === 0) return <p>Loading...</p>;
  return (
    <div
      style={{
        display: 'flex',
        flexDirection: 'column',
        gap: '10px',
        justifyContent: 'center',
        alignItems: 'center',
      }}
    >
      <h1>Carousel</h1>
      <ImageField
        url={currentDog.url}
        title={currentDog.title}
        handlePrev={handlePrev}
        handleAdvance={handleAdvance}
      />
      <CommentField
        commentText={commentText}
        handleCommentText={handleCommentText}
        handleSubmitComment={handleSubmitComment}
      />

      {currentDog.comments && (
        <CommentListSection
          comments={currentDog.comments}
          handleDislike={handleDislike}
          handleLike={handleLike}
        />
      )}
    </div>
  );
}
