
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

export interface IRecipe {
    name: string,
    ingredients: Ingredient[];
    price: number;
    image: string
}
export interface IRecipeCartItem extends IRecipe {
    count: number;
    chefId: string;
    chefName: string;
}
export interface IRecipeOrderHistory extends IRecipeCartItem {
    dateOrdered: string;
}

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
    recipes: IRecipe[];
    cart: IRecipeCartItem[];
    orderHistory: IRecipeOrderHistory[];
};

export interface ICredentials {
    userName: string,
    firstName: string,
    lastName: string,
    email: string,
    password: string,
    passwordConfirmation: string,
    customerType: string,
    avatar: {
        data: string,
        contentType: string
    }
}