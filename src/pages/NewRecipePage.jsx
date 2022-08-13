import { useState, useEffect, useContext } from "react";
import { apiService } from "../services/API";
import { LoadingContext } from "../contexts/LoadingContext";
import { UserContext } from "../contexts/UserContext";
import { useNavigate } from "react-router-dom";

import {
	styled,
	Box,
	Typography,
	Fab,
	Chip,
	CircularProgress,
} from "@mui/material";
import AddIcon from "@mui/icons-material/Add";
import Form from "../components/Form";
import FormInput from "../components/Form/Input";
import FormButton from "../components/Form/Button";
import AddIngredientDialog from "../components/AddIngredientDialog";
import Logo from "../assets/images/cooking_logo.svg";
import Header from "../components/Header";

export default function NewRecipePage() {
	const [recipeData, setRecipeData] = useState({
		title: "",
		mealFor: 0,
		time: 0,
		image: "",
		howToPrepare: "",
	});

	const [options, setOptions] = useState([]);

	const [ingredients, setIngredients] = useState([]);

	const [isOpen, setIsOpen] = useState(false);

	const [isDisabled, setIsDisabled] = useState(false);

	const { user } = useContext(UserContext);

	const { isLoading, setIsLoading } = useContext(LoadingContext);

	const navigate = useNavigate();

	useEffect(() => {
		async function fetchData() {
			const response = await apiService.getIngredients(user.token);
			setOptions(response.data.ingredients);
		}

		fetchData();
	}, []);

	useEffect(() => {
		if (ingredients.length > 0) {
			setIsDisabled(false);
		} else {
			setIsDisabled(true);
		}
	}, [ingredients]);

	function handleDeleteIngredient(idx) {
		const filteredIngredients = ingredients.filter(
			(ingredient, index) => index !== idx
		);

		setIngredients([...filteredIngredients]);
	}

	async function handleAddRecipeSubmit(e) {
		e.preventDefault();
		setIsLoading(true);
		try {
			const recipe = {
				...recipeData,
				ingredients: formatIngredients(),
			};

			await apiService.createRecipe(recipe, user.token);
			setIsLoading(false);

			navigate("/");
		} catch (error) {
			setIsLoading(false);
			console.log(error);
			alert(error.data.message);
		}
	}

	function formatIngredients() {
		const formatedIngredients = ingredients.map((ingredient) => {
			return {
				ingredientId: ingredient.ingredientId,
				ingredientQty: ingredient.ingredientQty,
			};
		});
		return formatedIngredients;
	}

	return (
		<Wrapper>
			<Header />
			<StyledLogo src={Logo} />
			<Form onSubmit={handleAddRecipeSubmit}>
				<FormInput
					disabled={isLoading}
					variant="outlined"
					label="Title"
					required={true}
					placeholder="recipe title"
					type="text"
					value={recipeData.title}
					onChange={(e) =>
						setRecipeData({ ...recipeData, title: e.target.value })
					}
				/>
				<FormInput
					disabled={isLoading}
					variant="outlined"
					label="Image URL"
					required={true}
					placeholder="https://"
					type="url"
					value={recipeData.image}
					onChange={(e) =>
						setRecipeData({ ...recipeData, image: e.target.value })
					}
				/>
				<FormInput
					disabled={isLoading}
					variant="outlined"
					label="Meal For"
					required={true}
					type="number"
					placeholder="number"
					value={recipeData.mealFor}
					onChange={(e) =>
						setRecipeData({ ...recipeData, mealFor: e.target.value })
					}
				/>
				<FormInput
					disabled={isLoading}
					variant="outlined"
					label="Preparation Time"
					required={true}
					type="number"
					placeholder="time in minutes"
					value={recipeData.time}
					onChange={(e) =>
						setRecipeData({ ...recipeData, time: e.target.value })
					}
				/>
				<FormInput
					disabled={isLoading}
					multiline
					rows={5}
					variant="outlined"
					label="How To Prepare"
					required={true}
					placeholder="Recipe Preparation"
					type="text"
					value={recipeData.howToPrepare}
					onChange={(e) =>
						setRecipeData({ ...recipeData, howToPrepare: e.target.value })
					}
				/>
				<AddRecipeTitleContainer>
					<Typography>Ingredients</Typography>
					<Fab
						disabled={isLoading}
						color="primary"
						aria-label="add"
						size="small"
						onClick={() => setIsOpen(true)}
					>
						<AddIcon />
					</Fab>
				</AddRecipeTitleContainer>
				<AddedRecipesContainer>
					{ingredients.length === 0 ? (
						<span>Any ingredient was selected yet.</span>
					) : (
						ingredients.map((ingredient, index) => {
							return (
								<Chip
									disabled={isLoading}
									key={index}
									label={ingredient.name}
									onDelete={() => handleDeleteIngredient(index)}
								/>
							);
						})
					)}
				</AddedRecipesContainer>
				<FormButton
					type="submit"
					disabled={isDisabled}
					variant="contained"
					sx={{
						marginBottom: "15px",
						pointerEvents: isLoading ? "none" : "auto",
					}}
				>
					{isLoading ? <CircularProgress color="inherit" /> : "Create Recipe"}
				</FormButton>
			</Form>
			<AddIngredientDialog
				isOpen={isOpen}
				setIsOpen={setIsOpen}
				options={options}
				setIngredients={setIngredients}
				ingredients={ingredients}
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

const AddRecipeTitleContainer = styled("div")`
	width: 90%;
	${({ theme }) =>
		theme.mixins.flexbox("row", "space-between", "center", "20px")}
`;

const AddedRecipesContainer = styled("div")`
	width: 90%;
	${({ theme }) => theme.mixins.flexbox("row", "flex-start", "center", "5px")}
	margin: 10px 0 10px 0;
	flex-wrap: wrap;
`;

const StyledLogo = styled("img")`
	width: 150px;
	margin: 100px 0 15px 0;
`;
