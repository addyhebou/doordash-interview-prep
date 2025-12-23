import { Comment } from '../page';

interface Props {
  comments: Comment[];
  handleVote: (commentID: number, action: 'like' | 'dislike') => void;
}
export const CommentList = ({ comments, handleVote }: Props) => {
  return (
    <div>
      {!!comments.length ? (
        comments.map((comment) => (
          <div
            key={comment.id}
            style={{
              display: 'flex',
              flexDirection: 'row',
              alignItems: 'center',
              justifyContent: 'center',
              gap: '20px',
            }}
          >
            <button
              style={{
                color: 'red',
                border: '2px solid red',
                borderRadius: '20%',
              }}
              onClick={() => handleVote(comment.id, 'dislike')}
            >
              👎 {comment.dislikes}
            </button>
            <p>{comment.text}</p>
            <button
              style={{
                color: 'green',
                border: '2px solid green',
                borderRadius: '20%',
              }}
              onClick={() => handleVote(comment.id, 'like')}
            >
              👍 {comment.likes}
            </button>
          </div>
        ))
      ) : (
        <p>No comments added for this image – add one now!</p>
      )}
    </div>
  );
};
