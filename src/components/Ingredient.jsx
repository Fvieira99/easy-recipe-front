import { styled } from "@mui/material";

export default function Ingredient({ ingredientName, ingredientQty }) {
	return (
		<IngredientList>
			{ingredientName} | {ingredientQty}
		</IngredientList>
	);
}

const IngredientList = styled("li")`
	width: 90%;
	margin-bottom: 15px;
`;
