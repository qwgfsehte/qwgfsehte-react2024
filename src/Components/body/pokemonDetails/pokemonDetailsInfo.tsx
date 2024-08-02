'use client';
import { useRef } from 'react';
import { InfoPokemon, StatName, TypeName } from 'src/interfaces/interface';
import styles from './pokemonDetails.module.scss';
import Image from 'next/image';
import { COLOR_TYPES, STAT_ICONS } from '../../../utils/globalConsts';
import { useToggleTheme } from '../../../Components/context/useContext';
import stylesTheme from '../../context/theme.module.scss';
import Link from 'next/link';

interface PokemonDetailsInfoProps {
  data: InfoPokemon;
  currentPage: number;
}

export function PokemonDetailsInfo({
  data,
  currentPage,
}: PokemonDetailsInfoProps) {
  const { isDark } = useToggleTheme();
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
      {data !== undefined && (
        <div className={styles['pokemon__details-container']}>
          <div className={styles['pokemon__info-container']}>
            <div className={styles['pokemon__name-container']}>
              <h2 className={styles['pokemon-name']}>
                {data.name.charAt(0).toUpperCase() + data.name.slice(1)}
              </h2>
              <Link
                className={`${styles['pokemon__button-close']} ${isDark ? stylesTheme['dark-pokemon__button-close'] : ''}`}
                data-testid="close-button"
                href={`/search/page/${currentPage}`}
              ></Link>
            </div>
            <Image
              alt={data.name}
              className={styles['pokemon-img']}
              priority
              src={
                data.sprites.front_default
                  ? data.sprites.front_default
                  : '/assets/imgs/default-img.webp'
              }
              width={300}
              height={300}
            />
            <div className={styles['pokemon__characteristics-container']}>
              <div className={styles['pokemon__types-container']}>
                <div className={styles['types-list']}>
                  Types:
                  {data.types.map((type, index) => (
                    <div
                      className={styles['types-list__item']}
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
              <div className={styles['pokemon__cries-list']}>
                <div className={styles['cries-list___item']}>
                  Latest cry:
                  <button
                    onClick={playLatestCry}
                    disabled={data.cries.latest === null}
                    className={`${styles['cries-list___item-button']} ${isDark ? stylesTheme['dark-cries-list___item-button'] : ''}`}
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
                <div className={styles['cries-list___item']}>
                  Legacy cry:
                  <button
                    disabled={data.cries.legacy === null}
                    onClick={playLegacyCry}
                    className={`${styles['cries-list___item-button']} ${isDark ? stylesTheme['dark-cries-list___item-button'] : ''}`}
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
              <div className={styles['pokemon__physical-info']}>
                <p>Weight:{data.weight}</p>
                <p>Height:{data.height}</p>
              </div>
              <div className={styles['pokemon__abilities-container']}>
                Abilities:
                <ul className={styles['abilities-list']}>
                  {data.abilities.map((ability, index) => (
                    <li className={styles['abilities-list__item']} key={index}>
                      {ability.ability.name}
                    </li>
                  ))}
                </ul>
              </div>
              <div className={styles['pokemon__stats-container']}>
                <h3 className={styles['stats-title']}>Stats:</h3>
                <ul className={styles['stats-list']}>
                  {data.stats.map((stat, index) => (
                    <li className={styles['stats-list__item']} key={index}>
                      {STAT_ICONS[stat.stat.name as StatName] && (
                        <Image
                          src={STAT_ICONS[stat.stat.name as StatName]}
                          alt={`${stat.stat.name} icon`}
                          className={styles['stats-icon']}
                          width={20}
                          height={20}
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
      )}
    </>
  );
}
