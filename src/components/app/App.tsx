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
      allPokemons: [],
      pokemonData: [],
    };
  }

  componentDidMount = () => {
    setTimeout(async () => {
      try {
        const response = await fetch(
          'https://pokeapi.co/api/v2/pokemon?limit=2000'
        );
        const data = await response.json();
        this.setState({ allPokemons: data.results }, this.getInfoPokemons);
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    }, 1000);
  };

  chunkArray = (array: { name: string; url: string }[], chunkSize = 20) => {
    const chunks = [];
    for (let i = 0; i < array.length; i += chunkSize) {
      chunks.push(array.slice(i, i + chunkSize));
    }
    return chunks;
  };

  getInfoPokemons = async () => {
    const filteredPokemons = this.state.allPokemons.filter(
      (pokemon: { name: string }) =>
        pokemon.name.includes(localStorage.getItem('searchValueInput') || '')
    );

    const array = this.chunkArray(filteredPokemons);

    const pokemonPromises = array[0].map((result: { url: string }) =>
      axios.get(result.url)
    );

    Promise.all(pokemonPromises)
      .then(responses => {
        this.setState({ pokemonData: responses.map(res => res.data) });
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
