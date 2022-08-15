import { useNavigate } from "react-router-dom";
import { useContext } from "react";
import { UserContext } from "../contexts/UserContext";

import { styled, Typography, Box, Rating, Avatar } from "@mui/material";
import { DeleteRounded } from "@mui/icons-material";
import { AlertContext } from "../contexts/AlertContext";
import { DeleteContext } from "../contexts/DeleteContext";

export default function Recipe({
	userId,
	title,
	avatar,
	rating,
	recipeId,
	username,
	image,
}) {
	const navigate = useNavigate();

	const { user } = useContext(UserContext);

	const { setIsAlertOpen } = useContext(AlertContext);

	const { setDeleteEntityId } = useContext(DeleteContext);

	return (
		<Wrapper>
			{userId && userId === user.userId ? (
				<DeleteRounded
					onClick={() => {
						setIsAlertOpen(true);
						setDeleteEntityId(recipeId);
					}}
					sx={{ cursor: "pointer" }}
				/>
			) : (
				<></>
			)}
			<Container
				boxShadow={3}
				image={image}
				component="div"
				onClick={() => navigate(`/recipes/recipe/${recipeId}`)}
			>
				<RecipeInformation component="div">
					<UserInfo>
						<StyledAvatar src={avatar} />
						<Typography
							component="span"
							sx={{
								textDecoration: "underline",
								cursor: "pointer",
								fontWeight: "700",
							}}
						>
							{username}
						</Typography>
					</UserInfo>
					<Typography
						component="span"
						sx={{ width: "90%", fontSize: "15px", fontWeight: "500" }}
					>
						{title}
					</Typography>
					<Rating
						readOnly
						defaultValue={rating}
						precision={0.5}
						sx={{ width: "90%", fontSize: "18px" }}
					/>
				</RecipeInformation>
			</Container>
		</Wrapper>
	);
}

const Wrapper = styled(Box)`
	width: 330px;
	${({ theme }) =>
		theme.mixins.flexbox("column", "center", "flex-start", "0px")};
`;

const Container = styled(Box)`
	width: 100%;
	height: 300px;
	border-radius: 10px;
	cursor: pointer;
	margin-bottom: 30px;
	${({ theme }) => theme.mixins.flexbox("column", "flex-end", "center", "0px")}

	background-image: url(${(props) => props.image});
	background-repeat: no-repeat;
	background-size: cover;
`;

const RecipeInformation = styled(Box)`
	width: 100%;
	height: 115px;
	border-radius: 0 0 10px 10px;
	background: linear-gradient(
		360deg,
		rgba(0, 0, 0, 0.5242471988795518) 100%,
		rgba(0, 0, 0, 0.7987570028011204) 100%,
		rgba(0, 0, 0, 0.7203256302521008) 100%
	);
	color: #ffffff;
	${({ theme }) =>
		theme.mixins.flexbox("column", "space-evenly", "center", "0px")}
`;

const UserInfo = styled(Box)`
	width: 90%;
	${({ theme }) => theme.mixins.flexbox("row", "start", "center", "10px")}
`;

const StyledAvatar = styled(Avatar)`
	width: 30px;
	height: 30px;
`;
