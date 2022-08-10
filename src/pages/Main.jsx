import { styled } from "@mui/system";
import { Box, Pagination } from "@mui/material";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

import { apiService } from "../services/API";
import Recipe from "../components/Recipe";
import Header from "../components/Header";
import MenuDashboard from "../components/MenuDashboard";
import SearchBar from "../components/SearchDashboard";
import useAuth from "../hooks/useAuth";
import Footer from "../components/Footer";

export default function Main() {
	const [recipes, setRecipes] = useState([]);
	const [page, setPage] = useState(1);
	const [isMenuDrawerOpen, setIsMenuDrawerOpen] = useState(false);
	const [isSearchBarOpen, setIsSearchBarOpen] = useState(false);

	const navigate = useNavigate();

	const { username, avatar } = useAuth();

	useEffect(() => {
		async function fetchData() {
			const response = await apiService.getRecipes(page);
			console.log(response.data);
			setRecipes(response.data);
		}
		fetchData();
	}, [page]);

	return (
		<Wrapper>
			<MenuDashboard
				username={username}
				avatar={avatar}
				direction="left"
				isMenuDrawerOpen={isMenuDrawerOpen}
				setIsMenuDrawerOpen={setIsMenuDrawerOpen}
			/>
			<Header
				setIsMenuDrawerOpen={setIsMenuDrawerOpen}
				setIsSearchBarOpen={setIsSearchBarOpen}
			/>
			<SearchBar
				isSearchBarOpen={isSearchBarOpen}
				setIsSearchBarOpen={setIsSearchBarOpen}
			/>
			{recipes.length === 0 ? (
				<h1>Não tem receitas</h1>
			) : (
				recipes.map((recipe, index) => {
					return (
						<Recipe
							recipeId={recipe.id}
							key={index}
							title={recipe.title}
							avatar={recipe.user.avatar}
							username={recipe.user.username}
							rating={recipe.ratings}
						></Recipe>
					);
				})
			)}
			<Footer page={page} setPage={setPage} />
		</Wrapper>
	);
}

const Wrapper = styled(Box)`
	width: 100%;
	${({ theme }) => theme.mixins.flexbox("column", "start", "center", "0px")}
`;
