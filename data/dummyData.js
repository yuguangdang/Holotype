import Category from '../models/Category';

export const CATEGORIES = [
  new Category('c1', 'Mammals', '#f5428d'),
  new Category('c2', 'Birds', '#f54242'),
  new Category('c3', 'Reptiles', '#e0f542'),
  new Category('c4', 'Amphibians', '#f5a442'),
  new Category('c5', 'Fish', '#f5d142'),
  new Category('c6', 'Insects', '#368dff'),
  new Category('c7', 'Plants', '#41d95d'),
  new Category('c8', 'Dinosaurs', '#ffc7ff'),
];

export const SPECIES = [
  {
    id: 0,
    userName: "User1",
    title: "Title of the post",
    category: 'c1',
    description:
      "This will be a breif description of the scanned species, including its appearance, characteristics, etc.",
    vote: "7",
  },
  {
    id: 1,
    userName: "User2",
    title: "Title of the post",
    category: 'c1',

    description:
      "This will be a breif description of the scanned species, including its appearance, characteristics, etc.",
    vote: "7",
  },
  {
    id: 2,
    userName: "User3",
    title: "Title of the post",
    category: 'c1',

    description:
      "This will be a breif description of the scanned species, including its appearance, characteristics, etc.",
    vote: "7",
  },
  {
    id: 3,
    userName: "User4",
    title: "Title of the post",
    category: 'c1',

    description:
      "This will be a breif description of the scanned species, including its appearance, characteristics, etc.",
    vote: "7",
  },
];

