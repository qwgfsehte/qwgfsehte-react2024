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
  pokemonData: InfoPokemon | InfoPokemon[];
  next: string;
  previous: string;
}

export interface HeaderProps {
  fetchData: (url: string) => void;
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

export interface PokemonsListProps {
  pokemonList: InfoPokemon[];
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
