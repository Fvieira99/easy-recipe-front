import { Avatar, Box, Chip, Rating, styled, Typography } from "@mui/material";
import DeleteRoundedIcon from "@mui/icons-material/DeleteRounded";
import useAuth from "../../hooks/useAuth";
import { useContext } from "react";
import { LoadingContext } from "../../contexts/LoadingContext";

export default function RecipeRating({
	user,
	recipeRating,
	comment,
	setIsAlertOpen,
	setDeleteRatingId,
	ratingId,
}) {
	const { userId } = useAuth();

	const { isLoading, setIsLoading } = useContext(LoadingContext);

	return (
		<Wrapper component="div" boxShadow={3}>
			<UserInfoContainer component="div">
				<Avatar src={user.avatar} />
				<Typography>{user.username}</Typography>
				<Rating
					readOnly
					defaultValue={recipeRating}
					precision={1}
					sx={{ fontSize: "20px" }}
				/>

				{userId === user.id ? (
					<DeleteRoundedIcon
						onClick={() => {
							setIsAlertOpen(true);
							setDeleteRatingId(ratingId);
						}}
					/>
				) : (
					<></>
				)}
			</UserInfoContainer>
			<Typography sx={{ width: "90%", margin: "20px 0" }}>{comment}</Typography>
		</Wrapper>
	);
}

const Wrapper = styled(Box)`
	width: 90%;
	${({ theme }) =>
		theme.mixins.flexbox("column", "flex-start", "center", "0px")}
	border-radius: 10px;
	margin-bottom: 20px;
	background-color: #ffffff;
`;

const UserInfoContainer = styled(Box)`
	width: 90%;
	${({ theme }) => theme.mixins.flexbox("row", "flex-start", "center", "20px")};
	margin-top: 20px;
`;
