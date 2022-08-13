import * as React from "react";
import Button from "@mui/material/Button";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import DialogTitle from "@mui/material/DialogTitle";
import { LoadingContext } from "../contexts/LoadingContext";
import { apiService } from "../services/API";
import useAuth from "../hooks/useAuth";
import { CircularProgress } from "@mui/material";

export default function AlertDialog({
	isAlertOpen,
	setIsAlertOpen,
	deleteRatingId,
	recipeId,
	setRecipe,
}) {
	const { isLoading, setIsLoading } = React.useContext(LoadingContext);
	const { token } = useAuth();

	const handleClose = () => {
		setIsAlertOpen(false);
	};

	async function handleDelete() {
		setIsLoading(true);
		try {
			await apiService.deleteRating(deleteRatingId, token);
			setIsLoading(false);
			handleClose();

			const response = await apiService.getRecipeById(recipeId, token);
			setRecipe(response.data);
		} catch (error) {
			alert(`${error.response.statusText} ${error.response.data}`);
			setIsLoading(false);
			handleClose();
		}
	}

	return (
		<Dialog
			open={isAlertOpen}
			onClose={handleClose}
			aria-labelledby="alert-dialog-title"
			aria-describedby="alert-dialog-description"
		>
			<DialogTitle id="alert-dialog-title">
				{isLoading ? "Deleting" : "Delete Rating"}
			</DialogTitle>
			<DialogContent>
				<DialogContentText id="alert-dialog-description">
					{isLoading ? (
						<CircularProgress />
					) : (
						"Are you sure you want to delete this rating"
					)}
				</DialogContentText>
			</DialogContent>
			<DialogActions>
				<Button onClick={() => setIsAlertOpen(false)} disabled={isLoading}>
					Disagree
				</Button>
				<Button onClick={handleDelete} autoFocus disabled={isLoading}>
					Agree
				</Button>
			</DialogActions>
		</Dialog>
	);
}
