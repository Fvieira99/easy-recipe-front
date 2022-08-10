import { Routes, Route, BrowserRouter } from "react-router-dom";
import { ThemeProvider } from "@mui/system";
import { LoadingProvider } from "./contexts/LoadingContext";
import theme from "./themes/Theme";

import SignUp from "./pages/SignUp";
import SignIn from "./pages/SignIn";
import "../src/assets/css/reset.css";
import "../src/assets/css/styles.css";
import Main from "./pages/Main";
import Recipe from "./pages/Recipe";
import NewRecipe from "./pages/NewRecipe";
import { UserProvider } from "./contexts/UserContext";

export default function App() {
	return (
		<ThemeProvider theme={theme}>
			<LoadingProvider>
				<UserProvider>
					<BrowserRouter>
						<Routes>
							<Route path="/signup" element={<SignUp />} />
							<Route path="/signin" element={<SignIn />} />

							<Route path="/" element={<Main />} />
							<Route
								path="/recipes/recipe/:title/:recipeId"
								element={<Recipe />}
							/>
							<Route path="/new-recipe" element={<NewRecipe />} />
						</Routes>
					</BrowserRouter>
				</UserProvider>
			</LoadingProvider>
		</ThemeProvider>
	);
}
