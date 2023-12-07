export interface Movie {
    Id: '';
    Title?: string,
    Poster: string,
    Year?: string,
    Type?: string
}

export interface ApiResponse {
    Response?: string,
    Search: Movie[],
    totalResults?: number,
    Error?: string 
}

export interface MovieDetailResponse {
    Title: string,
    Year: string,
    Rated: string,
    Released: string,
    BoxOffice: string,
    Writer: string,
    Country: string,
    Language: string,
    Plot: string,
}

export interface Column {
    id: string;
    label: string;
    minWidth?: number;
    align?: 'right' | 'center' | 'left' | 'inherit';
    format?: (value: number) => string;
}

export class UserInfo {
    id?: string = undefined;
    username = '';
    email = '';
    phoneNumber = '';
    address?: string = undefined;
}

export interface Row {
    id: string,
    label: string,
    value: string
}

export type Status = "success" | "error" | "warning" | "info";

export type Vertical = "top" | "bottom";

export type Horizontal = "center" | "left" | "right";
