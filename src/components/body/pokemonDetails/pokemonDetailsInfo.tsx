import {
  PokemonDetailsInfoProps,
  StatName,
} from '../../../interfaces/interface';
import { STAT_ICONS } from '../../../utils/globalConsts';
// import './card.scss';

export function PokemonDetailsInfo({ data, onClose }: PokemonDetailsInfoProps) {
  if (!data) return null;
  return (
    <>
      <button onClick={onClose}>Close</button>
      <h2>{data.name}</h2>
      <img src={data.sprites.front_default} alt={data.name} />
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
    </>
  );
}
