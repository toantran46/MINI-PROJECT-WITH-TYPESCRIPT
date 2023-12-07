export const ROUTER_PATH = {
    HOME: '/',
    MOVIE: '/movie'
}
export const ROUTER_NAME = {
    HOME: 'Home',
    MOVIE: 'Movie'
}

export const VALIDATION_MESSAGE = {
    REQUIRED: {
        USERNAME: "Username is required",
        EMAIL: "Email is required",
        PHONE_NUMBER: "Phone number is required"
    },
    MIN: {
        USERNAME: "Username must be at least 4 characters"
    },
    INVALID: {
        EMAIL: "Email is invalid",
        PHONE_NUMBER: "Phone number is invalid, must be 10 number"
    },
    MATCHES: {
        USERNAME: "Spaces are not allowed in the username"
    }
}

export const URL_SERVICE = {
    MOVIE: {
        GET: 'https://www.omdbapi.com/',
        TOKEN: '97a98665'
    }
}

export const THEME_MODE = {
    DARK: 'dark',
    LIGHT: 'light'
}

export const STRING = {
    EMPTY: '',
    SPACE_REGULAR_EXPRESSION: /^\S*$/,
    NONE: 'N/A',
    FALSE: 'False'
}

export const TOAST_MESSAGE = {
    SUCCESS: {
        CREATE: 'Create successfully!',
        UPDATE: 'Update successfully!',
        DELETE: 'Delete successfully'
    },
    ERROR: {
        USERNAME_EXIST: 'Username is already exist, please try another one!'
    }
    
}
