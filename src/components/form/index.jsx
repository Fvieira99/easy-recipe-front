import { Box } from "@mui/system";
import { styled } from "@mui/material";

export default function Form({ children, onSubmit }) {
	return (
		<FormContainer component="form" onSubmit={onSubmit} boxShadow={2}>
			{children}
		</FormContainer>
	);
}

const FormContainer = styled(Box)`
	width: 90%;
	${({ theme }) => theme.mixins.flexbox("column", "center", "center", "15px")}
	border-radius: 10px;
	background-color: #ffffff;
`;
