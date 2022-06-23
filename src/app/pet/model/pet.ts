import {PetStatus} from "./pet-status";

export class Pet {
  id: number;
  name: string;
  category: Category;
  photoUrls: string[];
  tags: Tag[];
  status: PetStatus;
}

export class Category {
  id: number;
  name: string;
}

export class Tag {
  id: number;
  name: string;
}
