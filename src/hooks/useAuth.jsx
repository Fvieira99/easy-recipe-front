import { useNavigate } from "react-router-dom";

import { useContext } from "react";

import { UserContext } from "../contexts/UserContext";

export default function useAuth() {
	const { user } = useContext(UserContext);

	const navigate = useNavigate();

	if (!user) {
		alert("You are being redirected");
	}

	return user;
}
