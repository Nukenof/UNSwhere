import ainsworth from '../assets/1_J17_Ainsworth.jpg';
import sebLowerGround from '../assets/2_SEBLowerGround.jpg';

export interface Round {
  image: string;
  answerId: number; // must match a properties.id in buildings.json
}

// answerId values are OpenStreetMap way ids, matching properties.id in the
// generated public/data/unsw-buildings.geojson.
export const rounds: Round[] = [
  { image: ainsworth, answerId: 616805099 }, // Ainsworth Building J17
  { image: sebLowerGround, answerId: 616805101 }, // Science and Engineering Building (E8)
];
