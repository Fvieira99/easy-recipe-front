import { styled } from "@mui/system";
import { IconButton, Toolbar, Typography } from "@mui/material";

import MenuIcon from "@mui/icons-material/Menu";
import SearchIcon from "@mui/icons-material/Search";
import { useState } from "react";
import MenuDashboard from "./MenuDashboard";
import SearchDashboard from "./SearchDashboard";

export default function Header() {
	const [isMenuDrawerOpen, setIsMenuDrawerOpen] = useState(false);
	const [isSearchBarOpen, setIsSearchBarOpen] = useState(false);

	return (
		<>
			<StyledToolBar sx={{ boxShadow: 1 }}>
				<IconButton color="primary" onClick={() => setIsMenuDrawerOpen(true)}>
					<MenuIcon />
				</IconButton>
				<StyledTypography component="span">EasyEating</StyledTypography>
				<IconButton color="primary" onClick={() => setIsSearchBarOpen(true)}>
					<SearchIcon />
				</IconButton>
			</StyledToolBar>
			<MenuDashboard
				direction="left"
				isMenuDrawerOpen={isMenuDrawerOpen}
				setIsMenuDrawerOpen={setIsMenuDrawerOpen}
			/>
			<SearchDashboard
				isSearchBarOpen={isSearchBarOpen}
				setIsSearchBarOpen={setIsSearchBarOpen}
			/>
		</>
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
