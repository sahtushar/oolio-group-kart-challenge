// id: "1",
//     image: {
//       thumbnail:
//         "https://orderfoodonline.deno.dev/public/images/image-waffle-thumbnail.jpg",
//       mobile:
//         "https://orderfoodonline.deno.dev/public/images/image-waffle-mobile.jpg",
//       tablet:
//         "https://orderfoodonline.deno.dev/public/images/image-waffle-tablet.jpg",
//       desktop:
//         "https://orderfoodonline.deno.dev/public/images/image-waffle-desktop.jpg",
//     },
//     name: "Waffle with Berries",
//     category: "Waffle",
//     price: 6.5,
export interface Product {
  id: string;
  image: {
    thumbnail: string;
    mobile: string;
    tablet: string;
    desktop: string;
  };
  name: string;
  category: string;
  price: number;
}

export interface CartItem {
  product: Product;
  quantity: number;
}

export interface Order {
  date: string;
  items: CartItem[];
  orderConfirmed: boolean;
  orderId: string;
}
