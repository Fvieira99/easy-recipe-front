import { Link, styled } from "@mui/material";

const FormLink = styled(Link)`
	color: ${({ theme }) => theme.palette.primary.dark};
	font-family: "Inter", sans-serif;
	font-weight: 500;
	cursor: pointer;
`;

export default FormLink;
