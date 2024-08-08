import { useRef } from 'react';
import { InfoPokemon, StatName, TypeName } from '../../../interfaces/interface';
import { COLOR_TYPES, STAT_ICONS } from '../../../utils/globalConsts';
import './pokemonDetails.scss';
import { Link } from 'react-router-dom';

interface PokemonDetailsInfoProps {
  data: InfoPokemon | undefined;
  currentPage: number;
}

export function PokemonDetailsInfo({
  data,
  currentPage,
}: PokemonDetailsInfoProps) {
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

  return (
    <>
      {data !== undefined ? (
        <div className="pokemon-details">
          <div className="pokemon__info-container">
            <div className="pokemon__name-container">
              <h2 className="pokemon-name">{data.name}</h2>
              <Link
                to={`/search/page/${currentPage}`}
                className="pokemon__button-close"
                data-testid="close-button"
              ></Link>
            </div>
            <img
              alt={data.name}
              className="pokemon-img"
              src={
                data.sprites.front_default
                  ? data.sprites.front_default
                  : '/src/assets/imgs/default-img.webp'
              }
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
                        backgroundColor:
                          COLOR_TYPES[type.type.name as TypeName],
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
      ) : (
        <div>Error: Pokemon data not found</div>
      )}
    </>
  );
}
