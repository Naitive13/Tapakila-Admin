import { createTheme } from "@mui/material";

export const theme = createTheme({
    palette: {
        primary: {
            main: "#E16A54",
            dark: "#000",
            light: "#000",
        },
        secondary: {
            main: "#E16A54",
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
                    boxShadow: "0px 10px 15px -3px rgba(160, 93, 93, 0.5)",
                    border: "1px solid black"
                },
            },
        },
    },
});