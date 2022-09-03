export type reservation = {
  productId: string;
  userId: string;
  quantity: number;
};

export interface IIventory extends Document {
  _id: string;
  productId: string;
  quantity: number;
  productName: string;
  reservations: reservation[];
  createdAt: Date;
  updatedAt: Date;
}
