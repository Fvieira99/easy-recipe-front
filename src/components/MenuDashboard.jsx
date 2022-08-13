import { useNavigate } from "react-router-dom";
import { useContext } from "react";
import { UserContext } from "../contexts/UserContext";

import {
	Drawer,
	Divider,
	Typography,
	List,
	ListItemButton,
	Box,
	Avatar,
	styled,
} from "@mui/material";
import IconButton from "@mui/material/IconButton";
import ChevronLeftIcon from "@mui/icons-material/ChevronLeft";
import ListItem from "@mui/material/ListItem";
import HomeRoundedIcon from "@mui/icons-material/HomeRounded";
import PersonRoundedIcon from "@mui/icons-material/PersonRounded";
import LogoutRoundedIcon from "@mui/icons-material/LogoutRounded";
import AddCircleRoundedIcon from "@mui/icons-material/AddCircleRounded";

export default function MenuDashboard({
	setIsMenuDrawerOpen,
	isMenuDrawerOpen,
}) {
	const navigate = useNavigate();

	const { user } = useContext(UserContext);

	const { logout } = useContext(UserContext);

	function handleLogout() {
		logout();
		navigate("/");
	}

	return (
		<StyledDrawer
			anchor="left"
			variant="temporary"
			open={isMenuDrawerOpen}
			onClose={() => setIsMenuDrawerOpen(false)}
		>
			<DrawerHeader>
				<StyledUserInfoBox component="div">
					<Avatar src={user.avatar} alt="Avatar" />
					<Typography component="span">{user.username}</Typography>
				</StyledUserInfoBox>
				<IconButton onClick={() => setIsMenuDrawerOpen(false)}>
					<ChevronLeftIcon fontSize="large" />
				</IconButton>
			</DrawerHeader>
			<Divider />

			<List sx={{ width: "250px" }}>
				<ListItem onClick={() => navigate("/main")}>
					<StyleListItemButton>
						<HomeRoundedIcon />
						<StyledTypography component="span">Home</StyledTypography>
					</StyleListItemButton>
				</ListItem>
				<ListItem onClick={() => navigate(`/profile/${user.userId}`)}>
					<StyleListItemButton>
						<PersonRoundedIcon />
						<StyledTypography component="span">Profile</StyledTypography>
					</StyleListItemButton>
				</ListItem>
				<ListItem onClick={() => navigate("/new-recipe")}>
					<StyleListItemButton>
						<AddCircleRoundedIcon />
						<StyledTypography component="span">New Recipe</StyledTypography>
					</StyleListItemButton>
				</ListItem>
				<ListItem onClick={handleLogout}>
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
