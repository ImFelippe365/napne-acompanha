import axios from "axios";

export const api = axios.create({
  baseURL: "http://localhost:8000/",
});

// api.interceptors.request.use(
// 	async (config) => {
// 		const token = localStorage.getItem("@napneAcompanha:token");
// 		const refresh = localStorage.getItem("@napneAcompanha:refresh");
		
// 		if (token) config.headers.Authorization = `Bearer ${token}`;

// 		return config;
// 	},
// 	(error) => {
// 		return Promise.reject(error);
// 	}
// );

api.interceptors.response.use(
	(response) => response,

	(error) => Promise.reject(error || "Something went wrong")
);
