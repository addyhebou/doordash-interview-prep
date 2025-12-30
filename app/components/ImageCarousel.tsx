interface Props {
  url: string;
  title: string;
  handlePrev: () => void;
  handleNext: () => void;
}
export const ImageCarousel = ({
  url,
  title,
  handlePrev,
  handleNext,
}: Props) => {
  return (
    <div
      style={{
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
      }}
    >
      <img
        src={url}
        alt={title}
        style={{
          width: '40vw',
        }}
      />
      <p
        style={{
          width: '40vw',
        }}
      >
        {title}
      </p>
      <div
        style={{
          display: 'flex',
          flexDirection: 'row',
          alignItems: 'center',
          justifyContent: 'space-between',
          width: '100%',
        }}
      >
        <button
          style={{
            fontSize: '2em',
          }}
          onClick={handlePrev}
        >
          ⬅️
        </button>
        <button
          style={{
            fontSize: '2em',
          }}
          onClick={handleNext}
        >
          ➡️
        </button>
      </div>
    </div>
  );
};
