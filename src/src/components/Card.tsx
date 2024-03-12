
interface CardProps {
  code: string;
  image: string;
  value: string;
  suit: string;
}
// @ts-ignore
const Card: React.FC<CardProps> = ({ code, image, value, suit }) => {
  return (
    <div className="card">
      <img src={image} alt={`${value} of ${suit}`} />
    </div>
  );
};

export default Card;
