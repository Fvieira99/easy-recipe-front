import { Typography, styled } from "@mui/material";

export default function FormTitle() {
	return <StyledTitle></StyledTitle>;
}

const StyledTitle = styled(Typography)`
	font-size: 20px;
	font-weight: 700;
	margin-bottom: 15px;
	font-family: "Inter", sans-serif;
`;
