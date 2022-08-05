import { createContext, useState } from "react";

const AuthContext = createContext();

function AuthProvider({ children }) {
	const [token, setToken] = useState(JSON.parse(localStorage.getItem("token")));

	return <AuthContext.Provider>{children}</AuthContext.Provider>;
}

export { AuthContext, AuthProvider };
