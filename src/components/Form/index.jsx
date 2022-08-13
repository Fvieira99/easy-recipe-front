import { Box } from "@mui/system";
import { styled } from "@mui/material";

const Form = styled("form")`
	width: 90%;
	${({ theme }) => theme.mixins.flexbox("column", "center", "center", "15px")}
	border-radius: 10px;
	background-color: #ffffff;
	margin-bottom: 10px;
`;

export default Form;
