import { useContext, useEffect, useState } from "react";
import { UserContext } from "../contexts/UserContext";
import { apiService } from "../services/API";

import { Box, CircularProgress, styled } from "@mui/material";
import Recipe from "../components/Recipe";
import Header from "../components/Header";
import Footer from "../components/Footer";

export default function MainPage() {
	const [recipes, setRecipes] = useState(null);
	const [page, setPage] = useState(1);

	const { user } = useContext(UserContext);

	useEffect(() => {
		async function fetchData() {
			const response = await apiService.getRecipes(page, user.token);
			setRecipes(response.data);
		}
		fetchData();
	}, [page]);

	return (
		<Wrapper>
			<Header />
			<RecipesContainer>
				{recipes === null ? (
					<CircularProgress />
				) : recipes.length > 0 ? (
					recipes.map((recipe, index) => {
						return (
							<Recipe
								id="recipe"
								recipeId={recipe.id}
								key={index}
								image={recipe.image}
								title={recipe.title}
								avatar={recipe.user.avatar}
								username={recipe.user.username}
								rating={recipe.ratings.ratingAVG}
							/>
						);
					})
				) : (
					<h1>Ainda não há receitas criadas</h1>
				)}
			</RecipesContainer>

			<Footer page={page} setPage={setPage} />
		</Wrapper>
	);
}

const Wrapper = styled(Box)`
	width: 100%;
	${({ theme }) => theme.mixins.flexbox("column", "start", "center", "0px")}

	h1 {
		margin-top: 100px;
		margin-bottom: 20px;
	}
`;

const RecipesContainer = styled(Box)`
	width: 100%;
	${({ theme }) => theme.mixins.flexbox("column", "start", "center", "0px")}

	&:nth-child(2) {
		margin-top: 100px;
	}

	@media (min-width: 1000px) {
		width: 70%;
		${({ theme }) => theme.mixins.flexbox("row", "center", "center", "30px")}
		flex-wrap: wrap;
	}
`;
