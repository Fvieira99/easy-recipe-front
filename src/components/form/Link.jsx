import { Link, styled } from "@mui/material";

const FormLink = styled(Link)`
	color: ${({ theme }) => theme.palette.primary.dark};
	margin-bottom: 20px;
	font-family: "Inter", sans-serif;
	font-weight: 500;
	cursor: pointer;
`;

export default FormLink;
