export interface ColorsTy {
  name: string;
  mainImage: string;
  thumbnails: string[];
  sizes: string[];
}

export interface ProductTy {
  id: number;
  title: string;
  price: string;
  description: string;
  colors: ColorsTy[];
}

export interface CartItemTy {
  id: string;
  mainImage: string;
  title: string;
  price: number;
  size: string;
  color: string;
  quantity: number;
}
