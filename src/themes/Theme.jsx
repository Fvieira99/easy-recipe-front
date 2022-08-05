import { createTheme } from "@mui/material";

const theme = createTheme({
	palette: {
		primary: {
			dark: "#243628",
			main: "#607654",
			light: "#c3c5a8",
		},
		secondary: {
			main: "#b59e68",
			light: "#e8e8dd",
		},
	},
	mixins: {
		flexbox: (direction, justify, align, gap) => {
			return `
			display: flex;
			flex-direction: ${direction};
			justify-content: ${justify};
			align-items: ${align};
			gap: ${gap};
			
			`;
		},
	},
	typography: {
		fontFamily: [
			"Inter",
			"BlinkMacSystemFont",
			'"Segoe UI"',
			"Roboto",
			'"Helvetica Neue"',
			"Arial",
			"sans-serif",
			'"Apple Color Emoji"',
			'"Segoe UI Emoji"',
			'"Segoe UI Symbol"',
		].join(","),
	},
});

export default theme;
