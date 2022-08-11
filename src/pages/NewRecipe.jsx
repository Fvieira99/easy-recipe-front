import { useState, useEffect, useContext } from "react";
import { apiService } from "../services/API";
import useAuth from "../hooks/useAuth";
import { LoadingContext } from "../contexts/LoadingContext";

import {
	styled,
	Box,
	Typography,
	Fab,
	Chip,
	CircularProgress,
} from "@mui/material";
import AddIcon from "@mui/icons-material/Add";
import Form from "../components/form";
import FormInput from "../components/form/Input";
import FormButton from "../components/form/Button";
import AddRecipeDialog from "../components/AddRecipeDialog";
import Logo from "../assets/images/cooking_logo.svg";

export default function NewRecipe() {
	const [recipeData, setRecipeData] = useState({
		title: "",
		mealFor: 0,
		time: 0,
		howToPrepare: "",
	});

	const [options, setOptions] = useState([]);

	const [ingredients, setIngredients] = useState([]);

	const [isOpen, setIsOpen] = useState(false);

	const [isDisabled, setIsDisabled] = useState(true);

	const { token } = useAuth();

	const { isLoading, setIsLoading } = useContext(LoadingContext);

	useEffect(() => {
		async function fetchData() {
			const response = await apiService.getIngredients();
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

	return (
		<Wrapper>
			<StyledLogo src={Logo} />
			<Form>
				<FormInput
					disabled={isLoading}
					variant="outlined"
					label="Title"
					required
					placeholder="recipe title"
					type="text"
				/>
				<FormInput
					disabled={isLoading}
					variant="outlined"
					label="Meal For"
					required
					type="number"
					placeholder="number"
				/>
				<FormInput
					disabled={isLoading}
					variant="outlined"
					label="Preparation Time"
					required
					type="number"
					placeholder="time in minutes"
				/>
				<FormInput
					disabled={isLoading}
					multiline
					rows={5}
					variant="outlined"
					label="How To Prepare"
					required
					placeholder="Recipe Preparation"
					type="text"
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

				<AddRecipeDialog
					isOpen={isOpen}
					setIsOpen={setIsOpen}
					options={options}
					setIngredients={setIngredients}
					ingredients={ingredients}
				/>
				<AddedRecipesContainer>
					{ingredients.length === 0 ? (
						<span>Any ingredient was selected yet.</span>
					) : (
						ingredients.map((ingredient, index) => {
							return (
								<Chip
									key={index}
									label={ingredient.name}
									onDelete={() => handleDeleteIngredient(index)}
								/>
							);
						})
					)}
				</AddedRecipesContainer>
				<FormButton
					disabled={isDisabled}
					variant="contained"
					sx={{ marginBottom: "15px" }}
					onClick={() => setIsLoading(true)}
				>
					{isLoading ? <CircularProgress color="inherit" /> : "Create Recipe"}
				</FormButton>
			</Form>
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
	margin: 15px 0;
`;
