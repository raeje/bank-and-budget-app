import { createContext, useState, useMemo } from "react";
import { createTheme } from "@mui/material/styles";

export const tokens = (mode) => ({
    ...(mode === 'dark'
    ? {
        primary: {
            100: rgb(14, 17, 23)
        },
        secondary: {
            100: rgb(31, 35, 44)
        },
        third: {
            100: rgb(45, 51, 66)
        },
    }
    : {
        primary: {
            100: rgb(250, 248, 241)
        },
        secondary: {
            100: rgb(250, 234, 177)
        },
        third: {
            100: rgb(229, 186, 115)
        },
    }),
});

export const themeSettings = (mode) => {
    const colors = tokens(mode);

    return {
        palette: {
            mode: mode,
            ...(mode === 'dark'
                ? {
                    primary: {
                        main: colors.primary[100],
                    },
                    secondary: {
                        main: colors.secondary[100],
                    }
                }
            )
        }
    }
}