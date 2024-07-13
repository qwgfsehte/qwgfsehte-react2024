import { ReactNode } from 'react';

export interface ErrorMessageProps {
  errorMessage: string;
}

export interface SearchInputProps {
  value: string;
  onChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
}

export interface SearchButtonProps {
  onClick: () => void;
}

export interface AllPokemons {
  name: string;
  url: string;
}

export interface HeaderProps {
  fetchData: () => Promise<void>;
  closePokemonDetails: () => void;
}

export interface CardsProps {
  data: InfoPokemon | null;
  getInfo: (pokemon: InfoPokemon) => void;
}

export interface InfoPokemon {
  abilities: {
    ability: {
      name: string;
    };
  }[];
  name: string;
  sprites: {
    front_default: string | null;
  };
  stats: {
    base_stat: number;
    stat: {
      name: string;
    };
  }[];
  id: string;
  types: {
    type: {
      name: string;
    };
  }[];
  weight: number;
  height: number;
  cries: {
    latest: string;
    legacy: string;
  };
}

export interface PokemonsListProps {
  pokemonsList: (InfoPokemon | null | undefined)[];
  onPokemonClick: (pokemon: InfoPokemon) => void;
}

export interface PokemonDetailsContainerProps {
  selectedPokemon: InfoPokemon | null;
  closePokemonDetails: () => void;
}

export interface PokemonDetailsInfoProps {
  data: InfoPokemon;
  onClose: () => void;
}

export interface PokemonsListContainerProps {
  pokemonData: InfoPokemon[];
  selectedPokemon: InfoPokemon | null;
  handlePokemonClick: (pokemon: InfoPokemon) => void;
}

export enum StatName {
  HP = 'hp',
  Attack = 'attack',
  Defense = 'defense',
  SpecialAttack = 'special-attack',
  SpecialDefense = 'special-defense',
  Speed = 'speed',
}

export type StatIcons = {
  [key in StatName]: string;
};

export enum TypeName {
  Normal = 'normal',
  Fire = 'fire',
  Water = 'water',
  Electric = 'electric',
  Grass = 'grass',
  Ice = 'ice',
  Fighting = 'fighting',
  Poison = 'poison',
  Ground = 'ground',
  Flying = 'flying',
  Psychic = 'psychic',
  Bug = 'bug',
  Rock = 'rock',
  Ghost = 'ghost',
  Dragon = 'dragon',
  Dark = 'dark',
  Steel = 'steel',
  Fairy = 'fairy',
}

export type TypeColor = {
  [key in TypeName]: string;
};

export interface ErrorBoundaryProps {
  children: ReactNode;
}

export interface ErrorBoundaryState {
  hasError: boolean;
}

export interface WrapperProps {
  children: React.ReactNode;
}
