interface Props {
  commentText: string;
  handleCommentText: (e: React.ChangeEvent<HTMLInputElement>) => void;
  handleSubmitComment: () => void;
}

export const CommentInput = ({
  commentText,
  handleCommentText,
  handleSubmitComment,
}: Props) => {
  return (
    <div
      style={{
        display: 'flex',
        border: '2px solid red',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'space-between',
      }}
    >
      <input
        value={commentText}
        onChange={handleCommentText}
        placeholder="Enter comment"
      />
      <button
        onClick={handleSubmitComment}
        style={{
          padding: '20px',
          borderRadius: '20px',
          backgroundColor: 'grey',
        }}
      >
        Submit Comment
      </button>
    </div>
  );
};
