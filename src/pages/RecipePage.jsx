import {
	Box,
	CircularProgress,
	Rating,
	styled,
	Typography,
	Avatar,
	Chip,
} from "@mui/material";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import useAuth from "../hooks/useAuth";
import { apiService } from "../services/API";

import Header from "../components/Header";
import Ingredient from "../components/Ingredient";
import AddRating from "../components/Recipe/AddRating";
import RecipeRating from "../components/Recipe/RecipeRating";
import AlertDialog from "../components/AlertDialog";

export default function RecipePage() {
	const [recipe, setRecipe] = useState(null);

	const [isAlertOpen, setIsAlertOpen] = useState(false);

	const [deleteRatingId, setDeleteRatingId] = useState(null);

	const [alreadyHasRating, setAlreadyHasRating] = useState(false);

	const [chips, setChips] = useState({
		title: "",
		mealFor: "",
		time: "",
		ratingsCount: "",
	});

	const { token, userId } = useAuth();

	const { recipeId } = useParams();

	useEffect(() => {
		async function fetchData() {
			const response = await apiService.getRecipeById(recipeId, token);
			setRecipe(response.data);
		}

		fetchData();
	}, [token, recipeId]);

	useEffect(() => {
		if (recipe) {
			setChips({
				title: recipe.title,
				mealFor: `Meal for: ${recipe.mealFor}`,
				time: `${recipe.time} min`,
				ratingsCount: `${recipe.ratings.ratingsCount} Avaliações`,
			});
		}
	}, [recipe]);

	useEffect(() => {
		if (recipe) {
			const userRating = recipe.ratings.recipeRatings.filter(
				(rating) => rating.user.id === userId
			);

			if (userRating.length > 0) {
				setAlreadyHasRating(true);
			}
		}
	}, [recipe]);

	return (
		<Wrapper>
			<Header />
			{recipe === null ? (
				<CircularProgress />
			) : (
				<>
					<RecipeImage src={recipe.image} sx={{ boxShadow: 3 }} />
					<StyledTitle component="div">
						<Chip label={chips.title} />
						<Chip label={chips.mealFor} />
						<Chip label={chips.time} />
					</StyledTitle>
					<RecipeRatingContainer>
						<Rating
							readOnly
							value={recipe.ratings.ratingAVG}
							precision={0.5}
							sx={{ fontSize: "20px" }}
						/>
						<Chip label={chips.ratingsCount} />
					</RecipeRatingContainer>
					<RecipeOwnerContainter>
						<Avatar src={recipe.user.avatar} />
						<Typography
							variant="span"
							sx={{
								fontSize: "15px",
								fontWeight: "700",
								textAlign: "center",
								textDecoration: "underline",
							}}
						>
							Criado por: @{recipe.user.username}
						</Typography>
					</RecipeOwnerContainter>
					<RecipeContentContainer boxShadow={3}>
						<StyledList>
							<Typography sx={{ margin: "15px 0" }}>Ingredients</Typography>
							{recipe.recipe_ingredient.map((ingredient, index) => {
								return (
									<Ingredient
										key={index}
										ingredientQty={ingredient.ingredientQty}
										ingredientName={ingredient.ingredient.name}
									/>
								);
							})}
						</StyledList>
					</RecipeContentContainer>
					<RecipeContentContainer boxShadow={3}>
						<StyledList>
							<Typography sx={{ margin: "15px 0" }}>How To Prepare</Typography>

							<Typography
								sx={{ fontSize: "15px", width: "90%", marginBottom: "20px" }}
							>
								{recipe.howToPrepare}
							</Typography>
						</StyledList>
					</RecipeContentContainer>

					<AddRating
						recipeId={recipe.id}
						setRecipe={setRecipe}
						alreadyHasRating={alreadyHasRating}
					/>

					{recipe.ratings.recipeRatings.map((rating, index) => {
						return (
							<RecipeRating
								setIsAlertOpen={setIsAlertOpen}
								key={index}
								user={rating.user}
								recipeRating={rating.rating}
								comment={rating.comment}
								ratingId={rating.id}
								setDeleteRatingId={setDeleteRatingId}
							/>
						);
					})}
				</>
			)}
			<AlertDialog
				recipeId={recipeId}
				setRecipe={setRecipe}
				isAlertOpen={isAlertOpen}
				setIsAlertOpen={setIsAlertOpen}
				deleteRatingId={deleteRatingId}
			/>
		</Wrapper>
	);
}

const Wrapper = styled(Box)`
	width: 100%;
	min-height: 100vh;
	${({ theme }) =>
		theme.mixins.flexbox("column", "flex-start", "center", "0px")}
	background-color: ${({ theme }) => theme.palette.secondary.light}
`;

const RecipeImage = styled("img")`
	width: 340px;
	margin-top: 100px;
	border-radius: 10px;
`;

const StyledTitle = styled(Box)`
	width: 90%;
	font-size: 25px;
	font-weight: 700;
	margin-top: 20px;
	${({ theme }) => theme.mixins.flexbox("row", "flex-start", "center", "10px")}
`;

const RecipeRatingContainer = styled(Box)`
	${({ theme }) => theme.mixins.flexbox("row", "flex-start", "center", "10px")}
	width: 90%;
	margin-top: 20px;
`;

const RecipeOwnerContainter = styled(Box)`
	${({ theme }) => theme.mixins.flexbox("row", "flex-start", "center", "10px")}
	width: 90%;
	margin: 20px 0;
`;

const StyledList = styled("list")`
	width: 90%;
`;

const RecipeContentContainer = styled(Box)`
	width: 90%;
	${({ theme }) => theme.mixins.flexbox("column", "center", "center", "0px")}
	background-color: #ffffff;
	border-radius: 10px;
	margin-bottom: 30px;
`;
