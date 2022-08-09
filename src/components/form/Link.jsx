import { Link, styled } from "@mui/material";

export default function FormLink() {
	return <StyledLink></StyledLink>;
}

const StyledLink = styled(Link)`
	color: ${({ theme }) => theme.palette.primary.dark};
	margin-bottom: 20px;
	font-family: "Inter", sans-serif;
	font-weight: 500;
	cursor: pointer;
`;
