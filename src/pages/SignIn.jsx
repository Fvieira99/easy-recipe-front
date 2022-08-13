import { InputAdornment, IconButton, Box, styled } from "@mui/material";
import Visibility from "@mui/icons-material/Visibility";
import VisibilityOff from "@mui/icons-material/VisibilityOff";
import { useContext, useState } from "react";

import { apiService } from "../services/API";
import logo from "../assets/images/auth.svg";
import Form from "../components/Form/index";
import FormInput from "../components/Form/Input";
import FormButton from "../components/Form/Button";
import FormLink from "../components/Form/Link";
import FormTitle from "../components/Form/Title";
import { LoadingContext } from "../contexts/LoadingContext";
import { useNavigate } from "react-router-dom";
import { UserContext } from "../contexts/UserContext";

export default function SignIn() {
	const [userInfo, setUserInfo] = useState({
		email: "",
		password: "",
	});

	const [showPassword, setShowPassword] = useState(false);

	const { isLoading, setIsLoading } = useContext(LoadingContext);

	const { setUser } = useContext(UserContext);

	const navigate = useNavigate();

	async function handleSubmit(e) {
		e.preventDefault();
		await login();
	}

	async function login() {
		try {
			const { data } = await apiService.signIn(userInfo);

			localStorage.setItem("user", JSON.stringify(data));
			setUser(JSON.parse(localStorage.getItem("user")));

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
			<FormTitle>Sign In</FormTitle>
			<Form
				onSubmit={(e) => {
					handleSubmit(e);
					setIsLoading(true);
				}}
			>
				<FormInput
					type="email"
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
				<FormButton type="submit" variant="contained">
					Sign In
				</FormButton>
				<FormLink text="You dont have an account yet? Sign Up!" url="/" />
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
