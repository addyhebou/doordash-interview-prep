interface Props {
  commentText: string;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  onSubmit: () => void;
}
export const MyCommentInput = ({ commentText, onChange, onSubmit }: Props) => {
  return (
    <div>
      <input
        value={commentText}
        onChange={onChange}
        placeholder="Type your comment here"
      />
      <button type="submit" onClick={onSubmit}>
        Submit Comment
      </button>
    </div>
  );
};
