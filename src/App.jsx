import { Routes, Route, BrowserRouter } from "react-router-dom";
import { ThemeProvider } from "@mui/system";
import { LoadingProvider } from "./contexts/LoadingContext";
import { UserProvider } from "./contexts/UserContext";
import theme from "./themes/Theme";

import "../src/assets/css/reset.css";
import "../src/assets/css/styles.css";

import SignIn from "./pages/SignIn";
import SignUp from "./pages/SignUp";
import MainPage from "./pages/MainPage";
import RecipePage from "./pages/RecipePage";
import NewRecipePage from "./pages/NewRecipePage";
import ProfilePage from "./pages/ProfilePage";
import PrivateRoute from "./components/PrivateRoute/PrivateRoute";

export default function App() {
	return (
		<ThemeProvider theme={theme}>
			<LoadingProvider>
				<UserProvider>
					<BrowserRouter>
						<Routes>
							<Route path="/" element={<SignUp />} />
							<Route path="/signin" element={<SignIn />} />

							<Route
								path="/main"
								element={
									<PrivateRoute>
										<MainPage />
									</PrivateRoute>
								}
							/>
							<Route
								path="/recipes/recipe/:recipeId"
								element={
									<PrivateRoute>
										<RecipePage />
									</PrivateRoute>
								}
							/>
							<Route
								path="/new-recipe"
								element={
									<PrivateRoute>
										<NewRecipePage />
									</PrivateRoute>
								}
							/>
							<Route
								path="/profile/:userId"
								element={
									<PrivateRoute>
										<ProfilePage />
									</PrivateRoute>
								}
							/>
						</Routes>
					</BrowserRouter>
				</UserProvider>
			</LoadingProvider>
		</ThemeProvider>
	);
}
