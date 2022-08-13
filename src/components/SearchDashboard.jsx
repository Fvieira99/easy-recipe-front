import { useContext, useEffect, useState } from "react";
import { apiService } from "../services/API";
import { UserContext } from "../contexts/UserContext";
import { useNavigate } from "react-router-dom";
import useDebounce from "../hooks/useDebounce";

import {
	Divider,
	Drawer,
	styled,
	Box,
	TextField,
	IconButton,
	Chip,
} from "@mui/material";
import ChevronRightIcon from "@mui/icons-material/ChevronRight";

export default function SearchDashboard({
	isSearchBarOpen,
	setIsSearchBarOpen,
}) {
	const [search, setSearch] = useState("");
	const [recipes, setRecipes] = useState([]);
	const debouncedRecipe = useDebounce(search, 500);

	const navigate = useNavigate();

	const { user } = useContext(UserContext);

	useEffect(() => {
		async function fetchData() {
			if (debouncedRecipe) {
				const response = await apiService.getRecipesByName(
					debouncedRecipe,
					user.token
				);
				console.log(response);
				setRecipes(response.data);
			} else {
				setRecipes([]);
			}
		}

		fetchData();
	}, [debouncedRecipe]);

	return (
		<StyledSearchDrawer
			anchor="right"
			open={isSearchBarOpen}
			onClose={() => setIsSearchBarOpen(false)}
			variant="temporary"
		>
			<DrawerHeader>
				<IconButton onClick={() => setIsSearchBarOpen(false)}>
					<ChevronRightIcon fontSize="large" />
				</IconButton>
			</DrawerHeader>
			<Divider />
			<SearchContainer>
				<TextField
					onChange={(e) => {
						setSearch(e.target.value);
					}}
					value={search}
					variant="outlined"
					placeholder="Search..."
					size="small"
				/>
				{recipes.length > 0 ? (
					recipes.map((recipe, index) => (
						<Chip
							onClick={() => navigate(`/recipes/recipe/${recipe.id}`)}
							key={index}
							label={recipe.title}
							variant="outlined"
							size="medium"
						/>
					))
				) : (
					<Chip
						label="Nenhuma receita encontrada"
						variant="outlined"
						size="medium"
					/>
				)}
			</SearchContainer>
		</StyledSearchDrawer>
	);
}

const StyledSearchDrawer = styled(Drawer)`
	${({ theme }) =>
		theme.mixins.flexbox("column", "space-between", "center", "0px")}
`;

const SearchContainer = styled(Box)`
	width: 90%;
	${({ theme }) => theme.mixins.flexbox("column", "start", "center", "10px")}
	margin: 10px auto 0 auto;
`;

const DrawerHeader = styled("div")(({ theme }) => ({
	width: "100%",

	display: "flex",
	alignItems: "center",
	padding: theme.spacing(0, 1),
	// necessary for content to be below app bar

	...theme.mixins.toolbar,
	justifyContent: "flex-start",
	height: "72px",
}));
