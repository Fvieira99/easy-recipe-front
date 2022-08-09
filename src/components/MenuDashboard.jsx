import {
	Drawer,
	Divider,
	Typography,
	List,
	ListItemButton,
	Box,
	Avatar,
} from "@mui/material";

import IconButton from "@mui/material/IconButton";
import ChevronLeftIcon from "@mui/icons-material/ChevronLeft";
import ListItem from "@mui/material/ListItem";
import HomeRoundedIcon from "@mui/icons-material/HomeRounded";
import PersonRoundedIcon from "@mui/icons-material/PersonRounded";
import LogoutRoundedIcon from "@mui/icons-material/LogoutRounded";
import AddCircleRoundedIcon from "@mui/icons-material/AddCircleRounded";
import { styled } from "@mui/system";
import { useNavigate } from "react-router-dom";

export default function Dashboard({
	direction,
	setIsMenuDrawerOpen,
	isMenuDrawerOpen,
}) {
	const navigate = useNavigate();

	return (
		<StyledDrawer
			anchor="left"
			variant="temporary"
			open={isMenuDrawerOpen}
			onClose={() => setIsMenuDrawerOpen(false)}
		>
			<DrawerHeader>
				<StyledUserInfoBox component="div">
					<Avatar
						src="https://gravatar.com/avatar/5081440c2359c9119ffa9e419d6c4b75?s=400&d=robohash&r=x"
						alt="Avatar"
					/>
					<Typography component="span">Username</Typography>
				</StyledUserInfoBox>
				<IconButton onClick={() => setIsMenuDrawerOpen(false)}>
					<ChevronLeftIcon fontSize="large" />
				</IconButton>
			</DrawerHeader>
			<Divider />

			<List sx={{ width: "250px" }}>
				<ListItem onClick={() => navigate("/")}>
					<StyleListItemButton>
						<HomeRoundedIcon />
						<StyledTypography component="span">Home</StyledTypography>
					</StyleListItemButton>
				</ListItem>
				<ListItem onClick={() => navigate("/")}>
					<StyleListItemButton>
						<PersonRoundedIcon />
						<StyledTypography component="span">Profile</StyledTypography>
					</StyleListItemButton>
				</ListItem>
				<ListItem onClick={() => navigate("/")}>
					<StyleListItemButton>
						<AddCircleRoundedIcon />
						<StyledTypography component="span">New Recipe</StyledTypography>
					</StyleListItemButton>
				</ListItem>
				<ListItem onClick={() => navigate("/")}>
					<StyleListItemButton>
						<LogoutRoundedIcon />
						<StyledTypography component="span">Logout</StyledTypography>
					</StyleListItemButton>
				</ListItem>
			</List>
		</StyledDrawer>
	);
}

const StyledDrawer = styled(Drawer)`
	${({ theme }) =>
		theme.mixins.flexbox("column", "space-between", "center", "0px")}
`;

const DrawerHeader = styled("div")(({ theme }) => ({
	width: "100%",
	display: "flex",
	alignItems: "center",
	padding: theme.spacing(0, 1),
	// necessary for content to be below app bar
	...theme.mixins.toolbar,
	justifyContent: "space-between",
	height: "72px",
}));

const StyleListItemButton = styled(ListItemButton)`
	${({ theme }) => theme.mixins.flexbox("row", "center", "center", "15px")}
	:hover {
		text-decoration: underline;
	}
`;

const StyledTypography = styled(Typography)`
	font-size: 20px;
	font-weight: 400;
	color: ${({ theme }) => theme.palette.primary.dark};
`;

const StyledUserInfoBox = styled(Box)`
	${({ theme }) =>
		theme.mixins.flexbox("row", "space-between", "center", "10px")}

	span {
		font-size: 15px;
		max-width: 150px;
		word-break: break-all;
		text-align: center;
	}
`;
