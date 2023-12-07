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

export type Status = "success" | "error" | "warning" | "info";

export type Vertical = "top" | "bottom";

export type Horizontal = "center" | "left" | "right";
