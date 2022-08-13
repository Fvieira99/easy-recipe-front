import { createContext, useState } from "react";

const AlertContext = createContext();

function AlertProvider({ children }) {
	const [isAlertOpen, setIsAlertOpen] = useState(false);

	return (
		<AlertContext.Provider value={{ isAlertOpen, setIsAlertOpen }}>
			{children}
		</AlertContext.Provider>
	);
}

export { AlertContext, AlertProvider };
