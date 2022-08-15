import { useContext, useEffect, useState } from "react";
import { UserContext } from "../contexts/UserContext";
import { apiService } from "../services/API";

import { Pagination, styled } from "@mui/material";

export default function Footer({ page, setPage }) {
	const [pages, setPages] = useState(0);

	const handleChange = (event, value) => {
		setPage(value);
	};

	const { user } = useContext(UserContext);

	useEffect(() => {
		async function fetchData() {
			const response = await apiService.getRecipesQty(user.token);
			const numberOfPages = calculateNumberOfPages(response.data.quantity);
			setPages(numberOfPages);
		}

		fetchData();
	}, []);

	return (
		<StylePagination
			defaultChecked={1}
			defaultPage={1}
			count={pages}
			color="primary"
			onChange={handleChange}
		/>
	);
}

function calculateNumberOfPages(recipesQty) {
	if (recipesQty === 0) {
		const numberOfPages = 1;
		return numberOfPages;
	}
	const takeQty = 10;
	const numberOfPages = Math.ceil(recipesQty / takeQty);
	return numberOfPages;
}

const StylePagination = styled(Pagination)`
	margin-bottom: 15px;
`;
