'use client';
import { useEffect, useState, useCallback } from 'react';
import { getDogs } from './dogapi';
import { MyCommentList } from './myOwnComponents/MyCommentList';
import { MyCommentInput } from './myOwnComponents/MyCommentInput';

export type Comment = {
  id: number;
  text: string;
  likes: number;
  dislikes: number;
};
type Dog = {
  id: number;
  title: string;
  url: string;
  comments: Comment[];
};
export default function Home() {
  const [dogs, setDogs] = useState<Dog[] | null>(null);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [commentText, setCommentText] = useState('');
  useEffect(() => {
    const fetchDogData = async () => {
      const impartialData = (await getDogs()) as Dog[];
      const data = impartialData.map((dog) => {
        return { ...dog, comments: [] };
      });
      setDogs(data);
    };
    fetchDogData();
  }, []);

  if (!dogs) return <p>Loading...</p>;

  const currentDog = { ...dogs[currentIndex] };

  const goForward = () => {
    setCurrentIndex((currentIndex) => (currentIndex + 1) % dogs.length);
  };
  const goBack = () => {
    if (currentIndex === 0) setCurrentIndex(dogs.length - 1);
    else setCurrentIndex((currentIndex) => currentIndex - 1);
  };

  const handleCommentText = (e: React.ChangeEvent<HTMLInputElement>) => {
    e.preventDefault();
    setCommentText(e.target.value);
  };
  const handleSubmitComment = () => {
    const newComment: Comment = {
      text: commentText,
      dislikes: 0,
      likes: 0,
      id: Date.now(),
    };
    setDogs((dogs) =>
      dogs!.map((dog, i) => {
        if (i !== currentIndex) return dog;
        return { ...dog, comments: [...dog.comments, newComment] };
      })
    );
    setCommentText('');
  };

  const handleVote = (id: number, type: 'like' | 'dislike') => {
    const currentDogs = [...dogs];
    const modifiedCurrentDog = currentDog;
    const commentToEdit = modifiedCurrentDog.comments.find(
      (comment) => comment.id === id
    );
    if (!commentToEdit) throw Error('Comment does not exist');
    if (type === 'dislike') commentToEdit.dislikes += 1;
    else commentToEdit.likes += 1;
    currentDogs[currentIndex] = modifiedCurrentDog;
    setDogs(currentDogs);
  };

  return (
    <div>
      <h1>Dog Carousel</h1>
      <img src={currentDog.url} alt={'dog image'} />
      <button onClick={goBack}>👈🏿 Go Back</button>
      <button onClick={goForward}>👉🏿 Go Forward</button>
      <MyCommentInput
        commentText={commentText}
        handleCommentText={handleCommentText}
        handleSubmitComment={handleSubmitComment}
      />
      <MyCommentList comments={currentDog.comments} handleVote={handleVote} />
    </div>
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
