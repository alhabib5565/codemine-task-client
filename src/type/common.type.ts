export type TCategory = {
  categoryName: string;
  _id: string;
};

export type TImage = {
  title: string;
  categoryName: string;
  imageUrl: string;
  tags: string[];
  _id: string;
};
