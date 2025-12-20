interface Props {
  commentText: string;
  handleCommentText: (e: React.ChangeEvent<HTMLInputElement>) => void;
  handleSubmitComment: () => void;
}

export const MyCommentInput = ({
  commentText,
  handleCommentText,
  handleSubmitComment,
}: Props) => {
  return (
    <>
      <input
        value={commentText}
        onChange={handleCommentText}
        placeholder="Type your comment here"
      />
      <button onClick={handleSubmitComment}>Submit Comment</button>
    </>
  );
};
