import { createContext, useState } from "react";

const DeleteContext = createContext();

function DeleteProvider({ children }) {
	const [deleteEntityId, setDeleteEntityId] = useState(null);

	return (
		<DeleteContext.Provider value={{ deleteEntityId, setDeleteEntityId }}>
			{children}
		</DeleteContext.Provider>
	);
}

export { DeleteContext, DeleteProvider };
