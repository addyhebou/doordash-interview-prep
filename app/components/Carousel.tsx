interface Props {
  url: string;
  title: string;
  handlePrev: () => void;
  handleNext: () => void;
}
export const Carousel = ({ url, title, handlePrev, handleNext }: Props) => {
  return (
    <div
      style={{
        display: 'flex',
        border: '2px solid blue',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'space-between',
        width: '40vw',
        margin: '0 auto',
        height: '70vh',
      }}
    >
      <img
        src={url}
        alt={title}
        style={{
          width: '20vw',
          border: '2px solid green',
        }}
      />
      <div
        style={{
          display: 'flex',
          border: '2px solid orange',
          flexDirection: 'row',
          alignItems: 'center',
          justifyContent: 'space-between',
          width: '100%',
        }}
      >
        <button onClick={handlePrev} style={{ fontSize: '2em' }}>
          ⬅️
        </button>
        <p>{title}</p>
        <button onClick={handleNext}>➡️</button>
      </div>
    </div>
  );
};
