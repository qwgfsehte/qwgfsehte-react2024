import { CardsProps } from '../../../interfaces/interface';
import { updateFirstLetterToUpperCase } from '../../../utils/utils';
import './card.scss';

function Card({ data, getInfo }: CardsProps) {
  if (data !== null) {
    return (
      <button className="card" onClick={() => getInfo(data)}>
        <div className="card-name">
          <div className="card-id">#{`${data.id}`}</div>
          <img
            className="card-image"
            src={
              data.sprites.front_default
                ? data.sprites.front_default
                : './src/assets/imgs/default-img.webp'
            }
            alt="pokemon"
          />
          <h3>{updateFirstLetterToUpperCase(data.name)}</h3>
        </div>
      </button>
    );
  }
}

export default Card;
