import axios from "axios";

const API = axios.create({
	baseURL: "http://localhost:5000/",
});

async function signUp(body) {
	await API.post("/signup", body);
}

async function signIn(body) {
	return await API.post("/signin", body);
}

export const apiService = {
	signIn,
	signUp,
};
