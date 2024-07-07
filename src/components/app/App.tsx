import React from 'react';
import Header from '../header/header';
import axios from 'axios';
import { AppState } from '../../interfaces/interface';
import './app.scss';
import PokemonsList from '../body/pokemonsList';

class App extends React.Component<object, AppState> {
  constructor(props: object) {
    super(props);
    this.state = {
      allPokemons: [],
      pokemonData: [],
      loading: false,
      hasError: false,
      errorMessage: '',
    };
  }

  componentDidMount = async () => {
    this.setState({ loading: true });
    try {
      const response = await fetch(
        'https://pokeapi.co/api/v2/pokemon?limit=2000'
      );
      const data = await response.json();
      this.setState({ allPokemons: data.results }, this.getInfoPokemons);
    } catch (error) {
      console.error('Error fetching data:', error);
    }
  };

  chunkArray = (array: { name: string; url: string }[], chunkSize = 20) => {
    const chunks = [];
    for (let i = 0; i < array.length; i += chunkSize) {
      chunks.push(array.slice(i, i + chunkSize));
    }
    return chunks;
  };

  getInfoPokemons = async () => {
    this.setState({ loading: true });
    const filteredPokemons = this.state.allPokemons.filter(
      (pokemon: { name: string }) =>
        pokemon.name.includes(localStorage.getItem('searchValueInput') || '')
    );

    const array = this.chunkArray(filteredPokemons);

    if (filteredPokemons.length === 0) {
      this.setState({
        loading: false,
        errorMessage: 'No pokemons found. Please try another search term.',
      });
      return;
    }

    const pokemonPromises = array[0].map((result: { url: string }) =>
      axios.get(result.url)
    );

    Promise.all(pokemonPromises)
      .then(responses => {
        this.setState({
          pokemonData: responses.map(res => res.data),
          loading: false,
          errorMessage: '',
        });
      })
      .catch(error => {
        this.setState({
          loading: false,
          errorMessage:
            'An error occurred while fetching the pokemons. Please try again later.',
        });
        console.error(error);
      });
  };

  triggerError = () => {
    this.setState({ hasError: true });
  };

  render(): React.ReactNode {
    if (this.state.hasError) {
      throw new Error('Test error');
    }

    return (
      <>
        <Header
          fetchData={this.getInfoPokemons}
          triggerError={this.triggerError}
        />
        {this.state.loading && (
          <div className="loading-indicator">
            <img
              className="loading-img"
              src="./src/assets/imgs/loading.gif"
              alt="Loading"
            />
            Loading...
          </div>
        )}

        {!this.state.loading && this.state.errorMessage && (
          <div className="error-container">
            <img
              className="main-page__error-img"
              src="./src/assets/imgs/error-search.png"
              alt=""
            />
            <h2>{this.state.errorMessage}</h2>
          </div>
        )}

        {!this.state.loading && !this.state.errorMessage && (
          <div className="container-cards">
            {Array.isArray(this.state.pokemonData) &&
            this.state.pokemonData.length > 0 ? (
              <PokemonsList pokemonList={this.state.pokemonData} />
            ) : (
              <p>No pokemons available.</p>
            )}
          </div>
        )}
      </>
    );
  }
}

export default App;
