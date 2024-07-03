import React from 'react';
import Header from '../header/header';
import axios from 'axios';
import Card from '../body/card';
import { AppState } from '../../interfaces/interface';
import './app.scss';
import PokemonsList from '../body/pokemonsList';

class App extends React.Component<object, AppState> {
  constructor(props: object) {
    super(props);
    this.state = {
      pokemonData: [],
      next: '',
      previous: '',
    };
  }

  componentDidMount = () => {
    this.getInfoPokemons(
      `https://pokeapi.co/api/v2/pokemon/${localStorage.getItem('searchValueInput')?.toLowerCase().trim()}`
    );
  };

  getInfoPokemons = (url: string) => {
    axios
      .get(url)
      .then(response => {
        if (response.data.results) {
          if (response.data.previous) {
            this.setState({ previous: response.data.previous });
          }
          this.setState({ next: response.data.next });
          const pokemonPromises = response.data.results.map(
            (result: { url: string }) => axios.get(result.url)
          );
          Promise.all(pokemonPromises)
            .then(responses => {
              this.setState({ pokemonData: responses.map(res => res.data) });
            })
            .catch(error => {
              console.error('There was an error!', error);
            });
        } else {
          this.setState({ pokemonData: response.data });
        }
      })
      .catch(error => {
        console.error('There was an error!', error);
      });
  };

  render(): React.ReactNode {
    return (
      <>
        <Header fetchData={this.getInfoPokemons} />
        <div className="container-cards">
          {Array.isArray(this.state.pokemonData) ? (
            <>
              <PokemonsList pokemonList={this.state.pokemonData} />
            </>
          ) : (
            <Card data={this.state.pokemonData} />
          )}
        </div>
      </>
    );
  }
}

export default App;
