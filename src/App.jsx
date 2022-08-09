import { Routes, Route, BrowserRouter } from "react-router-dom";
import { ThemeProvider } from "@mui/system";
import { LoadingProvider } from "./contexts/LoadingContext";
import theme from "./themes/Theme";

import SignUp from "./pages/SignUp";
import SignIn from "./pages/SignIn";
import "../src/assets/css/reset.css";
import "../src/assets/css/styles.css";
import Main from "./pages/Main";

export default function App() {
	return (
		<ThemeProvider theme={theme}>
			<LoadingProvider>
				<BrowserRouter>
					<Routes>
						{/* <Route path="/" element={<SignUp />} />
						<Route path="/signin" element={<SignIn />} /> */}
						<Route path="/" element={<Main />} />
					</Routes>
				</BrowserRouter>
			</LoadingProvider>
		</ThemeProvider>
	);
}
