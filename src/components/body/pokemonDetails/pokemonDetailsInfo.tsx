import { useRef } from 'react';
import {
  PokemonDetailsInfoProps,
  StatName,
  TypeName,
} from '../../../interfaces/interface';
import { COLOR_TYPES, STAT_ICONS } from '../../../utils/globalConsts';
import { updateFirstLetterToUpperCase } from '../../../utils/utils';
import './pokemonDetails.scss';

export function PokemonDetailsInfo({ data, onClose }: PokemonDetailsInfoProps) {
  const audioLatestRef = useRef<HTMLAudioElement>(null);
  const audioLegacyRef = useRef<HTMLAudioElement>(null);

  const playLatestCry = () => {
    if (audioLatestRef.current) {
      audioLatestRef.current.play();
    }
  };

  const playLegacyCry = () => {
    if (audioLegacyRef.current) {
      audioLegacyRef.current.play();
    }
  };

  console.log(data);
  if (!data) return null;

  return (
    <>
      <div className="pokemon__details-container">
        <div className="pokemon__info-container">
          <div className="pokemon__name-container">
            <h2>{updateFirstLetterToUpperCase(data.name)}</h2>
            <button
              className="pokemon__button-close"
              onClick={onClose}
              data-testid="close-button"
            ></button>
          </div>
          <img
            className="pokemon-img"
            src={
              data.sprites.front_default
                ? data.sprites.front_default
                : './src/assets/imgs/default-img.webp'
            }
            alt={data.name}
          />
          <div className="pokemon__characteristics-container">
            <div className="pokemon__types-container">
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
            <div className="pokemon__cries-list">
              <div className="cries-list___item">
                Latest cry:
                <button
                  onClick={playLatestCry}
                  disabled={data.cries.latest === null}
                  className="cries-list___item-button"
                ></button>
                <audio ref={audioLatestRef} src={data.cries.latest}>
                  <track
                    kind="captions"
                    src=""
                    srcLang="en"
                    label="Cry pokemon"
                  />
                </audio>
              </div>
              <div className="cries-list___item">
                Legacy cry:
                <button
                  disabled={data.cries.legacy === null}
                  onClick={playLegacyCry}
                  className="cries-list___item-button"
                ></button>
                <audio ref={audioLegacyRef} src={data.cries.legacy}>
                  <track
                    kind="captions"
                    src=""
                    srcLang="en"
                    label="Cry pokemon"
                    data-testid="legacy-audio"
                  />
                </audio>
              </div>
            </div>
            <div className="pokemon__physical-info">
              <p>Weight:{data.weight}</p>
              <p>Height:{data.height}</p>
            </div>
            <div className="pokemon__abilities-container">
              Abilities:
              <ul className="abilities-list">
                {data.abilities.map((ability, index) => (
                  <li className="abilities-list__item" key={index}>
                    {ability.ability.name}
                  </li>
                ))}
              </ul>
            </div>
            <div className="pokemon__stats-container">
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
                    {stat.stat.name + ':' + stat.base_stat}
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
