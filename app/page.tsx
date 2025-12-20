'use client';
import { useEffect, useState } from 'react';
import { getDogs } from './dogapi';

type DogData = {
  title: string;
  url: string;
};

type Comment = {
  value: string;
  likes: number;
  dislikes: number;
  id: number;
};

export default function Home() {
  const [page, setPage] = useState(0);
  const [dogs, setCurrentDogs] = useState<DogData[] | null>(null);
  const [value, setValue] = useState('');
  const [comments, setComments] = useState<Map<Number, Comment[]>>(new Map());
  const [latestCommentID, setLatestCommentID] = useState(0);

  const goBack = () => page > 0 && setPage((page) => page - 1);
  const goForward = () =>
    dogs && page < dogs.length - 1 && setPage((page) => page + 1);

  const handleText = (e: React.ChangeEvent<HTMLInputElement>) => {
    e.preventDefault();
    setValue(e.target.value);
  };

  const handleSubmit = () => {
    const currentComments = comments.get(page);
    const newComment: Comment = {
      value,
      likes: 0,
      dislikes: 0,
      id: latestCommentID,
    };
    console.log({ newComment });
    comments.set(
      page,
      currentComments ? [...currentComments, newComment] : [newComment]
    );
    setValue('');
    setLatestCommentID((commentID) => commentID + 1);
  };

  const vote = (action: 'down' | 'up', id: number) => {
    console.log({ comments });
    const currentComments = comments.get(page);
    if (!currentComments) return;
    const comment = currentComments.find((comment) => comment.id === id);
    if (!comment) return;
    if (action === 'down') comment.dislikes += 1;
    else if (action === 'up') comment.likes += 1;
  };

  useEffect(() => {
    const fetchDogData = async () => {
      try {
        const data = await getDogs();
        console.log({ data });
        setCurrentDogs(data);
      } catch (error) {
        console.log(error);
      }
    };
    fetchDogData();
  }, []);
  if (!dogs) return <p>Loading...</p>;
  return (
    <div
      style={{
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        flexDirection: 'column',
      }}
    >
      <h1>Welcome to the Dog Pictures App!</h1>
      <img
        src={dogs[page].url}
        alt={'Dog doing this'}
        style={{ height: '500px' }}
      />
      <div
        style={{
          display: 'flex',
          flexDirection: 'row',
          width: '800px',
          justifyContent: 'space-between',
          alignItems: 'top',
        }}
      >
        <button onClick={goBack}>{'<'}</button>
        <p>{dogs[page].title}</p>
        <button onClick={goForward}>{'>'}</button>
      </div>
      <div
        style={{
          display: 'flex',
          flexDirection: 'row',
          width: '180px',
          justifyContent: 'space-between',
          alignItems: 'top',
        }}
      >
        <input
          type={'text'}
          placeholder="Comment here"
          value={value}
          onChange={handleText}
        />
        <button type="submit" onClick={handleSubmit}>
          Submit
        </button>
      </div>
      {comments.get(page)?.map((comment) => (
        <div
          style={{ display: 'flex', flexDirection: 'row', gap: '10px' }}
          key={comment.id}
        >
          <button
            style={{ color: 'red' }}
            onClick={() => vote('down', comment.id)}
          >
            Downvote – {comment.dislikes}
          </button>
          <p>{comment.value}</p>
          <button onClick={() => vote('up', comment.id)}>
            Upvote – {comment.likes}
          </button>
        </div>
      ))}
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
