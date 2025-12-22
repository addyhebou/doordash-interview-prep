interface Props {
  url: string;
  title: string;
  handlePrev: () => void;
  handleAdvance: () => void;
}
export const ImageField = ({
  url,
  title,
  handlePrev,
  handleAdvance,
}: Props) => {
  return (
    <div
      style={{
        width: '50vw',
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        flexDirection: 'column',
      }}
    >
      <img
        src={url}
        alt={`Image of dog: ${title}`}
        style={{
          border: '2px solid purple',
        }}
      />
      <div
        style={{
          display: 'flex',
          justifyContent: 'space-between',
          border: '2px solid blue',
          alignItems: 'center',
          width: '100%',
        }}
      >
        <button
          onClick={handlePrev}
          style={{
            fontSize: '2em',
          }}
        >
          ⬅️
        </button>
        <p>{title}</p>
        <button
          onClick={handleAdvance}
          style={{
            fontSize: '2em',
          }}
        >
          ➡️
        </button>
      </div>
    </div>
  );
};
