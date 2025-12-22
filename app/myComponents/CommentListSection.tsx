import { Comment } from '../page';

interface Props {
  comments: Comment[];
  handleLike: (commentID: number) => void;
  handleDislike: (commentID: number) => void;
}
export const CommentListSection = ({
  comments,
  handleDislike,
  handleLike,
}: Props) => {
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
      {comments?.map((comment) => {
        return (
          <div
            key={comment.id}
            style={{
              display: 'flex',
              flexDirection: 'row',
              gap: '10px',
              justifyContent: 'center',
              alignItems: 'center',
            }}
          >
            <button
              style={{
                color: 'red',
                border: '2px solid red',
                borderRadius: '6px',
              }}
              onClick={() => handleDislike(comment.id)}
            >
              👎 {comment.dislikes}
            </button>
            <p>{comment.text}</p>
            <button
              style={{
                color: 'green',
                border: '2px solid green',
                borderRadius: '6px',
              }}
              onClick={() => handleLike(comment.id)}
            >
              👍 {comment.likes}
            </button>
          </div>
        );
      })}
    </div>
  );
};
