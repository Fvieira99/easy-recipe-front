import { Pagination, styled } from "@mui/material";
import { useEffect, useState } from "react";
import { apiService } from "../services/API";

export default function Footer({ page, setPage }) {
	const [pages, setPages] = useState(0);

	const handleChange = (event, value) => {
		setPage(value);
	};

	useEffect(() => {
		async function fetchData() {
			const response = await apiService.getRecipesQty();
			const numberOfPages = calculateNumberOfPages(response.data.quantity);
			setPages(numberOfPages);
		}

		fetchData();
	}, []);

	return (
		<StylePagination
			defaultChecked="1"
			defaultPage="1"
			count={pages}
			color="primary"
			onChange={handleChange}
		/>
	);
}

function calculateNumberOfPages(pagesQty) {
	const takeQty = 10;
	const numberOfPages = Math.ceil(pagesQty / takeQty);
	return numberOfPages;
}

const StylePagination = styled(Pagination)`
	margin-bottom: 15px;
`;
