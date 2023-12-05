export interface Movie {
    Id: string,
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

export interface UserInfo {
    id?: string
    username: string,
    email: string,
    phoneNumber: string
    address?: string,
}
