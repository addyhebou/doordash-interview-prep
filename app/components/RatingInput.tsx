interface Props {
  rating: number;
  handleRating: (e: React.ChangeEvent<HTMLInputElement>) => void;
  handleSubmitRating: () => void;
}

export const RatingInput = ({
  rating,
  handleRating,
  handleSubmitRating,
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
        value={rating}
        onChange={handleRating}
        placeholder="Enter comment"
        type="number"
      />
      <button
        onClick={handleSubmitRating}
        style={{
          padding: '20px',
          borderRadius: '20px',
          backgroundColor: 'grey',
        }}
      >
        Submit Rating
      </button>
    </div>
  );
};
