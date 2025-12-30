'use client';
import { useEffect, useState } from 'react';
import { getDogs } from './dogapi';
import { Carousel } from './components/Carousel';
import { CommentInput } from './components/CommentInput';
import { CommentSection } from './components/CommentSection';
import { RatingInput } from './components/RatingInput';

export interface Comment {
  id: number;
  text: string;
  likes: number;
  dislikes: number;
}
interface Dog {
  id: number;
  title: string;
  url: string;
  comments: Comment[];
}

export default function Home() {
  const [dogs, setDogs] = useState<Dog[]>([]);
  const [currentPageIndex, setCurrentPageIndex] = useState<number>(0);
  const [loading, setLoading] = useState<boolean>(false);
  const [commentText, setCommentText] = useState<string>('');
  const [rating, setRating] = useState<number>(0);
  const [numOfRatings, setNumOfRatings] = useState<number>(0);
  const [average, setAverage] = useState<number>(0);

  const handleNext = () => {
    setCurrentPageIndex((page) => (page + 1) % dogs.length);
  };

  const handlePrev = () => {
    if (currentPageIndex === 0) setCurrentPageIndex(dogs.length - 1);
    else setCurrentPageIndex((page) => page - 1);
  };

  const handleCommentText = (e: React.ChangeEvent<HTMLInputElement>) => {
    e.preventDefault();
    setCommentText(e.target.value);
  };

  const handleSubmitComment = () => {
    if (commentText.length === 0) return;
    const newComment: Comment = {
      id: Date.now(),
      text: commentText,
      dislikes: 0,
      likes: 0,
    };
    setDogs(
      dogs.map((dog) => {
        if (dog.id === currentPageIndex) {
          return { ...dog, comments: [...dog.comments, newComment] };
        } else return dog;
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
        } else return dog;
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
        } else return dog;
      })
    );
  };

  const handleKeyPress = (e: KeyboardEvent) => {
    if (e.key === 'ArrowLeft') {
      e.preventDefault();
      handleNext();
    } else if (e.key === 'ArrowRight') {
      e.preventDefault();
      handlePrev();
    } else if (e.key === 'Enter') {
      e.preventDefault();
      handleSubmitComment();
    }
  };

  const handleRating = (e: React.ChangeEvent<HTMLInputElement>) => {
    e.preventDefault();
    const value = parseInt(e.target.value);
    if (isNaN(value)) throw Error('Not a valid number');
    setRating(value);
  };

  const handleSubmitRating = () => {
    const currentSum = average * numOfRatings;
    setAverage((currentSum + rating) / (numOfRatings + 1));
    setNumOfRatings((num) => num + 1);
  };

  // Keyboard Navigation
  useEffect(() => {
    window.addEventListener('keydown', handleKeyPress);
    return () => window.removeEventListener('keydown', handleKeyPress);
  }, [handleKeyPress]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true);
        const data = await getDogs();
        setDogs(
          data.map((dog, id) => {
            return { ...dog, comments: [], id };
          })
        );
      } catch (error) {
        console.error('Error fetching dogs from API: ', error);
      } finally {
        setLoading(false);
      }
    };
    fetchData();
  }, []);

  if (loading) return <h1>Loading...</h1>;
  if (dogs.length === 0) return <h1>No dogs fetched...</h1>;

  const currentDog = dogs[currentPageIndex];

  return (
    <div>
      <h1>Carousel</h1>
      {/* Carousel Component */}
      <Carousel
        url={currentDog.url}
        title={currentDog.title}
        handlePrev={handlePrev}
        handleNext={handleNext}
      />
      {/* Comment Input */}
      <CommentInput
        commentText={commentText}
        handleCommentText={handleCommentText}
        handleSubmitComment={handleSubmitComment}
      />
      <RatingInput
        rating={rating}
        handleRating={handleRating}
        handleSubmitRating={handleSubmitRating}
      />
      <p>Rating average: {average}</p>
      {/* Comment Section */}
      <CommentSection
        comments={currentDog.comments}
        handleLike={handleLike}
        handleDislike={handleDislike}
      />
    </div>
  );
}
