import { Button, styled } from "@mui/material";

export default function FormButton() {
	return <StyledButton></StyledButton>;
}

const StyledButton = styled(Button)`
	width: 90%;
	height: 50px;
	border-radius: 10px;
	font-family: "Inter", sans-serif;
	font-weight: 700;
	font-size: 15px;
	text-transform: none;
`;
