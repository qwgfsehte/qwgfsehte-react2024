import { CardsProps, TypeName } from '../../interfaces/interface';
import './card.scss';
import { COLOR_TYPES } from '../../utils/globalConsts';
import { updateFirstLetterToUpperCase } from '../../utils/utils';

function Card({ data, getInfo }: CardsProps) {
  if (data !== null) {
    return (
      <button className="card" onClick={() => getInfo(data)}>
        <div className="card-name">
          <div className="card-id">{'#' + data.id}</div>
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
        <div className="card-info">
          <div className="types-list">
            Types:
            {data.types.map((type, index) => (
              <div
                className="types-list__item"
                key={index}
                style={{
                  backgroundColor: COLOR_TYPES[type.type.name as TypeName],
                }}
              >
                {COLOR_TYPES[type.type.name as TypeName] && (
                  <p>{type.type.name}</p>
                )}
              </div>
            ))}
          </div>
        </div>
      </button>
    );
  }
}

export default Card;
