import { styled } from "@mui/system";
import {
	AppBar,
	Box,
	Button,
	IconButton,
	Toolbar,
	Typography,
} from "@mui/material";

import MenuIcon from "@mui/icons-material/Menu";
import SearchIcon from "@mui/icons-material/Search";

export default function Header({ setIsMenuDrawerOpen, setIsSearchBarOpen }) {
	return (
		<StyledToolBar sx={{ boxShadow: 1 }}>
			<IconButton color="primary" onClick={() => setIsMenuDrawerOpen(true)}>
				<MenuIcon />
			</IconButton>
			<StyledTypography component="span">EasyEating</StyledTypography>
			<IconButton color="primary" onClick={() => setIsSearchBarOpen(true)}>
				<SearchIcon />
			</IconButton>
		</StyledToolBar>
	);
}

const StyledToolBar = styled(Toolbar)`
	width: 100%;
	height: 72px;

	position: fixed;
	z-index: 2;

	${({ theme }) =>
		theme.mixins.flexbox("row", "space-between", "center", "0px")};

	background-color: #ffffff;
	color: ${({ theme }) => theme.palette.primary.main};
`;

const StyledTypography = styled(Typography)`
	font-weight: 700;
	font-size: 30px;
`;
