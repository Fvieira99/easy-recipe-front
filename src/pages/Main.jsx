import { styled } from "@mui/system";
import { Box, Drawer } from "@mui/material";
import { useEffect, useState } from "react";

import { apiService } from "../services/API";
import Recipe from "../components/recipe/Recipe";
import Header from "../components/Header";
import Dashboard from "../components/Dashboard";

export default function Main() {
	const [recipes, setRecipes] = useState([]);
	const [isMenuDrawerOpen, setIsMenuDrawerOpen] = useState(false);

	useEffect(async () => {
		const response = await apiService.getRecipes(0);
		console.log(response.data);
		setRecipes(response.data);
	}, []);

	return (
		<Wrapper>
			<Dashboard
				direction="left"
				isMenuDrawerOpen={isMenuDrawerOpen}
				setIsMenuDrawerOpen={setIsMenuDrawerOpen}
			/>
			<Header setIsMenuDrawerOpen={setIsMenuDrawerOpen} />
			{recipes.length === 0 ? (
				<h1>Não tem receitas</h1>
			) : (
				recipes.map((recipe, index) => {
					return (
						<Recipe
							key={index}
							title={recipe.title}
							avatar={recipe.user.avatar}
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
