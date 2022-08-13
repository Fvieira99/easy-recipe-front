import {
	styled,
	Box,
	Typography,
	Rating,
	TextField,
	Button,
	CircularProgress,
} from "@mui/material";
import { useContext, useState } from "react";
import { LoadingContext } from "../../contexts/LoadingContext";
import useAuth from "../../hooks/useAuth";
import { apiService } from "../../services/API";

import Form from "../Form";

export default function AddRating({ recipeId, setRecipe, alreadyHasRating }) {
	const [rating, setRating] = useState({
		rating: 0,
		comment: "",
	});

	const { isLoading, setIsLoading } = useContext(LoadingContext);

	const { token } = useAuth();

	async function handleSubmit(e) {
		e.preventDefault();
		try {
			setIsLoading(true);
			await apiService.createRating({ ...rating, recipeId }, token);
			const response = await apiService.getRecipeById(recipeId, token);
			setRecipe(response.data);
			setIsLoading(false);
			setRating({ rating: 0, comment: "" });
		} catch (error) {
			console.log(error);
			setIsLoading(false);
		}
	}

	return (
		<Form sx={{ boxShadow: 3 }} onSubmit={handleSubmit}>
			<Container>
				<Typography sx={{ marginTop: "20px" }}>Rate this recipe</Typography>
				<Rating
					disabled={isLoading || alreadyHasRating}
					precision={1}
					sx={{ fontSize: "20px" }}
					onChange={(e, newRating) =>
						setRating({ ...rating, rating: newRating })
					}
					value={rating.rating}
				/>
				<Typography>Leave a comment</Typography>
				<TextField
					disabled={isLoading || alreadyHasRating}
					required
					sx={{ width: "95%" }}
					variant="outlined"
					multiline
					rows={4}
					type="text"
					onChange={(e) => setRating({ ...rating, comment: e.target.value })}
					value={rating.comment}
				/>
			</Container>
			<Button
				type="submit"
				disabled={isLoading || alreadyHasRating}
				variant="contained"
				sx={{ textTransform: "none", marginBottom: "20px" }}
			>
				{isLoading ? <CircularProgress /> : "Add recipe"}
			</Button>
		</Form>
	);
}

const Container = styled(Box)`
	width: 90%;
	${({ theme }) => theme.mixins.flexbox("column", "center", "center", "15px")}
`;
