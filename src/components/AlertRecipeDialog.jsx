import * as React from "react";
import Button from "@mui/material/Button";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import DialogTitle from "@mui/material/DialogTitle";
import { CircularProgress } from "@mui/material";

import { LoadingContext } from "../contexts/LoadingContext";
import { apiService } from "../services/API";
import { UserContext } from "../contexts/UserContext";
import { AlertContext } from "../contexts/AlertContext";
import { DeleteContext } from "../contexts/DeleteContext";

export default function AlertRecipeDialog({ setRecipes }) {
	const { isLoading, setIsLoading } = React.useContext(LoadingContext);

	const { user } = React.useContext(UserContext);

	const { deleteEntityId, setDeleteEntityId } = React.useContext(DeleteContext);

	const { isAlertOpen, setIsAlertOpen } = React.useContext(AlertContext);

	const handleClose = () => {
		setIsAlertOpen(false);
		setDeleteEntityId(null);
	};

	async function handleDelete() {
		setIsLoading(true);

		try {
			if (deleteEntityId !== null) {
				await apiService.deleteRecipe(deleteEntityId, user.token);

				setDeleteEntityId(null);
				setIsLoading(false);
				handleClose();

				const response = await apiService.getUserRecipes(user.token);
				setRecipes(response.data);
			}
		} catch (error) {
			console.log(error);
			alert(`${error.response.statusText} ${error.response.data}`);
			setDeleteEntityId(null);
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
				{isLoading ? "Deleting" : "Delete Recipe"}
			</DialogTitle>
			<DialogContent>
				<DialogContentText id="alert-dialog-description">
					{isLoading ? (
						<CircularProgress />
					) : (
						"Are you sure you want to delete this recipe"
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
