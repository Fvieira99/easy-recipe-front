import { styled, Box, Tab, Tabs, Typography } from "@mui/material";
import { useState } from "react";
import { useEffect } from "react";
import Form from "../components/form";
import FormInput from "../components/form/Input";
import useAuth from "../hooks/useAuth";

export default function NewRecipe() {
	const [recipeData, setRecipeData] = useState({
		title: "",
		mealFor: 0,
		time: 0,
		howToPrepare: "",
		ingredients: [],
	});

	const [tabPanelValue, setTabPanelValue] = useState();

	useAuth();

	return (
		<Wrapper>
			<Form>
				<FormInput
					variant="outlined"
					label="Title"
					required
					placeholder="recipe title"
					type="text"
				/>
				<FormInput
					variant="outlined"
					label="Meal For"
					required
					type="number"
					placeholder="number"
				/>
				<FormInput
					variant="outlined"
					label="Preparation Time"
					required
					type="number"
					placeholder="time in minutes"
				/>
				<FormInput
					multiline
					rows={5}
					variant="outlined"
					label="How To Prepare"
					required
					placeholder="Recipe Preparation"
					type="text"
				/>
				<TabContainer
					variant="scrollable"
					scrollButtons="auto"
					allowScrollButtonsMobile={true}
				>
					<Tab label="ingredient1"></Tab>
					<Tab label="ingredient2"></Tab>
					<Tab label="ingredient3"></Tab>
					<Tab label="ingredient4"></Tab>
					<TabPanel value={tabPanelValue} index={0} dir="direction">
						Item One
					</TabPanel>
					<TabPanel value={tabPanelValue} index={1} dir="direction">
						Item Two
					</TabPanel>
					<TabPanel value={tabPanelValue} index={2} dir="direction">
						Item Three
					</TabPanel>
				</TabContainer>
			</Form>
		</Wrapper>
	);
}

function TabPanel(props) {
	const { children, value, index, ...other } = props;

	return (
		<div
			role="tabpanel"
			hidden={value !== index}
			id={`full-width-tabpanel-${index}`}
			aria-labelledby={`full-width-tab-${index}`}
			{...other}
		>
			{value === index && (
				<Box sx={{ p: 3 }}>
					<Typography>{children}</Typography>
				</Box>
			)}
		</div>
	);
}

function a11yProps(index) {
	return {
		id: `full-width-tab-${index}`,
		"aria-controls": `full-width-tabpanel-${index}`,
	};
}

const Wrapper = styled(Box)`
	width: 100%;
	height: 100vh;
	${({ theme }) =>
		theme.mixins.flexbox("column", "flex-start", "center", "0px")}
	background-color: ${({ theme }) => theme.palette.secondary.light}
`;

const TabContainer = styled(Tabs)`
	width: 100%;
`;
