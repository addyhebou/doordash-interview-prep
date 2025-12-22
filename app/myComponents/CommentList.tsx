import { Comment } from '../page';

interface Props {
  comments: Comment[];
  handleLike: (commentID: number) => void;
  handleDislike: (commentID: number) => void;
}
export const CommentList = ({ comments, handleLike, handleDislike }: Props) => {
  return (
    <div>
      {!!comments.length ? (
        comments.map((comment) => {
          return (
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
                onClick={() => handleDislike(comment.id)}
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
                onClick={() => handleLike(comment.id)}
              >
                👍 {comment.likes}
              </button>
            </div>
          );
        })
      ) : (
        <p>No comments added for this image – add one now!</p>
      )}
    </div>
  );
};
