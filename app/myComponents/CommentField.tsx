import { ChangeEvent } from 'react';

interface Props {
  commentText: string;
  handleCommentText: (e: ChangeEvent<HTMLInputElement>) => void;
  handleSubmitComment: () => void;
}
export const CommentField = ({
  commentText,
  handleCommentText,
  handleSubmitComment,
}: Props) => {
  return (
    <div
      style={{
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
      }}
    >
      <input
        value={commentText}
        onChange={handleCommentText}
        placeholder="Add comment here"
        style={{
          border: '2px solid black',
        }}
      />
      <button
        type="submit"
        onClick={handleSubmitComment}
        disabled={!commentText}
        style={{
          background: 'lightgrey',
          padding: '10px',
        }}
      >
        Submit Comment
      </button>
    </div>
  );
};
