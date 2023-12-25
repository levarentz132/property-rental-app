import type { Review } from "./review";

export interface Property {
  id: string;
  owner_id: string;
  category: string;
  value: number;
  address: string;
  picture: string;
  size?: number;
  beds?: number;
  bathrooms?: number;
  kitchens?: number;
  reviews: Review[];
}
