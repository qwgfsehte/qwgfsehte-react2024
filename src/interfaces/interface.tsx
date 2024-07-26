import { ReactNode } from 'react';

export interface ApiResponse {
  count: number;
  next: string | null;
  previous: string | null;
  results: AllPokemons[];
}

export interface Pokemon {
  allPokemons: AllPokemons[];
  filteredPokemons: AllPokemons[][];
  detailsForPokemons: InfoPokemon[];
  loading: boolean;
  errorMessage: string;
}

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
  closePokemonDetails: () => void;
}

export interface CardsProps {
  name: string;
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
  onPokemonClick: (pokemon: InfoPokemon) => void;
}

export interface PokemonDetailsContainerProps {
  closePokemonDetails: () => void;
}

export interface PokemonDetailsInfoProps {
  onClose: () => void;
}

export interface PokemonsListContainerProps {
  selectedPokemon: InfoPokemon | null;
  handlePokemonClick: (pokemon: InfoPokemon) => void;
  onClose: () => void;
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
