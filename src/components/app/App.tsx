import React from 'react';
import Header from '../header/header';
import axios from 'axios';
import Card from '../body/card';
import { AppState } from '../../interfaces/interface';
import './app.scss';

class App extends React.Component<object, AppState> {
  constructor(props: object) {
    super(props);
    this.state = {
      pokemonList: null,
      pokemonData: null,
      next: null,
      previous: null,
    };

    this.getInfoPokemons = this.getInfoPokemons.bind(this);
  }

  componentDidMount() {
    this.getInfoPokemons();
  }

  getInfoPokemons() {
    axios
      .get(
        `https://pokeapi.co/api/v2/pokemon/${localStorage.getItem('searchValueInput')}`
      )
      .then(response => {
        if (response.data.results) {
          this.setState({
            pokemonList: response.data.results,
            pokemonData: null,
            next: response.data.next,
            previous: response.data.previous,
          });
          console.log(response.data);
        } else {
          this.setState({
            pokemonList: null,
            pokemonData: response.data,
            next: null,
            previous: null,
          });
          console.log(response.data);
        }
      })
      .catch(error => {
        console.error('There was an error!', error);
      });
  }

  render(): React.ReactNode {
    return (
      <>
        <Header fetchData={this.getInfoPokemons} />
        <div className="container-cards">
          <Card data={this.state.pokemonData} />
        </div>
      </>
    );
  }
}

export default App;
