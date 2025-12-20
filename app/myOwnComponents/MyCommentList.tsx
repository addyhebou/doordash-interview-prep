import { Comment } from '../page';

interface Props {
  comments: Comment[];
  handleVote: (id: number, action: 'like' | 'dislike') => void;
}
export const MyCommentList = ({ handleVote, comments }: Props) => {
  return (
    <div
      style={{
        display: 'flex',
        flexDirection: 'column',
        gap: '10px',
        alignItems: 'center',
        justifyContent: 'center',
      }}
    >
      {comments.map((comment) => (
        <div
          style={{
            display: 'flex',
            flexDirection: 'row',
            gap: '10px',
            alignItems: 'center',
            justifyContent: 'center',
          }}
        >
          <button onClick={() => handleVote(comment.id, 'dislike')}>
            👎 {comment.dislikes}
          </button>
          <p>{comment.text}</p>
          <button onClick={() => handleVote(comment.id, 'like')}>
            👍 {comment.likes}
          </button>
        </div>
      ))}
    </div>
  );
};
