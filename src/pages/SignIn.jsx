import { InputAdornment, IconButton, Box, styled } from "@mui/material";
import Visibility from "@mui/icons-material/Visibility";
import VisibilityOff from "@mui/icons-material/VisibilityOff";
import { useContext, useState } from "react";

import { apiService } from "../services/API";
import logo from "../assets/images/auth.svg";
import Form from "../components/form/index";
import FormInput from "../components/form/Input";
import FormButton from "../components/form/Button";
import FormLink from "../components/form/Link";
import FormTitle from "../components/form/Title";
import { LoadingContext } from "../contexts/LoadingContext";
import { useNavigate } from "react-router-dom";

export default function SignIn() {
	const [userInfo, setUserInfo] = useState({
		email: "",
		password: "",
	});

	const [showPassword, setShowPassword] = useState(false);

	const { isLoading, setIsLoading } = useContext(LoadingContext);

	const navigate = useNavigate();

	async function handleSubmit(e) {
		e.preventDefault();
		await login();
	}

	async function login() {
		try {
			const { data } = await apiService.signIn(userInfo);
			localStorage.setItem("token", data.token);
			setIsLoading(false);
			setUserInfo({ email: "", password: "" });
			navigate("/");
		} catch (error) {
			console.log(error);
			setIsLoading(false);
			setUserInfo({ email: "", password: "" });
		}
	}

	return (
		<Wrapper>
			<Logo component="img" src={logo} />
			<FormTitle component="h1">Sign In</FormTitle>
			<Form
				onSubmit={(e) => {
					handleSubmit(e);
					setIsLoading(true);
				}}
			>
				<FormInput
					variant="filled"
					label="email"
					required
					value={userInfo.email}
					onChange={(e) => setUserInfo({ ...userInfo, email: e.target.value })}
				/>
				<FormInput
					required
					variant="filled"
					label="password"
					value={userInfo.password}
					onChange={(e) =>
						setUserInfo({ ...userInfo, password: e.target.value })
					}
					type={showPassword ? "text" : "password"}
					fullWidth={true}
					InputProps={{
						endAdornment: (
							<InputAdornment position="end">
								<IconButton
									aria-label="toggle password visibility"
									onClick={() => setShowPassword(!showPassword)}
									edge="end"
								>
									{showPassword ? <VisibilityOff /> : <Visibility />}
								</IconButton>
							</InputAdornment>
						),
					}}
				/>
				<FormButton variant="contained" boxShadow={2} type="submit">
					Login
				</FormButton>
				<FormLink component="span" onClick={() => navigate("/")}>
					Don't have an account? Join Now!
				</FormLink>
			</Form>
		</Wrapper>
	);
}

const Wrapper = styled(Box)`
	width: 100%;
	height: 100vh;
	${({ theme }) =>
		theme.mixins.flexbox("column", "flex-start", "center", "0px")}
	background-color: ${({ theme }) => theme.palette.secondary.light}
`;

const Logo = styled(Box)`
	width: 200px;
	height: 200px;
`;
