import { Country } from "./country";

export interface User {
    email: string;
    birthday: Date;
    country: Country;
}