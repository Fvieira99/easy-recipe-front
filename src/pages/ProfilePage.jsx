import { UserContext } from "../contexts/UserContext";
import { apiService } from "../services/API";
import { useContext, useEffect, useState } from "react";

import { Avatar, CircularProgress, styled, Typography } from "@mui/material";
import { Box } from "@mui/system";
import Header from "../components/Header";
import Recipe from "../components/Recipe";
import AlertRecipeDialog from "../components/AlertRecipeDialog";

export default function ProfilePage() {
	const { user } = useContext(UserContext);

	const [recipes, setRecipes] = useState(null);

	useEffect(() => {
		async function fetchData() {
			const response = await apiService.getUserRecipes(user.token);

			setRecipes(response.data);
		}

		fetchData();
	}, []);

	return (
		<Wrapper>
			<Header />
			<Avatar
				src={user.avatar}
				sx={{
					width: "60px",
					height: "60px",
					objectFit: "contain",
					margin: "100px 0 20px 0",
				}}
			/>
			<Typography sx={{ marginBottom: "40px" }}>{user.username}</Typography>
			<RecipesContainer>
				{recipes === null ? (
					<CircularProgress />
				) : recipes.length === 0 ? (
					<Typography>You don't have recipes</Typography>
				) : (
					recipes.map((recipe, index) => {
						return (
							<Recipe
								userId={recipe.user.id}
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
				)}
			</RecipesContainer>
			<AlertRecipeDialog setRecipes={setRecipes} />
		</Wrapper>
	);
}

const Wrapper = styled(Box)`
	width: 100%;
	min-height: 100vh;
	${({ theme }) =>
		theme.mixins.flexbox("column", "flex-start", "center", "0px")}
	background-color: #ffffff;
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
