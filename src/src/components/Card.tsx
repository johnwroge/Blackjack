

import { CardProps } from "../types/types";
// @ts-ignore
const Card: React.FC<CardProps> = ({ code, image, value, suit }) => {
  return (
    <div className="card">
      <img src={image} alt={`${value} of ${suit}`} />
    </div>
  );
};

export default Card;
