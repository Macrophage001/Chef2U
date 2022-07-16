
interface Review {
    rating: number;
    comment: string;
    user: IUser;
}

type Specialty = string;
type Ingredient = string;

export interface Avatar {
    data: Buffer;
    contentType: string;
}
export interface Recipe {
    name: string,
    ingredients: Ingredient[];
    price: number;
    image: string
}
export interface CartItem extends Recipe {
    count: number;
    chefId: string;
    chefName: string;
}
export interface OrderHistory extends Recipe { }

export enum CustomerType {
    Customer,
    Chef
}

export interface IUser {
    _id: string;
    userName: string;
    firstName: string;
    lastName: string;
    email: string;
    password: string;
    isLoggedIn: boolean;
    avatar: Avatar,
    date: Date;
    isAdmin: boolean;
    customerType: CustomerType
    yearsOfExperience: number;
    rating: number;
    reviews: Review[];
    specialties: Specialty[];
    recipes: Recipe[];
    cart: CartItem[];
    orderHistory: OrderHistory[];
};