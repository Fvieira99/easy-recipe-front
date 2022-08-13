import { useContext } from "react";

import { UserContext } from "../../contexts/UserContext";

import { Navigate } from "react-router-dom";

export default function PrivateRoute({ children }) {
	const { user } = useContext(UserContext);

	if (!user) {
		alert("You are being redirected");

		return <Navigate to="/" />;
	}

	return children;
}
