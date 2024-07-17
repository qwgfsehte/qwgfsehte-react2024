import { CardsProps } from '../../../interfaces/interface';
import { updateFirstLetterToUpperCase } from '../../../utils/utils';
import './card.scss';

function Card({ name, getInfo }: CardsProps) {
  if (name !== null) {
    return (
      <button className="card" onClick={() => getInfo()}>
        <div className="card-name">
          <h3>{updateFirstLetterToUpperCase(name)}</h3>
        </div>
      </button>
    );
  }
}

export default Card;
