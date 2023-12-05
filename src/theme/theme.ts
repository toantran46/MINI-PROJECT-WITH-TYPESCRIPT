import { createTheme } from "@mui/material";
import { green, grey, lime, red } from "@mui/material/colors";

export const darkTheme = createTheme({
    palette: {
        mode: 'dark',
        primary: {
            main: lime[400]
        }, 
        secondary: {
            main: red[300],
        },
    },
    components: {
        MuiButton: {
            styleOverrides: {
                root: {
                    "&:hover": {
                        backgroundColor: grey[500]
                    }
                }
            }
        }
    }
})

export const lightTheme = createTheme({
    palette: {
        mode: 'light',
        primary: {
            main: green[500]
        },
        secondary: {
            main: red[300]
        }
    },
    components: {
        MuiButton: {
            styleOverrides: {
                root: {
                    "&:hover": {
                        backgroundColor: green[200]
                    }
                }
            }
        }
    }
})