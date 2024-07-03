export interface SearchInputProps {
  value: string;
  onChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
}

export interface SearchButtonProps {
  onClick: () => void;
}

export interface HeaderState {
  inputValue: string;
}

export interface AppState {
  pokemonList: null;
  pokemonData: null;
  next: null;
  previous: null;
}

export interface HeaderProps {
  fetchData: () => void;
}

export interface CardsProps {
  data: InfoPokemon | null;
}

export interface InfoPokemon {
  abilities: {
    ability: {
      name: string;
    };
  }[];
  name: string;
  sprites: {
    front_default: string;
  };
  stats: {
    base_stat: number;
    stat: {
      name: string;
    };
  }[];
}
