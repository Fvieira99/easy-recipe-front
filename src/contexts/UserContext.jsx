import { createContext, useState } from "react";

const UserContext = createContext();

function UserProvider({ children }) {
	const [user, setUser] = useState(JSON.parse(localStorage.getItem("user")));

	function logout() {
		localStorage.clear("user");
		setUser(JSON.parse(JSON.parse(localStorage.getItem("user"))));
	}

	return (
		<UserContext.Provider value={{ user, setUser, logout }}>
			{children}
		</UserContext.Provider>
	);
}

export { UserContext, UserProvider };
