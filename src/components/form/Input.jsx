import { TextField, styled } from "@mui/material";

export default function FormButton() {
	return <StyledInput></StyledInput>;
}

const StyledInput = styled(TextField)`
	width: 90%;
	&:first-child {
		margin-top: 20px;
	}
`;
