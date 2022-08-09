import { styled } from "@mui/system";
import { Box, Drawer } from "@mui/material";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

import { apiService } from "../services/API";
import Recipe from "../components/recipe/Recipe";
import Header from "../components/Header";
import MenuDashboard from "../components/MenuDashboard";
import SearchBar from "../components/SearchDashboard";

export default function Main() {
	const [recipes, setRecipes] = useState([]);
	const [isMenuDrawerOpen, setIsMenuDrawerOpen] = useState(false);
	const [isSearchBarOpen, setIsSearchBarOpen] = useState(false);

	const navigate = useNavigate();

	useEffect(async () => {
		const response = await apiService.getRecipes(0);
		console.log(response.data);
		setRecipes(response.data);
	}, []);

	return (
		<Wrapper>
			<MenuDashboard
				direction="left"
				isMenuDrawerOpen={isMenuDrawerOpen}
				setIsMenuDrawerOpen={setIsMenuDrawerOpen}
			/>
			<Header
				setIsMenuDrawerOpen={setIsMenuDrawerOpen}
				setIsSearchBarOpen={setIsSearchBarOpen}
			/>
			<SearchBar
				isSearchBarOpen={isSearchBarOpen}
				setIsSearchBarOpen={setIsSearchBarOpen}
			/>
			{recipes.length === 0 ? (
				<h1>Não tem receitas</h1>
			) : (
				recipes.map((recipe, index) => {
					return (
						<Recipe
							recipeId={recipe.id}
							key={index}
							title={recipe.title}
							avatar={recipe.user.avatar}
							username={recipe.user.username}
							rating={recipe.ratings}
						></Recipe>
					);
				})
			)}
		</Wrapper>
	);
}

const Wrapper = styled(Box)`
	width: 100%;
	${({ theme }) => theme.mixins.flexbox("column", "start", "center", "0px")}
`;
