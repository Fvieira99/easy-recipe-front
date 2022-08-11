import axios from "axios";

const API = axios.create({
	baseURL: "http://localhost:5000/",
});

function getConfig(token) {
	return {
		headers: {
			Authorization: `Bearer ${token}`,
		},
	};
}

async function signUp(body) {
	await API.post("/signup", body);
}

async function signIn(body) {
	return await API.post("/signin", body);
}

async function getRecipes(pageNumber, token) {
	const config = getConfig(token);
	return await API.get(`/recipes?page=${pageNumber}`, config);
}

async function getRecipesByName(name) {
	return await API.get(`/recipes/search?name=${name}`);
}

async function getRecipeById(recipeId) {
	return await API.get(`recipes/recipe/${recipeId}`);
}

async function getRecipesQty() {
	return await API.get("recipes/quantity");
}

async function getIngredients(token) {
	const config = getConfig(token);
	return await API.get("ingredients", config);
}

async function createRecipe(recipe, token) {
	const config = getConfig(token);
	await API.post("/recipes", recipe, config);
}

export const apiService = {
	signIn,
	signUp,
	getRecipes,
	getRecipesByName,
	getRecipeById,
	getRecipesQty,
	getIngredients,
	createRecipe,
};
