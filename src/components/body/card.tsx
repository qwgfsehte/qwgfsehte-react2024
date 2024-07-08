import { CardsProps, StatName, TypeName } from '../../interfaces/interface';
import './card.scss';
import { COLOR_TYPES, STAT_ICONS } from '../../utils/globalConsts';
import { updateFirstLetterToUpperCase } from '../../utils/utils';

function Card({ data }: CardsProps) {
  if (data !== null) {
    return (
      <div className="card">
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
          <div className="abilities-container">
            Abilities:
            <ul className="abilities-list">
              {data.abilities.map((ability, index) => (
                <li className="abilities-list__item" key={index}>
                  {ability.ability.name}
                </li>
              ))}
            </ul>
          </div>
          <div className="stats-container">
            <h3 className="stats-title">Stats:</h3>
            <ul className="stats-list">
              {data.stats.map((stat, index) => (
                <li className="stats-list__item" key={index}>
                  {STAT_ICONS[stat.stat.name as StatName] && (
                    <img
                      src={STAT_ICONS[stat.stat.name as StatName]}
                      alt={`${stat.stat.name} icon`}
                      className="stats-icon"
                    />
                  )}
                  {stat.base_stat}
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>
    );
  }
}

export default Card;
