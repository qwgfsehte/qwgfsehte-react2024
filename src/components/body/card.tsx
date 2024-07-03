import React from 'react';
import { CardsProps } from '../../interfaces/interface';
import './card.scss';

const FIRST_LETTER_INDEX = 0;
const SECOND_LETTER_INDEX = 1;

class Card extends React.Component<CardsProps> {
  UpdateFirstLetterToUpperCase(namePoremon: string) {
    return (
      namePoremon[FIRST_LETTER_INDEX].toUpperCase() +
      namePoremon.slice(SECOND_LETTER_INDEX, namePoremon.length)
    );
  }

  render(): React.ReactNode {
    if (this.props.data !== null) {
      return (
        <div className="card">
          <div className="card-info">
            <h3>{this.UpdateFirstLetterToUpperCase(this.props.data.name)}</h3>
            <img
              className="card-image"
              src={this.props.data.sprites.front_default}
              alt="pokemon"
            />
          </div>
          <h3 className="abilities-title">Abilities:</h3>
          <ul className="abilities-list">
            {this.props.data.abilities.map((ability, index) => (
              <li className="abilities-list__item" key={index}>
                {ability.ability.name}
              </li>
            ))}
          </ul>
          <h3 className="stats-title">Stats:</h3>
          <ul className="stats-list">
            {this.props.data.stats.map((stat, index) => (
              <li className="stats-list__item" key={index}>
                {stat.stat.name}:{stat.base_stat}
              </li>
            ))}
          </ul>
        </div>
      );
    }
  }
}

export default Card;
