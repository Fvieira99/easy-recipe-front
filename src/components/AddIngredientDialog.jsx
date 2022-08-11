import {
	Dialog,
	DialogTitle,
	MenuItem,
	DialogContent,
	TextField,
	Button,
	styled,
	Box,
} from "@mui/material";

import { useState } from "react";

export default function AddIngredientDialog({
	isOpen,
	setIsOpen,
	options,
	setIngredients,
	ingredients,
}) {
	const [ingredient, setIngredient] = useState({
		ingredientId: -1,
		name: "",
		ingredientQty: "",
	});

	function handleSubmit(e) {
		e.preventDefault();
		if (isIngredientSelected()) {
			alert("Ingredient already selected!");
			setIngredient({
				ingredientId: -1,
				name: "",
				ingredientQty: "",
			});
		} else {
			setIngredients([...ingredients, ingredient]);
			setIngredient({
				ingredientId: -1,
				name: "",
				ingredientQty: "",
			});
			setIsOpen(false);
		}
	}

	function isIngredientSelected() {
		const filteredIngredient = ingredients.filter(
			(item) => ingredient.name === item.name
		);

		console.log(filteredIngredient);
		return filteredIngredient.length;
	}

	return (
		<>
			<StyledDialog open={isOpen} onClose={() => setIsOpen(false)}>
				<StyledDialogTitle fontSize="15px" sx={{ padding: "0" }}>
					Select one ingredient and type the quantity of it.
				</StyledDialogTitle>
				<StyledDialogContent>
					<IngredientForm
						id="ingredient-form"
						component="form"
						onSubmit={handleSubmit}
						action="add-ingredient"
					>
						<TextField
							required={true}
							sx={{ marginTop: "10px", minWidth: "150px" }}
							select
							variant="outlined"
							label="Ingredient"
							value={ingredient.name}
						>
							{options.map((option, index) => {
								return (
									<MenuItem
										key={index}
										value={option.name}
										onClick={() =>
											setIngredient({
												...ingredient,
												name: option.name,
												ingredientId: option.id,
											})
										}
									>
										{option.name}
									</MenuItem>
								);
							})}
						</TextField>
						<TextField
							required={true}
							type="text"
							sx={{ margin: "10px 0" }}
							placeholder="Ingredient Quantity Ex: 200g"
							value={ingredient.ingredientQty}
							onChange={(e) =>
								setIngredient({
									...ingredient,
									ingredientQty: e.target.value,
								})
							}
						/>
						<ButtonsContainer>
							<StyledButton
								variant="contained"
								type="submit"
								form="ingredient-form"
							>
								Add
							</StyledButton>
							<StyledButton
								type="button"
								variant="outlined"
								onClick={() => setIsOpen(false)}
							>
								Close
							</StyledButton>
						</ButtonsContainer>
					</IngredientForm>
				</StyledDialogContent>
			</StyledDialog>
		</>
	);
}

const IngredientForm = styled("form")``;

const StyledDialog = styled(Dialog)`
	${({ theme }) => theme.mixins.flexbox("column", "center", "center", "10px")}
`;

const StyledDialogTitle = styled(DialogTitle)`
	width: 90%;
	padding: 0px;
	margin: 10px auto 10px auto;
`;

const StyledDialogContent = styled(DialogContent)`
	${({ theme }) =>
		theme.mixins.flexbox("column", "center", "flex-start", "10px")}
	padding: 0px;
	width: 90%;
	margin: 0 auto 10px auto;
`;

const StyledButton = styled(Button)`
	text-transform: none;
`;

const ButtonsContainer = styled("div")`
	width: 90%;
	${({ theme }) => theme.mixins.flexbox("row", "flex-start", "center", "10px")}
`;
