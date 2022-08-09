import {
	Drawer,
	Divider,
	Typography,
	List,
	ListItemButton,
	Box,
} from "@mui/material";

import IconButton from "@mui/material/IconButton";
import ChevronLeftIcon from "@mui/icons-material/ChevronLeft";
import ListItem from "@mui/material/ListItem";
import HomeRoundedIcon from "@mui/icons-material/HomeRounded";
import PersonRoundedIcon from "@mui/icons-material/PersonRounded";
import LogoutRoundedIcon from "@mui/icons-material/LogoutRounded";
import { styled } from "@mui/system";

export default function Dashboard({
	direction,
	setIsMenuDrawerOpen,
	isMenuDrawerOpen,
}) {
	return (
		<StyledDrawer
			anchor={direction}
			variant="temporary"
			open={isMenuDrawerOpen}
			onClose={() => setIsMenuDrawerOpen(false)}
		>
			<DrawerHeader>
				<IconButton onClick={() => setIsMenuDrawerOpen(false)}>
					<ChevronLeftIcon fontSize="large" />
				</IconButton>
			</DrawerHeader>
			<Divider />

			<List sx={{ width: "250px" }}>
				<ListItem>
					<StyleListItemButton>
						<HomeRoundedIcon />
						<StyledTypography component="span">Home</StyledTypography>
					</StyleListItemButton>
				</ListItem>
				<ListItem>
					<StyleListItemButton>
						<PersonRoundedIcon />
						<StyledTypography component="span">Profile</StyledTypography>
					</StyleListItemButton>
				</ListItem>
				<ListItem>
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
	justifyContent: "flex-end",
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

const Avatar = styled(Box)`
	object-fit: contain;
	width: 50px;
	height: 50px;
	border-radius: 50%;
`;
