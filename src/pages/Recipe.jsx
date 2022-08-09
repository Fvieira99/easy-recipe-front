import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { apiService } from "../services/API";

export default function Recipe() {
	const [recipe, setRecipe] = useState(null);

	const { recipeId } = useParams();
	useEffect(async () => {
		const response = await apiService.getRecipeById(recipeId);
		setRecipe(response.data);
	}, []);

	return <h1>{JSON.stringify(recipe)}</h1>;
}
