export interface Movie {
    Id: '';
    Title?: string,
    Poster?: string,
    Year?: string,
    Type?: string
}

export interface ApiResponse {
    Response?: string,
    Search: Movie[],
    totalResults?: number
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
