
export interface Product {
  id: string;
  name: string;
  category: 'Laptops' | 'Desktops' | 'Accessories' | 'Networking' | 'Software';
  supplier: 'Barclays.lk' | 'Newcom.lk';
  basePrice: number;
  retailPrice: number;
  imageUrl: string;
  description: string;
  specs: string[];
}

export interface CartItem extends Product {
  quantity: number;
}

export interface Service {
  id: string;
  title: string;
  description: string;
  icon: string;
}

export interface Executive {
  name: string;
  role: string;
  experience: string;
  bio: string;
  imageUrl: string;
}

export interface Achievement {
  year: string;
  title: string;
  description: string;
}
