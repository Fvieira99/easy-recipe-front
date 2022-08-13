import { styled } from "@mui/system";
import { Typography, Box, Rating, Avatar } from "@mui/material";
import { useNavigate } from "react-router-dom";

export default function Recipe({
	title,
	avatar,
	rating,
	recipeId,
	username,
	image,
}) {
	const navigate = useNavigate();

	return (
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
	);
}

const Container = styled(Box)`
	width: 90%;
	height: 300px;
	border-radius: 10px;
	cursor: pointer;
	margin-bottom: 30px;
	${({ theme }) => theme.mixins.flexbox("column", "flex-end", "center", "0px")}
	&:nth-child(2) {
		margin-top: 100px;
	}
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
