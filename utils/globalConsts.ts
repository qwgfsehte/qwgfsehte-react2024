import { StatIcons, StatName, TypeName } from '../interfaces/interface';

export const STAT_ICONS: StatIcons = {
  [StatName.HP]: '/src/assets/icons/icon-heart.png',
  [StatName.Attack]: '/src/assets/icons/icon-knife.png',
  [StatName.Defense]: '/src/assets/icons/icon-defence.png',
  [StatName.SpecialAttack]: '/src/assets/icons/icon-scull.png',
  [StatName.SpecialDefense]: '/src/assets/icons/icon-specialDefence.png',
  [StatName.Speed]: '/src/assets/icons/icon-speed.png',
};

export const COLOR_TYPES = {
  [TypeName.Normal]: '#A8A878',
  [TypeName.Fire]: '#F08030',
  [TypeName.Water]: '#6890F0',
  [TypeName.Electric]: '#F8D030',
  [TypeName.Grass]: '#78C850',
  [TypeName.Ice]: '#98D8D8',
  [TypeName.Fighting]: '#C03028',
  [TypeName.Poison]: '#A040A0',
  [TypeName.Ground]: '#E0C068',
  [TypeName.Flying]: '#A890F0',
  [TypeName.Psychic]: '#F85888',
  [TypeName.Bug]: '#A8B820',
  [TypeName.Rock]: '#B8A038',
  [TypeName.Ghost]: '#705898',
  [TypeName.Dragon]: '#7038F8',
  [TypeName.Dark]: '#705848',
  [TypeName.Steel]: '#B8B8D0',
  [TypeName.Fairy]: '#F0B6BC',
};
