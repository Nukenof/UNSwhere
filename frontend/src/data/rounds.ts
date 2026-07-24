import ainsworth from '../assets/1_J17_Ainsworth.jpg';
import sebLowerGround from '../assets/2_SEBLowerGround.jpg';

export interface Round {
  image: string;
  answerId: number; // must match a properties.id in buildings.json
}

export const rounds: Round[] = [
  { image: ainsworth, answerId: 1 }, // Ainsworth
  { image: sebLowerGround, answerId: 2 }, // SEB (Science & Engineering Building)
];
