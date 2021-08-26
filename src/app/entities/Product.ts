export class Product{
  asin:string;
  title: string;
  image: string;
  prices: {
    current_price: string
  };
  reviews:{
    stars: number
  }
}
