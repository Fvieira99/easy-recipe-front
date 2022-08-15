import { Link, styled } from "@mui/material";
import { useNavigate } from "react-router-dom";

export default function FormLink({ text, url }) {
	const navigate = useNavigate();
	return (
		<StyledLink component="span" onClick={() => navigate(`${url}`)}>
			{text}
		</StyledLink>
	);
}

const StyledLink = styled(Link)`
	color: ${({ theme }) => theme.palette.primary.dark};
	margin-bottom: 20px;
	font-family: "Inter", sans-serif;
	font-weight: 500;
	cursor: pointer;
`;
