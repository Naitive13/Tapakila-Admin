import { createTheme } from "@mui/material";

export const theme = createTheme({
    palette: {
        primary: {
            main: "#3F7D58",
            dark: "#000",
            light: "#000",
        },
        secondary: {
            main: "#3F7D58",
        },
    },
    typography: {
        allVariants: {
            fontStyle: "normal",
            fontWeight: "bolder"
        },
    },
    components: {
        MuiButton: {
            defaultProps: {
                variant: "outlined",
            },
            styleOverrides: {
                root: {
                    textTransform: "full-size-kana",
                },
            },
        },
        MuiPaper: {
            styleOverrides: {
                elevation1: {
                    boxShadow: "0px 10px 15px -3px rgba(0, 0, 0, 0.1)",
                },
            },
        },
    },
});