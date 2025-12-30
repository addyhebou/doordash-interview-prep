import { Comment } from '../page';

interface Props {
  comments: Comment[];
  handleDislike: (commentID: number) => void;
  handleLike: (commentID: number) => void;
}

export const CommentSection = ({
  comments,
  handleDislike,
  handleLike,
}: Props) => {
  return (
    <div
      style={{
        display: 'flex',
        border: '2px solid purple',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'space-between',
      }}
    >
      {comments.map((comment) => {
        return (
          <div
            key={comment.id}
            style={{
              display: 'flex',
              border: '2px solid brown',
              flexDirection: 'row',
              alignItems: 'center',
              justifyContent: 'space-between',
              gap: '20px',
            }}
          >
            <button
              onClick={() => handleDislike(comment.id)}
              style={{
                color: 'red',
                borderRadius: '20px',
                padding: '10px',
                border: '2px solid red',
              }}
            >
              👎 {comment.dislikes}
            </button>
            <p>{comment.text}</p>
            <button
              onClick={() => handleLike(comment.id)}
              style={{
                color: 'green',
                borderRadius: '20px',
                padding: '10px',
                border: '2px solid green',
              }}
            >
              👍 {comment.likes}
            </button>
          </div>
        );
      })}
    </div>
  );
};
